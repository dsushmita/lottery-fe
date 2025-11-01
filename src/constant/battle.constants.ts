import { BattleMode } from "@/types/battle/battle.types";

export const BATTLE_CONSTANTS = {
  DEFAULT_LIMIT: 4,
  MAX_VISIBLE_PARTICIPANTS: 6,
} as const;

export const BATTLE_MODE_CONFIG = {
  [BattleMode.NORMAL]: {
    label: "Normal Mode",
    color: "#3ABEF9",
  },
  [BattleMode.CRAZY]: {
    label: "Crazy Mode",
    color: "#FF6B6B",
  },
  [BattleMode.TEAM]: {
    label: "Team Mode",
    color: "#51CF66",
  },
} as const;

// Box gradient colors matching Figma design
export const BOX_GRADIENTS = [
  "linear-gradient(135deg, #FF6B9D 0%, #C06C84 100%)", // Pink
  "linear-gradient(135deg, #FEC163 0%, #DE4313 100%)", // Orange
  "linear-gradient(135deg, #FA709A 0%, #FEE140 100%)", // Pink-Yellow
  "linear-gradient(135deg, #30CFD0 0%, #330867 100%)", // Cyan-Purple
  "linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)", // Mint-Pink
  "linear-gradient(135deg, #FFD89B 0%, #19547B 100%)", // Gold-Blue
] as const;

export const ROUTES = {
  BATTLES: "/battles",
  BATTLE_DETAIL: (id: string) => `/battles/${id}`,
} as const;