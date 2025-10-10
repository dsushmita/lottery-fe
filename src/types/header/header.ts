import { User } from "../auth/auth";

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
  badge?: number;
  route?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface NotificationResponse {
  success: boolean;
  data: {
    notifications: Notification[];
    unreadCount: number;
  };
}

export interface BalanceResponse {
  success: boolean;
  data: {
    balance: number;
  };
}

export interface HeaderProps {
  activeTab?: string;
  user?: User;
}