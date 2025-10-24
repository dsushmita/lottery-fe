import { BOX_GRADIENTS } from "@/constant/battle.constants";
import { Battle, BattleMode, BattleStatus } from "@/types/battle/battle.types";


// Generate mock participants
const generateParticipants = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `participant-${i + 1}`,
    name: `Player${i + 1}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=player${i + 1}`,
  }));
};

// Generate mock boxes
const generateBoxes = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `box-${i + 1}`,
    image: `/images/box-${i + 1}.png`,
    name: `Mystery Box ${i + 1}`,
    color: BOX_GRADIENTS[i % BOX_GRADIENTS.length],
  }));
};

// Mock battle data matching Figma design
const MOCK_BATTLES: Battle[] = [
  {
    id: "battle-1",
    mode: BattleMode.NORMAL,
    participants: generateParticipants(6),
    boxes: generateBoxes(3),
    currentBoxes: 3,
    totalBoxes: 15,
    battleCost: 1400,
    unboxedValue: 1400,
    status: BattleStatus.ACTIVE,
    createdAt: new Date(),
  },
  {
    id: "battle-2",
    mode: BattleMode.NORMAL,
    participants: generateParticipants(6),
    boxes: generateBoxes(2),
    currentBoxes: 2,
    totalBoxes: 15,
    battleCost: 1400,
    unboxedValue: 1400,
    status: BattleStatus.FINISHED,
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "battle-3",
    mode: BattleMode.NORMAL,
    participants: generateParticipants(6),
    boxes: generateBoxes(2),
    currentBoxes: 2,
    totalBoxes: 15,
    battleCost: 1400,
    unboxedValue: 1400,
    status: BattleStatus.FINISHED,
    createdAt: new Date(Date.now() - 7200000),
  },
  {
    id: "battle-4",
    mode: BattleMode.NORMAL,
    participants: generateParticipants(6),
    boxes: generateBoxes(4),
    currentBoxes: 4,
    totalBoxes: 15,
    battleCost: 1400,
    unboxedValue: 1400,
    status: BattleStatus.ACTIVE,
    createdAt: new Date(Date.now() - 1800000),
  },
];

class BattleService {
  /**
   * Fetch top battles
   * Replace with real API: await fetch('/api/battles/top?limit=${limit}')
   */
  async getTopBattles(limit: number = 4): Promise<Battle[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/battles/top?limit=${limit}`);
      // if (!response.ok) throw new Error('Failed to fetch battles');
      // return await response.json();

      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(MOCK_BATTLES.slice(0, limit));
        }, 800);
      });
    } catch (error) {
      console.error("Error fetching top battles:", error);
      throw error;
    }
  }

  /**
   * Fetch battle by ID
   */
  async getBattleById(id: string): Promise<Battle | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/battles/${id}`);
      // if (!response.ok) throw new Error('Battle not found');
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          const battle = MOCK_BATTLES.find((b) => b.id === id);
          resolve(battle || null);
        }, 500);
      });
    } catch (error) {
      console.error("Error fetching battle:", error);
      throw error;
    }
  }

  /**
   * Join a battle
   */
  async joinBattle(battleId: string): Promise<boolean> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/battles/${battleId}/join`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // return response.ok;

      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Joining battle: ${battleId}`);
          resolve(true);
        }, 500);
      });
    } catch (error) {
      console.error("Error joining battle:", error);
      throw error;
    }
  }
}

export const battleService = new BattleService();