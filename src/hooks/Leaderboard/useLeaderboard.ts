import { leaderboardService } from '@/services/leaderboard.service';
import { LeaderboardPlayer, UseLeaderboardReturn } from '@/types/leaderboard/leaderboard.types';
import { useState, useEffect, useCallback } from 'react';



export const useLeaderboard = (limit?: number): UseLeaderboardReturn => {
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await leaderboardService.getLeaderboard(limit);
      setPlayers(data.players);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  const refreshLeaderboard = useCallback(async () => {
    await fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return {
    players,
    isLoading,
    error,
    refreshLeaderboard,
  };
};