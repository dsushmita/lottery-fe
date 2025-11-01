import React from "react";
import { Box, Typography } from "@mui/material";

export const ChatPanel: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          color: "#9ca3af",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        Chat feature coming soon...
      </Typography>
    </Box>
  );
};