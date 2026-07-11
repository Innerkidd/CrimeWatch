import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface NotificationFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  unreadOnly: boolean;
  onUnreadOnlyChange: (unread: boolean) => void;
  notificationCounts: Record<string, number>;
}

const filters: { key: string; label: string; icon?: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'crime_alert', label: 'Crime Alerts' },
  { key: 'investigation', label: 'Investigations' },
  { key: 'emergency', label: 'Emergency' },
  { key: 'community', label: 'Community' },
  { key: 'system', label: 'System' },
];

const sortOptions = [
  { key: 'latest', label: 'Latest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'priority', label: 'Priority' },
];

export const NotificationFilters = ({
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  unreadOnly,
  onUnreadOnlyChange,
  notificationCounts,
}: NotificationFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2.5 rounded-xl border transition-all ${
            showFilters
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.key} value={opt.key} className="bg-slate-800 text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Pills */}
      <motion.div
        initial={false}
        animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="flex flex-wrap gap-2 pt-2">
          {filters.map((filter) => {
            const count = notificationCounts[filter.key] || 0;
            return (
              <button
                key={filter.key}
                onClick={() => onFilterChange(filter.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeFilter === filter.key
                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {filter.label}
                {count > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-white/10 text-[10px]">
                    {count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Unread Toggle */}
          <button
            onClick={() => onUnreadOnlyChange(!unreadOnly)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              unreadOnly
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            {unreadOnly ? '● Unread Only' : '○ Unread Only'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NotificationFilters;
