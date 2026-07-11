import { motion } from 'framer-motion';
import { FileText, CheckCircle, User, Search, Camera, Clock } from 'lucide-react';
import { type TimelineEvent } from '../data/mockData';

interface InvestigationTimelineProps {
  timeline: TimelineEvent[];
}

const iconMap: Record<string, typeof FileText> = {
  file: FileText,
  check: CheckCircle,
  user: User,
  search: Search,
  camera: Camera,
};

const iconColors: Record<string, string> = {
  file: 'text-blue-400 bg-blue-500/10',
  check: 'text-emerald-400 bg-emerald-500/10',
  user: 'text-violet-400 bg-violet-500/10',
  search: 'text-amber-400 bg-amber-500/10',
  camera: 'text-cyan-400 bg-cyan-500/10',
};

export const InvestigationTimeline = ({ timeline }: InvestigationTimelineProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6"
    >
      <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
        <Clock className="w-5 h-5 text-blue-400" />
        Investigation Timeline
      </h2>

      <div className="relative">
        {/* Line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-6">
          {timeline.map((event, i) => {
            const Icon = iconMap[event.icon] || FileText;
            const colorClass = iconColors[event.icon] || 'text-blue-400 bg-blue-500/10';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="relative flex items-start gap-4"
              >
                <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-xl ${colorClass} flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <h4 className="text-sm font-semibold text-white">{event.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{event.description}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default InvestigationTimeline;
