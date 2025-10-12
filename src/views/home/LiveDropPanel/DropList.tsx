import React from "react";
import { Stack, Typography } from "@mui/material";
import { DropItem as DropItemType } from "@/types/home/home";
import { DropItem } from "./DropItem";

interface DropListProps {
  drops: DropItemType[];
  onDropClick?: (dropId: string) => void;
}

export const DropList: React.FC<DropListProps> = ({ drops, onDropClick }) => {
  if (drops.length === 0) {
    return (
      <Typography
        sx={{
          color: "#9ca3af",
          fontSize: "14px",
          textAlign: "center",
          py: 4,
        }}
      >
        No drops yet. Be the first to unbox!
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {drops.map((drop) => (
        <DropItem
          key={drop.id}
          drop={drop}
          onClick={() => onDropClick && onDropClick(drop.id)}
        />
      ))}
    </Stack>
  );
};