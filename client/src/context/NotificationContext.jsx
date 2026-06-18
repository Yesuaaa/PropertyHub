import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import * as notificationService from '../services/notificationService';
import { useAuth } from './AuthContext';

const NotificationContext = createContext(null);

// Poll interval for new notifications while the user is signed in.
const POLL_INTERVAL = 30000;

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toasts, setToasts] = useState([]);

  const refresh = useCallback(async () => {
    try {
      const [listRes, countRes] = await Promise.all([
        notificationService.getNotifications(),
        notificationService.getUnreadCount(),
      ]);
      const list = listRes.data.notifications || [];
      const count = countRes.data.count || 0;

      setNotifications(list);
      setUnreadCount(count);
    } catch {
      // Likely unauthenticated or transient — fail silently.
    }
  }, []);

  // Poll notifications only while a user is signed in. When there is no user
  // the bell isn't rendered, so we don't need to clear stale state here — the
  // next login runs refresh() and replaces whatever was cached.
  useEffect(() => {
    if (!user) return;
    // refresh() is async — its setState calls happen after `await`, so this is
    // safe. The rule can't see across the await boundary, hence the disable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    const interval = setInterval(refresh, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [user, refresh]);

  const markAsRead = useCallback(
    async (id) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
      try {
        await notificationService.markAsRead(id);
      } catch {
        await refresh();
      }
    },
    [refresh]
  );

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
    try {
      await notificationService.markAllAsRead();
    } catch {
      await refresh();
    }
  }, [refresh]);

  const removeNotification = useCallback(
    async (id) => {
      const target = notifications.find((n) => n.id === id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (target && !target.is_read) {
        setUnreadCount((c) => Math.max(0, c - 1));
      }
      try {
        await notificationService.deleteNotification(id);
      } catch {
        await refresh();
      }
    },
    [notifications, refresh]
  );

  // ── Toasts ──────────────────────────────────────────────────────────
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, type = 'info', duration = 4000) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration > 0) {
        setTimeout(() => dismissToast(id), duration);
      }
      return id;
    },
    [dismissToast]
  );

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      refresh,
      markAsRead,
      markAllAsRead,
      removeNotification,
      toasts,
      toast,
      dismissToast,
    }),
    [notifications, unreadCount, refresh, markAsRead, markAllAsRead, removeNotification, toasts, toast, dismissToast]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return ctx;
}

export default NotificationContext;
