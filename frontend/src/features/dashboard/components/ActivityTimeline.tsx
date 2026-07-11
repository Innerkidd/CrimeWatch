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
    iconColor: 'text-cyber-cyan glow-cyan',
    iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20',
    title: 'Report Submitted',
    description: 'You submitted a theft report at Main Street',
    time: '15 mins ago',
  },
  {
    id: '2',
    icon: CheckCircle,
    iconColor: 'text-cyber-green glow-green',
    iconBg: 'bg-cyber-green/10 border border-cyber-green/20',
    title: 'Case Resolved',
    description: 'Vandalism report #1234 has been resolved',
    time: '2 hours ago',
  },
  {
    id: '3',
    icon: Bell,
    iconColor: 'text-cyber-yellow glow-yellow',
    iconBg: 'bg-cyber-yellow/10 border border-cyber-yellow/20',
    title: 'Alert Received',
    description: 'New crime alert in your neighborhood',
    time: '3 hours ago',
  },
  {
    id: '4',
    icon: Shield,
    iconColor: 'text-cyber-pink glow-pink',
    iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20',
    title: 'Police Response',
    description: 'Officer dispatched to your reported incident',
    time: '5 hours ago',
  },
  {
    id: '5',
    icon: FileText,
    iconColor: 'text-cyber-cyan glow-cyan',
    iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20',
    title: 'Report Updated',
    description: 'Additional evidence added to report #1189',
    time: '1 day ago',
  },
];

export const ActivityTimeline = () => {
  return (
    <div className="hud-panel p-5 relative border border-cyber-cyan/15 bg-cyber-void/85 transition-all duration-300">
      {/* HUD Brackets Corners */}
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />

      <div className="flex items-center justify-between mb-5 font-tech relative z-10">
        <h3 className="text-sm font-bold text-cyber-cyan glow-cyan uppercase font-orbitron tracking-wider">ACTIVITY_TIMELINE</h3>
        <button className="text-[10px] font-bold text-cyber-cyan hover:text-cyber-green transition-colors flex items-center gap-1 uppercase tracking-wider cursor-pointer">
          VIEW_ALL <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="relative z-10">
        {/* Timeline Line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-cyber-cyan/15" />

        <div className="space-y-5 text-left">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="relative flex items-start gap-4"
            >
              {/* Icon */}
              <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-none ${activity.iconBg} flex-shrink-0`}>
                <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5 font-tech uppercase">
                <h4 className="text-xs font-bold text-white font-orbitron tracking-wide">{activity.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-normal">{activity.description}</p>
                <span className="text-[9px] text-slate-500 mt-1 block tracking-wider">LOG_TIME: {activity.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
