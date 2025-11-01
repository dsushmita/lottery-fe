import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


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
        bgcolor: "#1A1F29",
        px: 1.5,
        py: 0.6,
        borderRadius: 1.5,
        cursor: "pointer",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        "&:hover": {
          bgcolor: "#1A1F29",
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
        {/* Add Funds */}
        <IconButton
          // onClick={}
          sx={{
            width: { xs: 32, md: 36 },
            height: { xs: 32, md: 36 },
            bgcolor: "#3ABEF9",
            color: "#FFFFFF",
            ml: 2,
            "&:hover": { bgcolor: "#2A8EC7" },
          }}
          aria-label="Add funds"
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Typography>
    </Box>
  );
};
