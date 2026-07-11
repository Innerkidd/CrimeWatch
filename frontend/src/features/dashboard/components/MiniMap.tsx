import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink } from 'lucide-react';

const markers = [
  { x: '25%', y: '30%', type: 'crime' },
  { x: '55%', y: '45%', type: 'safe' },
  { x: '70%', y: '25%', type: 'crime' },
  { x: '40%', y: '65%', type: 'safe' },
  { x: '80%', y: '55%', type: 'crime' },
];

export const MiniMap = () => {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Map Overview</h3>
        <Link
          to="/map"
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          Open Full Map <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="relative aspect-[16/9] bg-navy-900">
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="miniGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#miniGrid)" />
        </svg>

        {/* Heatmap blobs */}
        <div className="absolute top-[20%] left-[20%] w-24 h-24 bg-red-500/15 rounded-full blur-2xl" />
        <div className="absolute top-[40%] left-[50%] w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl" />
        <div className="absolute top-[25%] left-[65%] w-28 h-28 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Markers */}
        {markers.map((marker, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: marker.x, top: marker.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.3, type: 'spring' }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MapPin className={`w-5 h-5 ${marker.type === 'safe' ? 'text-emerald-500' : 'text-red-500'} drop-shadow-lg`} />
            </motion.div>
          </motion.div>
        ))}

        {/* User Location */}
        <motion.div
          className="absolute"
          style={{ left: '48%', top: '48%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
            <motion.div
              className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
              animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 glass-strong rounded-lg px-3 py-2">
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-[10px] text-slate-400">Crime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-slate-400">Safe</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[10px] text-slate-400">You</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
