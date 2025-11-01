"use client";

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { HeroContent } from "@/types/home/home";
import { HeroBackground } from "./HeroBackground";
import { HeroImage } from "./HeroImage";

interface HeroSectionProps {
  content?: Partial<HeroContent>;
  onOpenClick?: () => void;
  onBattleClick?: () => void;
}

const defaultContent: HeroContent = {
  title: "Dare to Discover",
  subtitle: "What's in the Box?",
  highlightText: "Mystery Awaits!",
  description: "Unbox Luxury. Battle for More. Upgrade Without Limits",
  primaryButtonText: "Open Now",
  secondaryButtonText: "Join a Pack Battle",
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  onOpenClick,
  onBattleClick,
}) => {
  const router = useRouter();
  const heroContent = { ...defaultContent, ...content };

  const handlePrimaryAction = () => {
    if (onOpenClick) {
      onOpenClick();
    } else {
      router.push("/mystery-box");
    }
  };

  const handleSecondaryAction = () => {
    if (onBattleClick) {
      onBattleClick();
    } else {
      router.push("/battles");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#0f1419",
        borderRadius: 1,
        overflow: "hidden",
        border: "2px solid",
        borderTop: 0,
        borderColor: "primary.main",
      }}
    >
      <HeroBackground />

      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          pl: { xs: 2, md: 6 },
          pr: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Left Text Section */}
          <Box sx={{ flex: 1, zIndex: 2 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "24px", md: "32px" },
                fontWeight: 600,
                color: "#fff",
                mb: 1,
              }}
            >
              {heroContent.title}
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "36px", md: "56px" },
                fontWeight: 700,
                color: "#3ABEF9",
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              {heroContent.subtitle}
            </Typography>

            <Typography
              component="h3"
              sx={{
                fontSize: { xs: "28px", md: "40px" },
                fontWeight: 700,
                color: "#fff",
                mb: 3,
              }}
            >
              {heroContent.highlightText}
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#9ca3af",
                mb: 4,
                maxWidth: "500px",
              }}
            >
              {heroContent.description}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                onClick={handlePrimaryAction}
                variant="contained"
                sx={{
                  bgcolor: "#3ABEF9",
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#2A8EC7" },
                  boxShadow: "0 4px 20px rgba(58, 190, 249, 0.3)",
                }}
              >
                {heroContent.primaryButtonText}
              </Button>

              <Button
                onClick={handleSecondaryAction}
                variant="outlined"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                {heroContent.secondaryButtonText}
              </Button>
            </Box>
          </Box>

          {/* Right Image Section */}
          <HeroImage imageUrl={heroContent.backgroundImage}  />
        </Box>
      </Container>
    </Box>
  );
};
