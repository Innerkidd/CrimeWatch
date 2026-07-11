export type CrimeType = 'theft' | 'robbery' | 'assault' | 'accident' | 'vandalism' | 'missing_person' | 'cyber_crime' | 'domestic_violence' | 'other';
export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type CaseStatus = 'reported' | 'investigating' | 'resolved' | 'closed';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  icon: string;
}

export interface PoliceUpdate {
  id: string;
  officer: string;
  badge: string;
  message: string;
  date: string;
  time: string;
  status: string;
}

export interface Evidence {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  name: string;
  size: string;
  thumbnail?: string;
}

export interface SimilarIncident {
  id: string;
  type: CrimeType;
  title: string;
  distance: string;
  date: string;
  status: CaseStatus;
  severity: Severity;
}

export interface CrimeDetail {
  id: string;
  title: string;
  type: CrimeType;
  severity: Severity;
  status: CaseStatus;
  description: string;
  location: string;
  lat: number;
  lng: number;
  date: string;
  time: string;
  reporterType: 'citizen' | 'anonymous' | 'police';
  reporterName: string;
  lastUpdated: string;
  evidence: Evidence[];
  timeline: TimelineEvent[];
  policeUpdates: PoliceUpdate[];
  similarIncidents: SimilarIncident[];
}

export const crimeTypeLabels: Record<CrimeType, string> = {
  theft: 'Theft',
  robbery: 'Robbery',
  assault: 'Assault',
  accident: 'Accident',
  vandalism: 'Vandalism',
  missing_person: 'Missing Person',
  cyber_crime: 'Cyber Crime',
  domestic_violence: 'Domestic Violence',
  other: 'Other',
};

export const severityConfig: Record<Severity, { label: string; color: string; bg: string }> = {
  low: { label: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  high: { label: 'High', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

export const statusConfig: Record<CaseStatus, { label: string; color: string; bg: string }> = {
  reported: { label: 'Reported', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  investigating: { label: 'Under Investigation', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  resolved: { label: 'Resolved', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  closed: { label: 'Closed', color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20' },
};

export const mockCrimeDetail: CrimeDetail = {
  id: 'INC-88392',
  title: 'Armed Robbery at Downtown Convenience Store',
  type: 'robbery',
  severity: 'high',
  status: 'investigating',
  description: 'Two individuals wearing black hoodies and face masks entered the 24/7 convenience store at approximately 2:30 AM. One suspect brandished a knife while the other collected cash from the register and cigarettes from the display. Total estimated loss is $1,200 in cash and $800 in merchandise. The suspects fled on foot heading eastbound on Main Street. No injuries were reported. Security camera footage is available and has been submitted as evidence.',
  location: '142 Main Street, Downtown, Metro City',
  lat: 40.7128,
  lng: -74.006,
  date: '2026-07-11',
  time: '02:30',
  reporterType: 'citizen',
  reporterName: 'John Davidson',
  lastUpdated: '2026-07-11 14:30',
  evidence: [
    { id: 'e1', type: 'image', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800', name: 'store_front.jpg', size: '2.4 MB' },
    { id: 'e2', type: 'image', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800', name: 'evidence_photo.jpg', size: '1.8 MB' },
    { id: 'e3', type: 'video', url: '', name: 'security_footage.mp4', size: '45.2 MB' },
    { id: 'e4', type: 'document', url: '', name: 'witness_statement.pdf', size: '320 KB' },
  ],
  timeline: [
    { id: 't1', title: 'Report Submitted', description: 'Citizen report filed through CrimeWatch app', date: '2026-07-11', time: '02:45', icon: 'file' },
    { id: 't2', title: 'Report Verified', description: 'Report verified by automated system and moderator review', date: '2026-07-11', time: '03:15', icon: 'check' },
    { id: 't3', title: 'Officer Assigned', description: 'Officer Sarah Mitchell assigned to case', date: '2026-07-11', time: '03:30', icon: 'user' },
    { id: 't4', title: 'Investigation Started', description: 'On-site investigation commenced, area secured', date: '2026-07-11', time: '04:00', icon: 'search' },
    { id: 't5', title: 'Evidence Collected', description: 'Security footage and physical evidence collected', date: '2026-07-11', time: '06:30', icon: 'camera' },
  ],
  policeUpdates: [
    {
      id: 'pu1',
      officer: 'Officer Sarah Mitchell',
      badge: 'PD-4521',
      message: 'Responded to the scene at 04:00. Secured the area and interviewed the store clerk. Security footage has been reviewed showing two suspects. Description has been broadcast to all units in the district.',
      date: '2026-07-11',
      time: '08:00',
      status: 'Active Investigation',
    },
    {
      id: 'pu2',
      officer: 'Detective James Park',
      badge: 'PD-3198',
      message: 'Following up on similar incidents in the area. Cross-referencing with reports from the past 30 days. Three potential matches found. Surveillance teams deployed to known hotspots.',
      date: '2026-07-11',
      time: '14:30',
      status: 'Investigation Ongoing',
    },
  ],
  similarIncidents: [
    { id: 's1', type: 'theft', title: 'Bicycle Theft', distance: '0.3 km', date: '2026-07-10', status: 'resolved', severity: 'low' },
    { id: 's2', type: 'robbery', title: 'ATM Robbery', distance: '0.8 km', date: '2026-07-09', status: 'investigating', severity: 'high' },
    { id: 's3', type: 'vandalism', title: 'Store Vandalism', distance: '1.2 km', date: '2026-07-08', status: 'reported', severity: 'medium' },
  ],
};
