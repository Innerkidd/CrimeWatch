export type CrimeType =
  | 'theft'
  | 'robbery'
  | 'assault'
  | 'accident'
  | 'vandalism'
  | 'missing_person'
  | 'cyber_crime'
  | 'burglary'
  | 'drug_offense'
  | 'other';

export type Severity = 'low' | 'medium' | 'high';
export type ReportStatus = 'reported' | 'investigating' | 'resolved';

export interface CrimeIncident {
  id: string;
  type: CrimeType;
  severity: Severity;
  status: ReportStatus;
  title: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  date: string;
  time: string;
  assignedOfficer: string;
}

export interface PoliceStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export interface OfficerPatrol {
  id: string;
  name: string;
  badge: string;
  lat: number;
  lng: number;
  status: 'patrolling' | 'responding' | 'on_scene';
}

export const crimeTypeLabels: Record<CrimeType, string> = {
  theft: 'Theft',
  robbery: 'Robbery',
  assault: 'Assault',
  accident: 'Accident',
  vandalism: 'Vandalism',
  missing_person: 'Missing Person',
  cyber_crime: 'Cyber Crime',
  burglary: 'Burglary',
  drug_offense: 'Drug Offense',
  other: 'Other',
};

export const crimeTypeColors: Record<CrimeType, string> = {
  theft: '#EF4444',
  robbery: '#DC2626',
  assault: '#F97316',
  accident: '#F59E0B',
  vandalism: '#EAB308',
  missing_person: '#8B5CF6',
  cyber_crime: '#6366F1',
  burglary: '#EC4899',
  drug_offense: '#14B8A6',
  other: '#6B7280',
};

export const severityColors: Record<Severity, string> = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#22C55E',
};

export const statusColors: Record<ReportStatus, string> = {
  reported: '#F59E0B',
  investigating: '#3B82F6',
  resolved: '#22C55E',
};

