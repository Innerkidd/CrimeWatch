import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Check, X, Shield, ArrowUpDown, ChevronLeft, ChevronRight, CheckSquare, Square } from 'lucide-react';
import type { CrimeReport, Officer } from '../hooks/useAdminState';

interface ReportsTableProps {
  reports: CrimeReport[];
  officers: Officer[];
  onVerify: (id: string) => void;
  onReject: (id: string) => void;
  onAssign: (reportId: string, officerName: string) => void;
}

type SortField = 'id' | 'type' | 'dateTime' | 'severity' | 'status';
type SortOrder = 'asc' | 'desc';

export const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  officers,
  onVerify,
  onReject,
  onAssign,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState<SortField>('dateTime');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeAssignDropdown, setActiveAssignDropdown] = useState<string | null>(null);
  
  const itemsPerPage = 5;

  // Sorting Handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter & Search
  const filteredAndSortedReports = reports
    .filter((rep) => {
      const matchSearch =
        rep.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.reporter.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchSeverity = filterSeverity === 'All' || rep.severity === filterSeverity;
      const matchStatus = filterStatus === 'All' || rep.status === filterStatus;

      return matchSearch && matchSeverity && matchStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'id' || sortField === 'type' || sortField === 'dateTime') {
        comparison = a[sortField].localeCompare(b[sortField]);
      } else if (sortField === 'severity') {
        const priorityMap = { High: 3, Medium: 2, Low: 1 };
        comparison = priorityMap[a.severity] - priorityMap[b.severity];
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Pagination Math
  const totalPages = Math.ceil(filteredAndSortedReports.length / itemsPerPage);
  const paginatedReports = filteredAndSortedReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Bulk Selection Handlers
  const handleToggleSelectAll = () => {
    if (selectedIds.length === paginatedReports.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedReports.map((r) => r.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkVerify = () => {
    selectedIds.forEach((id) => onVerify(id));
    setSelectedIds([]);
  };

  const handleBulkReject = () => {
    selectedIds.forEach((id) => onReject(id));
    setSelectedIds([]);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'Medium':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
    }
  };

  const getStatusBadge = (status: string) => {
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

  return (
    <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
      {/* Table Filters header */}
      <div className="p-6 border-b border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Crime Reports Database</h3>
          <p className="text-slate-500 text-xs mt-0.5">Filter, sort and manage neighborhood submissions</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Severity filter */}
          <select
            value={filterSeverity}
            onChange={(e) => {
              setFilterSeverity(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Severity</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Pending Verification">Pending</option>
            <option value="Verified">Verified</option>
            <option value="Active Investigation">Active Investigation</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Bulk actions notification */}
      {selectedIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-indigo-950/40 border-b border-indigo-800/30 px-6 py-3.5 flex items-center justify-between text-xs text-indigo-300"
        >
          <span className="font-semibold">{selectedIds.length} reports selected</span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkReject}
              className="px-3 py-1.5 border border-rose-800 bg-rose-950/20 rounded-md text-rose-400 font-bold hover:bg-rose-950/40 transition-colors"
            >
              Bulk Reject
            </button>
            <button
              onClick={handleBulkVerify}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-bold transition-colors"
            >
              Bulk Verify
            </button>
          </div>
        </motion.div>
      )}

      {/* Table Data */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-850 bg-slate-900/30 text-slate-400 text-xs font-semibold uppercase tracking-wider select-none">
              <th className="px-6 py-4 w-10">
                <button onClick={handleToggleSelectAll} className="text-slate-500 hover:text-slate-350 focus:outline-none">
                  {selectedIds.length === paginatedReports.length && paginatedReports.length > 0 ? (
                    <CheckSquare className="w-4.5 h-4.5 text-indigo-500" />
                  ) : (
                    <Square className="w-4.5 h-4.5" />
                  )}
                </button>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1.5">
                  <span>Report ID</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('type')}>
                <div className="flex items-center gap-1.5">
                  <span>Incident</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="px-6 py-4">Reporter</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('dateTime')}>
                <div className="flex items-center gap-1.5">
                  <span>Date & Time</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('severity')}>
                <div className="flex items-center gap-1.5">
                  <span>Severity</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-1.5">
                  <span>Status</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="px-6 py-4">Assigned Officer</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-slate-300 text-sm">
            {paginatedReports.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center text-slate-500">
                  No records match the current filters.
                </td>
              </tr>
            ) : (
              paginatedReports.map((rep) => {
                const isChecked = selectedIds.includes(rep.id);
                return (
                  <tr key={rep.id} className={`hover:bg-slate-900/30 transition-colors ${isChecked ? 'bg-indigo-950/10' : ''}`}>
                    <td className="px-6 py-4">
                      <button onClick={() => handleToggleSelect(rep.id)} className="text-slate-500 hover:text-slate-350 focus:outline-none">
                        {isChecked ? (
                          <CheckSquare className="w-4.5 h-4.5 text-indigo-500" />
                        ) : (
                          <Square className="w-4.5 h-4.5" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-indigo-400 font-bold">{rep.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-100">{rep.type}</td>
                    <td className="px-6 py-4">{rep.reporter}</td>
                    <td className="px-6 py-4 max-w-[200px] truncate" title={rep.location}>{rep.location}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">{rep.dateTime}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getSeverityBadge(rep.severity)}`}>
                        {rep.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${getStatusBadge(rep.status)}`}>
                        {rep.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {rep.assignedOfficer ? (
                        <div className="flex items-center gap-1.5 text-xs text-slate-200">
                          <Shield className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{rep.assignedOfficer}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 font-medium italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Verify */}
                        {rep.status === 'Pending Verification' && (
                          <>
                            <button
                              onClick={() => onVerify(rep.id)}
                              className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:border-emerald-600/30 hover:bg-emerald-950/20 text-slate-400 hover:text-emerald-400 transition-all"
                              title="Verify Report"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onReject(rep.id)}
                              className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:border-rose-600/30 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 transition-all"
                              title="Reject Report"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {/* Assign Officer */}
                        {(rep.status === 'Verified' || rep.status === 'Pending Verification') && (
                          <div className="relative">
                            <button
                              onClick={() => setActiveAssignDropdown(activeAssignDropdown === rep.id ? null : rep.id)}
                              className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:border-indigo-500/30 hover:bg-indigo-950/20 text-slate-400 hover:text-indigo-400 transition-all"
                              title="Assign Officer"
                            >
                              <Shield className="w-4 h-4" />
                            </button>
                            
                            {activeAssignDropdown === rep.id && (
                              <div className="absolute right-0 bottom-8 bg-slate-950 border border-slate-800 rounded-xl p-2 w-52 shadow-2xl z-30 space-y-0.5 text-left">
                                <span className="text-[10px] text-slate-500 font-bold block px-2 py-1 uppercase tracking-wider border-b border-slate-900 mb-1">
                                  Select Officer
                                </span>
                                {officers.filter(o => o.status === 'Online').map((off) => (
                                  <button
                                    key={off.id}
                                    onClick={() => {
                                      onAssign(rep.id, off.name);
                                      setActiveAssignDropdown(null);
                                    }}
                                    className="w-full text-left px-2 py-1.5 hover:bg-slate-900 text-xs rounded text-slate-300 hover:text-indigo-400 flex justify-between"
                                  >
                                    <span>{off.name}</span>
                                    <span className="text-[10px] text-slate-500">({off.assignedCases} cases)</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* View incident info popup */}
                        <button
                          onClick={() => alert(`Details for ${rep.id}:\n\nType: ${rep.type}\nLocation: ${rep.location}\nReporter: ${rep.reporter}\nDescription: ${rep.description}`)}
                          className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:border-cyan-500/30 hover:bg-cyan-950/20 text-slate-400 hover:text-cyan-400 transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-850 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-semibold">
            Showing Page {currentPage} of {totalPages} ({filteredAndSortedReports.length} total)
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReportsTable;
