import React, { memo } from 'react';
import { Button } from '@mui/material';
import { Icons } from '@/assets/icons';
import { NavItem as NavItemType } from '@/types/header/header';

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: () => void;
}

export const NavItem = memo<NavItemProps>(({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <Button
      onClick={onClick}
      startIcon={Icon && <Icon className="w-4 h-4" />}
      endIcon={item.hasDropdown && <Icons.ChevronDown className="w-3 h-3" />}
      sx={{
        px: 2,
        py: 1,
        minHeight: 64,
        borderRadius: 0,
        bgcolor: isActive ? '#2F80ED' : 'transparent',
        color: isActive ? '#FFFFFF' : '#8E9AAB',
        fontSize: '0.875rem',
        fontWeight: 500,
        textTransform: 'none',
        '&:hover': {
          bgcolor: isActive ? '#2F80ED' : 'rgba(255, 255, 255, 0.05)',
          color: '#FFFFFF',
        },
      }}
    >
      {item.label}
    </Button>
  );
});

NavItem.displayName = 'NavItem';