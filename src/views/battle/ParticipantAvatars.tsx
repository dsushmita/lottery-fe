"use client";

import React from "react";
import { Avatar, Box } from "@mui/material";
import { BattleParticipant } from "@/types/battle/battle.types";
import { BATTLE_CONSTANTS } from "@/constant/battle.constants";


interface ParticipantAvatarsProps {
  participants: BattleParticipant[];
}

export const ParticipantAvatars: React.FC<ParticipantAvatarsProps> = ({
  participants,
}) => {
  const visibleParticipants = participants.slice(
    0,
    BATTLE_CONSTANTS.MAX_VISIBLE_PARTICIPANTS
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 0.5,
        my: 2,
      }}
    >
      {visibleParticipants.map((participant, index) => (
        <Avatar
          key={participant.id}
          src={participant.avatar}
          alt={participant.name}
          sx={{
            width: { xs: 36, md: 40 },
            height: { xs: 36, md: 40 },
            border: "2px solid #1a2332",
            bgcolor: "#2a3749",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
              zIndex: 10,
            },
          }}
        />
      ))}
    </Box>
  );
};