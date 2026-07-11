import { motion } from 'framer-motion';
import { FileText, CheckCircle, Bell, Shield, ChevronRight } from 'lucide-react';

interface ActivityItem {
  id: string;
  icon: typeof FileText;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    icon: FileText,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    title: 'Report Submitted',
    description: 'You submitted a theft report at Main Street',
    time: '15 mins ago',
  },
  {
    id: '2',
    icon: CheckCircle,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    title: 'Case Resolved',
    description: 'Vandalism report #1234 has been resolved',
    time: '2 hours ago',
  },
  {
    id: '3',
    icon: Bell,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    title: 'Alert Received',
    description: 'New crime alert in your neighborhood',
    time: '3 hours ago',
  },
  {
    id: '4',
    icon: Shield,
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    title: 'Police Response',
    description: 'Officer dispatched to your reported incident',
    time: '5 hours ago',
  },
  {
    id: '5',
    icon: FileText,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    title: 'Report Updated',
    description: 'Additional evidence added to report #1189',
    time: '1 day ago',
  },
];

export const ActivityTimeline = () => {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-white">Recent Activity</h3>
        <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
          View All <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-5">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="relative flex items-start gap-4"
            >
              {/* Icon */}
              <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-xl ${activity.iconBg} flex-shrink-0`}>
                <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <h4 className="text-sm font-semibold text-white">{activity.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{activity.description}</p>
                <span className="text-xs text-slate-500 mt-1 block">{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
