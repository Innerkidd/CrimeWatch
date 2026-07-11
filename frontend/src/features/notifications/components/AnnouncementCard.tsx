import { motion } from 'framer-motion';
import { Megaphone, BookOpen, Shield, CalendarDays, MapPin, ExternalLink } from 'lucide-react';
import { type CommunityAnnouncement } from '../data/mockData';

interface AnnouncementCardProps {
  announcement: CommunityAnnouncement;
  index: number;
}

const categoryConfig: Record<string, { label: string; icon: typeof Megaphone; color: string; bg: string }> = {
  campaign: { label: 'Campaign', icon: Megaphone, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  awareness: { label: 'Awareness', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  police: { label: 'Police', icon: Shield, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  event: { label: 'Event', icon: CalendarDays, color: 'text-amber-400', bg: 'bg-amber-500/10' },
};

export const AnnouncementCard = ({ announcement, index }: AnnouncementCardProps) => {
  const cat = categoryConfig[announcement.category];
  const Icon = cat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-xl p-4 hover:bg-white/[0.04] transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${cat.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${cat.bg} ${cat.color}`}>
              {cat.label}
            </span>
            <span className="text-[11px] text-slate-500">{announcement.date}</span>
          </div>

          <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {announcement.title}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-2">{announcement.description}</p>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>By {announcement.organizer}</span>
            {announcement.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {announcement.location}
              </span>
            )}
          </div>

          {announcement.link && (
            <button className="mt-2 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Learn More
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AnnouncementCard;
