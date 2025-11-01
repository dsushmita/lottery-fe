import React from "react";
import Image from "next/image";
import herobanner from "../../../../public/image/herobanner.png";

export const HeroBackground: React.FC = () => {
  return <Image src={herobanner} alt="Hero Background" fill />;
};
