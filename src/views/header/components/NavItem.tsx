import React, { memo } from "react";
import { Button } from "@mui/material";
import { Icons } from "@/assets/icons";
import { NavItem as NavItemType } from "@/types/header/header";

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
        background: isActive
          ? "linear-gradient(180deg, #0D1117 0%, #0A1E2E 100%)"
          : "transparent",
        borderBottom: isActive ? "2px solid #3ABEF9" : "2px solid transparent",
        boxShadow: isActive ? "0px 4px 12px rgba(58, 190, 249, 0.3)" : "none",
        color: isActive ? "#FFFFFF" : "#8E9AAB",
        fontSize: "0.875rem",
        fontWeight: 500,
        textTransform: "none",
        transition: "all 0.3s ease",
      }}
    >
      {item.label}
    </Button>
  );
});

NavItem.displayName = "NavItem";
