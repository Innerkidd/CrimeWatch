import { motion } from 'framer-motion';
import {
  UserCheck,
  Eye,
  RefreshCw,
  CheckCircle,
  Search,
  FileText,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { type ActivityItem } from '../data/mockData';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const iconMap: Record<string, LucideIcon> = {
  'user-check': UserCheck,
  eye: Eye,
  'refresh-cw': RefreshCw,
  'check-circle': CheckCircle,
  search: Search,
  'file-text': FileText,
};

const iconColors: Record<string, string> = {
  'user-check': 'text-blue-400 bg-blue-500/10',
  eye: 'text-purple-400 bg-purple-500/10',
  'refresh-cw': 'text-amber-400 bg-amber-500/10',
  'check-circle': 'text-emerald-400 bg-emerald-500/10',
  search: 'text-cyan-400 bg-cyan-500/10',
  'file-text': 'text-slate-400 bg-slate-500/10',
};

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-5"
    >
      <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-blue-400" />
        Recent Activity
      </h3>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5" />

        <div className="space-y-4">
          {activities.map((activity, i) => {
            const Icon = iconMap[activity.icon] || FileText;
            const colorClass = iconColors[activity.icon] || 'text-slate-400 bg-slate-500/10';

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="relative flex items-start gap-3"
              >
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-lg ${colorClass} flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="text-xs font-semibold text-white">{activity.title}</h4>
                    <span className="text-[10px] text-slate-500 flex-shrink-0">{activity.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{activity.description}</p>
                  <span className="text-[10px] text-slate-600 mt-0.5 block">{activity.reportId}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityFeed;
