// components/layout/Section.tsx
"use client";

import React from "react";
import { Box, SxProps, Theme } from "@mui/material";


interface SectionProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  id?: string;
  className?: string;
}

/**
 * Section wrapper that gives default 80px vertical spacing (top + bottom).
 * You can override spacing with the `sx` prop.
 */
export const Section: React.FC<SectionProps> = ({ children, sx, id, className }) => {
  return (
    <Box
      id={id}
      className={className}
      sx={{
        pt: "80px",              
        width: "100%",
        boxSizing: "border-box",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Section;
