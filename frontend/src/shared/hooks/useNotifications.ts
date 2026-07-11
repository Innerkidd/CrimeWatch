import { useState, useEffect, useCallback } from 'react';
import { notificationsAPI } from '../services/apiEndpoints';
import { onNotification, removeListeners } from '../services/socket';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  reportId?: string;
  isRead: boolean;
  priority: string;
  createdAt: string;
}

export const useNotifications = () => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = useCallback(async (unreadOnly = false) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const params: Record<string, string> = {};
      if (unreadOnly) params.unreadOnly = 'true';
      const res = await notificationsAPI.getAll(params);
      setNotifications(res.data.data);
      setUnreadCount(res.data.unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsAPI.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all:', error);
    }
  }, []);

  // Listen for real-time notifications
  useEffect(() => {
    if (!isAuthenticated) return;

    onNotification((data: unknown) => {
      const notif = data as Notification;
      setNotifications((prev) => [notif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      removeListeners();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
};
