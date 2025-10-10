import { Icons } from '@/assets/icons';
import { NavItem } from '@/types/header/header';


export const NAVIGATION_CONFIG: NavItem[] = [
  { 
    id: 'mystery-box', 
    label: 'Mystery Box', 
    icon: Icons.MysteryBox,
    route: '/dashboard/mystery-box'
  },
  { 
    id: 'battles', 
    label: 'Battles', 
    icon: Icons.Battles,
    route: '/dashboard/battles'
  },
  { 
    id: 'games', 
    label: 'Games', 
    icon: Icons.Games, 
    hasDropdown: true,
    route: '/dashboard/games'
  },
  { 
    id: 'leaderboards', 
    label: 'Leaderboards', 
    icon: Icons.Leaderboards,
    route: '/dashboard/leaderboards'
  },
  { 
    id: 'rewards', 
    label: 'Rewards', 
    icon: Icons.Rewards,
    route: '/dashboard/rewards'
  },
];