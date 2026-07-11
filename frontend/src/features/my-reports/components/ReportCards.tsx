import { motion } from 'framer-motion';
import { Eye, MapPin, Calendar, User, ChevronRight } from 'lucide-react';
import { type Report, statusConfig, severityConfig, crimeTypeLabels } from '../data/mockData';

interface ReportCardsProps {
  reports: Report[];
  onViewDetails: (id: string) => void;
}

export const ReportCards = ({ reports, onViewDetails }: ReportCardsProps) => {
  return (
    <div className="lg:hidden space-y-3">
      {reports.map((report, i) => {
        const status = statusConfig[report.status];
        const severity = severityConfig[report.severity];

        return (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass rounded-xl p-4 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-semibold text-blue-400">{report.id}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${severity.bg} ${severity.color}`}>
                    {severity.label}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white truncate">{report.title}</h4>
              </div>
              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border flex-shrink-0 ${status.bg} ${status.color}`}>
                {status.label}
              </span>
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-[10px] font-semibold text-slate-500 w-16">Type</span>
                {crimeTypeLabels[report.crimeType]}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span className="truncate">{report.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3 h-3 text-slate-500" />
                {report.dateReported} at {report.timeReported}
              </div>
              {report.assignedOfficer && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <User className="w-3 h-3 text-blue-400" />
                  {report.assignedOfficer}
                </div>
              )}
            </div>

            <button
              onClick={() => onViewDetails(report.id)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              View Details
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ReportCards;
