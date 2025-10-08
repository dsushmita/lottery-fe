import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import { useGoogleLogin } from "@react-oauth/google";
import { showError } from "@/utils/toast";

export const useGoogleAuth = () => {
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  const { setUser } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse): Promise<void> => {
      try {
        setIsLoginLoading(true);
        const response = await authService.loginWithGoogle(
          tokenResponse.access_token,
        );
        setUser(response?.user || null);
        router.push("/dashboard");
      } catch (error: any) {
        showError(error.message);
      } finally {
        setIsLoginLoading(false);
      }
    },
    onError: () => {
      showError("Google Login Failed");
      setIsLoginLoading(false);
    },
  });

  return {
    handleGoogleLogin,
    isLoginLoading,
  };
};
