'use client';

import React, { memo, useCallback } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icons } from '@/assets/icons';
import { User } from '@/types/auth/auth';
import { BalanceBadge } from './BalanceBadge';
import { NAVIGATION_CONFIG } from '@/components/header/Constants';


interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  activeTab: string;
  user: User;
  onTabChange: (tabId: string) => void;
  onProfileClick: () => void;
}

export const MobileDrawer = memo<MobileDrawerProps>(({ 
  open, 
  onClose, 
  activeTab, 
  user,
  onTabChange,
  onProfileClick 
}) => {
  const handleItemClick = useCallback((tabId: string) => {
    onTabChange(tabId);
    onClose();
  }, [onTabChange, onClose]);

  const handleBalanceClick = useCallback(() => { }, []);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          bgcolor: '#1A1F29',
          color: '#FFFFFF',
        },
      }}
    >
      {/* Drawer Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #3ABEF9, #2F80ED)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icons.MysteryBox className="w-5 h-5" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            COP THEM
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: '#8E9AAB' }}>
          <Icons.Close className="w-6 h-6" />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* User Profile */}
      <Box sx={{ p: 2 }}>
        <Box
          onClick={onProfileClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: '#0B0F14',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          <Avatar
            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
            alt={user.name}
            sx={{ width: 48, height: 48 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8E9AAB' }}>
              {user.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Balance */}
      <Box sx={{ px: 2, pb: 2 }}>
        <BalanceBadge balance={1 || 0} onClick={handleBalanceClick} />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Navigation */}
      <List sx={{ px: 1, py: 2 }}>
        {NAVIGATION_CONFIG.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item.id)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  bgcolor: isActive ? '#2F80ED' : 'transparent',
                  '&:hover': {
                    bgcolor: isActive ? '#2F80ED' : 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: isActive ? '#FFFFFF' : '#8E9AAB' }}>
                  {Icon && <Icon className="w-5 h-5" />}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#FFFFFF' : '#8E9AAB',
                  }}
                />
                {item.hasDropdown && <Icons.ChevronDown className="w-4 h-4" />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
});

MobileDrawer.displayName = 'MobileDrawer';