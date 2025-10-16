"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { BoxCard } from './BoxCard';
import { Box as BoxType } from '@/types/featuresbox/box';
import { useFeaturedBoxes } from '@/hooks/featuresbox/usefeaturesbox';

export const FeaturedBoxes: React.FC = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { boxes, loading, error } = useFeaturedBoxes();

  const handleViewMore = () => {
    router.push('/boxes');
  };

  const handleBoxClick = (box: BoxType) => {
    router.push(`/box/${box.id}`);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 300,
        }}
      >
        <CircularProgress sx={{ color: '#3ABEF9' }} />
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
              width: 40,
              height: 40,
              bgcolor: 'rgba(58, 190, 249, 0.1)',
              border: '1px solid rgba(58, 190, 249, 0.3)',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              sx={{ color: '#3ABEF9' }}
            >
              <path
                d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Box>
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
            }}
          >
            Featured Boxes
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          {/* Navigation Arrows - Desktop Only */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <IconButton
              onClick={() => scroll('left')}
              sx={{
                bgcolor: 'rgba(58, 190, 249, 0.1)',
                border: '1px solid rgba(58, 190, 249, 0.3)',
                color: '#3ABEF9',
                width: 36,
                height: 36,
                '&:hover': {
                  bgcolor: 'rgba(58, 190, 249, 0.2)',
                  border: '1px solid rgba(58, 190, 249, 0.5)',
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => scroll('right')}
              sx={{
                bgcolor: 'rgba(58, 190, 249, 0.1)',
                border: '1px solid rgba(58, 190, 249, 0.3)',
                color: '#3ABEF9',
                width: 36,
                height: 36,
                '&:hover': {
                  bgcolor: 'rgba(58, 190, 249, 0.2)',
                  border: '1px solid rgba(58, 190, 249, 0.5)',
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          {/* View More Button */}
          <Button
            onClick={handleViewMore}
            variant="contained"
            sx={{
              bgcolor: 'rgba(58, 190, 249, 0.1)',
              border: '1px solid rgba(58, 190, 249, 0.3)',
              color: '#3ABEF9',
              textTransform: 'none',
              fontWeight: 600,
              px: { xs: 2, md: 3 },
              py: 1,
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              '&:hover': {
                bgcolor: 'rgba(58, 190, 249, 0.2)',
                border: '1px solid rgba(58, 190, 249, 0.5)',
              },
            }}
          >
            View More
          </Button>
        </Stack>
      </Stack>

      {/* Desktop Grid - Hidden on Mobile */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
          display: { xs: 'flex', md: 'none' },
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '& > *': {
            flex: '0 0 280px',
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