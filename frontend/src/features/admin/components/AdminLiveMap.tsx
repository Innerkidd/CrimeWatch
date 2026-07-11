import { useState, useCallback, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  FileText,
  ChevronRight,
  AlertTriangle,
  Shield,
  Navigation,
} from 'lucide-react';
import type { CrimeReport, Officer } from '../hooks/useAdminState';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'High': return '#EF4444';
    case 'Medium': return '#F59E0B';
    default: return '#6366F1';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Resolved': return '#22C55E';
    case 'Active Investigation': return '#EF4444';
    case 'Verified': return '#06B6D4';
    case 'Rejected': return '#6B7280';
    default: return '#F59E0B';
  }
};

const createCrimeIcon = (severity: string) => {
  const color = getSeverityColor(severity);
  return L.divIcon({
    className: 'admin-crime-marker',
    html: `
      <div style="position:relative;width:26px;height:26px;">
        <div style="position:absolute;inset:0;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 0 12px ${color}80;"></div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(45deg);width:7px;height:7px;background:white;border-radius:50%;"></div>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -26],
  });
};

const officerIcon = L.divIcon({
  className: 'admin-officer-marker',
  html: `
    <div style="position:relative;width:22px;height:22px;">
      <div style="position:absolute;inset:0;background:#22C55E;border-radius:50%;border:2px solid white;box-shadow:0 0 10px rgba(34,197,94,0.6);"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:7px;height:7px;background:white;border-radius:50%;"></div>
    </div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const userIcon = L.divIcon({
  className: 'admin-user-marker',
  html: `
    <div style="position:relative;width:18px;height:18px;">
      <div style="position:absolute;inset:0;background:#3B82F6;border-radius:50%;border:3px solid white;box-shadow:0 2px 10px rgba(59,130,246,0.6);"></div>
      <div style="position:absolute;inset:-7px;border:2px solid rgba(59,130,246,0.3);border-radius:50%;animation:user-pulse 2s ease-out infinite;"></div>
    </div>
    <style>@keyframes user-pulse{0%{transform:scale(1);opacity:0.8}100%{transform:scale(2.5);opacity:0}}</style>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
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

interface AdminLiveMapProps {
  reports: CrimeReport[];
  officers: Officer[];
}

const mockOfficerPositions = [
  { name: 'Officer Sarah Connor', badge: 'BADGE-8839', lat: 40.7130, lng: -74.0058, status: 'Online' as const },
  { name: 'Officer Alex Mercer', badge: 'BADGE-4428', lat: 40.7150, lng: -74.0032, status: 'Online' as const },
  { name: 'Officer Carter Harrison', badge: 'BADGE-9912', lat: 40.7112, lng: -74.0085, status: 'Online' as const },
];

const reportToLatLng = (report: CrimeReport): [number, number] => {
  const baseLat = 40.7128;
  const baseLng = -74.006;
  const lat = baseLat + (report.coordinates.y - 50) * 0.001;
  const lng = baseLng + (report.coordinates.x - 50) * 0.001;
  return [lat, lng];
};

export const AdminLiveMap: React.FC<AdminLiveMapProps> = ({ reports, officers }) => {
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.006]);
  const [mapZoom, setMapZoom] = useState(13);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedReport, setSelectedReport] = useState<CrimeReport | null>(null);

  const activeReports = useMemo(() => {
    return reports.filter((r) => r.status !== 'Rejected');
  }, [reports]);

  const onlineOfficers = useMemo(() => {
    return officers.filter((o) => o.status === 'Online');
  }, [officers]);

  const handleLocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(loc);
          setMapCenter(loc);
          setMapZoom(15);
        },
        () => {
          setMapCenter([40.7128, -74.006]);
          setMapZoom(13);
        }
      );
    }
  }, []);

  return (
    <div className="bg-cyber-void/80 border border-cyber-cyan/15 rounded-none overflow-hidden relative" style={{ height: '380px' }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="topright" />
        <MapUpdater center={mapCenter} zoom={mapZoom} />

        {userLocation && (
          <>
            <Circle
              center={userLocation}
              radius={100}
              pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.08, weight: 1, opacity: 0.3 }}
            />
            <Marker position={userLocation} icon={userIcon}>
              <Popup><div className="text-xs font-semibold">Your Location</div></Popup>
            </Marker>
          </>
        )}

        {mockOfficerPositions.map((officer, idx) => (
          <Marker
            key={idx}
            position={[officer.lat, officer.lng]}
            icon={officerIcon}
          >
            <Popup>
              <div className="min-w-[160px] p-1">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  <span className="font-bold text-xs">{officer.name}</span>
                </div>
                <p className="text-[10px] text-gray-500">{officer.badge}</p>
                <p className="text-[10px] text-emerald-500 font-semibold">Online</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {activeReports.map((report) => {
          const [lat, lng] = reportToLatLng(report);
          return (
            <Marker
              key={report.id}
              position={[lat, lng]}
              icon={createCrimeIcon(report.severity)}
              eventHandlers={{
                click: () => setSelectedReport(report),
              }}
            >
              <Popup>
                <div className="min-w-[220px] max-w-[260px] p-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getSeverityColor(report.severity) }} />
                    <span className="font-bold text-xs">{report.type}</span>
                  </div>
                  <div className="space-y-1 mb-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <FileText className="w-3 h-3" />
                      {report.id}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {report.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <Clock className="w-3 h-3" />
                      {report.dateTime}
                    </div>
                    {report.assignedOfficer && (
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                        <AlertTriangle className="w-3 h-3" />
                        {report.assignedOfficer}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-1.5 py-0.5 text-[8px] font-bold rounded text-white" style={{ backgroundColor: getSeverityColor(report.severity) }}>
                      {report.severity}
                    </span>
                    <span className="px-1.5 py-0.5 text-[8px] font-bold rounded text-white" style={{ backgroundColor: getStatusColor(report.status) }}>
                      {report.status}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/crime/${report.id}`)}
                    className="w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-cyber-cyan hover:bg-cyber-green text-cyber-void text-[10px] font-bold rounded transition-colors"
                  >
                    <FileText className="w-3 h-3" />
                    View Report
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Locate Me Button */}
      <button
        onClick={handleLocate}
        className="absolute bottom-4 right-4 z-[1000] w-9 h-9 bg-cyber-void/90 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan hover:text-cyber-green hover:border-cyber-green/50 transition-all cursor-pointer"
        title="Locate Me"
      >
        <Navigation className="w-4 h-4" />
      </button>

      {/* Mini Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-cyber-void/90 border border-cyber-cyan/20 p-2.5 font-tech text-[9px] uppercase tracking-wider">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-slate-400">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-slate-400">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-slate-400">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-400">Officer</span>
          </div>
        </div>
      </div>

      {/* Map Title Overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-cyber-void/90 border border-cyber-cyan/20 px-3 py-1.5 font-tech">
        <span className="text-[10px] text-cyber-cyan glow-cyan font-bold uppercase tracking-wider">LIVE_CRIME_GRID</span>
      </div>
    </div>
  );
};

export default AdminLiveMap;
