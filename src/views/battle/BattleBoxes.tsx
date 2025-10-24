"use client";

import React from "react";
import { Box, Typography,Grid} from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { BattleBox } from "@/types/battle/battle.types";

interface BattleBoxesProps {
  boxes: BattleBox[];
  currentBoxes: number;
  totalBoxes: number;
}

export const BattleBoxes: React.FC<BattleBoxesProps> = ({
  boxes,
  currentBoxes,
  totalBoxes,
}) => {
  return (
    <Box sx={{ position: "relative" }}>
      {/* Box Counter Badge */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: -12, md: -8 },
          right: { xs: -12, md: -8 },
          zIndex: 10,
          bgcolor: "#3ABEF9",
          borderRadius: "8px",
          px: { xs: 1, md: 1.5 },
          py: { xs: 0.5, md: 0.75 },
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          boxShadow: "0 4px 12px rgba(58, 190, 249, 0.4)",
        }}
      >
        <CardGiftcardIcon
          sx={{ fontSize: { xs: 14, md: 16 }, color: "#FFFFFF" }}
        />
        <Typography
          sx={{
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: { xs: "0.7rem", md: "0.75rem" },
            lineHeight: 1,
          }}
        >
          {currentBoxes}/{totalBoxes}
        </Typography>
      </Box>

      {/* Boxes Grid */}
      <Grid container spacing={{ xs: 1, md: 1.5 }}>
        {boxes.map((box, index) => (
          <Grid size={{ xs: boxes.length === 2 ? 6 : 4 }} key={box.id}>
            <Box
              sx={{
                bgcolor: "#253447",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: { xs: 1.5, md: 2 },
                p: { xs: 1.5, md: 2 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: { xs: 80, md: 100 },
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                animation: `fadeInScale 0.4s ease ${index * 0.1}s backwards`,
                "@keyframes fadeInScale": {
                  from: {
                    opacity: 0,
                    transform: "scale(0.8)",
                  },
                  to: {
                    opacity: 1,
                    transform: "scale(1)",
                  },
                },
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(58, 190, 249, 0.3)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              {/* Colorful Box Display */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: box.color,
                  borderRadius: 1.5,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: 1.5,
                    padding: "2px",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  },
                }}
              >
                {/* Gift Icon */}
                <CardGiftcardIcon
                  sx={{
                    fontSize: { xs: 36, md: 48 },
                    color: "rgba(255, 255, 255, 0.95)",
                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};