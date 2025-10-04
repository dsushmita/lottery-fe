// hooks/login/useLogin.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { AuthError, LoginFormData } from "@/types/auth/auth";
import { useAuth } from "@/context/AuthContext";
import { SteamAuthClient } from "@/utils/steamAuth";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const login = async (formData: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(formData);
      if (response.user) {
        setUser(response.user);
        router.push("/dashboard");
      } else {
        setError({ message: response.message || "Login failed" });
      }
    } catch (err) {
      setError({
        message:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithProvider = async (
    provider: "google" | "steam" | "discord",
  ) => {
    setError(null);

    try {
      switch (provider) {
        case "steam":
          setLoading(true);
          try {
            const steamAuth = new SteamAuthClient({
              realm: process.env.NEXT_PUBLIC_URL || window.location.origin,
              returnUrl: `${
                process.env.NEXT_PUBLIC_URL || window.location.origin
              }/auth/steam/callback`,
            });

            steamAuth.login();
          } catch (err) {
            setLoading(false);
            setError({
              message:
                err instanceof Error
                  ? err.message
                  : "Failed to initiate Steam login",
            });
          }
          // Don't set loading to false here - let the page redirect
          return;

        default:
          throw new Error("Unsupported provider");
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Social login failed",
      });
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    login,
    loginWithProvider,
    togglePasswordVisibility,
    clearError,
    loading,
    error,
    showPassword,
  };
};
