import React from "react";
import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ConnectionStatusProps {
  error: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  error,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1,
        bgcolor: "rgba(239, 68, 68, 0.1)",
        borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 16, color: "#ef4444" }} />
      <Typography sx={{ fontSize: "12px", color: "#ef4444" }}>
        {error}
      </Typography>
    </Box>
  );
};