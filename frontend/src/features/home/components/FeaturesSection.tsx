import { motion } from 'framer-motion';
import {
  Radio,
  Map,
  MapPin,
  EyeOff,
  Bell,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: <Radio className="w-6 h-6 text-cyber-pink glow-pink" />,
    title: 'Real-Time Crime Reporting',
    description:
      'Report incidents instantly with photo and video evidence. Your report reaches authorities within seconds.',
    glowClass: 'glow-pink',
    textClass: 'text-cyber-pink',
    borderHoverClass: 'hover:border-cyber-pink/35 hover:shadow-[0_0_15px_rgba(255,0,119,0.12)]',
    iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20',
  },
  {
    icon: <Map className="w-6 h-6 text-cyber-cyan glow-cyan" />,
    title: 'Interactive Crime Map',
    description:
      'Visualize crime data on an interactive heatmap. Identify hotspots and stay aware of your surroundings.',
    glowClass: 'glow-cyan',
    textClass: 'text-cyber-cyan',
    borderHoverClass: 'hover:border-cyber-cyan/35 hover:shadow-[0_0_15px_rgba(0,212,255,0.12)]',
    iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20',
  },
  {
    icon: <MapPin className="w-6 h-6 text-cyber-green glow-green" />,
    title: 'GPS Location Detection',
    description:
      'Automatic location detection ensures accurate incident reporting without manual address entry.',
    glowClass: 'glow-green',
    textClass: 'text-cyber-green',
    borderHoverClass: 'hover:border-cyber-green/35 hover:shadow-[0_0_15px_rgba(0,255,136,0.12)]',
    iconBg: 'bg-cyber-green/10 border border-cyber-green/20',
  },
  {
    icon: <EyeOff className="w-6 h-6 text-cyber-pink glow-pink" />,
    title: 'Anonymous Reporting',
    description:
      'Report crimes without revealing your identity. Complete anonymity protection for sensitive cases.',
    glowClass: 'glow-pink',
    textClass: 'text-cyber-pink',
    borderHoverClass: 'hover:border-cyber-pink/35 hover:shadow-[0_0_15px_rgba(255,0,119,0.12)]',
    iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20',
  },
  {
    icon: <Bell className="w-6 h-6 text-cyber-yellow glow-yellow" />,
    title: 'Instant Notifications',
    description:
      'Receive real-time alerts about crimes in your area. Stay informed with customizable notification preferences.',
    glowClass: 'glow-yellow',
    textClass: 'text-cyber-yellow',
    borderHoverClass: 'hover:border-cyber-yellow/35 hover:shadow-[0_0_15px_rgba(255,179,0,0.12)]',
    iconBg: 'bg-cyber-yellow/10 border border-cyber-yellow/20',
  },
  {
    icon: <Users className="w-6 h-6 text-cyber-cyan glow-cyan" />,
    title: 'Police Collaboration',
    description:
      'Direct communication channel with local law enforcement. Track investigation progress in real-time.',
    glowClass: 'glow-cyan',
    textClass: 'text-cyber-cyan',
    borderHoverClass: 'hover:border-cyber-cyan/35 hover:shadow-[0_0_15px_rgba(0,212,255,0.12)]',
    iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-20 lg:py-28">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white mb-3 font-orbitron">
            POWERFUL <span className="gradient-text glow-cyan">CAPABILITIES</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto font-tech uppercase text-xs tracking-wide">
            // Core capabilities of the secure watchdog network.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className={`hud-panel p-6 h-full transition-all duration-300 group hover:-translate-y-1 ${feature.borderHoverClass}`}>
                {/* HUD Brackets Corners */}
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.iconBg} mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className={`text-sm font-bold uppercase tracking-wider font-orbitron mb-2 ${feature.textClass} ${feature.glowClass}`}>
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-450 leading-relaxed font-tech uppercase tracking-wide">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
