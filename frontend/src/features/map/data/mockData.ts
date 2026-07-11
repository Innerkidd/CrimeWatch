export type CrimeType =
  | 'theft'
  | 'robbery'
  | 'assault'
  | 'accident'
  | 'vandalism'
  | 'missing_person'
  | 'cyber_crime'
  | 'other';

export type Severity = 'low' | 'medium' | 'high';
export type ReportStatus = 'reported' | 'investigating' | 'resolved';

export interface CrimeReport {
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
  image?: string;
  reporter: string;
}

export const crimeTypeLabels: Record<CrimeType, string> = {
  theft: 'Theft',
  robbery: 'Robbery',
  assault: 'Assault',
  accident: 'Accident',
  vandalism: 'Vandalism',
  missing_person: 'Missing Person',
  cyber_crime: 'Cyber Crime',
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
  other: '#6B7280',
};

export const severityColors: Record<Severity, string> = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#22C55E',
};

export const mockCrimeReports: CrimeReport[] = [
  {
    id: '1',
    type: 'theft',
    severity: 'high',
    status: 'investigating',
    title: 'Armed Robbery at convenience store',
    description: 'Two individuals armed with knives robbed a 24/7 convenience store on Main Street. Cash and electronics stolen.',
    location: '142 Main Street, Downtown',
    lat: 40.7128,
    lng: -74.006,
    date: '2026-07-11',
    time: '14:30',
    reporter: 'John D.',
  },
  {
    id: '2',
    type: 'assault',
    severity: 'high',
    status: 'reported',
    title: 'Physical assault near subway station',
    description: 'Victim was assaulted by an unknown individual near the subway entrance. Injuries reported.',
    location: '78 Oak Avenue, Midtown',
    lat: 40.7148,
    lng: -74.003,
    date: '2026-07-11',
    time: '13:15',
    reporter: 'Sarah M.',
  },
  {
    id: '3',
    type: 'vandalism',
    severity: 'low',
    status: 'resolved',
    title: 'Graffiti on public building',
    description: 'Vandalism detected on the side of the community center. Spray paint damage.',
    location: '320 Pine Road, Eastside',
    lat: 40.7118,
    lng: -74.009,
    date: '2026-07-10',
    time: '22:00',
    reporter: 'Mike R.',
  },
  {
    id: '4',
    type: 'accident',
    severity: 'medium',
    status: 'investigating',
    title: 'Hit and run at intersection',
    description: 'Vehicle struck pedestrian and fled the scene. Victim transported to hospital.',
    location: '55 Elm Street, Westend',
    lat: 40.7138,
    lng: -74.001,
    date: '2026-07-11',
    time: '11:45',
    reporter: 'Lisa K.',
  },
  {
    id: '5',
    type: 'robbery',
    severity: 'high',
    status: 'reported',
    title: 'Armed robbery at ATM',
    description: 'Suspect brandished a weapon and demanded cash from victim using an ATM.',
    location: '200 Cedar Lane, Northside',
    lat: 40.7158,
    lng: -74.007,
    date: '2026-07-11',
    time: '10:20',
    reporter: 'David P.',
  },
  {
    id: '6',
    type: 'theft',
    severity: 'medium',
    status: 'investigating',
    title: 'Bicycle theft from parking rack',
    description: 'Expensive mountain bike stolen from a locked rack outside the train station.',
    location: '88 Birch Drive, Southgate',
    lat: 40.7108,
    lng: -74.005,
    date: '2026-07-10',
    time: '18:30',
    reporter: 'Emma W.',
  },
  {
    id: '7',
    type: 'missing_person',
    severity: 'high',
    status: 'investigating',
    title: 'Missing elderly person',
    description: '82-year-old male last seen walking towards the park. Has memory issues.',
    location: '45 Maple Court, Riverside',
    lat: 40.7168,
    lng: -74.004,
    date: '2026-07-11',
    time: '08:00',
    reporter: 'Robert H.',
  },
  {
    id: '8',
    type: 'cyber_crime',
    severity: 'medium',
    status: 'reported',
    title: 'Online banking fraud reported',
    description: 'Victim discovered unauthorized transactions totaling $3,200 from their bank account.',
    location: '12 Walnut Street, Tech District',
    lat: 40.7125,
    lng: -74.008,
    date: '2026-07-10',
    time: '16:00',
    reporter: 'Anna S.',
  },
  {
    id: '9',
    type: 'vandalism',
    severity: 'low',
    status: 'resolved',
    title: 'Broken windows at abandoned lot',
    description: 'Windows of abandoned building smashed. Possible trespassing.',
    location: '300 Industrial Blvd, Warehouse District',
    lat: 40.7145,
    lng: -74.002,
    date: '2026-07-09',
    time: '23:45',
    reporter: 'Tom B.',
  },
  {
    id: '10',
    type: 'assault',
    severity: 'medium',
    status: 'reported',
    title: 'Altercation at parking garage',
    description: 'Two individuals involved in a physical altercation. Minor injuries.',
    location: '65 Park Avenue, Central',
    lat: 40.7135,
    lng: -74.0065,
    date: '2026-07-11',
    time: '09:30',
    reporter: 'Chris L.',
  },
  {
    id: '11',
    type: 'theft',
    severity: 'low',
    status: 'resolved',
    title: 'Shoplifting at retail store',
    description: 'Minor shoplifting incident at local retail store. Suspect apprehended.',
    location: '180 Commerce Way, Mall District',
    lat: 40.7155,
    lng: -74.0035,
    date: '2026-07-10',
    time: '15:20',
    reporter: 'Nancy G.',
  },
  {
    id: '12',
    type: 'accident',
    severity: 'high',
    status: 'investigating',
    title: 'Multi-car collision on highway',
    description: 'Three-car pileup on the highway ramp. Multiple injuries reported.',
    location: 'Highway 9, Junction 12',
    lat: 40.7115,
    lng: -74.0075,
    date: '2026-07-11',
    time: '07:15',
    reporter: 'James F.',
  },
];
