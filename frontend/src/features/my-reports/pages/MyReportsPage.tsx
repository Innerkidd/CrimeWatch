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
    <div className="space-y-6">
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
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="w-7 h-7 text-blue-400" />
            My Reports
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track and manage all the crime reports you have submitted.
          </p>
        </div>

        <button
          onClick={() => navigate('/reports')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-sm font-semibold text-blue-400 hover:bg-blue-500/30 transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          Report New Crime
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
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
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
        <div className="space-y-4">
          {/* Selected Report Details */}
          {selectedReportData ? (
            <motion.div
              key={selectedReportData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-semibold text-blue-400">{selectedReportData.id}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{selectedReportData.title}</h3>
                </div>
                <ReportActions
                  status={selectedReportData.status}
                  reportId={selectedReportData.id}
                  onEdit={(id) => addToast('warning', `Edit mode for ${id}`)}
                  onDelete={handleDelete}
                  onViewUpdates={(id) => addToast('success', `Opening updates for ${id}`)}
                  onAddEvidence={(id) => addToast('success', `Opening evidence upload for ${id}`)}
                  onDownload={(id) => addToast('success', `Downloading PDF for ${id}`)}
                  onFeedback={(id) => addToast('success', `Opening feedback for ${id}`)}
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Type</span>
                  <span className="text-slate-300">{crimeTypeLabels[selectedReportData.crimeType]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location</span>
                  <span className="text-slate-300 text-right max-w-[200px] truncate">{selectedReportData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date</span>
                  <span className="text-slate-300">{selectedReportData.dateReported}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Severity</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${severityConfig[selectedReportData.severity].bg} ${severityConfig[selectedReportData.severity].color}`}>
                    {severityConfig[selectedReportData.severity].label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status</span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${statusConfig[selectedReportData.status].bg} ${statusConfig[selectedReportData.status].color}`}>
                    {statusConfig[selectedReportData.status].label}
                  </span>
                </div>
                {selectedReportData.assignedOfficer && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Officer</span>
                    <span className="text-slate-300">{selectedReportData.assignedOfficer}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Evidence</span>
                  <span className="text-slate-300">{selectedReportData.evidenceCount} file{selectedReportData.evidenceCount !== 1 ? 's' : ''}</span>
                </div>
              </div>

              <ProgressTracker currentStage={selectedReportData.progress} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                <List className="w-6 h-6 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400">Select a report to view details</p>
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
