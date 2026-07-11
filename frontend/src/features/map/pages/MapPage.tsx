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
      <div className="h-14 border-b border-white/5 bg-navy-950/80 backdrop-blur-xl px-4 flex items-center justify-between gap-3 flex-shrink-0 z-[1100]">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-sm tracking-wider">
              <span className="text-white">CRIME</span>
              <span className="text-blue-400">WATCH</span>
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`p-2 rounded-lg transition-colors ${
              filtersOpen ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* Feed Toggle */}
          <button
            onClick={() => setFeedOpen(!feedOpen)}
            className={`hidden lg:block px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              feedOpen ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white bg-white/5 border border-white/10'
            }`}
          >
            Live Feed
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Profile */}
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">
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
