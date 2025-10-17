"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { BoxCard } from "./BoxCard";
import { Box as BoxType } from "@/types/featuresbox/box";
import { useFeaturedBoxes } from "@/hooks/featuresbox/usefeaturesbox";
import Image from "next/image";
import featureIcon from "../../../public/image/featureicon.svg";

export const FeaturedBoxes: React.FC = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { boxes, loading, error } = useFeaturedBoxes();

  const handleViewMore = () => {
    router.push("/boxes");
  };

  const handleBoxClick = (box: BoxType) => {
    router.push(`/box/${box.id}`);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
      >
        <CircularProgress sx={{ color: "#3ABEF9" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ mb: 6 }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
             <Image src={featureIcon} alt="Logo"  />
            {/* <Box
              component="svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              sx={{ color: "#3ABEF9" }}
            >
              <path
                d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Box> */}
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            Featured Boxes
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Navigation Arrows - Desktop Only */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center", // 👈 ensures arrows align with button
            }}
          >
            <IconButton
              onClick={() => scroll("left")}
              sx={{
                border: "2px solid #fff",
                color: "#fff",
                width: 36,
                height: 36,
                borderRadius: "2px",
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => scroll("right")}
              sx={{
                border: "2px solid #fff",
                color: "#fff",
                width: 36,
                height: 36,
                borderRadius: "2px",
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          {/* View More Button */}
          <Button
            onClick={handleViewMore}
            sx={{
              color: "#fff",
              border: "2px solid #fff",
              textTransform: "none",
              fontWeight: 600,
              px: { xs: 2, md: 3 },
              py: 1,
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              height: 36, //
              borderRadius: "2px",
            }}
          >
            View More
          </Button>
        </Stack>
      </Stack>

      {/* Desktop Grid - Hidden on Mobile */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Grid container spacing={2}>
          {boxes.map((box) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={box.id}>
              <BoxCard box={box} onClick={handleBoxClick} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Mobile Horizontal Scroll */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: { xs: "flex", md: "none" },
          gap: 2,
          overflowX: "auto",
          pb: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "& > *": {
            flex: "0 0 280px",
            maxWidth: 280,
          },
        }}
      >
        {boxes.map((box) => (
          <BoxCard key={box.id} box={box} onClick={handleBoxClick} />
        ))}
      </Box>
    </Box>
  );
};
