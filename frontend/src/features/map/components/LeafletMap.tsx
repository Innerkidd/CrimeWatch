import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, MapPin, AlertTriangle, ChevronRight } from 'lucide-react';
import { type CrimeReport, crimeTypeLabels, crimeTypeColors, severityColors } from '../data/mockData';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createCrimeIcon = (_type: string, severity: string) => {
  const color = severityColors[severity as keyof typeof severityColors] || '#6B7280';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        position: relative;
        width: 28px;
        height: 28px;
      ">
        <div style="
          position: absolute;
          inset: 0;
          background: ${color};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
};

const userIcon = L.divIcon({
  className: 'user-marker',
  html: `
    <div style="position: relative; width: 20px; height: 20px;">
      <div style="
        position: absolute;
        inset: 0;
        background: #3B82F6;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(59,130,246,0.5);
      "></div>
      <div style="
        position: absolute;
        inset: -8px;
        border: 2px solid rgba(59,130,246,0.3);
        border-radius: 50%;
        animation: pulse-ring 2s infinite;
      "></div>
    </div>
    <style>
      @keyframes pulse-ring {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface MapUpdaterProps {
  center: [number, number];
  zoom: number;
}

const MapUpdater = ({ center, zoom }: MapUpdaterProps) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

interface PopupContentProps {
  report: CrimeReport;
}

const PopupContent = ({ report }: PopupContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-w-[250px] max-w-[300px] p-0 font-sans">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: crimeTypeColors[report.type] }}
        />
        <span className="font-bold text-sm text-gray-900">{crimeTypeLabels[report.type]}</span>
        <span
          className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full uppercase text-white"
          style={{ backgroundColor: severityColors[report.severity] }}
        >
          {report.severity}
        </span>
      </div>

      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{report.description}</p>

      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <MapPin className="w-3 h-3" />
          {report.location}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <Clock className="w-3 h-3" />
          {report.date} at {report.time}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <AlertTriangle className="w-3 h-3" />
          Status: <span className="font-semibold capitalize">{report.status}</span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/crime/${report.id}`)}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors"
      >
        <FileText className="w-3 h-3" />
        View Details
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
};

interface LeafletMapProps {
  reports: CrimeReport[];
  center: [number, number];
  zoom: number;
  onCenterChange: (center: [number, number]) => void;
}

export const LeafletMap = ({ reports, center, zoom, onCenterChange }: LeafletMapProps) => {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <MapUpdater center={center} zoom={zoom} />

        {/* User Location */}
        <Marker position={center} icon={userIcon}>
          <Popup>
            <div className="text-xs font-semibold text-gray-900">Your Location</div>
          </Popup>
        </Marker>

        {/* Crime Markers */}
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.lat, report.lng]}
            icon={createCrimeIcon(report.type, report.severity)}
            eventHandlers={{
              click: () => onCenterChange([report.lat, report.lng]),
            }}
          >
            <Popup>
              <PopupContent report={report} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </motion.div>
  );
};

export default LeafletMap;
