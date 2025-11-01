import React from "react";
import { Box, Typography } from "@mui/material";
import { DropItem as DropItemType } from "@/types/home/home";
import Image from "next/image";

interface DropItemProps {
  drop: DropItemType;
  onClick?: () => void;
}

const rarityColors = {
  common: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
  rare: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  epic: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
  legendary: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
};

export const DropItem: React.FC<DropItemProps> = ({ drop, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        bgcolor: "rgba(255, 255, 255, 0.03)",
        borderRadius: 1,
        border: "1px solid rgba(255, 255, 255, 0.05)",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s",
        "&:hover": onClick
          ? {
              bgcolor: "rgba(255, 255, 255, 0.05)",
              borderColor: "rgba(58, 190, 249, 0.3)",
              transform: "translateX(-4px)",
            }
          : {},
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1,
          background: rarityColors[drop.itemRarity],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {drop.imageUrl ? (
          <Image
            src={drop.imageUrl}
            alt={drop.itemName}
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <Typography sx={{ fontSize: "24px" }}>🎁</Typography>
        )}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {drop.itemName}
        </Typography>

        <Typography
          sx={{
            color: "#9ca3af",
            fontSize: "11px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {drop.boxName}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              bgcolor: "#FCD34D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8px",
              fontWeight: "bold",
            }}
          >
            $
          </Box>
          <Typography
            sx={{
              color: "#FCD34D",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            {drop.itemValue.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};