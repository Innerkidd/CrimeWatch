export type ReportStatus = 'pending' | 'verified' | 'investigating' | 'resolved' | 'rejected';
export type CrimeType = 'robbery' | 'assault' | 'theft' | 'vandalism' | 'fraud' | 'burglary' | 'missing_person' | 'hit_and_run' | 'cybercrime' | 'other';
export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type ProgressStage = 'submitted' | 'verification' | 'assigned' | 'investigating' | 'closed';

export interface Report {
  id: string;
  crimeType: CrimeType;
  title: string;
  description: string;
  location: string;
  dateReported: string;
  timeReported: string;
  severity: Severity;
  status: ReportStatus;
  assignedOfficer?: string;
  lastUpdated: string;
  progress: ProgressStage;
  evidenceCount: number;
  caseNumber?: string;
}

export interface ActivityItem {
  id: string;
  reportId: string;
  type: 'status_change' | 'officer_assigned' | 'update' | 'evidence_reviewed' | 'feedback' | 'submitted';
  title: string;
  description: string;
  date: string;
  time: string;
  icon: string;
}

export const crimeTypeLabels: Record<CrimeType, string> = {
  robbery: 'Robbery',
  assault: 'Assault',
  theft: 'Theft',
  vandalism: 'Vandalism',
  fraud: 'Fraud',
  burglary: 'Burglary',
  missing_person: 'Missing Person',
  hit_and_run: 'Hit and Run',
  cybercrime: 'Cybercrime',
  other: 'Other',
};

