export interface BattleParticipant {
  id: string;
  name: string;
  avatar: string;
}

export interface BattleBox {
  id: string;
  image: string;
  name: string;
  color: string; // For gradient backgrounds
}

export enum BattleStatus {
  ACTIVE = "active",
  FINISHED = "finished",
}

export enum BattleMode {
  NORMAL = "Normal Mode",
  CRAZY = "Crazy Mode",
  TEAM = "Team Mode",
}

export interface Battle {
  id: string;
  mode: BattleMode;
  participants: BattleParticipant[];
  boxes: BattleBox[];
  currentBoxes: number;
  totalBoxes: number;
  battleCost: number;
  unboxedValue: number;
  status: BattleStatus;
  createdAt: Date;
}

export interface TopBattlesProps {
  limit?: number;
  showViewAllButton?: boolean;
}

export interface BattleCardProps {
  battle: Battle;
  onViewBattle?: (battleId: string) => void;
}