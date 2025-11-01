export interface DropItem {
  id: string;
  userId: string;
  username: string;
  boxName: string;
  itemName: string;
  itemValue: number;
  itemRarity: 'common' | 'rare' | 'epic' | 'legendary';
  imageUrl: string;
  timestamp: Date;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  highlightText: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImage?: string;
}

export interface LiveDropState {
  drops: DropItem[];
  isConnected: boolean;
  error: string | null;
}

export type TabType = 'chat' | 'live-drop';

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: Date;
}