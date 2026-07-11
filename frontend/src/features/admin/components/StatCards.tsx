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
    { title: 'Total Reports', value: totalReports, icon: Shield, colorClass: 'text-cyber-cyan', borderClass: 'border-cyber-cyan/20 hover:border-cyber-cyan/45 hover:shadow-[0_0_12px_rgba(0,212,255,0.12)]', iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20', trend: 'NODE_LOGS_SYNCED', trendColor: 'text-cyber-cyan' },
    { title: 'Reports Today', value: reportsToday, icon: Calendar, colorClass: 'text-cyber-cyan', borderClass: 'border-cyber-cyan/20 hover:border-cyber-cyan/45 hover:shadow-[0_0_12px_rgba(0,212,255,0.12)]', iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20', trend: 'SYNC_RATE_OK', trendColor: 'text-cyber-cyan' },
    { title: 'Pending Verification', value: pendingVerification, icon: AlertCircle, colorClass: 'text-cyber-yellow', borderClass: 'border-cyber-yellow/20 hover:border-cyber-yellow/45 hover:shadow-[0_0_12px_rgba(255,179,0,0.12)]', iconBg: 'bg-cyber-yellow/10 border border-cyber-yellow/20', trend: 'DISPATCH_QUEUE_PENDING', trendColor: 'text-cyber-yellow' },
    { title: 'Active Investigations', value: activeInvestigations, icon: AlertTriangle, colorClass: 'text-cyber-pink', borderClass: 'border-cyber-pink/20 hover:border-cyber-pink/45 hover:shadow-[0_0_12px_rgba(255,0,119,0.12)]', iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20', trend: 'ACTIVE_INTERCEPT_VECTORS', trendColor: 'text-cyber-pink' },
    { title: 'Resolved Cases', value: resolvedCases, icon: CheckCircle, colorClass: 'text-cyber-green', borderClass: 'border-cyber-green/20 hover:border-cyber-green/45 hover:shadow-[0_0_12px_rgba(0,255,136,0.12)]', iconBg: 'bg-cyber-green/10 border border-cyber-green/20', trend: 'THREATS_TERMINATED', trendColor: 'text-cyber-green' },
    { title: 'High Priority Cases', value: highPriorityCases, icon: AlertCircle, colorClass: 'text-cyber-pink', borderClass: 'border-cyber-pink/20 hover:border-cyber-pink/45 hover:shadow-[0_0_12px_rgba(255,0,119,0.12)]', iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20', trend: 'CRIT_ALERT_PROTOCOL', trendColor: 'text-cyber-pink font-bold' },
    { title: 'Online Officers', value: `${onlineOfficers}/${officers.length}`, icon: Users, colorClass: 'text-cyber-green', borderClass: 'border-cyber-green/20 hover:border-cyber-green/45 hover:shadow-[0_0_12px_rgba(0,255,136,0.12)]', iconBg: 'bg-cyber-green/10 border border-cyber-green/20', trend: 'PATROL_NODES_ACTIVE', trendColor: 'text-cyber-green' },
    { title: 'Crime Hotspots', value: topHotspot.substring(0, 14).toUpperCase() + '...', icon: MapPin, colorClass: 'text-cyber-pink', borderClass: 'border-cyber-pink/20 hover:border-cyber-pink/45 hover:shadow-[0_0_12px_rgba(255,0,119,0.12)]', iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20', trend: 'DENSITY_PEAK_ZONE', trendColor: 'text-cyber-pink' },
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
            className={`hud-panel p-5 flex flex-col justify-between transition-all duration-300 relative border ${card.borderClass}`}
          >
            {/* HUD Brackets Corners */}
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />

            <div className="flex items-center justify-between relative z-10 font-tech">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{card.title}</span>
              <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center ${card.colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            
            <div className="mt-4 relative z-10">
              <h3 className="text-2xl font-black text-slate-100 tracking-tight font-orbitron">{card.value}</h3>
              <p className={`text-[9px] ${card.trendColor} mt-1.5 flex items-center gap-1 font-bold font-tech uppercase tracking-wider`}>
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
