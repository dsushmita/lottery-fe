"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { SteamAuthClient } from "@/utils/steamAuth";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { showError } from "@/utils/toast";

export default function SteamCallbackPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    handleSteamCallback();
  }, []);

  const handleSteamCallback = async () => {
    try {
      const steamAuth = new SteamAuthClient({
        realm: process.env.NEXT_PUBLIC_URL || window.location.origin,
        returnUrl: `${
          process.env.NEXT_PUBLIC_URL || window.location.origin
        }/auth/steam/callback`,
      });

      // Step 3: Parse Steam response
      const steamParams = steamAuth.parseCallback();

      // Check if we got a Steam ID
      if (!steamParams.steamId) {
        throw new Error(
          "No Steam ID received from Steam. Check console for details.",
        );
      }

      const response = await authService.steamLoginVerify(steamParams);

      if (response.user) {
        setUser(response.user);
        authService.setToken(response.token || "");
        authService.setUser(response.user);
        router.push("/dashboard");
      } else {
        showError("Steam login failed");
        router.push("/login");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Authentication failed";
      showError(errorMessage);
      router.push("/login");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <CircularProgress size={40} />
    </Box>
  );
}
