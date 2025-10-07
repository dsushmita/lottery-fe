import { useState } from "react";

export interface SteamUser {
  steamId: string;
  personaName: string;
  profileUrl: string;
  avatar: string;
  avatarMedium: string;
  avatarFull: string;
  realName?: string;
  countryCode?: string;
}

export const useSteamAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithSteam = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const returnUrl = `${window.location.origin}/auth/steam/callback`;

      const params = new URLSearchParams({
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": returnUrl,
        "openid.realm": window.location.origin,
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id":
          "http://specs.openid.net/auth/2.0/identifier_select",
      });

      // Redirect to Steam (this will leave the page, so loading stays true)
      window.location.href = `https://steamcommunity.com/openid/login?${params.toString()}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Steam login failed");
      setLoading(false);
    }
  };

  const verifySteamAuth = async (query: Record<string, string>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/steam/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Steam verification failed");
      }

      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Steam verification failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    loginWithSteam,
    verifySteamAuth,
    loading,
    error,
    clearError,
  };
};
