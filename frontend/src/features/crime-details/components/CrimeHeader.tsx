import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, Hash, User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type CrimeDetail, crimeTypeLabels, severityConfig, statusConfig } from '../data/mockData';

interface CrimeHeaderProps {
  crime: CrimeDetail;
}

export const CrimeHeader = ({ crime }: CrimeHeaderProps) => {
  const sev = severityConfig[crime.severity];
  const stat = statusConfig[crime.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Back */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Title Row */}
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${sev.bg} ${sev.color}`}>
                <Shield className="w-3 h-3 inline mr-1" />
                {sev.label} Severity
              </span>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${stat.bg} ${stat.color}`}>
                {stat.label}
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full border bg-blue-500/10 border-blue-500/20 text-blue-400">
                {crimeTypeLabels[crime.type]}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{crime.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-blue-400" />
                {crime.id}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-400" />
                {crime.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                {crime.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {crime.location}
              </span>
            </div>
          </div>

          {/* Reporter */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Reported by</p>
              <p className="text-sm font-semibold text-white">
                {crime.reporterType === 'anonymous' ? 'Anonymous' : crime.reporterName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CrimeHeader;
