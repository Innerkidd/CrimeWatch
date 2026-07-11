import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
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

  return <span ref={ref}>{count}</span>;
};

interface MapStatsProps {
  total: number;
  active: number;
  resolved: number;
  highRisk: number;
}

export const MapStats = ({ total, active, resolved, highRisk }: MapStatsProps) => {
  const stats = [
    { icon: FileText, label: 'Total', value: total, color: 'from-blue-500 to-blue-600' },
    { icon: AlertTriangle, label: 'Active', value: active, color: 'from-amber-500 to-orange-500' },
    { icon: CheckCircle, label: 'Resolved', value: resolved, color: 'from-emerald-500 to-green-500' },
    { icon: MapPin, label: 'High Risk', value: highRisk, color: 'from-red-500 to-rose-500' },
  ];

  return (
    <div className="absolute top-4 left-4 z-[1000] flex gap-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.1 }}
          className="glass-strong rounded-xl px-3 py-2 flex items-center gap-2"
        >
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
            <stat.icon className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="text-[10px] text-slate-400">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MapStats;
