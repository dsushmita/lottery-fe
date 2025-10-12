import React from "react";
import { Box } from "@mui/material";

export const HeroBackground: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "radial-gradient(ellipse at center, rgba(58, 190, 249, 0.15) 0%, rgba(15, 20, 25, 0) 70%)",
        pointerEvents: "none",
      }}
    />
  );
};