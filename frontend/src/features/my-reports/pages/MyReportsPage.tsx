import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, List } from 'lucide-react';
import { StatsCards } from '../components/StatsCards';
import { ReportFilters } from '../components/ReportFilters';
import { ReportsTable } from '../components/ReportsTable';
import { ReportCards } from '../components/ReportCards';
import { ProgressTracker } from '../components/ProgressTracker';
import { ActivityFeed } from '../components/ActivityFeed';
import { ReportActions } from '../components/ReportActions';
import { EmptyState } from '../components/EmptyState';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { ToastContainer, type ToastItem } from '@/shared/components/ui/Toast';
import {
  mockReports,
  mockActivity,
  type Report,
  type ReportStatus,
  type CrimeType,
  type Severity,
  statusConfig,
  crimeTypeLabels,
  severityConfig,
} from '../data/mockData';

const statusOrder: Record<string, number> = {
  pending: 0,
  verified: 1,
  investigating: 2,
  resolved: 3,
  rejected: 4,
};

const severityOrder: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export const MyReportsPage = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');
  const [crimeFilter, setCrimeFilter] = useState<CrimeType | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [sortBy, setSortBy] = useState('latest');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; reportId: string }>({ open: false, reportId: '' });

  const addToast = useCallback((type: ToastItem['type'], message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Filtered & sorted reports
  const filteredReports = useMemo(() => {
    let result = [...reports];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          crimeTypeLabels[r.crimeType].toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') result = result.filter((r) => r.status === statusFilter);
    if (crimeFilter !== 'all') result = result.filter((r) => r.crimeType === crimeFilter);
    if (severityFilter !== 'all') result = result.filter((r) => r.severity === severityFilter);

    if (dateFrom) result = result.filter((r) => r.dateReported >= dateFrom);
    if (dateTo) result = result.filter((r) => r.dateReported <= dateTo);

    if (sortBy === 'latest') result.sort((a, b) => b.dateReported.localeCompare(a.dateReported));
    else if (sortBy === 'oldest') result.sort((a, b) => a.dateReported.localeCompare(b.dateReported));
    else if (sortBy === 'status') result.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    else if (sortBy === 'severity') result.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return result;
  }, [reports, searchQuery, statusFilter, crimeFilter, severityFilter, sortBy, dateFrom, dateTo]);

  const selectedReportData = useMemo(
    () => reports.find((r) => r.id === selectedReport),
    [reports, selectedReport]
  );

  const handleDelete = useCallback((id: string) => {
    setDeleteModal({ open: true, reportId: id });
  }, []);

  const confirmDelete = useCallback(() => {
    setReports((prev) => prev.filter((r) => r.id !== deleteModal.reportId));
    setDeleteModal({ open: false, reportId: '' });
    addToast('success', 'Report deleted successfully.');
    if (selectedReport === deleteModal.reportId) setSelectedReport(null);
  }, [deleteModal.reportId, selectedReport, addToast]);

  return (
    <div className="space-y-6 text-left font-tech">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <ConfirmationModal
        isOpen={deleteModal.open}
        title="Delete Report"
        message="Are you sure you want to delete this report? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ open: false, reportId: '' })}
      />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3 font-orbitron tracking-wider">
            <FileText className="w-7 h-7 text-cyber-cyan glow-cyan animate-pulse" />
            SUBMITTED_SECTOR_LOGS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            // Telemetry and status of your node safety transmissions.
          </p>
        </div>

        <button
          onClick={() => navigate('/reports')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyber-cyan hover:bg-cyber-green text-xs font-bold text-cyber-void transition-all self-start rounded-none cursor-pointer chamfer-button shadow-[0_0_10px_rgba(0,212,255,0.25)] uppercase font-tech"
        >
          <Plus className="w-4 h-4 text-cyber-void" />
          INIT_NEW_TRANSMISSION
        </button>
      </motion.div>

      {/* Statistics */}
      <StatsCards reports={reports} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column — Reports List */}
        <div className="xl:col-span-2 space-y-4">
          {/* Filters */}
          <ReportFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            crimeFilter={crimeFilter}
            onCrimeChange={setCrimeFilter}
            severityFilter={severityFilter}
            onSeverityChange={setSeverityFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            dateFrom={dateFrom}
            onDateFromChange={setDateFrom}
            dateTo={dateTo}
            onDateToChange={setDateTo}
          />

          {/* Results count */}
          <div className="flex items-center justify-between font-tech text-[10px] tracking-wider uppercase text-slate-500">
            <span>
              // ACTIVE_RESULTS_COUNT: {filteredReports.length} SIGNAL_LOGS FOUND
            </span>
          </div>

          {/* Reports */}
          {isLoading ? (
            <LoadingSkeleton count={5} />
          ) : filteredReports.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <ReportsTable reports={filteredReports} onViewDetails={setSelectedReport} />
              <ReportCards reports={filteredReports} onViewDetails={setSelectedReport} />
            </>
          )}
        </div>

        {/* Right Column — Details & Activity */}
        <div className="space-y-4 text-left">
          {/* Selected Report Details */}
          {selectedReportData ? (
            <motion.div
              key={selectedReportData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hud-panel p-5 space-y-4 border border-cyber-cyan/15 bg-cyber-void/85 relative transition-all duration-300"
            >
              {/* HUD Brackets Corners */}
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />

              <div className="flex items-start justify-between gap-3 relative z-10 font-tech">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyber-cyan block">// REPORT_ID: {selectedReportData.id}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5 uppercase tracking-wide font-orbitron">{selectedReportData.title}</h3>
                </div>
                <ReportActions
                  status={selectedReportData.status}
                  reportId={selectedReportData.id}
                  onEdit={(id) => addToast('warning', `Edit mode initialized for ${id}`)}
                  onDelete={handleDelete}
                  onViewUpdates={(id) => addToast('success', `Opening updates for ${id}`)}
                  onAddEvidence={(id) => addToast('success', `Opening evidence upload for ${id}`)}
                  onDownload={(id) => addToast('success', `Downloading PDF report for ${id}`)}
                  onFeedback={(id) => addToast('success', `Opening feedback portal for ${id}`)}
                />
              </div>

              <div className="space-y-2 text-xs relative z-10 font-tech uppercase tracking-wide">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-450">CLASSIFICATION</span>
                  <span className="text-slate-200">{crimeTypeLabels[selectedReportData.crimeType]}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-450">LOCATION</span>
                  <span className="text-slate-200 text-right max-w-[200px] truncate">{selectedReportData.location}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-450">TIMESTAMP</span>
                  <span className="text-slate-200">{selectedReportData.dateReported}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-450">SEVERITY</span>
                  <span className={`px-2 py-0.5 text-[9px] font-bold border rounded-none ${severityConfig[selectedReportData.severity].bg} ${severityConfig[selectedReportData.severity].color}`}>
                    {severityConfig[selectedReportData.severity].label}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-450">SYS_STATUS</span>
                  <span className={`px-2.5 py-0.5 text-[9px] font-bold border rounded-none ${statusConfig[selectedReportData.status].bg} ${statusConfig[selectedReportData.status].color}`}>
                    {statusConfig[selectedReportData.status].label}
                  </span>
                </div>
                {selectedReportData.assignedOfficer && (
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-450">OFFICER_ASSIGNED</span>
                    <span className="text-slate-200">{selectedReportData.assignedOfficer}</span>
                  </div>
                )}
                <div className="flex justify-between pb-1">
                  <span className="text-slate-455">MEDIA_ATTACHMENTS</span>
                  <span className="text-slate-200">{selectedReportData.evidenceCount} FILE{selectedReportData.evidenceCount !== 1 ? 'S' : ''}</span>
                </div>
              </div>

              <ProgressTracker currentStage={selectedReportData.progress} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hud-panel p-8 text-center border border-cyber-cyan/10 bg-cyber-void/80 relative"
            >
              {/* HUD Brackets Corners */}
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />

              <div className="w-12 h-12 rounded-none bg-cyber-cyan/5 border border-cyber-cyan/15 flex items-center justify-center mx-auto mb-3">
                <List className="w-6 h-6 text-cyber-cyan glow-cyan" />
              </div>
              <p className="text-xs text-slate-450 font-tech uppercase tracking-wider">// SELECT_LOG_TO_DECRYPT_DETAILS</p>
            </motion.div>
          )}

          {/* Activity Feed */}
          <ActivityFeed activities={mockActivity} />
        </div>
      </div>
    </div>
  );
};

export default MyReportsPage;
