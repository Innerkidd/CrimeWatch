import { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Search } from 'lucide-react';

// Fix Leaflet default icon
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const pinIcon = L.divIcon({
  className: 'report-pin',
  html: `
    <div style="position:relative;width:32px;height:32px;">
      <div style="position:absolute;inset:0;background:#EF4444;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.3);"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(45deg);width:10px;height:10px;background:white;border-radius:50%;"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface LocationPickerProps {
  lat: number;
  lng: number;
  address: string;
  onChange: (data: { lat: number; lng: number; address: string }) => void;
}

const MapClickHandler = ({ onPick }: { onPick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

export const LocationPicker = ({ lat, lng, address, onChange }: LocationPickerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [detecting, setDetecting] = useState(false);

  const handlePick = useCallback(
    (newLat: number, newLng: number) => {
      onChange({ lat: newLat, lng: newLng, address: `${newLat.toFixed(4)}, ${newLng.toFixed(4)}` });
    },
    [onChange]
  );

  const handleDetectLocation = useCallback(() => {
    setDetecting(true);
    // Simulate GPS detection
    setTimeout(() => {
      onChange({ lat: 40.7128, lng: -74.006, address: 'Downtown, Metro City' });
      setDetecting(false);
    }, 1500);
  }, [onChange]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        onChange({ lat: 40.7128 + Math.random() * 0.01, lng: -74.006 + Math.random() * 0.01, address: searchQuery });
      }
    },
    [searchQuery, onChange]
  );

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="flex gap-2">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search address or landmark..."
            className="w-full bg-navy-950/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </form>
        <button
          type="button"
          onClick={handleDetectLocation}
          disabled={detecting}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium rounded-xl hover:bg-blue-600/20 transition-colors disabled:opacity-50"
        >
          <Navigation className={`w-4 h-4 ${detecting ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{detecting ? 'Detecting...' : 'GPS'}</span>
        </button>
      </div>

      {/* Mini Map */}
      <div className="relative rounded-xl overflow-hidden border border-white/10" style={{ height: 200 }}>
        <MapContainer
          center={[lat, lng]}
          zoom={14}
          className="w-full h-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler onPick={handlePick} />
          <Marker position={[lat, lng]} icon={pinIcon} />
        </MapContainer>

        <div className="absolute bottom-2 left-2 z-[1000] glass-strong rounded-lg px-3 py-1.5 text-[11px] text-slate-300 flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-red-400" />
          Click map to set location
        </div>
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Latitude</label>
          <input
            type="text"
            value={lat.toFixed(6)}
            readOnly
            className="w-full bg-navy-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Longitude</label>
          <input
            type="text"
            value={lng.toFixed(6)}
            readOnly
            className="w-full bg-navy-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 font-mono"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Full Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => onChange({ lat, lng, address: e.target.value })}
          placeholder="Enter full address..."
          className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 transition-all"
        />
      </div>
    </div>
  );
};

export default LocationPicker;
