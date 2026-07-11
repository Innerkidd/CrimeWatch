import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink } from 'lucide-react';

const markers = [
  { x: '20%', y: '25%', type: 'theft', label: 'Theft Report' },
  { x: '45%', y: '40%', type: 'assault', label: 'Assault Report' },
  { x: '70%', y: '30%', type: 'safe', label: 'Safe Zone' },
  { x: '35%', y: '65%', type: 'vandalism', label: 'Vandalism' },
  { x: '60%', y: '55%', type: 'safe', label: 'Safe Zone' },
  { x: '80%', y: '60%', type: 'theft', label: 'Burglary' },
];

const markerDotColors: Record<string, string> = {
  theft: 'bg-amber-400',
  assault: 'bg-red-400',
  safe: 'bg-emerald-400',
  vandalism: 'bg-orange-400',
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Interactive <span className="gradient-text">Crime Map</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Explore real-time crime data on an interactive map with heatmap
            visualization.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass rounded-2xl overflow-hidden"
        >
          {/* Map Placeholder */}
          <div className="relative aspect-video lg:aspect-[21/9] bg-navy-900 overflow-hidden">
            {/* Grid Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-500" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Heatmap blobs */}
            <div className="absolute top-[20%] left-[15%] w-32 h-32 bg-red-500/15 rounded-full blur-2xl" />
            <div className="absolute top-[35%] left-[40%] w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute top-[50%] left-[60%] w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
            <div className="absolute top-[25%] left-[70%] w-36 h-36 bg-blue-500/10 rounded-full blur-3xl" />

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
                  <div className={`relative`}>
                    <MapPin className={`w-6 h-6 ${marker.type === 'safe' ? 'text-emerald-500' : 'text-red-500'} drop-shadow-lg`} />
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${markerDotColors[marker.type]} animate-ping`} />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-navy-800 border border-white/10 rounded-lg text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
                    {marker.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-navy-800 rotate-45 -mt-1 border-r border-b border-white/10" />
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 glass-strong rounded-xl px-4 py-3">
              <div className="text-xs font-semibold text-slate-300 mb-2">Legend</div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-xs text-slate-400">Crime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs text-slate-400">Warning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400">Safe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between p-4 border-t border-white/5">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Live Data
              </span>
              <span>Updated 2s ago</span>
            </div>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
            >
              Open Full Map
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapPreview;
