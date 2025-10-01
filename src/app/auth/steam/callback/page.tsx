"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Alert, Paper } from "@mui/material";
import { SteamAuthClient } from "@/utils/steamAuth";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { AuthError } from "@/types/auth/auth";

export default function SteamCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);
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
        setError({ message: "Steam login failed" });
      }

      console.log("🔵 Backend response:", response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Authentication failed";
      setError({ message: errorMessage });

      // Show debug info for 10 seconds before redirect
      setTimeout(() => {
        router.push(`/login?error=${encodeURIComponent(errorMessage)}`);
      }, 10000);
    }
  };

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          p: 3,
        }}
      >
        <Paper sx={{ p: 3, maxWidth: 600 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Steam Authentication Error
            </Typography>
            <Typography variant="body2">{error.message}</Typography>
          </Alert>

          <Typography variant="body2" color="text.secondary">
            Redirecting to login in 10 seconds...
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Open browser console (F12) for detailed logs
          </Typography>
        </Paper>
      </Box>
    );
  }

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
      {/* <CircularProgress size={40} /> */}
      <Typography variant="h6">Verifying with Steam...</Typography>
    </Box>
  );
}
