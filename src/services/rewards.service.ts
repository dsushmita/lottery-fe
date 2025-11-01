import { Reward, RewardClaimResponse, RewardStatus, RewardType } from "@/types/rewards/rewards.types";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Inline SVG data URIs - No external requests, no 404 errors
const GIFT_BOX_BLUE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzNiODJmNiIgcng9IjIwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4MCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjoE8L3RleHQ+PC9zdmc+';

const GIFT_BOX_GREEN = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzEwYjk4MSIgcng9IjIwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4MCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKakO+4jzwvdGV4dD48L3N2Zz4=';

const GIFT_BOX_ORANGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1OWUwYiIgcng9IjIwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4MCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkrA8L3RleHQ+PC9zdmc+';

const MOCK_REWARDS: Reward[] = [
  {
    id: '1',
    type: RewardType.DAILY_FREE_CASE,
    title: 'Daily Free Case',
    description: 'Get free credits when you log in & open packs daily.',
    imageUrl: GIFT_BOX_BLUE,
    gradientColors: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    status: RewardStatus.AVAILABLE,
  },
  {
    id: '2',
    type: RewardType.BATTLE_REWARDS,
    title: 'Battle Rewards',
    description: 'Win pack battles to unlock extra multipliers.',
    imageUrl: GIFT_BOX_GREEN,
    gradientColors: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
    status: RewardStatus.AVAILABLE,
  },
  {
    id: '3',
    type: RewardType.DEPOSIT_STREAK,
    title: 'Deposit Streak',
    description: 'Depositing everyday increases your chance of higher rewards',
    imageUrl: GIFT_BOX_ORANGE,
    gradientColors: 'linear-gradient(135deg, #9a3412 0%, #f59e0b 100%)',
    status: RewardStatus.AVAILABLE,
  },
];

class RewardsService {
  async getRewards(): Promise<Reward[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_REWARDS;
    } catch (error) {
      console.error('Error fetching rewards:', error);
      throw new Error('Failed to fetch rewards');
    }
  }

  async claimReward(rewardId: string): Promise<RewardClaimResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const reward = MOCK_REWARDS.find((r) => r.id === rewardId);
      if (!reward) {
        return { success: false, message: 'Reward not found' };
      }

      return {
        success: true,
        message: 'Reward claimed successfully!',
        reward: { credits: 100 },
      };
    } catch (error) {
      console.error('Error claiming reward:', error);
      throw new Error('Failed to claim reward');
    }
  }
}

export const rewardsService = new RewardsService();