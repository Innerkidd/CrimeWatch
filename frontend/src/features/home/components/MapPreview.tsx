import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink } from 'lucide-react';

const markers = [
  { x: '20%', y: '25%', type: 'theft', label: 'THEFT_REPORT_#2881' },
  { x: '45%', y: '40%', type: 'assault', label: 'ASSAULT_REPORT_#9920' },
  { x: '70%', y: '30%', type: 'safe', label: 'SAFE_ZONE_GRID_4' },
  { x: '35%', y: '65%', type: 'vandalism', label: 'VANDALISM_#1029' },
  { x: '60%', y: '55%', type: 'safe', label: 'SAFE_ZONE_GRID_7' },
  { x: '80%', y: '60%', type: 'theft', label: 'BURGLARY_#8831' },
];

const markerDotColors: Record<string, string> = {
  theft: 'bg-cyber-pink glow-pink',
  assault: 'bg-cyber-pink glow-pink',
  safe: 'bg-cyber-green glow-green',
  vandalism: 'bg-cyber-yellow glow-yellow',
};

export const MapPreview = () => {
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
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white mb-3 font-orbitron">
            TACTICAL <span className="gradient-text glow-cyan">MAP GRID</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto font-tech uppercase text-xs tracking-wide">
            // Real-time tracking of security incident signals.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative hud-panel overflow-hidden border border-cyber-cyan/25 hover:border-cyber-cyan/35 hover:shadow-[0_0_15px_rgba(0,212,255,0.08)] transition-all duration-300"
        >
          {/* HUD Brackets Corners */}
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />

          {/* Map Placeholder */}
          <div className="relative aspect-video lg:aspect-[21/9] bg-cyber-void overflow-hidden">
            {/* Grid Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
            </svg>

            {/* Heatmap blobs */}
            <div className="absolute top-[20%] left-[15%] w-32 h-32 bg-cyber-pink/10 rounded-full blur-2xl" />
            <div className="absolute top-[35%] left-[40%] w-40 h-40 bg-cyber-yellow/8 rounded-full blur-3xl" />
            <div className="absolute top-[50%] left-[60%] w-24 h-24 bg-cyber-green/10 rounded-full blur-2xl" />
            <div className="absolute top-[25%] left-[70%] w-36 h-36 bg-cyber-cyan/8 rounded-full blur-3xl" />

            {/* Crime Markers */}
            {markers.map((marker, i) => (
              <motion.div
                key={i}
                className="absolute group cursor-pointer"
                style={{ left: marker.x, top: marker.y }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.4, type: 'spring' }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="relative">
                    <MapPin className={`w-6 h-6 ${marker.type === 'safe' ? 'text-cyber-green glow-green' : 'text-cyber-pink glow-pink'} drop-shadow-lg`} />
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${markerDotColors[marker.type]} animate-ping`} />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-cyber-void/90 border border-cyber-cyan/30 rounded-none text-[10px] font-tech text-cyber-cyan tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                    {marker.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyber-void rotate-45 -mt-1 border-r border-b border-cyber-cyan/30" />
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-cyber-void/85 border border-cyber-cyan/20 p-3 rounded-none font-tech uppercase text-[10px] tracking-wide">
              <div className="font-bold text-cyber-cyan glow-cyan mb-2 border-b border-cyber-cyan/20 pb-0.5">GRID_LEGEND</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-cyber-pink glow-pink" />
                  <span className="text-slate-400">CRIT_INCIDENT</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-cyber-yellow glow-yellow" />
                  <span className="text-slate-400">WARN_SIGNAL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-cyber-green glow-green" />
                  <span className="text-slate-400">SAFE_ZONE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between p-4 border-t border-cyber-cyan/15 bg-cyber-void/90 relative z-10">
            <div className="flex items-center gap-4 text-xs font-tech uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse glow-green" />
                LIVE_TELEMETRY
              </span>
              <span>SYNC_LATENCY: 2s</span>
            </div>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyber-cyan hover:bg-cyber-green text-cyber-void text-xs font-bold font-tech uppercase rounded-none transition-all duration-250 shadow-[0_0_10px_rgba(0,212,255,0.25)] hover:shadow-[0_0_12px_rgba(0,255,136,0.3)] chamfer-button"
            >
              INITIALIZE_FULL_GRID
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapPreview;
