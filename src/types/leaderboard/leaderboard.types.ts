export interface LeaderboardPlayer {
  id: string;
  rank: number;
  playerName: string;
  playerAvatar: string;
  points: number;
  amount: number;
  prize: Prize;
}

export interface Prize {
  name: string;
  icon: string;
  type: 'vehicle' | 'watch' | 'bag' | 'electronics' | 'other';
}

export interface LeaderboardResponse {
  players: LeaderboardPlayer[];
  totalPlayers: number;
  lastUpdated: Date;
}

export interface UseLeaderboardReturn {
  players: LeaderboardPlayer[];
  isLoading: boolean;
  error: string | null;
  refreshLeaderboard: () => Promise<void>;
}