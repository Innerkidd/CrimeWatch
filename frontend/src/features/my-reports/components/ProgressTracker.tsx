import { motion } from 'framer-motion';
import { FileText, Search, UserCheck, Activity, CheckCircle, type LucideIcon } from 'lucide-react';
import { type ProgressStage, progressSteps } from '../data/mockData';

interface ProgressTrackerProps {
  currentStage: ProgressStage;
  compact?: boolean;
}

const stageIcons: Record<string, LucideIcon> = {
  submitted: FileText,
  verification: Search,
  assigned: UserCheck,
  investigating: Activity,
  closed: CheckCircle,
};

const stageColors: Record<string, { active: string; completed: string; pending: string }> = {
  submitted: { active: 'text-blue-400 bg-blue-500/20 border-blue-500/30', completed: 'text-blue-400 bg-blue-500/10', pending: 'text-slate-600 bg-white/[0.02]' },
  verification: { active: 'text-amber-400 bg-amber-500/20 border-amber-500/30', completed: 'text-amber-400 bg-amber-500/10', pending: 'text-slate-600 bg-white/[0.02]' },
  assigned: { active: 'text-purple-400 bg-purple-500/20 border-purple-500/30', completed: 'text-purple-400 bg-purple-500/10', pending: 'text-slate-600 bg-white/[0.02]' },
  investigating: { active: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30', completed: 'text-cyan-400 bg-cyan-500/10', pending: 'text-slate-600 bg-white/[0.02]' },
  closed: { active: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30', completed: 'text-emerald-400 bg-emerald-500/10', pending: 'text-slate-600 bg-white/[0.02]' },
};

export const ProgressTracker = ({ currentStage, compact = false }: ProgressTrackerProps) => {
  const currentIdx = progressSteps.findIndex((s) => s.key === currentStage);

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {progressSteps.map((step, i) => {
          const isCompleted = i <= currentIdx;
          const isCurrent = i === currentIdx;
          return (
            <div
              key={step.key}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                isCompleted ? 'bg-blue-500' : 'bg-white/5'
              } ${isCurrent ? 'ring-2 ring-blue-500/30' : ''}`}
              title={step.label}
            />
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4"
    >
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Case Progress</h4>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5" />

        <div className="space-y-4">
          {progressSteps.map((step, i) => {
            const isCompleted = i < currentIdx;
            const isCurrent = i === currentIdx;
            const Icon = stageIcons[step.key] || FileText;

            const colorClass = isCurrent
              ? stageColors[step.key].active
              : isCompleted
              ? stageColors[step.key].completed
              : stageColors[step.key].pending;

            return (
              <div key={step.key} className="relative flex items-center gap-3">
                <div
                  className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-lg border ${
                    isCurrent ? colorClass : isCompleted ? colorClass : 'border-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isCurrent ? '' : isCompleted ? '' : 'text-slate-600'}`} />
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-lg bg-blue-500/20"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-semibold ${
                      isCurrent ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>

                {isCompleted && (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                )}
                {isCurrent && (
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex-shrink-0">
                    Current
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
