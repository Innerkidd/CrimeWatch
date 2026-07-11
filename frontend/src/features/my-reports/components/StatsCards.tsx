import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCard {
  label: string;
  value: number;
  icon: typeof FileText;
  color: string;
  bg: string;
  trend: number;
}

interface StatsCardsProps {
  reports: { status: string }[];
}

export const StatsCards = ({ reports }: StatsCardsProps) => {
  const stats: StatCard[] = [
    {
      label: 'Total Reports',
      value: reports.length,
      icon: FileText,
      color: 'text-blue-400',
      bg: 'from-blue-500/10 to-blue-600/5 border-blue-500/20',
      trend: 12,
    },
    {
      label: 'Under Investigation',
      value: reports.filter((r) => r.status === 'investigating').length,
      icon: Search,
      color: 'text-purple-400',
      bg: 'from-purple-500/10 to-purple-600/5 border-purple-500/20',
      trend: 5,
    },
    {
      label: 'Resolved',
      value: reports.filter((r) => r.status === 'resolved').length,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20',
      trend: 8,
    },
    {
      label: 'Pending Verification',
      value: reports.filter((r) => r.status === 'pending').length,
      icon: Clock,
      color: 'text-amber-400',
      bg: 'from-amber-500/10 to-amber-600/5 border-amber-500/20',
      trend: -3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <AnimatedCard key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  );
};

const AnimatedCard = ({ stat, index }: { stat: StatCard; index: number }) => {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const increment = stat.value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative rounded-2xl bg-gradient-to-br ${stat.bg} border p-5 overflow-hidden group hover:scale-[1.02] transition-transform`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${stat.color}`} />
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            stat.trend > 0 ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {stat.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(stat.trend)}%
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{count}</p>
      <p className="text-xs text-slate-400 font-medium">{stat.label}</p>

      {/* Decorative circle */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors" />
    </motion.div>
  );
};

export default StatsCards;
