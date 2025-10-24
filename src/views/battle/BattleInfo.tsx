"use client";

import React from "react";
import { Box, Typography, Stack } from "@mui/material";

interface BattleInfoProps {
  battleCost: number;
  unboxedValue: number;
}

export const BattleInfo: React.FC<BattleInfoProps> = ({
  battleCost,
  unboxedValue,
}) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString();
  };

  const CoinIcon = () => (
    <Box
      sx={{
        width: { xs: 18, md: 20 },
        height: { xs: 18, md: 20 },
        borderRadius: "50%",
        background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: { xs: "0.65rem", md: "0.7rem" },
        boxShadow: "0 2px 6px rgba(255, 193, 7, 0.3)",
      }}
    >
      🪙
    </Box>
  );

  return (
    <Stack spacing={{ xs: 1.5, md: 2 }}>
      {/* Battle Cost */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#8E9AAB",
            fontSize: { xs: "0.8rem", md: "0.875rem" },
            fontWeight: 500,
          }}
        >
          Battle Cost:
        </Typography>
        <Box
          sx={{
            bgcolor: "rgba(255, 193, 7, 0.08)",
            border: "1px solid rgba(255, 193, 7, 0.2)",
            borderRadius: 1.5,
            px: { xs: 1.5, md: 2 },
            py: 0.75,
            display: "flex",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <CoinIcon />
          <Typography
            sx={{
              color: "#FFC107",
              fontWeight: 700,
              fontSize: { xs: "0.85rem", md: "0.95rem" },
            }}
          >
            {formatCurrency(battleCost)}
          </Typography>
        </Box>
      </Box>

      {/* Unboxed Value */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#8E9AAB",
            fontSize: { xs: "0.8rem", md: "0.875rem" },
            fontWeight: 500,
          }}
        >
          Unboxed:
        </Typography>
        <Box
          sx={{
            bgcolor: "rgba(255, 193, 7, 0.08)",
            border: "1px solid rgba(255, 193, 7, 0.2)",
            borderRadius: 1.5,
            px: { xs: 1.5, md: 2 },
            py: 0.75,
            display: "flex",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <CoinIcon />
          <Typography
            sx={{
              color: "#FFC107",
              fontWeight: 700,
              fontSize: { xs: "0.85rem", md: "0.95rem" },
            }}
          >
            {formatCurrency(unboxedValue)}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};