import React, { memo } from 'react';
import { Box } from '@mui/material';
import { Icons } from '@/assets/icons';

interface LogoProps {
  onClick?: () => void;
}

export const Logo = memo<LogoProps>(({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      width: { xs: 48, md: 64 },
      height: { xs: 48, md: 64 },
      '&:hover': {
        opacity: 0.9,
      },
    }}
  >
    <Icons.Logo className="w-10 h-10 md:w-12 md:h-12" />
  </Box>
));

Logo.displayName = 'Logo';