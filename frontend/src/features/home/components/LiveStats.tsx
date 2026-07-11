import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Search, ShieldCheck, BadgeCheck } from 'lucide-react';

const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  {
    icon: <FileText className="w-7 h-7 text-cyber-pink" />,
    label: 'Total Reports Today',
    value: 1284,
    suffix: '+',
    glowClass: 'glow-pink',
    textClass: 'text-cyber-pink',
    borderHoverClass: 'hover:border-cyber-pink/35 hover:shadow-[0_0_15px_rgba(255,0,119,0.12)]',
    iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20',
  },
  {
    icon: <Search className="w-7 h-7 text-cyber-yellow" />,
    label: 'Active Investigations',
    value: 342,
    suffix: '',
    glowClass: 'glow-yellow',
    textClass: 'text-cyber-yellow',
    borderHoverClass: 'hover:border-cyber-yellow/35 hover:shadow-[0_0_15px_rgba(255,179,0,0.12)]',
    iconBg: 'bg-cyber-yellow/10 border border-cyber-yellow/20',
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-cyber-green" />,
    label: 'Safe Areas',
    value: 89,
    suffix: '%',
    glowClass: 'glow-green',
    textClass: 'text-cyber-green',
    borderHoverClass: 'hover:border-cyber-green/35 hover:shadow-[0_0_15px_rgba(0,255,136,0.12)]',
    iconBg: 'bg-cyber-green/10 border border-cyber-green/20',
  },
  {
    icon: <BadgeCheck className="w-7 h-7 text-cyber-cyan" />,
    label: 'Verified Reports',
    value: 1053,
    suffix: '',
    glowClass: 'glow-cyan',
    textClass: 'text-cyber-cyan',
    borderHoverClass: 'hover:border-cyber-cyan/35 hover:shadow-[0_0_15px_rgba(0,212,255,0.12)]',
    iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20',
  },
];

export const LiveStats = () => {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white mb-3 font-orbitron">
            TACTICAL <span className="gradient-text glow-cyan">STATISTICS</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto font-tech tracking-wide uppercase text-xs">
            // Real-time telemetry feed from local nodes, updated continuously.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className={`hud-panel p-6 text-center transition-all duration-300 group ${stat.borderHoverClass}`}>
                {/* HUD Brackets Corners */}
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${stat.iconBg} mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
                <div className={`text-3.5xl sm:text-4xl font-extrabold font-tech mb-1 ${stat.textClass} ${stat.glowClass}`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-orbitron">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
