import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { SocialButton } from "@/styles/authStyles";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { SocialProvider } from "@/enum/auth/auth.enum";

interface SocialLoginSectionProps {
  onSocialLogin: (provider: SocialProvider) => void;
  disabled?: boolean;
  variant?: "login" | "signup";
  showGoogle?: boolean;
  showSteam?: boolean;
}

export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  onSocialLogin,
  disabled = false,
  variant = "login",
  showGoogle = true,
  showSteam = true,
}) => {
  const SteamIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.005 2C6.75502 2 2.44902 6.05 2.04102 11.198L7.40102 13.412C7.86985 13.0904 8.42548 12.9191 8.99402 12.921C9.04735 12.9217 9.09968 12.9233 9.15102 12.926L11.535 9.474V9.425C11.535 7.345 13.225 5.655 15.305 5.655C16.3049 5.65659 17.2634 6.05471 17.9701 6.76202C18.6769 7.46934 19.0742 8.4281 19.075 9.428C19.075 11.508 17.384 13.198 15.305 13.198H15.218L11.821 15.624L11.824 15.757C11.8245 16.1283 11.7519 16.496 11.6102 16.8392C11.4686 17.1824 11.2607 17.4943 10.9984 17.7572C10.7362 18.02 10.4247 18.2285 10.0818 18.3709C9.73889 18.5133 9.3713 18.5867 9.00002 18.587C8.34678 18.5845 7.71433 18.3571 7.20897 17.9432C6.70362 17.5292 6.35616 16.9539 6.22502 16.314L2.38702 14.725C3.57402 18.923 7.42802 22 12.006 22C17.528 22 22.004 17.523 22.004 12C22.004 6.477 17.527 2 12.005 2ZM7.08002 16.667C7.29802 17.119 7.67502 17.499 8.17502 17.708C8.56279 17.8684 8.98934 17.9104 9.40095 17.8288C9.81256 17.7472 10.1908 17.5456 10.4881 17.2494C10.7853 16.9532 10.9883 16.5757 11.0714 16.1644C11.1545 15.753 11.114 15.3263 10.955 14.938C10.7448 14.4276 10.3441 14.0192 9.8378 13.7993C9.33153 13.5793 8.7595 13.5653 8.24302 13.76L9.51202 14.286C9.89107 14.4484 10.1907 14.7538 10.3458 15.1359C10.5009 15.518 10.4989 15.9459 10.3403 16.3266C10.1816 16.7072 9.87917 17.0099 9.49863 17.1687C9.11808 17.3276 8.69021 17.3299 8.30802 17.175L7.08002 16.667ZM17.82 9.422C17.819 8.75593 17.5538 8.11745 17.0827 7.64656C16.6117 7.17567 15.9731 6.91079 15.307 6.91C14.8099 6.91 14.324 7.05741 13.9108 7.33359C13.4975 7.60976 13.1754 8.0023 12.9852 8.46155C12.795 8.9208 12.7453 9.42613 12.8424 9.91363C12.9394 10.4011 13.1789 10.8489 13.5304 11.2003C13.882 11.5517 14.3298 11.791 14.8174 11.8878C15.3049 11.9847 15.8102 11.9348 16.2694 11.7444C16.7286 11.5541 17.121 11.2318 17.397 10.8184C17.673 10.405 17.8202 9.91907 17.82 9.422ZM15.312 7.53C15.8126 7.53053 16.2925 7.72961 16.6464 8.08357C17.0004 8.43752 17.1995 8.91743 17.2 9.418C17.1995 9.91857 17.0004 10.3985 16.6464 10.7524C16.2925 11.1064 15.8126 11.3055 15.312 11.306C14.8113 11.306 14.3311 11.1071 13.977 10.753C13.6229 10.3989 13.424 9.91873 13.424 9.418C13.424 8.91727 13.6229 8.43705 13.977 8.08298C14.3311 7.72891 14.8113 7.53 15.312 7.53Z"
        fill="url(#paint0_linear_11941_2194)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11941_2194"
          x1="12.0225"
          y1="2"
          x2="12.0225"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#191818" />
          <stop offset="1" stopColor="#00ADEE" />
        </linearGradient>
      </defs>
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
          {showGoogle && <GoogleLoginButton disabled={disabled} />}

          {showSteam && (
            <SocialButton
              onClick={() => onSocialLogin(SocialProvider.Steam)}
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
        {showGoogle && <GoogleLoginButton disabled={disabled} />}

        {showSteam && (
          <SocialButton
            onClick={() => onSocialLogin(SocialProvider.Steam)}
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
