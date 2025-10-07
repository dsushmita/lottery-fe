import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { LoginFormData } from "@/types/auth/auth";
import { useAuth } from "@/context/AuthContext";
import { SteamAuthClient } from "@/utils/steamAuth";
import { showError, showSuccess } from "@/utils/toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const login = async (formData: LoginFormData) => {
    setLoading(true);

    try {
      const response = await authService.login(formData);
      if (response.user) {
        setUser(response.user);
        showSuccess("Login successful! Welcome back.");
        router.push("/dashboard");
      } else {
        const errorMessage = response.message || "Login failed";

        showError(errorMessage);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loginWithProvider = async (
    provider: "google" | "steam" | "discord",
  ) => {
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
            const errorMessage =
              err instanceof Error
                ? err.message
                : "Failed to initiate Steam login";

            showError(errorMessage);
          }
          // Don't set loading to false here - let the page redirect
          return;

        default:
          const errorMsg = `${provider} login is not supported yet`;

          showError(errorMsg);
          throw new Error("Unsupported provider");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Social login failed. Please try again.";

      // Only show error if it wasn't already shown above
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    login,
    loginWithProvider,
    togglePasswordVisibility,

    loading,
    error: null,
    showPassword,
  };
};
