import { httpClient } from '@/lib/httpClient';
import { BalanceResponse, NotificationResponse } from '@/types/header/header';

class HeaderService {
  // Get notifications
  async getNotifications(): Promise<NotificationResponse> {
    return httpClient.get<NotificationResponse>('/notifications');
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    await httpClient.patch(`/notifications/${notificationId}/read`);
  }

  // Mark all as read
  async markAllAsRead(): Promise<void> {
    await httpClient.patch('/notifications/mark-all-read');
  }

  // Get user balance
  async getUserBalance(): Promise<BalanceResponse> {
    return httpClient.get<BalanceResponse>('/wallet/balance');
  }
}

export const headerService = new HeaderService();