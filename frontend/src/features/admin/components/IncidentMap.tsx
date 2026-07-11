import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Shield, Filter, X } from 'lucide-react';
import type { CrimeReport, Officer } from '../hooks/useAdminState';

interface IncidentMapProps {
  reports: CrimeReport[];
  officers: Officer[];
  onVerify: (id: string) => void;
  onReject: (id: string) => void;
  onAssign: (reportId: string, officerName: string) => void;
}

export const IncidentMap: React.FC<IncidentMapProps> = ({
  reports,
  officers,
  onVerify,
  onReject,
  onAssign,
}) => {
  const [filterType, setFilterType] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPin, setSelectedPin] = useState<CrimeReport | null>(null);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);

  // Filters application
  const filteredReports = reports.filter((rep) => {
    if (filterType !== 'All' && !rep.type.toLowerCase().includes(filterType.toLowerCase())) return false;
    if (filterSeverity !== 'All' && rep.severity !== filterSeverity) return false;
    if (filterStatus !== 'All' && rep.status !== filterStatus) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'Medium':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'Active Investigation':
        return 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
      case 'Verified':
        return 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30';
      case 'Rejected':
        return 'bg-slate-800 text-slate-400 border border-slate-700';
      default:
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    }
  };

  // Mock officer location percentage positions on map (Australia/Sydney area grid)
  const mockOfficerPositions = [
    { name: 'Officer Sarah Connor', x: 25, y: 35 },
    { name: 'Officer Alex Mercer', x: 70, y: 65 },
    { name: 'Officer Carter Harrison', x: 55, y: 20 },
  ];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col lg:flex-row h-[600px] shadow-2xl">
      {/* Sidebar Filter Panel */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/80 p-6 flex flex-col gap-6">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-400" />
            <span>Map Controls</span>
          </h3>
          <p className="text-slate-500 text-xs mt-1">Filter active display layers</p>
        </div>

        <div className="space-y-4 flex-1">
          {/* Crime Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Crime Category</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Categories</option>
              <option value="Theft">Theft / Burglary</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Assault">Assault</option>
              <option value="Suspicious">Suspicious Activity</option>
              <option value="Noise">Noise Complaint</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity Layer</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Severities</option>
              <option value="High">High Severity</option>
              <option value="Medium">Medium Severity</option>
              <option value="Low">Low Severity</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Case Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Verification">Pending Verification</option>
              <option value="Verified">Verified</option>
              <option value="Active Investigation">Active Investigation</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="border-t border-slate-900 pt-4 text-xs space-y-2.5">
          <span className="font-bold text-slate-400 block mb-1">Layer Legend</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-slate-400">High Threat Area</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="text-slate-400">Report Pin</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Police Unit (Active)</span>
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center">
        {/* Mock Map Vector Background */}
        <svg className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Waterway */}
          <path d="M 0,100 C 200,80 400,220 600,180 C 800,140 900,300 1200,280 L 1200,600 L 0,600 Z" fill="#0f1f38" opacity="0.4" />
          <path d="M 0,100 C 200,80 400,220 600,180 C 800,140 900,300 1200,280" fill="none" stroke="#1d4ed8" strokeWidth="6" opacity="0.3" />
          
          {/* Green Parks */}
          <rect x="250" y="380" width="180" height="120" rx="15" fill="#065f46" opacity="0.15" />
          <rect x="800" y="50" width="220" height="140" rx="20" fill="#065f46" opacity="0.15" />

          {/* Grid lines/Streets */}
          {/* Avenues */}
          <line x1="100" y1="0" x2="100" y2="600" stroke="#1e293b" strokeWidth="3" opacity="0.4" />
          <line x1="300" y1="0" x2="300" y2="600" stroke="#1e293b" strokeWidth="3" opacity="0.4" />
          <line x1="500" y1="0" x2="500" y2="600" stroke="#1e293b" strokeWidth="3" opacity="0.4" />
          <line x1="700" y1="0" x2="700" y2="600" stroke="#1e293b" strokeWidth="3" opacity="0.4" />
          <line x1="900" y1="0" x2="900" y2="600" stroke="#1e293b" strokeWidth="3" opacity="0.4" />
          <line x1="1100" y1="0" x2="1100" y2="600" stroke="#1e293b" strokeWidth="3" opacity="0.4" />

          {/* Streets */}
          <line x1="0" y1="120" x2="1200" y2="120" stroke="#1e293b" strokeWidth="3" opacity="0.4" />
          <line x1="0" y1="240" x2="1200" y2="240" stroke="#1e293b" strokeWidth="3" opacity="0.4" />
          <line x1="0" y1="360" x2="1200" y2="360" stroke="#1e293b" strokeWidth="3" opacity="0.4" />
          <line x1="0" y1="480" x2="1200" y2="480" stroke="#1e293b" strokeWidth="3" opacity="0.4" />
        </svg>

        {/* Heatmap overlay simulations */}
        <div className="absolute top-1/3 left-1/4 w-36 h-36 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        {/* Reports markers */}
        {filteredReports.map((rep) => {
          const isSelected = selectedPin?.id === rep.id;
          const iconColor = rep.severity === 'High' ? 'text-red-500' : rep.severity === 'Medium' ? 'text-amber-500' : 'text-indigo-400';
          
          return (
            <button
              key={rep.id}
              onClick={() => {
                setSelectedPin(rep);
                setShowAssignDropdown(false);
              }}
              style={{ left: `${rep.coordinates.x}%`, top: `${rep.coordinates.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-10"
            >
              <div className={`relative flex items-center justify-center p-2 rounded-full border transition-all duration-300 ${isSelected ? 'scale-125 bg-slate-900 border-slate-700 shadow-indigo-500/20 shadow-lg' : 'bg-slate-950/80 border-slate-800 hover:border-slate-650 hover:bg-slate-900'}`}>
                <MapPin className={`w-5 h-5 ${iconColor}`} />
                {rep.status === 'Pending Verification' && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                )}
              </div>
            </button>
          );
        })}

        {/* Online Officer positions */}
        {mockOfficerPositions.map((pos, index) => (
          <div
            key={index}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer"
          >
            <div className="bg-emerald-950/90 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5 rounded-lg shadow-xl font-bold uppercase scale-75 tracking-wider mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {pos.name}
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-900/90 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg hover:scale-105 transition-all">
              <Shield className="w-4 h-4" />
            </div>
          </div>
        ))}

        {/* Selected Incident Drawer / Overlay */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-6 left-6 right-6 bg-slate-950/95 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between gap-6 z-20"
            >
              {/* Left detail info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getSeverityColor(selectedPin.severity)}`}>
                    {selectedPin.severity} Severity
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(selectedPin.status)}`}>
                    {selectedPin.status}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{selectedPin.id}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-100">{selectedPin.type}</h4>
                  <p className="text-slate-400 text-xs flex items-center gap-1.5 mt-0.5">
                    <Navigation className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{selectedPin.location}</span>
                  </p>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed max-w-2xl bg-slate-900/50 border border-slate-900 p-3 rounded-lg">
                  {selectedPin.description}
                </p>
              </div>

              {/* Right Action buttons */}
              <div className="flex flex-col justify-between items-end gap-4 min-w-[200px] border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                <button
                  onClick={() => setSelectedPin(null)}
                  className="p-1 text-slate-400 hover:text-slate-200 self-end"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-wrap gap-2 justify-end w-full">
                  {selectedPin.status === 'Pending Verification' && (
                    <>
                      <button
                        onClick={() => {
                          onReject(selectedPin.id);
                          setSelectedPin(null);
                        }}
                        className="px-3.5 py-2 border border-slate-800 hover:bg-slate-900 text-xs font-bold rounded-lg text-slate-400 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          onVerify(selectedPin.id);
                          setSelectedPin({ ...selectedPin, status: 'Verified' });
                        }}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-lg text-white transition-colors"
                      >
                        Verify Report
                      </button>
                    </>
                  )}

                  {(selectedPin.status === 'Verified' || selectedPin.status === 'Pending Verification') && (
                    <div className="relative w-full">
                      {showAssignDropdown ? (
                        <div className="absolute bottom-11 right-0 bg-slate-900 border border-slate-800 rounded-xl p-2 w-52 shadow-2xl z-30 space-y-1">
                          <span className="text-[10px] text-slate-500 font-bold block px-2 py-1 uppercase tracking-wider">Assign Officer</span>
                          {officers.filter(o => o.status === 'Online').map((off) => (
                            <button
                              key={off.id}
                              onClick={() => {
                                onAssign(selectedPin.id, off.name);
                                setSelectedPin({ ...selectedPin, status: 'Active Investigation', assignedOfficer: off.name });
                                setShowAssignDropdown(false);
                              }}
                              className="w-full text-left px-2 py-1.5 hover:bg-slate-950 text-xs rounded text-slate-200 hover:text-indigo-400 flex justify-between"
                            >
                              <span>{off.name}</span>
                              <span className="text-[10px] text-slate-500">({off.assignedCases} cases)</span>
                            </button>
                          ))}
                        </div>
                      ) : null}
                      <button
                        onClick={() => setShowAssignDropdown(!showAssignDropdown)}
                        className="w-full px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-lg text-white transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Shield className="w-4 h-4" />
                        <span>{selectedPin.assignedOfficer ? 'Reassign Officer' : 'Assign Officer'}</span>
                      </button>
                    </div>
                  )}

                  {selectedPin.assignedOfficer && (
                    <div className="text-right text-xs">
                      <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Assigned Officer</span>
                      <span className="text-slate-200 font-semibold">{selectedPin.assignedOfficer}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default IncidentMap;
