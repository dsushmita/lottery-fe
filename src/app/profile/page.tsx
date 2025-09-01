'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Grid,
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import PageLayout from '@/components/layouts/PageLayout';


const ProfilePage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = async () => {
    // API call to update user profile
    try {
      // await userService.updateProfile(formData);
      await refreshUser();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  return (
    <Typography variant="body2" color="text.secondary">
      Your account overview
    </Typography>
  );
};

export default ProfilePage;