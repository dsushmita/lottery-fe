"use client";

import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { ParticipantAvatars } from "./ParticipantAvatars";
import { BattleBoxes } from "./BattleBoxes";
import { BattleInfo } from "./BattleInfo";
import { BattleCardProps, BattleStatus } from "@/types/battle/battle.types";
import { BATTLE_MODE_CONFIG } from "@/constant/battle.constants";

export const BattleCard: React.FC<BattleCardProps> = ({
  battle,
  onViewBattle,
}) => {
  const isFinished = battle.status === BattleStatus.FINISHED;
  const modeConfig = BATTLE_MODE_CONFIG[battle.mode];

  const handleButtonClick = () => {
    if (!isFinished && onViewBattle) {
      onViewBattle(battle.id);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#1e2838",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 2.5,
        p: { xs: 2, md: 3 },
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "rgba(58, 190, 249, 0.2)",
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
     <Grid container spacing={{ xs: 2, md: 3 }}>
  <Grid size={{ xs: 12, sm: 3, md: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
              minHeight: { xs: "auto", sm: 200 },
            }}
          >
            {/* Mode Label */}
            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 1.5,
                px: 2,
                py: 1,
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: { xs: "0.85rem", md: "0.9rem" },
                }}
              >
                {modeConfig.label}
              </Typography>
            </Box>

            {/* Participant Avatars */}
            <ParticipantAvatars participants={battle.participants} />
          </Box>
        </Grid>

        {/* Middle Section - Battle Boxes */}
        <Grid size={{ xs: 12, sm: 5, md: 5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              py: { xs: 2, sm: 0 },
            }}
          >
            <BattleBoxes
              boxes={battle.boxes}
              currentBoxes={battle.currentBoxes}
              totalBoxes={battle.totalBoxes}
            />
          </Box>
        </Grid>

        {/* Right Section - Info & Actions */}
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
              minHeight: { xs: "auto", sm: 200 },
            }}
          >
            {/* Battle Info */}
            <BattleInfo
              battleCost={battle.battleCost}
              unboxedValue={battle.unboxedValue}
            />

            {/* Action Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleButtonClick}
              disabled={isFinished}
              startIcon={
                isFinished ? (
                  <CloseIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                ) : undefined
              }
              sx={{
                mt: { xs: 2, sm: 3 },
                py: { xs: 1.25, md: 1.5 },
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2,
                ...(isFinished
                  ? {
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      color: "#6B7280",
                      cursor: "default",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.08)",
                      },
                      "&.Mui-disabled": {
                        bgcolor: "rgba(255, 255, 255, 0.08)",
                        color: "#6B7280",
                      },
                    }
                  : {
                      bgcolor: "#3ABEF9",
                      color: "#FFFFFF",
                      boxShadow: "0 4px 12px rgba(58, 190, 249, 0.3)",
                      "&:hover": {
                        bgcolor: "#2DA8E0",
                        boxShadow: "0 6px 16px rgba(58, 190, 249, 0.4)",
                      },
                    }),
              }}
            >
              {isFinished ? "Finished" : "View Battles"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};