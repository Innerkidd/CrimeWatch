import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, Calendar } from 'lucide-react';
import { type ReportStatus, type CrimeType, type Severity, statusConfig, crimeTypeLabels, severityConfig } from '../data/mockData';

interface ReportFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: ReportStatus | 'all';
  onStatusChange: (s: ReportStatus | 'all') => void;
  crimeFilter: CrimeType | 'all';
  onCrimeChange: (c: CrimeType | 'all') => void;
  severityFilter: Severity | 'all';
  onSeverityChange: (s: Severity | 'all') => void;
  sortBy: string;
  onSortChange: (s: string) => void;
  dateFrom: string;
  onDateFromChange: (d: string) => void;
  dateTo: string;
  onDateToChange: (d: string) => void;
}

export const ReportFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  crimeFilter,
  onCrimeChange,
  severityFilter,
  onSeverityChange,
  sortBy,
  onSortChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
}: ReportFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters = statusFilter !== 'all' || crimeFilter !== 'all' || severityFilter !== 'all' || dateFrom || dateTo;

  const clearFilters = () => {
    onStatusChange('all');
    onCrimeChange('all');
    onSeverityChange('all');
    onDateFromChange('');
    onDateToChange('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Main row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Report ID, crime type, or location..."
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

        {/* Filter toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
            showAdvanced || hasActiveFilters
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">
              !
            </span>
          )}
        </button>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
        >
          <option value="latest" className="bg-slate-800">Latest First</option>
          <option value="oldest" className="bg-slate-800">Oldest First</option>
          <option value="status" className="bg-slate-800">By Status</option>
          <option value="severity" className="bg-slate-800">By Severity</option>
        </select>
      </div>

      {/* Advanced filters */}
      <motion.div
        initial={false}
        animate={{ height: showAdvanced ? 'auto' : 0, opacity: showAdvanced ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="glass rounded-xl p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Status */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value as ReportStatus | 'all')}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-slate-800">All Statuses</option>
                {Object.entries(statusConfig).map(([key, cfg]) => (
                  <option key={key} value={key} className="bg-slate-800">{cfg.label}</option>
                ))}
              </select>
            </div>

            {/* Crime Type */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Crime Type</label>
              <select
                value={crimeFilter}
                onChange={(e) => onCrimeChange(e.target.value as CrimeType | 'all')}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-slate-800">All Types</option>
                {Object.entries(crimeTypeLabels).map(([key, label]) => (
                  <option key={key} value={key} className="bg-slate-800">{label}</option>
                ))}
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Severity</label>
              <select
                value={severityFilter}
                onChange={(e) => onSeverityChange(e.target.value as Severity | 'all')}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-slate-800">All Severities</option>
                {Object.entries(severityConfig).map(([key, cfg]) => (
                  <option key={key} value={key} className="bg-slate-800">{cfg.label}</option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Date Range</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => onDateFromChange(e.target.value)}
                    className="w-full pl-7 pr-2 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <span className="text-slate-600 text-xs">to</span>
                <div className="relative flex-1">
                  <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => onDateToChange(e.target.value)}
                    className="w-full pl-7 pr-2 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReportFilters;
