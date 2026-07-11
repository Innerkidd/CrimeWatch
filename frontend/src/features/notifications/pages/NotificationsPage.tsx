import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { NotificationFilters } from '../components/NotificationFilters';
import { NotificationCard } from '../components/NotificationCard';
import { EmergencyAlertBanner } from '../components/EmergencyAlertBanner';
import { InvestigationTimeline } from '../components/InvestigationTimeline';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { NotificationActions } from '../components/NotificationActions';
import { EmptyState } from '../components/EmptyState';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ToastContainer, type ToastItem } from '@/shared/components/ui/Toast';
import {
  mockNotifications,
  mockEmergencyAlert,
  mockInvestigationUpdates,
  mockAnnouncements,
  type Notification,
} from '../data/mockData';

const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showInvestigations, setShowInvestigations] = useState(true);
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const addToast = useCallback((type: ToastItem['type'], message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Filter and sort
  const filteredNotifications = useMemo(() => {
    let result = [...notifications];

    // Type filter
    if (activeFilter !== 'all') {
      result = result.filter((n) => n.type === activeFilter);
    }

    // Unread filter
    if (unreadOnly) {
      result = result.filter((n) => !n.isRead);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.location?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime());
    } else if (sortBy === 'priority') {
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    return result;
  }, [notifications, activeFilter, sortBy, searchQuery, unreadOnly]);

  // Counts
  const notificationCounts = useMemo(() => {
    const counts: Record<string, number> = { all: notifications.length };
    notifications.forEach((n) => {
      counts[n.type] = (counts[n.type] || 0) + 1;
    });
    return counts;
  }, [notifications]);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

  // Handlers
  const handleMarkRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('success', 'ALL CHANNELS SYNCHRONIZED AS READ.');
  }, [addToast]);

  const handleClearAll = useCallback(() => {
    setNotifications([]);
    addToast('success', 'ALL SIGNAL NOTIFICATIONS PURGED.');
  }, [addToast]);

  const handleSettings = useCallback(() => {
    addToast('warning', 'NOTIFICATION PREFS COMING SOON.');
  }, [addToast]);

  return (
    <div className="space-y-6 font-tech text-xs uppercase text-left">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3 font-orbitron tracking-wider">
            <Bell className="w-7 h-7 text-cyber-cyan glow-cyan animate-pulse" />
            EMERGENCY_BROADCAST_RECEIVER
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            // Active threat telemetry alerts and dispatch updates.
          </p>
        </div>

        {/* Live Status Indicator */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-none bg-cyber-green/10 border border-cyber-green/30 self-start text-cyber-green glow-green"
        >
          <Zap className="w-3.5 h-3.5 text-cyber-green" />
          <span className="font-bold tracking-wider">FEED_ACTIVE_SYNC</span>
        </motion.div>
      </motion.div>

      {/* Emergency Alert Banner */}
      <AnimatePresence>
        {mockEmergencyAlert && <EmergencyAlertBanner alert={mockEmergencyAlert} />}
      </AnimatePresence>

      {/* Filters and Actions */}
      <div className="space-y-3">
        <NotificationFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          unreadOnly={unreadOnly}
          onUnreadOnlyChange={setUnreadOnly}
          notificationCounts={notificationCounts}
        />

        <NotificationActions
          unreadCount={unreadCount}
          onMarkAllRead={handleMarkAllRead}
          onClearAll={handleClearAll}
          onSettings={handleSettings}
        />
      </div>

      {/* Main Content */}
      {isLoading ? (
        <LoadingSkeleton count={6} />
      ) : filteredNotifications.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification, i) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              index={i}
              onMarkRead={handleMarkRead}
              onSelect={handleSelect}
              isSelected={selectedIds.has(notification.id)}
            />
          ))}
        </div>
      )}

      {/* Investigation Updates Section */}
      <div className="hud-panel relative transition-all border border-cyber-cyan/15 bg-cyber-void/80 p-4">
        {/* HUD Brackets Corners */}
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />

        <button
          onClick={() => setShowInvestigations(!showInvestigations)}
          className="w-full flex items-center justify-between p-1 hover:bg-cyber-cyan/5 transition-colors font-orbitron font-bold tracking-wider text-cyber-cyan glow-cyan cursor-pointer uppercase"
        >
          <span>
            INVESTIGATION_UPDATES_LOG ({mockInvestigationUpdates.length})
          </span>
          {showInvestigations ? (
            <ChevronUp className="w-4 h-4 text-cyber-cyan" />
          ) : (
            <ChevronDown className="w-4 h-4 text-cyber-cyan" />
          )}
        </button>
        <AnimatePresence>
          {showInvestigations && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <InvestigationTimeline updates={mockInvestigationUpdates} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Community Announcements Section */}
      <div className="hud-panel relative transition-all border border-cyber-cyan/15 bg-cyber-void/80 p-4">
        {/* HUD Brackets Corners */}
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />

        <button
          onClick={() => setShowAnnouncements(!showAnnouncements)}
          className="w-full flex items-center justify-between p-1 hover:bg-cyber-cyan/5 transition-colors font-orbitron font-bold tracking-wider text-cyber-cyan glow-cyan cursor-pointer uppercase"
        >
          <span>
            COMMUNITY_BROADCAST_INDEX ({mockAnnouncements.length})
          </span>
          {showAnnouncements ? (
            <ChevronUp className="w-4 h-4 text-cyber-cyan" />
          ) : (
            <ChevronDown className="w-4 h-4 text-cyber-cyan" />
          )}
        </button>
        <AnimatePresence>
          {showAnnouncements && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {mockAnnouncements.map((announcement, i) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationsPage;
