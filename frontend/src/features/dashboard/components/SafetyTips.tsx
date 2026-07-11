import { motion } from 'framer-motion';
import { ShieldCheck, Eye, MapPin, Phone } from 'lucide-react';

const tips = [
  {
    icon: ShieldCheck,
    title: 'Emergency Contacts',
    description: 'Police: 100 | Ambulance: 108 | Fire: 101. Save these coordinates.',
    iconColor: 'text-cyber-pink glow-pink',
    iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20',
  },
  {
    icon: Eye,
    title: 'Stay Alert',
    description: 'Be aware of your surroundings in crowded places and poorly lit areas.',
    iconColor: 'text-cyber-cyan glow-cyan',
    iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20',
  },
  {
    icon: MapPin,
    title: 'Share Location',
    description: 'Share your live location with trusted contacts when traveling alone.',
    iconColor: 'text-cyber-yellow glow-yellow',
    iconBg: 'bg-cyber-yellow/10 border border-cyber-yellow/20',
  },
  {
    icon: Phone,
    title: 'Report Quickly',
    description: 'The faster you report, the faster authorities can respond to the sector.',
    iconColor: 'text-cyber-green glow-green',
    iconBg: 'bg-cyber-green/10 border border-cyber-green/20',
  },
];

export const SafetyTips = () => {
  return (
    <div className="hud-panel p-5 relative border border-cyber-cyan/15 bg-cyber-void/85 transition-all duration-300">
      {/* HUD Brackets Corners */}
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />

      <h3 className="text-sm font-bold text-cyber-cyan glow-cyan uppercase font-orbitron tracking-wider mb-4 relative z-10 text-left">SECURITY_DIRECTIVES</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
        {tips.map((tip, i) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="flex items-start gap-3 p-3 rounded-none bg-cyber-cyan/5 border border-cyber-cyan/10 hover:bg-cyber-cyan/10 transition-colors text-left"
          >
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${tip.iconBg} flex-shrink-0`}>
              <tip.icon className={`w-4 h-4 ${tip.iconColor}`} />
            </div>
            <div className="font-tech uppercase">
              <h4 className="text-xs font-bold text-white font-orbitron tracking-wide">{tip.title}</h4>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{tip.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SafetyTips;
