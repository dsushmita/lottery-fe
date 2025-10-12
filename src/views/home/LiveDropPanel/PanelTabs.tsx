import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { TabType } from "@/types/home/home";

interface PanelTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const PanelTabs: React.FC<PanelTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: TabType) => {
    onTabChange(newValue);
  };

  return (
    <Box
      sx={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        bgcolor: "#141820",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        sx={{
          minHeight: "48px",
          "& .MuiTab-root": {
            color: "#9ca3af",
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "none",
            minHeight: "48px",
            flex: 1,
          },
          "& .Mui-selected": {
            color: "#3ABEF9 !important",
          },
          "& .MuiTabs-indicator": {
            bgcolor: "#3ABEF9",
            height: "2px",
          },
        }}
      >
        <Tab label="Chat" value="chat" />
        <Tab label="Live Drop" value="live-drop" />
      </Tabs>
    </Box>
  );
};