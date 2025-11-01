export enum RewardType {
  DAILY_FREE_CASE = 'daily_free_case',
  BATTLE_REWARDS = 'battle_rewards',
  DEPOSIT_STREAK = 'deposit_streak',
}

export enum RewardStatus {
  AVAILABLE = 'available',
  CLAIMED = 'claimed',
  LOCKED = 'locked',
}

export interface Reward {
  id: string;
  type: RewardType;
  title: string;
  description: string;
  imageUrl: string;
  gradientColors: string;
  status: RewardStatus;
  claimedAt?: Date;
}

export interface RewardClaimResponse {
  success: boolean;
  message: string;
  reward?: {
    credits?: number;
    multipliers?: number;
    items?: string[];
  };
}

export interface UseRewardsReturn {
  rewards: Reward[];
  isLoading: boolean;
  error: string | null;
  claimReward: (rewardId: string) => Promise<void>;
  refreshRewards: () => Promise<void>;
}