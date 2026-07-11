import { motion } from 'framer-motion';
import { Eye, ChevronRight, User } from 'lucide-react';
import { type Report, statusConfig, severityConfig, crimeTypeLabels } from '../data/mockData';

interface ReportsTableProps {
  reports: Report[];
  onViewDetails: (id: string) => void;
}

export const ReportsTable = ({ reports, onViewDetails }: ReportsTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass rounded-2xl overflow-hidden hidden lg:block"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Report ID</th>
              <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Crime Type</th>
              <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Incident</th>
              <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Location</th>
              <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Date</th>
              <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Severity</th>
              <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Officer</th>
              <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, i) => {
              const status = statusConfig[report.status];
              const severity = severityConfig[report.severity];

              return (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-mono font-semibold text-blue-400">{report.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-slate-300">{crimeTypeLabels[report.crimeType]}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-white font-medium max-w-[200px] truncate block">{report.title}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-slate-400 max-w-[150px] truncate block">{report.location}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-slate-400">{report.dateReported}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${severity.bg} ${severity.color}`}>
                      {severity.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {report.assignedOfficer ? (
                      <span className="flex items-center gap-1.5 text-xs text-slate-300">
                        <User className="w-3 h-3 text-blue-400" />
                        {report.assignedOfficer.split(' ').pop()}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => onViewDetails(report.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all"
                    >
                      <Eye className="w-3 h-3" />
                      View
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ReportsTable;
