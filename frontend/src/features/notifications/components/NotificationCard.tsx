import { motion } from 'framer-motion';
import {
  AlertTriangle,
  UserCheck,
  UserX,
  Eye,
  CheckCircle,
  Shield,
  Camera,
  Package,
  Car,
  Download,
  Calendar,
  Flame,
  FlaskConical,
  Users,
  Bell,
  type LucideIcon,
} from 'lucide-react';
import { type Notification, priorityConfig, typeConfig } from '../data/mockData';

interface NotificationCardProps {
  notification: Notification;
  index: number;
  onMarkRead: (id: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  'alert-triangle': AlertTriangle,
  'user-check': UserCheck,
  'user-x': UserX,
  'check-circle': CheckCircle,
  'alert-circle': AlertTriangle,
  eye: Eye,
  shield: Shield,
  camera: Camera,
  package: Package,
  car: Car,
  download: Download,
  calendar: Calendar,
  flame: Flame,
  'flask-conical': FlaskConical,
  users: Users,
};

const typeColorBorders: Record<string, string> = {
  crime_alert: 'border-l-red-500',
  investigation: 'border-l-blue-500',
  emergency: 'border-l-orange-500',
  community: 'border-l-emerald-500',
  system: 'border-l-violet-500',
};

export const NotificationCard = ({ notification, index, onMarkRead, onSelect, isSelected }: NotificationCardProps) => {
  const Icon = iconMap[notification.icon] || Bell;
  const priority = priorityConfig[notification.priority];
  const type = typeConfig[notification.type];
  const borderColor = typeColorBorders[notification.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      onClick={() => onSelect(notification.id)}
      className={`relative group rounded-xl border-l-4 ${borderColor} transition-all duration-200 cursor-pointer ${
        notification.isRead
          ? 'glass bg-white/[0.01]'
          : 'glass-strong bg-white/[0.04]'
      } ${isSelected ? 'ring-2 ring-blue-500/40' : ''} hover:bg-white/[0.05]`}
    >
      <div className="p-4 flex items-start gap-4">
        {/* Icon */}
        <div className={`relative flex-shrink-0 w-10 h-10 rounded-xl ${type.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${type.color}`} />
          {!notification.isRead && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-slate-900" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h4 className={`text-sm font-semibold leading-snug ${notification.isRead ? 'text-slate-300' : 'text-white'}`}>
              {notification.title}
            </h4>
            <span className={`flex-shrink-0 px-2 py-0.5 text-[10px] font-bold rounded-full border ${priority.bg} ${priority.color}`}>
              {priority.label}
            </span>
          </div>

          <p className={`text-xs leading-relaxed mb-2 ${notification.isRead ? 'text-slate-500' : 'text-slate-400'}`}>
            {notification.description}
          </p>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span>{notification.date}</span>
              <span>{notification.time}</span>
              {notification.location && (
                <span className="hidden sm:inline">📍 {notification.location}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${type.bg} ${type.color}`}>
                {type.label}
              </span>
              {!notification.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead(notification.id);
                  }}
                  className="text-[10px] text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Mark read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationCard;
