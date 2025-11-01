// hooks/useBattles.ts
// Custom React hook for battle state management

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { battleService } from "@/services/battle.service";
import { Battle } from "@/types/battle/battle.types";
import { ROUTES } from "@/constant/battle.constants";

interface UseBattlesReturn {
  battles: Battle[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  handleViewBattle: (battleId: string) => void;
  handleViewAllBattles: () => void;
}

export const useBattles = (limit?: number): UseBattlesReturn => {
  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchBattles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await battleService.getTopBattles(limit);
      setBattles(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch battles";
      setError(errorMessage);
      console.error("Error fetching battles:", err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchBattles();
  }, [fetchBattles]);

  const handleViewBattle = useCallback(
    (battleId: string) => {
      router.push(ROUTES.BATTLE_DETAIL(battleId));
    },
    [router]
  );

  const handleViewAllBattles = useCallback(() => {
    router.push(ROUTES.BATTLES);
  }, [router]);

  const refetch = useCallback(async () => {
    await fetchBattles();
  }, [fetchBattles]);

  return {
    battles,
    loading,
    error,
    refetch,
    handleViewBattle,
    handleViewAllBattles,
  };
};