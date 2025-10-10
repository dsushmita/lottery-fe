import { useState, useEffect, useCallback } from 'react';
import { headerService } from '@/services/headerService';
import { showError } from '@/utils/toast';
import { Notification } from '@/types/header/header';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    // try {
    //   setLoading(true);
    //   const response = await headerService.getNotifications();
    //   if (response.success) {
    //     setNotifications(response.data.notifications);
    //     setUnreadCount(response.data.unreadCount);
    //   }
    // } catch (error) {
    //   showError('Failed to load notifications');
    // } finally {
    //   setLoading(false);
    // }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await headerService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      showError('Failed to mark as read');
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    refetch: fetchNotifications,
  };
};