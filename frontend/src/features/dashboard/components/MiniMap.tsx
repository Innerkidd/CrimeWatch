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
    <div className="hud-panel relative transition-all border border-cyber-cyan/15 bg-cyber-void/85 overflow-hidden">
      {/* HUD Brackets Corners */}
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />

      <div className="px-5 py-4 border-b border-cyber-cyan/15 flex items-center justify-between font-tech relative z-10">
        <h3 className="text-sm font-bold text-cyber-cyan glow-cyan uppercase font-orbitron tracking-wider">LOCAL_SECTOR_GRID</h3>
        <Link
          to="/map"
          className="text-[10px] font-bold text-cyber-cyan hover:text-cyber-green transition-colors flex items-center gap-1 uppercase tracking-wider cursor-pointer"
        >
          OPEN_FULL_GRID <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="relative aspect-[16/9] bg-cyber-void z-10">
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="miniGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#miniGrid)" />
        </svg>

        {/* Heatmap blobs */}
        <div className="absolute top-[20%] left-[20%] w-24 h-24 bg-cyber-pink/10 rounded-full blur-2xl" />
        <div className="absolute top-[40%] left-[50%] w-20 h-20 bg-cyber-green/10 rounded-full blur-2xl" />
        <div className="absolute top-[25%] left-[65%] w-28 h-28 bg-cyber-cyan/10 rounded-full blur-3xl" />

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
              <MapPin className={`w-5 h-5 ${marker.type === 'safe' ? 'text-cyber-green glow-green' : 'text-cyber-pink glow-pink'} drop-shadow-lg`} />
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
            <div className="w-3.5 h-3.5 bg-cyber-cyan rounded-none border border-white shadow-lg" />
            <motion.div
              className="absolute inset-0 border border-cyber-cyan/40 rounded-none"
              animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-cyber-void/80 border border-cyber-cyan/20 p-2 font-tech uppercase text-[9px] tracking-widest">
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-cyber-pink glow-pink" />
              <span className="text-slate-400">CRIT_LOCK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-cyber-green glow-green" />
              <span className="text-slate-400">SAFE_ZONE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-cyber-cyan glow-cyan" />
              <span className="text-slate-400">SYS_NODE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
