import { LeaderboardPlayer, LeaderboardResponse } from "@/types/leaderboard/leaderboard.types";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const MOCK_LEADERBOARD: LeaderboardPlayer[] = [
  {
    id: '1',
    rank: 1,
    playerName: 'Annette Black',
    playerAvatar: 'https://i.pravatar.cc/150?img=1',
    points: 100,
    amount: 1400,
    prize: { name: 'Ferrari', icon: '🏎️', type: 'vehicle' },
  },
  {
    id: '2',
    rank: 2,
    playerName: 'Esther Howard',
    playerAvatar: 'https://i.pravatar.cc/150?img=2',
    points: 100,
    amount: 1400,
    prize: { name: 'Luxury Watch', icon: '⌚', type: 'watch' },
  },
  {
    id: '3',
    rank: 3,
    playerName: 'Brooklyn Simmons',
    playerAvatar: 'https://i.pravatar.cc/150?img=3',
    points: 100,
    amount: 1400,
    prize: { name: 'Luxury Watch', icon: '⌚', type: 'watch' },
  },
  {
    id: '4',
    rank: 4,
    playerName: 'Jenny Wilson',
    playerAvatar: 'https://i.pravatar.cc/150?img=4',
    points: 100,
    amount: 1400,
    prize: { name: 'Gucci Bags', icon: '👜', type: 'bag' },
  },
  {
    id: '5',
    rank: 4,
    playerName: 'Jane Cooper',
    playerAvatar: 'https://i.pravatar.cc/150?img=5',
    points: 100,
    amount: 1400,
    prize: { name: 'Gucci Bags', icon: '👜', type: 'bag' },
  },
  {
    id: '6',
    rank: 6,
    playerName: 'Jacob Jones',
    playerAvatar: 'https://i.pravatar.cc/150?img=6',
    points: 100,
    amount: 1400,
    prize: { name: 'Ferrari', icon: '🏎️', type: 'vehicle' },
  },
  {
    id: '7',
    rank: 7,
    playerName: 'Savannah Nguyen',
    playerAvatar: 'https://i.pravatar.cc/150?img=7',
    points: 100,
    amount: 1400,
    prize: { name: 'Luxury Watch', icon: '⌚', type: 'watch' },
  },
  {
    id: '8',
    rank: 8,
    playerName: 'Ralph Edwards',
    playerAvatar: 'https://i.pravatar.cc/150?img=8',
    points: 100,
    amount: 1400,
    prize: { name: 'iPhone 16', icon: '📱', type: 'electronics' },
  },
  {
    id: '9',
    rank: 9,
    playerName: 'Cody Fisher',
    playerAvatar: 'https://i.pravatar.cc/150?img=9',
    points: 100,
    amount: 1400,
    prize: { name: 'iPhone 16', icon: '📱', type: 'electronics' },
  },
  {
    id: '10',
    rank: 10,
    playerName: 'Devon Lane',
    playerAvatar: 'https://i.pravatar.cc/150?img=10',
    points: 100,
    amount: 1400,
    prize: { name: 'Ferrari', icon: '🏎️', type: 'vehicle' },
  },
];

class LeaderboardService {
  async getLeaderboard(limit?: number): Promise<LeaderboardResponse> {
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const players = limit ? MOCK_LEADERBOARD.slice(0, limit) : MOCK_LEADERBOARD;
      return {
        players,
        totalPlayers: MOCK_LEADERBOARD.length,
        lastUpdated: new Date(),
      };
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw new Error('Failed to fetch leaderboard');
    }
  }
}

export const leaderboardService = new LeaderboardService();