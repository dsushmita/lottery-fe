import { rewardsService } from '@/services/rewards.service';
import { Reward, RewardStatus, UseRewardsReturn } from '@/types/rewards/rewards.types';
import { useState, useEffect, useCallback } from 'react';

export const useRewards = (): UseRewardsReturn => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRewards = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await rewardsService.getRewards();
      setRewards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const claimReward = useCallback(async (rewardId: string) => {
    try {
      setError(null);
      
      setRewards((prev) =>
        prev.map((reward) =>
          reward.id === rewardId
            ? { ...reward, status: RewardStatus.CLAIMED, claimedAt: new Date() }
            : reward
        )
      );

      const response = await rewardsService.claimReward(rewardId);

      if (!response.success) {
        setRewards((prev) =>
          prev.map((reward) =>
            reward.id === rewardId
              ? { ...reward, status: RewardStatus.AVAILABLE, claimedAt: undefined }
              : reward
          )
        );
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to claim reward');
      
      setRewards((prev) =>
        prev.map((reward) =>
          reward.id === rewardId
            ? { ...reward, status: RewardStatus.AVAILABLE, claimedAt: undefined }
            : reward
        )
      );
      
      throw err;
    }
  }, []);

  const refreshRewards = useCallback(async () => {
    await fetchRewards();
  }, [fetchRewards]);

  useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);

  return {
    rewards,
    isLoading,
    error,
    claimReward,
    refreshRewards,
  };
};