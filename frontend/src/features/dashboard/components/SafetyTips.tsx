import { motion } from 'framer-motion';
import { ShieldCheck, Eye, MapPin, Phone } from 'lucide-react';

const tips = [
  {
    icon: ShieldCheck,
    title: 'Emergency Contacts',
    description: 'Police: 100 | Ambulance: 108 | Fire: 101. Save these numbers.',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Eye,
    title: 'Stay Alert',
    description: 'Be aware of your surroundings in crowded places and poorly lit areas.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: MapPin,
    title: 'Share Location',
    description: 'Share your live location with trusted contacts when traveling alone.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Phone,
    title: 'Report Quickly',
    description: 'The faster you report, the faster authorities can respond.',
    color: 'from-emerald-500 to-green-500',
  },
];

export const SafetyTips = () => {
  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-base font-bold text-white mb-4">Safety Tips</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tips.map((tip, i) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
          >
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${tip.color} flex-shrink-0`}>
              <tip.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">{tip.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{tip.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SafetyTips;
