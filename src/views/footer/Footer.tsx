// File: src/components/footer/Footer.tsx

"use client";

import React from "react";
import { Box, Container, Typography, Link, Stack, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { SiDiscord } from "react-icons/si";
import logoImage from "../../../public/image/HOmepagelogo.svg";

const platformLinks = [
  { label: "Mystery Box", href: "/dashboard" },
  { label: "Battles", href: "/battles" },
  { label: "Games", href: "/games" },
  { label: "Leaderboards", href: "/leaderboards" },
  { label: "Rewards", href: "/rewards" },
  { label: "FAQ's", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const supportedGames = [
  "Six Siege",
  "EFT Tarkov",
  "APEX",
  "Warzone",
  "DayZ",
  "GTA 5",
  "Rust",
  "Valorant",
  "EFT Tarkov",
  "Overwatch 2",
  "Warzone",
  "Squad",
  "GTA 5",
  "Valorant",
  "Overwatch 2",
  "Squad",
];

export const Footer: React.FC = () => {
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    router.push(href);
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1a1f2e",
        color: "#fff",
        pt: { xs: 6, md: 8 },
        pb: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Logo and Description */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 2.5 }}
              >
                <Image
                  src={logoImage}
                  alt="Cop Them Logo"
                  width={40}
                  height={40}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "#fff",
                    letterSpacing: "0.5px",
                  }}
                >
                  COP THEM
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  color: "#9ca3af",
                  lineHeight: 1.7,
                  fontSize: "14px",
                  mb: 3,
                }}
              >
                Cop Them is a virtual mystery box platform where users can open
                digital packs containing premium rewards like designer goods,
                luxury watches, high-end cars, and more. With exciting features
                like pack battles and a customizable upgrade system, Cop Them
                delivers a fun and thrilling way to chase exclusive prizes.
              </Typography>

              {/* Social Icons */}
              <Stack direction="row" spacing={1.5}>
                <Box
                  component="a"
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "6px",
                    color: "#9ca3af",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                    },
                  }}
                >
                  <TelegramIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box
                  component="a"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "6px",
                    color: "#9ca3af",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                    },
                  }}
                >
                  <TwitterIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box
                  component="a"
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "6px",
                    color: "#9ca3af",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                    },
                  }}
                >
                  <SiDiscord size={20} />
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Platform Links */}
          <Grid size={{ xs: 12, md: 2.5 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                  mb: 1.5,
                  color: "#fff",
                  pb: 1.5,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                Platform
              </Typography>
              <Stack spacing={2} sx={{ mt: 3 }}>
                {platformLinks.map((link) => (
                  <Link
                    key={link.label}
                    onClick={() => handleLinkClick(link.href)}
                    sx={{
                      color: "#9ca3af",
                      textDecoration: "none",
                      fontSize: "14px",
                      cursor: "pointer",
                      width: "fit-content",
                      "&:hover": {
                        color: "#fff",
                      },
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Supported Games */}
          <Grid size={{ xs: 12, md: 5.5 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                  mb: 1.5,
                  color: "#fff",
                  pb: 1.5,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                Supported Games
              </Typography>
              <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={2}>
                    {supportedGames.slice(0, 8).map((game, index) => (
                      <Typography
                        key={`${game}-${index}`}
                        sx={{
                          color: "#9ca3af",
                          fontSize: "14px",
                        }}
                      >
                        {game}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={2}>
                    {supportedGames.slice(8).map((game, index) => (
                      <Typography
                        key={`${game}-${index + 8}`}
                        sx={{
                          color: "#9ca3af",
                          fontSize: "14px",
                        }}
                      >
                        {game}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* Copyright */}
      <Box
        sx={{
          mt: { xs: 6, md: 8 },
          mx: -3,
          px: 3,
          py: 3,
          bgcolor: "#070A0D",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#6b7280",
            fontSize: "13px",
          }}
        >
          Copyright © by Cop Them
        </Typography>
      </Box>
    </Box>
  );
};
