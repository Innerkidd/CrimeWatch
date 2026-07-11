import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Bell, Search, SlidersHorizontal, ChevronLeft } from 'lucide-react';
import { LeafletMap } from '../components/LeafletMap';
import { MapFilters } from '../components/MapFilters';
import { IncidentFeed } from '../components/IncidentFeed';
import { FloatingActions } from '../components/FloatingActions';
import { MapLegend } from '../components/MapLegend';
import { MapStats } from '../components/MapStats';
import {
  mockCrimeReports,
  type CrimeReport,
  type CrimeType,
  type Severity,
  type ReportStatus,
} from '../data/mockData';

interface FilterState {
  crimeTypes: CrimeType[];
  severities: Severity[];
  statuses: ReportStatus[];
  timeRange: string;
}

export const MapPage = () => {
  const [filters, setFilters] = useState<FilterState>({
    crimeTypes: [],
    severities: [],
    statuses: [],
    timeRange: '',
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [feedOpen, setFeedOpen] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.006]);
  const [mapZoom, setMapZoom] = useState(13);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = useMemo(() => {
    return mockCrimeReports.filter((report) => {
      if (filters.crimeTypes.length > 0 && !filters.crimeTypes.includes(report.type)) return false;
      if (filters.severities.length > 0 && !filters.severities.includes(report.severity)) return false;
      if (filters.statuses.length > 0 && !filters.statuses.includes(report.status)) return false;
      return true;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const total = filteredReports.length;
    const active = filteredReports.filter((r) => r.status !== 'resolved').length;
    const resolved = filteredReports.filter((r) => r.status === 'resolved').length;
    const highRisk = filteredReports.filter((r) => r.severity === 'high').length;
    return { total, active, resolved, highRisk };
  }, [filteredReports]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleLocate = useCallback(() => {
    setMapCenter([40.7128, -74.006]);
    setMapZoom(15);
  }, []);

  const handleSelectReport = useCallback((report: CrimeReport) => {
    setSelectedId(report.id);
    setMapCenter([report.lat, report.lng]);
    setMapZoom(15);
  }, []);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || user.email?.split('@')[0] || 'User';

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col -m-4 lg:-m-6">
      {/* Top Navbar */}
      <div className="h-14 border-b border-cyber-cyan/15 bg-cyber-void/80 backdrop-blur px-4 flex items-center justify-between gap-3 flex-shrink-0 z-[1100]">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 text-xs font-bold text-cyber-cyan hover:text-white transition-colors uppercase tracking-wider font-tech"
          >
            <ChevronLeft className="w-4 h-4 text-cyber-cyan" />
            <span className="hidden sm:inline">BACK_TO_DASHBOARD</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyber-cyan glow-cyan animate-pulse" />
            <span className="font-bold text-xs tracking-widest font-orbitron uppercase text-white">
              CRIME<span className="text-cyber-cyan glow-cyan">WATCH // COORD_GRID</span>
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm font-tech">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-cyan glow-cyan" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="CMD: SEARCH GEOLOCATION..."
              className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none pl-9 pr-4 py-1.5 text-xs text-cyber-cyan placeholder-cyber-cyan/40 outline-none focus:border-cyber-cyan/50 transition-all uppercase"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 font-tech">
          {/* Filter Toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`p-2 rounded-none transition-colors border cursor-pointer ${
              filtersOpen ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan glow-cyan' : 'border-cyber-cyan/20 text-slate-400 hover:text-cyber-cyan hover:bg-cyber-cyan/5'
            }`}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* Feed Toggle */}
          <button
            onClick={() => setFeedOpen(!feedOpen)}
            className={`hidden lg:block px-3 py-1.5 text-xs font-bold rounded-none transition-all cursor-pointer border ${
              feedOpen ? 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan glow-cyan' : 'text-slate-500 hover:text-cyber-cyan bg-cyber-void/80 border-cyber-cyan/20'
            }`}
          >
            LIVE_FEED_SYS
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-cyber-cyan hover:text-white rounded-none hover:bg-cyber-cyan/5 transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyber-pink rounded-full glow-pink" />
          </button>

          {/* Profile */}
          <div className="w-8 h-8 rounded-none bg-cyber-cyan/15 border border-cyber-cyan/35 flex items-center justify-center text-xs font-bold text-cyber-cyan glow-cyan">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Filters */}
        <AnimatePresence>
          {filtersOpen && (
            <MapFilters
              filters={filters}
              onChange={setFilters}
              onClose={() => setFiltersOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Map */}
        <div className="flex-1 relative">
          <LeafletMap
            reports={filteredReports}
            center={mapCenter}
            zoom={mapZoom}
            onCenterChange={setMapCenter}
          />

          {/* Map Stats */}
          <MapStats {...stats} />

          {/* Legend */}
          <MapLegend />

          {/* Floating Actions */}
          <FloatingActions
            onRefresh={handleRefresh}
            onLocate={handleLocate}
            loading={loading}
          />
        </div>

        {/* Incident Feed Panel */}
        <AnimatePresence>
          {feedOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 360, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block flex-shrink-0 overflow-hidden border-l border-white/5"
            >
              <IncidentFeed
                reports={filteredReports}
                onSelect={handleSelectReport}
                selectedId={selectedId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MapPage;
