"use client";

import { DropItem, LiveDropState } from "@/types/home/home";
import { useState, useEffect, useRef, useCallback } from "react";


const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001/live-drops";
const MAX_DROPS = 20;

type ServerDrop = Omit<DropItem, "timestamp"> & { timestamp: string };

type RecentDropsResponse = { drops: ServerDrop[] };

type DropMessage = { type: "drop"; payload: ServerDrop };

type ReconnectTimer = ReturnType<typeof setTimeout> | null;

export const useLiveDrops = () => {
  const [state, setState] = useState<LiveDropState>({
    drops: [],
    isConnected: false,
    error: null,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReconnectTimer>(null);
  const isMountedRef = useRef(true);

  const addDrop = useCallback((newDrop: DropItem) => {
    if (!isMountedRef.current) return;

    setState((prev: LiveDropState) => ({
      ...prev,
      drops: [newDrop, ...prev.drops].slice(0, MAX_DROPS),
    }));
  }, []);

  const connectWebSocket = useCallback(() => {
    if (!isMountedRef.current) return;

    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!isMountedRef.current) return;
        setState((prev: LiveDropState) => ({ ...prev, isConnected: true, error: null }));
      };

      ws.onmessage = (event: MessageEvent<string>) => {
        if (!isMountedRef.current) return;

        try {
          const data: DropMessage = JSON.parse(event.data);

          if (data.type === "drop") {
            const drop: DropItem = {
              ...data.payload,
              timestamp: new Date(data.payload.timestamp),
            };
            addDrop(drop);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        // eslint-disable-next-line no-console
        console.error("WebSocket error:", error);
        if (!isMountedRef.current) return;
        setState((prev: LiveDropState) => ({
          ...prev,
          isConnected: false,
          error: "Connection error",
        }));
      };

      ws.onclose = () => {
        if (!isMountedRef.current) return;

        setState((prev: LiveDropState) => ({ ...prev, isConnected: false }));

        reconnectTimeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            connectWebSocket();
          }
        }, 5000);
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to connect WebSocket:", error);
      setState((prev: LiveDropState) => ({
        ...prev,
        isConnected: false,
        error: "Failed to connect",
      }));
    }
  }, [addDrop]);

  const fetchRecentDrops = useCallback(async () => {
    try {
      const response = await fetch("/api/drops/recent?limit=20");
      if (!response.ok) throw new Error("Failed to fetch recent drops");

      const data: RecentDropsResponse = await response.json();

      if (isMountedRef.current) {
        setState((prev: LiveDropState) => ({
          ...prev,
          drops: data.drops.map((drop) => ({
            ...drop,
            timestamp: new Date(drop.timestamp),
          })),
        }));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to fetch recent drops:", error);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    fetchRecentDrops();
    connectWebSocket();

    return () => {
      isMountedRef.current = false;

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connectWebSocket, fetchRecentDrops]);

  return state;
};
