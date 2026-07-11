import { motion } from 'framer-motion';
import { Phone, Eye, MapPin, Users, AlertTriangle } from 'lucide-react';

const tips = [
  {
    icon: <Phone className="w-6 h-6 text-cyber-pink glow-pink" />,
    title: 'Emergency Contacts',
    description:
      'Save emergency numbers: Police 100, Ambulance 108, Fire 101. Keep them accessible at all times.',
    colorClass: 'text-cyber-pink',
    glowClass: 'glow-pink',
    iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20',
    hoverBorder: 'hover:border-cyber-pink/35 hover:shadow-[0_0_15px_rgba(255,0,119,0.12)]',
  },
  {
    icon: <Eye className="w-6 h-6 text-cyber-cyan glow-cyan" />,
    title: 'Stay Alert',
    description:
      'Be aware of your surroundings, especially in crowded places. Trust your instincts and avoid poorly lit areas.',
    colorClass: 'text-cyber-cyan',
    glowClass: 'glow-cyan',
    iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20',
    hoverBorder: 'hover:border-cyber-cyan/35 hover:shadow-[0_0_15px_rgba(0,212,255,0.12)]',
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-cyber-yellow glow-yellow" />,
    title: 'Report Suspicious Activity',
    description:
      'If you see something suspicious, report it immediately. Your vigilance helps prevent crimes.',
    colorClass: 'text-cyber-yellow',
    glowClass: 'glow-yellow',
    iconBg: 'bg-cyber-yellow/10 border border-cyber-yellow/20',
    hoverBorder: 'hover:border-cyber-yellow/35 hover:shadow-[0_0_15px_rgba(255,179,0,0.12)]',
  },
  {
    icon: <Users className="w-6 h-6 text-cyber-green glow-green" />,
    title: 'Share Live Location',
    description:
      'Share your live location with trusted contacts when traveling alone, especially at night.',
    colorClass: 'text-cyber-green',
    glowClass: 'glow-green',
    iconBg: 'bg-cyber-green/10 border border-cyber-green/20',
    hoverBorder: 'hover:border-cyber-green/35 hover:shadow-[0_0_15px_rgba(0,255,136,0.12)]',
  },
];

export const SafetyTips = () => {
  return (
    <section className="relative py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-void/60 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyber-green/30 bg-cyber-green/15 text-cyber-green font-tech uppercase text-[10px] tracking-wider mb-6">
            <MapPin className="w-3.5 h-3.5 text-cyber-green glow-green animate-pulse" />
            <span>SECURE_PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white mb-3 font-orbitron">
            GRID <span className="gradient-text glow-cyan">DIRECTIVES</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto font-tech uppercase text-xs tracking-wide">
            // Essential protocols to maintain personal and sector security.
          </p>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className={`hud-panel p-6 h-full transition-all duration-300 group hover:-translate-y-1 ${tip.hoverBorder}`}>
                {/* HUD Brackets Corners */}
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${tip.iconBg} mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  {tip.icon}
                </div>
                <h3 className={`text-sm font-bold uppercase tracking-wider font-orbitron mb-2 ${tip.colorClass} ${tip.glowClass}`}>
                  {tip.title}
                </h3>
                <p className="text-xs text-slate-450 leading-relaxed font-tech uppercase tracking-wide">
                  {tip.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyTips;
