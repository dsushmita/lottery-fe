"use client";
import React from "react";
import { Box, SxProps } from "@mui/material";
import Image from "next/image";
import logoImage from "../../../../public/image/newf.png";

interface HeroImageProps {
  imageUrl?: string;
  sx?: SxProps; 
}

export const HeroImage: React.FC<HeroImageProps> = ({ imageUrl, sx }) => {
  return (
    <Box sx={{ display: "block", ...sx }}> 
      {imageUrl ? (
        <Box sx={{ mb: 4 }}> 
          <Image src={imageUrl} alt="Mystery Box" width={500} height={500} />
        </Box>
      ) : (
        <Box sx={{ mb: 4 }}>
          <Image src={logoImage} alt="Logo" width={500} height={500} />
        </Box>
      )}
    </Box>
  );
};
