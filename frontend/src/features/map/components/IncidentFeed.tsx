import { motion } from 'framer-motion';
import { Clock, MapPin, ChevronRight, AlertTriangle } from 'lucide-react';
import { type CrimeReport, crimeTypeLabels, severityColors } from '../data/mockData';

interface IncidentFeedProps {
  reports: CrimeReport[];
  onSelect: (report: CrimeReport) => void;
  selectedId: string | null;
}

const statusStyles = {
  reported: 'bg-blue-500/15 text-blue-400',
  investigating: 'bg-amber-500/15 text-amber-400',
  resolved: 'bg-emerald-500/15 text-emerald-400',
};

export const IncidentFeed = ({ reports, onSelect, selectedId }: IncidentFeedProps) => {
  return (
    <div className="h-full flex flex-col glass-strong overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5 flex-shrink-0">
        <h3 className="text-base font-bold text-white">Live Incident Feed</h3>
        <p className="text-xs text-slate-400 mt-0.5">{reports.length} incidents nearby</p>
      </div>

      {/* Feed List */}
      <div className="flex-1 overflow-y-auto">
        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <AlertTriangle className="w-10 h-10 text-slate-600 mb-3" />
            <p className="text-sm text-slate-400">No incidents match your filters</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {reports.map((report, i) => (
              <motion.button
                key={report.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                onClick={() => onSelect(report)}
                className={`w-full text-left px-5 py-3.5 transition-colors hover:bg-white/[0.03] ${
                  selectedId === report.id ? 'bg-blue-500/10 border-l-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Severity Dot */}
                  <div className="mt-1.5 flex-shrink-0">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: severityColors[report.severity] }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {crimeTypeLabels[report.type]}
                      </h4>
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full capitalize flex-shrink-0 ${statusStyles[report.status]}`}
                      >
                        {report.status === 'investigating' ? 'Investigating' : report.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1 mb-1.5">
                      {report.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {report.location.split(',')[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {report.time}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-1" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentFeed;
