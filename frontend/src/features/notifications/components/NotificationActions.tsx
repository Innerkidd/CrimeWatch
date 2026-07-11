import { motion } from 'framer-motion';
import { CheckCheck, Settings, BellOff } from 'lucide-react';

interface NotificationActionsProps {
  unreadCount: number;
  onMarkAllRead: () => void;
  onClearAll: () => void;
  onSettings: () => void;
}

export const NotificationActions = ({ unreadCount, onMarkAllRead, onClearAll, onSettings }: NotificationActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-xs text-slate-500 mr-1">
        {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
      </span>

      <button
        onClick={onMarkAllRead}
        disabled={unreadCount === 0}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <CheckCheck className="w-3.5 h-3.5" />
        Mark All Read
      </button>

      <button
        onClick={onClearAll}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.03] border border-white/10 text-slate-400 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/10 transition-all"
      >
        <BellOff className="w-3.5 h-3.5" />
        Clear All
      </button>

      <button
        onClick={onSettings}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
      >
        <Settings className="w-3.5 h-3.5" />
        Settings
      </button>
    </motion.div>
  );
};

export default NotificationActions;
