"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Typography,
  Stack,
  Badge,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logoImage from "../../../public/image/HOmepagelogo.svg";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/hooks/header/useNotifications";
import { useHeader } from "@/hooks/header/useHeader";
import { NAVIGATION_CONFIG } from "@/components/header/Constants";
import { BalanceBadge } from "./components/BalanceBadge";
import { MobileDrawer } from "./components/MobileDrawer";
import { NavItem } from "./components/NavItem";
import { Logo } from "@/assets/icons";
import Image from "next/image";

export type HeaderProps = {
  activeTab?: string;
};

const VerticalDivider = () => (
  <Divider
    orientation="vertical"
    flexItem
    sx={{
      height: "24px",
      bgcolor: "rgba(255, 255, 255, 0.1)",
      width: "1px",
      mx: 1,
    }}
  />
);

export const Header: React.FC<HeaderProps> = ({
  activeTab = "mystery-box",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { user } = useAuth();

  const { mobileDrawerOpen, toggleDrawer, closeDrawer, navigateToTab } =
    useHeader();
  const { unreadCount } = useNotifications();

  const handleLogoClick = () => {
    router.push("/dashboard");
    closeDrawer();
  };

  const handleBalanceClick = () => {
    router.push("/wallet");
    closeDrawer();
  };

  const handleAddFunds = () => {
    router.push("/wallet/deposit");
    closeDrawer();
  };

  const handleCartClick = () => {
    router.push("/cart");
    closeDrawer();
  };

  const handleNotificationsClick = () => {
    router.push("/notifications");
  };

  const handleChatClick = () => {
    router.push("/chat");
  };

  const handleProfileClick = () => {
    router.push("/profile");
    closeDrawer();
  };

  if (!user) return null;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#1a2332",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 64 },
            px: { xs: 2, md: 3 },
            maxWidth: "1920px",
            mx: "auto",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              mr: 3,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleLogoClick}
          >
            <Image
              src={logoImage}
              alt="Logo"
              width={36}
              height={36}
              style={{ display: "block" }}
            />
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              flex: 1,
            }}
          >
            {NAVIGATION_CONFIG.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => navigateToTab(item.id)}
              />
            ))}
          </Box>

          {/* Spacer for mobile */}
          <Box sx={{ flex: 1, display: { xs: "block", md: "none" } }} />

          {/* Right Actions */}
          <Stack
            direction="row"
            spacing={{ xs: 1, md: 1.5 }}
            alignItems="center"
          >
            {/* Balance */}
            <BalanceBadge balance={0} onClick={handleBalanceClick} />
            <VerticalDivider />

            {/* Add Funds */}
            <IconButton
              onClick={handleAddFunds}
              sx={{
                width: { xs: 32, md: 36 },
                height: { xs: 32, md: 36 },
                bgcolor: "#3ABEF9",
                color: "#FFFFFF",
                "&:hover": { bgcolor: "#2A8EC7" },
              }}
              aria-label="Add funds"
            >
              <AddIcon fontSize="small" />
            </IconButton>

            {/* Cart - Desktop only */}
            <IconButton
              onClick={handleCartClick}
              sx={{
                display: { xs: "none", md: "flex" },
                color: "#8E9AAB",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  color: "#FFFFFF",
                },
              }}
              aria-label="Cart"
            >
              <ShoppingCartOutlinedIcon />
            </IconButton>

            {/* Notifications */}
            <IconButton
              onClick={handleNotificationsClick}
              sx={{
                color: "#8E9AAB",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  color: "#FFFFFF",
                },
              }}
              aria-label="Notifications"
            >
              <Badge
                badgeContent={unreadCount}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: "#3ABEF9",
                  },
                }}
              >
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>

            {/* Chat - Mobile only */}
            <IconButton
              onClick={handleChatClick}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#8E9AAB",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  color: "#FFFFFF",
                },
              }}
              aria-label="Chat"
            >
              <ChatBubbleOutlineIcon />
            </IconButton>

            {/* User Profile - Desktop only */}
            <Box
              onClick={handleProfileClick}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
                px: 1,
                py: 0.5,
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <Avatar
                src={
                  user.avatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                    user.name ?? "user",
                  )}`
                }
                alt={user.name ?? "User"}
                sx={{ width: 36, height: 36 }}
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#FFFFFF" }}
              >
                {user.name}
              </Typography>
              <ExpandMoreIcon fontSize="small" sx={{ color: "#8E9AAB" }} />
            </Box>

            {/* Mobile Menu Toggle */}
            <IconButton
              onClick={toggleDrawer}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#8E9AAB",
              }}
              aria-label={mobileDrawerOpen ? "Close menu" : "Open menu"}
            >
              {mobileDrawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileDrawerOpen}
        onClose={closeDrawer}
        activeTab={activeTab}
        user={user}
        onTabChange={navigateToTab}
        onProfileClick={handleProfileClick}
      />
    </>
  );
};
