import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  RefreshCw,
  Navigation,
  Maximize2,
  MapPin,
  Clock,
  AlertTriangle,
  FileText,
  ChevronRight,
  X,
  Loader2,
} from 'lucide-react';
import {
  mockCrimeIncidents,
  mockPoliceStations,
  mockOfficerPatrols,
  crimeTypeLabels,
  severityColors,
  statusColors,
  type CrimeIncident,
  type CrimeType,
  type Severity,
  type ReportStatus,
} from '../data/policeMapData';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createCrimeIcon = (severity: Severity) => {
  const color = severityColors[severity];
  return L.divIcon({
    className: 'crime-marker',
    html: `
      <div style="position:relative;width:28px;height:28px;">
        <div style="position:absolute;inset:0;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 0 12px ${color}80;"></div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(45deg);width:8px;height:8px;background:white;border-radius:50%;"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
};

const stationIcon = L.divIcon({
  className: 'station-marker',
  html: `
    <div style="position:relative;width:32px;height:32px;">
      <div style="position:absolute;inset:0;background:#1E293B;border-radius:50%;border:3px solid #475569;box-shadow:0 0 12px rgba(71,85,105,0.5);display:flex;align-items:center;justify-content:center;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2"><path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 0V4h6v3m0 0v1a3 3 0 006 0V7M6 21V10m6 11V10m6 11V10"/></svg>
      </div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const officerIcon = (status: string) => {
  const color = status === 'responding' ? '#F59E0B' : status === 'on_scene' ? '#EF4444' : '#3B82F6';
  return L.divIcon({
    className: 'officer-marker',
    html: `
      <div style="position:relative;width:24px;height:24px;">
        <div style="position:absolute;inset:0;background:${color};border-radius:50%;border:2px solid white;box-shadow:0 0 10px ${color}80;"></div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:8px;height:8px;background:white;border-radius:50%;"></div>
        <div style="position:absolute;inset:-6px;border:2px solid ${color}40;border-radius:50%;animation:officer-pulse 2s ease-out infinite;"></div>
      </div>
      <style>@keyframes officer-pulse{0%{transform:scale(1);opacity:0.8}100%{transform:scale(2);opacity:0}}</style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const userIcon = L.divIcon({
  className: 'user-marker',
  html: `
    <div style="position:relative;width:20px;height:20px;">
      <div style="position:absolute;inset:0;background:#3B82F6;border-radius:50%;border:3px solid white;box-shadow:0 2px 12px rgba(59,130,246,0.6);"></div>
      <div style="position:absolute;inset:-8px;border:2px solid rgba(59,130,246,0.3);border-radius:50%;animation:user-pulse 2s ease-out infinite;"></div>
    </div>
    <style>@keyframes user-pulse{0%{transform:scale(1);opacity:0.8}100%{transform:scale(2.5);opacity:0}}</style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface MapUpdaterProps {
  center: [number, number];
  zoom: number;
  fly?: boolean;
}

const MapUpdater = ({ center, zoom, fly = false }: MapUpdaterProps) => {
  const map = useMap();
  useEffect(() => {
    if (fly) {
      map.flyTo(center, zoom, { duration: 1.5 });
    } else {
      map.setView(center, zoom);
    }
  }, [center, zoom, map, fly]);
  return null;
};

interface PoliceLiveMapProps {
  onOpenFullMap?: () => void;
}

export const PoliceLiveMap = ({ onOpenFullMap }: PoliceLiveMapProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<CrimeType | 'all'>('all');
  const [filterSeverity, setFilterSeverity] = useState<Severity | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<ReportStatus | 'all'>('all');
  const [selectedIncident, setSelectedIncident] = useState<CrimeIncident | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.006]);
  const [mapZoom, setMapZoom] = useState(13);
  const [showFilters, setShowFilters] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredIncidents = useMemo(() => {
    return mockCrimeIncidents.filter((incident) => {
      const matchesType = filterType === 'all' || incident.type === filterType;
      const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
      const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
      const matchesSearch = searchQuery === '' ||
        incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSeverity && matchesStatus && matchesSearch;
    });
  }, [filterType, filterSeverity, filterStatus, searchQuery]);

  const stats = useMemo(() => {
    const total = filteredIncidents.length;
    const pending = filteredIncidents.filter((i) => i.status === 'reported').length;
    const investigating = filteredIncidents.filter((i) => i.status === 'investigating').length;
    const resolved = filteredIncidents.filter((i) => i.status === 'resolved').length;
    const highPriority = filteredIncidents.filter((i) => i.severity === 'high').length;
    return { total, pending, investigating, resolved, highPriority };
  }, [filteredIncidents]);

  const handleLocate = useCallback(() => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(loc);
          setMapCenter(loc);
          setMapZoom(15);
          setIsLocating(false);
        },
        () => {
          setUserLocation(null);
          setMapCenter([40.7128, -74.006]);
          setMapZoom(13);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  }, []);

  const handleCenterOnIncident = useCallback((incident: CrimeIncident) => {
    setSelectedIncident(incident);
    setMapCenter([incident.lat, incident.lng]);
    setMapZoom(16);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Statistics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total Incidents', value: stats.total, color: 'text-slate-100', bg: 'bg-slate-800/50' },
          { label: 'Pending', value: stats.pending, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Investigating', value: stats.investigating, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Resolved', value: stats.resolved, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'High Priority', value: stats.highPriority, color: 'text-red-400', bg: 'bg-red-500/10' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} border border-slate-800 rounded-xl p-3 text-center`}>
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search incidents, locations, IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
            showFilters ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400' : 'bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-amber-400'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          Filters
        </button>

        {/* Locate Me */}
        <button
          onClick={handleLocate}
          disabled={isLocating}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-blue-400 transition-all disabled:opacity-50"
        >
          {isLocating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Navigation className="w-3.5 h-3.5" />}
          Locate Me
        </button>

        {/* Refresh */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-amber-400 transition-all"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Open Full Map */}
        {onOpenFullMap && (
          <button
            onClick={onOpenFullMap}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30 transition-all"
          >
            <MapPin className="w-3.5 h-3.5" />
            Open Full Map
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-3 p-3 bg-slate-900/50 border border-slate-800 rounded-xl">
              {/* Crime Type */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Type</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['all', 'theft', 'robbery', 'assault', 'accident', 'vandalism', 'missing_person', 'cyber_crime', 'burglary', 'drug_offense'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        filterType === type
                          ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400'
                          : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {type === 'all' ? 'All' : crimeTypeLabels[type]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Severity</span>
                <div className="flex gap-1.5">
                  {(['all', 'high', 'medium', 'low'] as const).map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setFilterSeverity(sev)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        filterSeverity === sev
                          ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400'
                          : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {sev === 'all' ? 'All' : sev.charAt(0).toUpperCase() + sev.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status</span>
                <div className="flex gap-1.5">
                  {(['all', 'reported', 'investigating', 'resolved'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        filterStatus === status
                          ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400'
                          : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => { setFilterType('all'); setFilterSeverity('all'); setFilterStatus('all'); setSearchQuery(''); }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all self-end"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map + Feed Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Map Container */}
        <div className="xl:col-span-2 bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative" style={{ height: isFullscreen ? 'calc(100vh - 200px)' : '500px' }}>
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              className="w-full h-full"
              zoomControl={false}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              <ZoomControl position="topright" />
              <MapUpdater center={mapCenter} zoom={mapZoom} fly={!!selectedIncident || isLocating} />

              {/* User Location */}
              {userLocation && (
                <>
                  <Circle
                    center={userLocation}
                    radius={100}
                    pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.08, weight: 1, opacity: 0.3 }}
                  />
                  <Marker position={userLocation} icon={userIcon}>
                    <Popup>
                      <div className="text-xs font-semibold text-gray-900">Your Location</div>
                    </Popup>
                  </Marker>
                </>
              )}

              {/* Police Stations */}
              {mockPoliceStations.map((station) => (
                <Marker
                  key={station.id}
                  position={[station.lat, station.lng]}
                  icon={stationIcon}
                >
                  <Popup>
                    <div className="min-w-[200px] p-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 0V4h6v3m0 0v1a3 3 0 006 0V7M6 21V10m6 11V10m6 11V10"/></svg>
                        </div>
                        <span className="font-bold text-sm text-gray-900">{station.name}</span>
                      </div>
                      <p className="text-xs text-gray-500">{station.address}</p>
                      <p className="text-[10px] text-gray-400 mt-1">Station ID: {station.id}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Officer Patrols */}
              {mockOfficerPatrols.map((officer) => (
                <Marker
                  key={officer.id}
                  position={[officer.lat, officer.lng]}
                  icon={officerIcon(officer.status)}
                >
                  <Popup>
                    <div className="min-w-[180px] p-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: officer.status === 'responding' ? '#F59E0B' : officer.status === 'on_scene' ? '#EF4444' : '#3B82F6' }} />
                        <span className="font-bold text-sm text-gray-900">{officer.name}</span>
                      </div>
                      <p className="text-[10px] text-gray-500">Badge: {officer.badge}</p>
                      <p className="text-[10px] text-gray-500 capitalize">Status: {officer.status.replace('_', ' ')}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Crime Incidents */}
              {filteredIncidents.map((incident) => (
                <Marker
                  key={incident.id}
                  position={[incident.lat, incident.lng]}
                  icon={createCrimeIcon(incident.severity)}
                  eventHandlers={{
                    click: () => setSelectedIncident(incident),
                  }}
                >
                  <Popup>
                    <div className="min-w-[260px] max-w-[300px] p-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: severityColors[incident.severity] }} />
                        <span className="font-bold text-sm text-gray-900">{incident.title}</span>
                      </div>
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                          <FileText className="w-3 h-3" />
                          {incident.id} &middot; {crimeTypeLabels[incident.type]}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {incident.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                          <Clock className="w-3 h-3" />
                          {incident.date} at {incident.time}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                          <AlertTriangle className="w-3 h-3" />
                          Officer: {incident.assignedOfficer}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full uppercase text-white" style={{ backgroundColor: severityColors[incident.severity] }}>
                          {incident.severity}
                        </span>
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full uppercase text-white" style={{ backgroundColor: statusColors[incident.status] }}>
                          {incident.status}
                        </span>
                      </div>
                      <button
                        onClick={() => navigate(`/crime/${incident.id}`)}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        <FileText className="w-3 h-3" />
                        View Full Report
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-slate-950/90 backdrop-blur border border-slate-800 rounded-xl p-3">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Legend</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-[10px] text-slate-400">High Priority</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-[10px] text-slate-400">Under Investigation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-400">Resolved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] text-slate-400">Police Officer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <span className="text-[10px] text-slate-400">Police Station</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] text-slate-400">Your Location</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Incident Feed */}
        <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl shadow-xl flex flex-col" style={{ maxHeight: isFullscreen ? 'calc(100vh - 200px)' : '564px' }}>
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100">Live Incident Feed</h3>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">{filteredIncidents.length} incidents</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredIncidents.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No incidents match filters</p>
              </div>
            ) : (
              filteredIncidents.map((incident) => (
                <button
                  key={incident.id}
                  onClick={() => handleCenterOnIncident(incident)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedIncident?.id === incident.id
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: severityColors[incident.severity] }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-200 truncate">{incident.title}</p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{incident.location}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="px-1.5 py-0.5 text-[8px] font-bold rounded uppercase text-white" style={{ backgroundColor: statusColors[incident.status] }}>
                          {incident.status}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {incident.time}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0 mt-1" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceLiveMap;
