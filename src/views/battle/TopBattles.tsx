"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { BattleCard } from "./BattleCard";
import { TopBattlesProps } from "@/types/battle/battle.types";
import { BATTLE_CONSTANTS } from "@/constant/battle.constants";
import { useBattles } from "@/hooks/battles/useBattles";


export const TopBattles: React.FC<TopBattlesProps> = ({
  limit = BATTLE_CONSTANTS.DEFAULT_LIMIT,
  showViewAllButton = true,
}) => {
  const { battles, loading, error, handleViewBattle, handleViewAllBattles } =
    useBattles(limit);

  // Loading State
  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: "#0f1623",
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
            }}
          >
            <CircularProgress
              sx={{
                color: "#3ABEF9",
              }}
              size={50}
            />
          </Box>
        </Container>
      </Box>
    );
  }

  // Error State
  if (error) {
    return (
      <Box
        sx={{
          bgcolor: "#0f1623",
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="xl">
          <Alert
            severity="error"
            sx={{
              bgcolor: "rgba(239, 68, 68, 0.1)",
              color: "#EF4444",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  // Empty State
  if (battles.length === 0) {
    return (
      <Box
        sx={{
          bgcolor: "#0f1623",
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 2,
            }}
          >
            <SportsEsportsIcon
              sx={{
                fontSize: 72,
                color: "#4B5563",
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#6B7280",
                fontWeight: 500,
              }}
            >
              No battles available at the moment
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#4B5563",
                mt: 1,
              }}
            >
              Check back soon for exciting new battles!
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  // Main Content
  return (
    <Box
      sx={{
        bgcolor: "#0f1623",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 0 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Title with Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <SportsEsportsIcon
              sx={{
                fontSize: { xs: 32, md: 40 },
                color: "#3ABEF9",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
              }}
            >
              Top Battles
            </Typography>
          </Box>

          {/* View All Button */}
          {showViewAllButton && (
            <Button
              variant="outlined"
              onClick={handleViewAllBattles}
              sx={{
                borderColor: "#3ABEF9",
                color: "#3ABEF9",
                px: { xs: 2.5, md: 3.5 },
                py: { xs: 0.75, md: 1 },
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                borderWidth: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#2DA8E0",
                  borderWidth: 2,
                  bgcolor: "rgba(58, 190, 249, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              View Battles
            </Button>
          )}
        </Box>

        {/* Battle Cards */}
        <Stack spacing={3}>
          {battles.map((battle, index) => (
            <Box
              key={battle.id}
              sx={{
                animation: `fadeIn 0.5s ease ${index * 0.1}s backwards`,
                "@keyframes fadeIn": {
                  from: {
                    opacity: 0,
                    transform: "translateY(20px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <BattleCard battle={battle} onViewBattle={handleViewBattle} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};