import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

interface HeroImageProps {
  imageUrl?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ imageUrl }) => {
  return (
    <Box
      sx={{
        position: { xs: "absolute", md: "relative" },
        right: { xs: -50, md: 0 },
        top: { xs: "50%", md: "auto" },
        transform: { xs: "translateY(-50%)", md: "none" },
        opacity: { xs: 0.3, md: 1 },
        width: { xs: "300px", md: "450px" },
        height: { xs: "300px", md: "450px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(58, 190, 249, 0.4) 0%, rgba(58, 190, 249, 0) 70%)",
          filter: "blur(40px)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Mystery Box"
            width={400}
            height={400}
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 20px 60px rgba(58, 190, 249, 0.5))",
            }}
            priority
          />
        ) : (
          <Box
            sx={{
              width: "200px",
              height: "200px",
              background:
                "linear-gradient(135deg, #3ABEF9 0%, #2A8EC7 100%)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "80px",
              boxShadow: "0 20px 60px rgba(58, 190, 249, 0.5)",
              animation: "float 3s ease-in-out infinite",
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-20px)" },
              },
            }}
          >
            🎁
          </Box>
        )}
      </Box>
    </Box>
  );
};