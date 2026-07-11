import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';

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
    icon: FileText,
    label: 'Reports Submitted',
    value: 47,
    suffix: '',
    glowClass: 'glow-cyan',
    textClass: 'text-cyber-cyan',
    borderClass: 'border-cyber-cyan/20 hover:border-cyber-cyan/45 hover:shadow-[0_0_12px_rgba(0,212,255,0.12)]',
    iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20',
    trend: 'SYNCED_NODE_COUNT',
    trendUp: true,
  },
  {
    icon: AlertTriangle,
    label: 'Nearby Active Incidents',
    value: 12,
    suffix: '',
    glowClass: 'glow-pink',
    textClass: 'text-cyber-pink',
    borderClass: 'border-cyber-pink/20 hover:border-cyber-pink/45 hover:shadow-[0_0_12px_rgba(255,0,119,0.12)]',
    iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20',
    trend: 'WARNINGS_IN_SECTOR',
    trendUp: false,
  },
  {
    icon: CheckCircle,
    label: 'Cases Resolved',
    value: 38,
    suffix: '',
    glowClass: 'glow-green',
    textClass: 'text-cyber-green',
    borderClass: 'border-cyber-green/20 hover:border-cyber-green/45 hover:shadow-[0_0_12px_rgba(0,255,136,0.12)]',
    iconBg: 'bg-cyber-green/10 border border-cyber-green/20',
    trend: 'SUCCESS_RATE_80%',
    trendUp: true,
  },
  {
    icon: ShieldCheck,
    label: 'Safety Score',
    value: 85,
    suffix: '%',
    glowClass: 'glow-yellow',
    textClass: 'text-cyber-yellow',
    borderClass: 'border-cyber-yellow/20 hover:border-cyber-yellow/45 hover:shadow-[0_0_12px_rgba(255,179,0,0.12)]',
    iconBg: 'bg-cyber-yellow/10 border border-cyber-yellow/20',
    trend: 'ABOVE_SECTOR_AVG',
    trendUp: true,
  },
];

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`hud-panel p-5 relative transition-all duration-300 border ${stat.borderClass}`}
        >
          {/* HUD Brackets Corners */}
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />

          <div className="flex items-start justify-between mb-3 relative z-10 font-tech">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.iconBg} group-hover:scale-105 transition-transform duration-300`}>
              <stat.icon className={`w-5 h-5 ${stat.textClass} ${stat.glowClass}`} />
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-none border uppercase tracking-wider ${
              stat.trendUp
                ? 'text-cyber-green border-cyber-green/20 bg-cyber-green/10 glow-green'
                : 'text-cyber-pink border-cyber-pink/20 bg-cyber-pink/10 glow-pink'
            }`}>
              {stat.trend}
            </span>
          </div>
          <div className="text-2xl font-black text-white font-orbitron mb-0.5 tracking-tight relative z-10">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-[10px] font-bold text-slate-400 font-tech uppercase tracking-widest relative z-10">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
