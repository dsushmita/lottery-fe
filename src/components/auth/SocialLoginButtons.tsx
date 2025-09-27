import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { SocialButton } from "@/styles/authStyles";
import GoogleLoginButton from "@/components/GoogleLoginButton";

interface SocialLoginSectionProps {
  onSocialLogin: (provider: "google" | "steam" ) => void;
  disabled?: boolean;
  variant?: "login" | "signup";
  showGoogle?: boolean;
  showSteam?: boolean;
  showDiscord?: boolean;
}

export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  onSocialLogin,
  disabled = false,
  variant = "login",
  showGoogle = true,
  showSteam = true,
  showDiscord = true,
}) => {
  const SteamIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142s.016-.023.016-.023v-.058C11.431 4.632 15.62.441 20.864.441S30.297 4.632 30.297 9.888c0 5.256-4.189 9.447-9.433 9.447h-.016l-4.104 2.878v.013c-.016.328-.14.626-.343.852l-5.933-2.447c-.339.738-.395 1.566.227 2.383.711 1.066 2.15 1.354 3.211.643l10.548-4.445C21.507 22.5 17.094 24 11.979 24c-6.627 0-12-5.373-12-12s5.373-12 12-12zm7.74 6.322c0-3.487-2.828-6.317-6.315-6.317s-6.315 2.83-6.315 6.317c0 3.487 2.828 6.315 6.315 6.315s6.315-2.828 6.315-6.315zm-10.05 0c0-2.063 1.672-3.735 3.735-3.735s3.735 1.672 3.735 3.735-1.672 3.735-3.735 3.735-3.735-1.672-3.735-3.735z"
      />
    </svg>
  );

  const DiscordIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
      />
    </svg>
  );

  const renderDivider = () => {
    if (variant === "signup") {
      return (
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.5)",
            textAlign: "center",
            mb: 2,
          }}
        >
          Or
        </Typography>
      );
    }

    return (
      <Divider sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary", px: 2 }}>
          Or
        </Typography>
      </Divider>
    );
  };

  const renderSocialButtons = () => {
    if (variant === "login") {
      return (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr ",
            gap: "10px",
            overflow: "hidden",
          }}
        >
          {showGoogle && (
            <GoogleLoginButton variant="custom" disabled={disabled} />
          )}

          {showSteam && (
            <SocialButton
              onClick={() => onSocialLogin("steam")}
              disabled={disabled}
              
            >
              <SteamIcon />
            </SocialButton>
          )}

         
       
        </Box>
      );
    }

    // Signup variant
    return (
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        {showGoogle && (
          <GoogleLoginButton variant="custom" disabled={disabled} />
        )}

        {showSteam && (
          <SocialButton
            onClick={() => onSocialLogin("steam")}
            disabled={disabled}
            sx={{
              backgroundColor: "#171a21",
              color: "white",
              "&:hover": {
                backgroundColor: "#1b2838",
              },
            }}
          >
            <SteamIcon />
          </SocialButton>
        )}

      
      </Box>
    );
  };

  return (
    <>
      {renderDivider()}
      {renderSocialButtons()}
    </>
  );
};
