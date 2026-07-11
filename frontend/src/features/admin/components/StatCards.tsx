import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Users, Calendar, AlertCircle, MapPin } from 'lucide-react';
import type { CrimeReport, Officer } from '../hooks/useAdminState';

interface StatCardsProps {
  reports: CrimeReport[];
  officers: Officer[];
}

export const StatCards: React.FC<StatCardsProps> = ({ reports, officers }) => {
  const totalReports = reports.length;
  const reportsToday = reports.filter(r => r.dateTime.includes('2026-07-11') || r.dateTime.includes('AM') || r.dateTime.includes('PM')).length; // Mock today
  const pendingVerification = reports.filter(r => r.status === 'Pending Verification').length;
  const activeInvestigations = reports.filter(r => r.status === 'Active Investigation').length;
  const resolvedCases = reports.filter(r => r.status === 'Resolved').length;
  const highPriorityCases = reports.filter(r => r.severity === 'High').length;
  const onlineOfficers = officers.filter(o => o.status === 'Online').length;
  
  // Calculate mockup hotspot (most frequent location)
  const hotspotsCount = reports.reduce((acc, curr) => {
    acc[curr.location] = (acc[curr.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topHotspot = Object.keys(hotspotsCount).reduce((a, b) => hotspotsCount[a] > hotspotsCount[b] ? a : b, 'Central Sector');

  const cardData = [
    { title: 'Total Reports', value: totalReports, icon: Shield, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', trend: '+14% from last week', trendColor: 'text-emerald-500' },
    { title: 'Reports Today', value: reportsToday, icon: Calendar, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', trend: 'Same as yesterday', trendColor: 'text-slate-400' },
    { title: 'Pending Verification', value: pendingVerification, icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', trend: '-8% since morning', trendColor: 'text-emerald-500' },
    { title: 'Active Investigations', value: activeInvestigations, icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', trend: '+2 new cases today', trendColor: 'text-rose-500' },
    { title: 'Resolved Cases', value: resolvedCases, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', trend: '98% resolution target', trendColor: 'text-emerald-500' },
    { title: 'High Priority Cases', value: highPriorityCases, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', trend: 'Immediate action req.', trendColor: 'text-red-500 font-bold' },
    { title: 'Online Officers', value: `${onlineOfficers}/${officers.length}`, icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', trend: '90% active patrol', trendColor: 'text-emerald-500' },
    { title: 'Crime Hotspots', value: topHotspot.substring(0, 14) + '...', icon: MapPin, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20', trend: 'High density area', trendColor: 'text-fuchsia-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`bg-slate-950/40 backdrop-blur border ${card.border} rounded-2xl p-6 flex flex-col justify-between hover:shadow-indigo-950/20 hover:shadow-xl hover:border-slate-700/50 transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{card.title}</span>
              <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-2xl font-black text-slate-100 tracking-tight">{card.value}</h3>
              <p className={`text-[11px] ${card.trendColor} mt-1 flex items-center gap-1 font-medium`}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{card.trend}</span>
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
