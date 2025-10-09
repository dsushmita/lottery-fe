import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthError } from "@/types/auth/auth";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { showSuccess } from "@/utils/toast";
import { SocialProvider } from "@/enum/auth/auth.enum";
import { SteamAuthClient } from "@/utils/steamAuth";

interface SignupFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const signup = async (formData: SignupFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.signup({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });
      // Update auth context with user data
      if (response.user) {
        setUser(response.user);
      }
      showSuccess("Account Created!");

      router.push("/signup-sucess");
    } catch (err) {
      setError({
        message:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const signupWithProvider = async (provider: SocialProvider) => {
    try {
      setLoading(true);
      setError(null);
      if (provider === SocialProvider.Steam) {
        const steamAuth = new SteamAuthClient({
          realm: process.env.NEXT_PUBLIC_URL || window.location.origin,
          returnUrl: `${
            process.env.NEXT_PUBLIC_URL || window.location.origin
          }/auth/steam/callback`,
        });

        steamAuth.login();
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Social signup failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    signup,
    signupWithProvider,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    clearError,
    loading,
    error,
    showPassword,
    showConfirmPassword,
  };
};
