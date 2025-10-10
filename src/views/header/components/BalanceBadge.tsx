import React from "react";
import { Box, Typography } from "@mui/material";

export type BalanceBadgeProps = {
  balance: number;
  onClick: () => void;
};

export const BalanceBadge: React.FC<BalanceBadgeProps> = ({
  balance,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        bgcolor: "#2a3441",
        px: 1.5,
        py: 0.6,
        borderRadius: 1.5,
        cursor: "pointer",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        "&:hover": {
          bgcolor: "#323d4d",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        },
        transition: "all 0.2s ease",
      }}
    >
      {/* GREEN Coin Icon - Key fix! */}
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          bgcolor: "#10b981", // 🟢 GREEN (not yellow!)
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: "bold",
          color: "#fff",
          boxShadow: "0 0 8px rgba(16, 185, 129, 0.3)",
        }}
      >
        $
      </Box>
      
      <Typography
        sx={{
          fontWeight: 600,
          color: "#FFFFFF",
          fontSize: "14px",
          lineHeight: 1,
          letterSpacing: "-0.01em",
        }}
      >
        {balance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Typography>
    </Box>
  );
};