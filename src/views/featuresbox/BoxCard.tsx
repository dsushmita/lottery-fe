"use client";

import React from 'react';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import { Box as BoxType } from '@/types/featuresbox/box';

interface BoxCardProps {
  box: BoxType;
  onClick?: (box: BoxType) => void;
}

export const BoxCard: React.FC<BoxCardProps> = ({ box, onClick }) => {
 

  return (
    <Card
      onClick={() => onClick?.(box)}
      sx={{
        bgcolor: 'rgba(26, 35, 50, 0.6)',
        border: '1px solid rgba(58, 190, 249, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          border: '1px solid rgba(58, 190, 249, 0.5)',
          boxShadow: '0 8px 24px rgba(58, 190, 249, 0.2)',
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Image Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 180, sm: 200, md: 220 },
            background: '#1A1F29',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '80%',
              height: '80%',
              filter: 'drop-shadow(0 4px 12px rgba(58, 190, 249, 0.3))',
            }}
          >
            <Image
              src={box.image}
              alt={box.name}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2, bgcolor: 'rgba(15, 23, 42, 0.8)' }}>
          <Typography
            variant="h6"
            sx={{
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              mb: 1.5,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {box.name}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={0.5}
            sx={{
              py: 1,
              px: 1.5,
              bgcolor: 'rgba(58, 190, 249, 0.1)',
              borderRadius: 1,
              border: '1px solid rgba(58, 190, 249, 0.2)',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: '#8E9AAB', fontSize: '0.85rem' }}
            >
              Open for
            </Typography>
            <Box
              sx={{
                width: 18,
                height: 18,
                bgcolor: '#FFC107',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.7rem',
                color: '#000',
              }}
            >
              $
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: '#3ABEF9',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {box.price.toLocaleString()}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};