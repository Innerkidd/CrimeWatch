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
    color: 'from-blue-500 to-blue-600',
    trend: '+3 this week',
    trendUp: true,
  },
  {
    icon: AlertTriangle,
    label: 'Nearby Active Incidents',
    value: 12,
    suffix: '',
    color: 'from-red-500 to-orange-500',
    trend: '2 in your area',
    trendUp: false,
  },
  {
    icon: CheckCircle,
    label: 'Cases Resolved',
    value: 38,
    suffix: '',
    color: 'from-emerald-500 to-green-500',
    trend: '80.8% rate',
    trendUp: true,
  },
  {
    icon: ShieldCheck,
    label: 'Safety Score',
    value: 85,
    suffix: '%',
    color: 'from-violet-500 to-purple-500',
    trend: 'Above average',
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
          className="glass rounded-2xl p-5 group hover:bg-white/[0.06] transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              stat.trendUp
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-amber-400 bg-amber-500/10'
            }`}>
              {stat.trend}
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-0.5">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-xs font-medium text-slate-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