export const statusConfig: Record<ReportStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  verified: { label: 'Verified', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  investigating: { label: 'Under Investigation', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  resolved: { label: 'Resolved', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  rejected: { label: 'Rejected', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

export const severityConfig: Record<Severity, { label: string; color: string; bg: string }> = {
  low: { label: 'Low', color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20' },
  medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  high: { label: 'High', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

export const progressSteps: { key: ProgressStage; label: string }[] = [
  { key: 'submitted', label: 'Submitted' },
  { key: 'verification', label: 'Verification' },
  { key: 'assigned', label: 'Officer Assigned' },
  { key: 'investigating', label: 'Investigation' },
  { key: 'closed', label: 'Case Closed' },
];

export const mockReports: Report[] = [
  {
    id: 'CR-2026-0412',
    crimeType: 'robbery',
    title: 'Armed Robbery at Corner Store',
    description: 'Suspect demanded cash at gunpoint from the register. Fled on foot heading north on 5th Avenue.',
    location: '5th Avenue & Main Street',
    dateReported: '2026-07-11',
    timeReported: '14:23',
    severity: 'critical',
    status: 'investigating',
    assignedOfficer: 'Det. Sarah Mitchell',
    lastUpdated: '2026-07-11T15:30:00',
    progress: 'investigating',
    evidenceCount: 3,
    caseNumber: 'CASE-2026-0892',
  },
  {
    id: 'CR-2026-0398',
    crimeType: 'theft',
    title: 'Vehicle Break-In — Dashboard Camera Stolen',
    description: 'Front passenger window smashed. Dashcam and sunglasses stolen from glove compartment.',
    location: 'Maple Street Parking Lot',
    dateReported: '2026-07-09',
    timeReported: '08:15',
    severity: 'medium',
    status: 'investigating',
    assignedOfficer: 'Det. James Roberts',
    lastUpdated: '2026-07-10T11:00:00',
    progress: 'investigating',
    evidenceCount: 5,
    caseNumber: 'CASE-2026-0875',
  },
  {
    id: 'CR-2026-0380',
    crimeType: 'assault',
    title: 'Physical Altercation Near Downtown Bar',
    description: 'Victim struck multiple times during an argument. Sustained minor facial injuries.',
    location: 'Downtown Arts District, 200 Block',
    dateReported: '2026-07-08',
    timeReported: '22:45',
    severity: 'high',
    status: 'verified',
    lastUpdated: '2026-07-09T09:30:00',
    progress: 'assigned',
    evidenceCount: 2,
  },
  {
    id: 'CR-2026-0375',
    crimeType: 'vandalism',
    title: 'Graffiti on Community Center Wall',
    description: 'Extensive spray paint damage to the east-facing wall of the community center.',
    location: 'Elm Street Community Center',
    dateReported: '2026-07-07',
    timeReported: '07:30',
    severity: 'low',
    status: 'pending',
    lastUpdated: '2026-07-07T07:30:00',
    progress: 'submitted',
    evidenceCount: 1,
  },
  {
    id: 'CR-2026-0360',
    crimeType: 'fraud',
    title: 'Credit Card Fraud — Unauthorized Transactions',
    description: 'Multiple unauthorized online purchases totaling $2,400 detected on statement.',
    location: 'Online Transaction',
    dateReported: '2026-07-06',
    timeReported: '10:00',
    severity: 'high',
    status: 'investigating',
    assignedOfficer: 'Det. Michael Chen',
    lastUpdated: '2026-07-08T14:00:00',
    progress: 'investigating',
    evidenceCount: 8,
    caseNumber: 'CASE-2026-0854',
  },
  {
    id: 'CR-2026-0345',
    crimeType: 'theft',
    title: 'Bicycle Stolen from University Campus',
    description: 'Lock cut on bicycle rack near the science building. Black mountain bike.',
    location: 'University Campus, North Lot',
    dateReported: '2026-07-04',
    timeReported: '16:00',
    severity: 'low',
    status: 'resolved',
    assignedOfficer: 'Officer Maria Garcia',
    lastUpdated: '2026-07-10T08:15:00',
    progress: 'closed',
    evidenceCount: 2,
    caseNumber: 'CASE-2026-0832',
  },
  {
    id: 'CR-2026-0340',
    crimeType: 'burglary',
    title: 'Home Break-In While on Vacation',
    description: 'Rear door forced open. Electronics and jewelry missing.',
    location: 'Oakwood Drive, 1200 Block',
    dateReported: '2026-07-03',
    timeReported: '18:30',
    severity: 'high',
    status: 'investigating',
    assignedOfficer: 'Det. Sarah Mitchell',
    lastUpdated: '2026-07-07T10:00:00',
    progress: 'investigating',
    evidenceCount: 6,
    caseNumber: 'CASE-2026-0820',
  },
  {
    id: 'CR-2026-0330',
    crimeType: 'hit_and_run',
    title: 'Hit-and-Run at Intersection',
    description: 'Parked car struck by unidentified vehicle. Significant rear-end damage.',
    location: 'Oak Street & 3rd Avenue',
    dateReported: '2026-07-02',
    timeReported: '07:55',
    severity: 'medium',
    status: 'pending',
    lastUpdated: '2026-07-02T07:55:00',
    progress: 'submitted',
    evidenceCount: 1,
  },
  {
    id: 'CR-2026-0320',
    crimeType: 'cybercrime',
    title: 'Phishing Email Account Compromise',
    description: 'Email account accessed without authorization. Password changed by attacker.',
    location: 'Online',
    dateReported: '2026-07-01',
    timeReported: '09:00',
    severity: 'medium',
    status: 'rejected',
    lastUpdated: '2026-07-03T12:00:00',
    progress: 'verification',
    evidenceCount: 4,
  },
  {
    id: 'CR-2026-0310',
    crimeType: 'missing_person',
    title: 'Missing Person — Elderly Resident',
    description: '82-year-old male last seen leaving assisted living facility. Has memory issues.',
    location: 'Sunrise Senior Living',
    dateReported: '2026-06-30',
    timeReported: '20:00',
    severity: 'critical',
    status: 'resolved',
    assignedOfficer: 'Sgt. David Park',
    lastUpdated: '2026-07-01T06:30:00',
    progress: 'closed',
    evidenceCount: 3,
    caseNumber: 'CASE-2026-0798',
  },
];

export const mockActivity: ActivityItem[] = [
  {
    id: 'act-001',
    reportId: 'CR-2026-0412',
    type: 'officer_assigned',
    title: 'Officer Assigned',
    description: 'Detective Sarah Mitchell has been assigned to your armed robbery case.',
    date: '2026-07-11',
    time: '15:30',
    icon: 'user-check',
  },
  {
    id: 'act-002',
    reportId: 'CR-2026-0398',
    type: 'evidence_reviewed',
    title: 'Evidence Reviewed',
    description: 'Security camera footage from the parking lot has been reviewed by the investigation team.',
    date: '2026-07-10',
    time: '11:00',
    icon: 'eye',
  },
  {
    id: 'act-003',
    reportId: 'CR-2026-0380',
    type: 'status_change',
    title: 'Status Updated',
    description: 'Your assault report has been verified and moved to the next stage.',
    date: '2026-07-09',
    time: '09:30',
    icon: 'refresh-cw',
  },
  {
    id: 'act-004',
    reportId: 'CR-2026-0345',
    type: 'update',
    title: 'Case Resolved',
    description: 'Your stolen bicycle has been recovered. Case has been closed.',
    date: '2026-07-10',
    time: '08:15',
    icon: 'check-circle',
  },
  {
    id: 'act-005',
    reportId: 'CR-2026-0360',
    type: 'status_change',
    title: 'Investigation Started',
    description: 'Active investigation into your fraud report has begun.',
    date: '2026-07-08',
    time: '14:00',
    icon: 'search',
  },
  {
    id: 'act-006',
    reportId: 'CR-2026-0340',
    type: 'update',
    title: 'New Police Update',
    description: 'Detective Mitchell has submitted a progress note on your burglary case.',
    date: '2026-07-07',
    time: '10:00',
    icon: 'file-text',
  },
];

export const activityIconMap: Record<string, string> = {
  'user-check': 'user-check',
  eye: 'eye',
  'refresh-cw': 'refresh-cw',
  'check-circle': 'check-circle',
  search: 'search',
  'file-text': 'file-text',
};

export default {};