export const mockCrimeIncidents: CrimeIncident[] = [
  {
    id: 'CR-2026-0421',
    type: 'robbery',
    severity: 'high',
    status: 'reported',
    title: 'Armed Robbery at Convenience Store',
    description: 'Two individuals armed with knives robbed a 24/7 convenience store.',
    location: '142 Oak Street, Downtown',
    lat: 40.7128,
    lng: -74.006,
    date: '2026-07-11',
    time: '14:30',
    assignedOfficer: 'Off. Martinez',
  },
  {
    id: 'CR-2026-0420',
    type: 'theft',
    severity: 'medium',
    status: 'investigating',
    title: 'Vehicle Theft Reported',
    description: 'White sedan stolen from parking garage.',
    location: '78 Pine Avenue, Midtown',
    lat: 40.7148,
    lng: -74.003,
    date: '2026-07-11',
    time: '13:15',
    assignedOfficer: 'Off. Chen',
  },
  {
    id: 'CR-2026-0419',
    type: 'assault',
    severity: 'high',
    status: 'investigating',
    title: 'Physical Assault Near Station',
    description: 'Victim assaulted near subway entrance.',
    location: '305 Main Blvd, Central',
    lat: 40.7118,
    lng: -74.009,
    date: '2026-07-11',
    time: '11:45',
    assignedOfficer: 'Off. Patel',
  },
  {
    id: 'CR-2026-0418',
    type: 'vandalism',
    severity: 'low',
    status: 'resolved',
    title: 'Graffiti on Public Building',
    description: 'Spray paint damage on community center.',
    location: '22 Elm Court, Eastside',
    lat: 40.7138,
    lng: -74.001,
    date: '2026-07-11',
    time: '10:20',
    assignedOfficer: 'Off. Johnson',
  },
  {
    id: 'CR-2026-0417',
    type: 'burglary',
    severity: 'medium',
    status: 'reported',
    title: 'Burglary at Residential Home',
    description: 'Forced entry detected at rear door.',
    location: '89 Maple Drive, Northside',
    lat: 40.7158,
    lng: -74.007,
    date: '2026-07-11',
    time: '09:30',
    assignedOfficer: 'Off. Williams',
  },
  {
    id: 'CR-2026-0416',
    type: 'theft',
    severity: 'low',
    status: 'resolved',
    title: 'Shoplifting at Retail Store',
    description: 'Minor shoplifting incident. Suspect apprehended.',
    location: '15 Commerce Park, Mall District',
    lat: 40.7108,
    lng: -74.005,
    date: '2026-07-10',
    time: '18:30',
    assignedOfficer: 'Off. Garcia',
  },
  {
    id: 'CR-2026-0415',
    type: 'accident',
    severity: 'high',
    status: 'investigating',
    title: 'Multi-Car Collision on Highway',
    description: 'Three-car pileup on highway ramp.',
    location: 'Highway 9, Junction 12',
    lat: 40.7168,
    lng: -74.004,
    date: '2026-07-10',
    time: '16:00',
    assignedOfficer: 'Off. Martinez',
  },
  {
    id: 'CR-2026-0414',
    type: 'cyber_crime',
    severity: 'medium',
    status: 'reported',
    title: 'Online Banking Fraud',
    description: 'Unauthorized transactions totaling $3,200.',
    location: '12 Walnut Street, Tech District',
    lat: 40.7125,
    lng: -74.008,
    date: '2026-07-10',
    time: '15:20',
    assignedOfficer: 'Off. Chen',
  },
  {
    id: 'CR-2026-0413',
    type: 'drug_offense',
    severity: 'high',
    status: 'investigating',
    title: 'Drug Distribution Suspected',
    description: 'Reports of suspicious activity at abandoned lot.',
    location: '300 Industrial Blvd, Warehouse District',
    lat: 40.7145,
    lng: -74.002,
    date: '2026-07-10',
    time: '22:00',
    assignedOfficer: 'Off. Johnson',
  },
  {
    id: 'CR-2026-0412',
    type: 'missing_person',
    severity: 'high',
    status: 'investigating',
    title: 'Missing Elderly Person',
    description: '82-year-old male last seen walking towards park.',
    location: '45 Maple Court, Riverside',
    lat: 40.7115,
    lng: -74.0075,
    date: '2026-07-10',
    time: '08:00',
    assignedOfficer: 'Off. Williams',
  },
  {
    id: 'CR-2026-0411',
    type: 'assault',
    severity: 'medium',
    status: 'resolved',
    title: 'Altercation at Parking Garage',
    description: 'Two individuals involved in physical altercation.',
    location: '65 Park Avenue, Central',
    lat: 40.7135,
    lng: -74.0065,
    date: '2026-07-09',
    time: '23:45',
    assignedOfficer: 'Off. Garcia',
  },
  {
    id: 'CR-2026-0410',
    type: 'theft',
    severity: 'medium',
    status: 'investigating',
    title: 'Bicycle Theft from Rack',
    description: 'Expensive mountain bike stolen from locked rack.',
    location: '88 Birch Drive, Southgate',
    lat: 40.7155,
    lng: -74.0035,
    date: '2026-07-09',
    time: '20:15',
    assignedOfficer: 'Off. Patel',
  },
];

export const mockPoliceStations: PoliceStation[] = [
  { id: 'PS-001', name: 'Central Precinct', lat: 40.7132, lng: -74.0055, address: '100 Centre Street' },
  { id: 'PS-002', name: 'Downtown Station', lat: 40.7142, lng: -74.0045, address: '250 Broadway' },
  { id: 'PS-003', name: 'Eastside Substation', lat: 40.7122, lng: -74.0072, address: '55 East Broadway' },
];

export const mockOfficerPatrols: OfficerPatrol[] = [
  { id: 'OP-001', name: 'Off. Martinez', badge: 'PO-2024-001', lat: 40.7130, lng: -74.0058, status: 'patrolling' },
  { id: 'OP-002', name: 'Off. Chen', badge: 'PO-2024-002', lat: 40.7150, lng: -74.0032, status: 'responding' },
  { id: 'OP-003', name: 'Off. Patel', badge: 'PO-2024-003', lat: 40.7112, lng: -74.0085, status: 'on_scene' },
  { id: 'OP-004', name: 'Off. Johnson', badge: 'PO-2024-004', lat: 40.7162, lng: -74.0048, status: 'patrolling' },
  { id: 'OP-005', name: 'Off. Garcia', badge: 'PO-2024-005', lat: 40.7102, lng: -74.0062, status: 'patrolling' },
];
