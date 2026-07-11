import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type CrimeDetail, severityConfig } from '../data/mockData';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const crimeIcon = L.divIcon({
  className: 'crime-detail-pin',
  html: `
    <div style="position:relative;width:36px;height:36px;">
      <div style="position:absolute;inset:0;background:#EF4444;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 12px rgba(239,68,68,0.5);"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(45deg);width:12px;height:12px;background:white;border-radius:50%;"></div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

interface CrimeMapProps {
  crime: CrimeDetail;
}

export const CrimeMap = ({ crime }: CrimeMapProps) => {
  const sev = severityConfig[crime.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Incident Location</h2>
        <Link
          to={`/map`}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          Open Full Map <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="relative" style={{ height: 300 }}>
        <MapContainer
          center={[crime.lat, crime.lng]}
          zoom={15}
          className="w-full h-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[crime.lat, crime.lng]} icon={crimeIcon}>
            <Popup>
              <div className="text-xs">
                <p className="font-bold">{crime.title}</p>
                <p className="text-gray-500">{crime.location}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Overlay Info */}
        <div className="absolute bottom-3 left-3 z-[1000] glass-strong rounded-xl px-4 py-2.5">
          <p className="text-xs text-slate-400">{crime.location}</p>
          <p className="text-[10px] text-slate-500 font-mono">{crime.lat.toFixed(6)}, {crime.lng.toFixed(6)}</p>
        </div>

        {/* Severity Badge */}
        <div className="absolute top-3 right-3 z-[1000]">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${sev.bg} ${sev.color}`}>
            {sev.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CrimeMap;
