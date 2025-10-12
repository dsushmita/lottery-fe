"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { TabType } from "@/types/home/home";
import { useLiveDrops } from "@/hooks/homepage/useLiveDrops";
import { PanelTabs } from "./PanelTabs";
import { ConnectionStatus } from "./ConnectionStatus";
import { ChatPanel } from "./ChatPanel";
import { DropList } from "./DropList";


interface LiveDropPanelProps {
  width?: number;
  onDropClick?: (dropId: string) => void;
}

export const LiveDropPanel: React.FC<LiveDropPanelProps> = ({
  width = 300,
  onDropClick,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("live-drop");
  const { drops, isConnected, error } = useLiveDrops();

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleDropItemClick = (dropId: string) => {
    if (onDropClick) {
      onDropClick(dropId);
    }
  };

  return (
    <Box
      sx={{
        width: `${width}px`,
        height: "calc(100vh - 64px)",
        bgcolor: "#1a1f2e",
        borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right: 0,
        top: 64,
        zIndex: 100,
      }}
    >
      <PanelTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {!isConnected && error && <ConnectionStatus error={error} />}

      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.05)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "3px",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.3)",
            },
          },
        }}
      >
        {activeTab === "chat" ? (
          <ChatPanel />
        ) : (
          <DropList drops={drops} onDropClick={handleDropItemClick} />
        )}
      </Box>
    </Box>
  );
};