import { motion } from 'framer-motion';
import { X, Filter, RotateCcw } from 'lucide-react';
import { crimeTypeLabels, type CrimeType, type Severity, type ReportStatus } from '../data/mockData';

interface FilterState {
  crimeTypes: CrimeType[];
  severities: Severity[];
  statuses: ReportStatus[];
  timeRange: string;
}

interface MapFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose: () => void;
}

const allCrimeTypes = Object.keys(crimeTypeLabels) as CrimeType[];
const allSeverities: Severity[] = ['low', 'medium', 'high'];
const allStatuses: ReportStatus[] = ['reported', 'investigating', 'resolved'];
const timeRanges = ['Last Hour', 'Today', 'This Week', 'This Month'];

const toggleItem = <T extends string>(arr: T[], item: T): T[] =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

export const MapFilters = ({ filters, onChange, onClose }: MapFiltersProps) => {
  const handleReset = () => {
    onChange({ crimeTypes: [], severities: [], statuses: [], timeRange: '' });
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-80 h-full glass-strong flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold text-white">Filters</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors lg:hidden"
          aria-label="Close filters"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Crime Type */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Crime Type</h3>
          <div className="flex flex-wrap gap-2">
            {allCrimeTypes.map((type) => (
              <button
                key={type}
                onClick={() => onChange({ ...filters, crimeTypes: toggleItem(filters.crimeTypes, type) })}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                  filters.crimeTypes.includes(type)
                    ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {crimeTypeLabels[type]}
              </button>
            ))}
          </div>
        </div>

        {/* Severity */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Severity</h3>
          <div className="flex flex-wrap gap-2">
            {allSeverities.map((sev) => (
              <button
                key={sev}
                onClick={() => onChange({ ...filters, severities: toggleItem(filters.severities, sev) })}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-all duration-200 ${
                  filters.severities.includes(sev)
                    ? sev === 'high'
                      ? 'bg-red-500/20 border-red-500/30 text-red-400'
                      : sev === 'medium'
                      ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                      : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Report Status</h3>
          <div className="flex flex-wrap gap-2">
            {allStatuses.map((status) => (
              <button
                key={status}
                onClick={() => onChange({ ...filters, statuses: toggleItem(filters.statuses, status) })}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-all duration-200 ${
                  filters.statuses.includes(status)
                    ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {status === 'investigating' ? 'Under Investigation' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Time Range */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Time Filter</h3>
          <div className="grid grid-cols-2 gap-2">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => onChange({ ...filters, timeRange: filters.timeRange === range ? '' : range })}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
                  filters.timeRange === range
                    ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="px-5 py-4 border-t border-white/5">
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </button>
      </div>
    </motion.div>
  );
};

export default MapFilters;
