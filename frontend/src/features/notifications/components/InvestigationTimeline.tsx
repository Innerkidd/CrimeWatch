import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  UserCheck,
  Activity,
  CheckCircle,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { type InvestigationUpdate, investigationStatusConfig } from '../data/mockData';

interface InvestigationTimelineProps {
  updates: InvestigationUpdate[];
}

const statusIcons: Record<string, LucideIcon> = {
  file: FileText,
  search: Search,
  user: UserCheck,
  check: CheckCircle,
};

const statusColors: Record<string, string> = {
  received: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
  reviewing: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  assigned: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  investigating: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  closed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

const progressSteps = [
  { key: 'received', label: 'Received' },
  { key: 'reviewing', label: 'Reviewing' },
  { key: 'assigned', label: 'Assigned' },
  { key: 'investigating', label: 'Investigating' },
  { key: 'closed', label: 'Closed' },
];

const getProgressPercent = (status: string) => {
  const idx = progressSteps.findIndex((s) => s.key === status);
  return idx >= 0 ? ((idx + 1) / progressSteps.length) * 100 : 0;
};

export const InvestigationTimeline = ({ updates }: InvestigationTimelineProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <Activity className="w-4 h-4 text-blue-400" />
        Investigation Updates
      </h3>

      <div className="space-y-3">
        {updates.map((update, i) => {
          const statusCfg = investigationStatusConfig[update.status];
          const Icon = statusIcons[statusCfg.icon] || FileText;
          const progress = getProgressPercent(update.status);

          return (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`flex-shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center ${statusColors[update.status]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="text-sm font-semibold text-white truncate">{update.reportTitle}</h4>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${statusCfg.bg} ${statusCfg.color}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-1">{update.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {update.date} at {update.time}
                    </span>
                    {update.officer && <span>👤 {update.officer}</span>}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="ml-12">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-500">Case Progress</span>
                  <span className="text-[10px] text-slate-400 font-medium">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  {progressSteps.map((step, si) => {
                    const completed = progressSteps.findIndex((s) => s.key === update.status) >= si;
                    return (
                      <span
                        key={step.key}
                        className={`text-[9px] ${completed ? 'text-slate-400' : 'text-slate-600'}`}
                      >
                        {step.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default InvestigationTimeline;
