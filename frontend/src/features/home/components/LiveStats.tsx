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
    icon: <FileText className="w-7 h-7" />,
    label: 'Total Reports Today',
    value: 1284,
    suffix: '+',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <Search className="w-7 h-7" />,
    label: 'Active Investigations',
    value: 342,
    suffix: '',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    label: 'Safe Areas',
    value: 89,
    suffix: '%',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: <BadgeCheck className="w-7 h-7" />,
    label: 'Verified Reports',
    value: 1053,
    suffix: '',
    color: 'from-purple-500 to-violet-500',
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Live Crime <span className="gradient-text">Statistics</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Real-time data from communities across the region, updated every
            second.
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
              <div className="glass rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-all duration-300 group">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-slate-400">
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
