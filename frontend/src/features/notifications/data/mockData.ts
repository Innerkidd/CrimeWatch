export type NotificationType = 'crime_alert' | 'investigation' | 'emergency' | 'community' | 'system';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';
export type InvestigationStatus = 'received' | 'reviewing' | 'assigned' | 'investigating' | 'closed';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: NotificationPriority;
  isRead: boolean;
  location?: string;
  icon: string;
  reportId?: string;
}

export interface InvestigationUpdate {
  id: string;
  reportId: string;
  reportTitle: string;
  status: InvestigationStatus;
  date: string;
  time: string;
  description: string;
  officer?: string;
}

export interface CommunityAnnouncement {
  id: string;
  title: string;
  description: string;
  category: 'campaign' | 'awareness' | 'police' | 'event';
  date: string;
  image?: string;
  organizer: string;
  location?: string;
  link?: string;
}

export interface EmergencyAlert {
  id: string;
  title: string;
  description: string;
  affectedArea: string;
  severity: 'high' | 'critical';
  issuedAt: string;
  expiresAt?: string;
  contactNumber: string;
}

export const priorityConfig: Record<NotificationPriority, { label: string; color: string; bg: string }> = {
  low: { label: 'Low', color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20' },
  medium: { label: 'Medium', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  high: { label: 'High', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

export const typeConfig: Record<NotificationType, { label: string; color: string; bg: string }> = {
  crime_alert: { label: 'Crime Alert', color: 'text-red-400', bg: 'bg-red-500/10' },
  investigation: { label: 'Investigation', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  emergency: { label: 'Emergency', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  community: { label: 'Community', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  system: { label: 'System', color: 'text-violet-400', bg: 'bg-violet-500/10' },
};

export const investigationStatusConfig: Record<InvestigationStatus, { label: string; color: string; bg: string; icon: string }> = {
  received: { label: 'Report Received', color: 'text-slate-400', bg: 'bg-slate-500/10', icon: 'file' },
  reviewing: { label: 'Under Review', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: 'search' },
  assigned: { label: 'Officer Assigned', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: 'user' },
  investigating: { label: 'Investigation Started', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: 'search' },
  closed: { label: 'Case Closed', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: 'check' },
};

export const mockEmergencyAlert: EmergencyAlert = {
  id: 'ea-001',
  title: 'Severe Weather Warning — Flash Flood Risk',
  description: 'The National Weather Service has issued a flash flood warning for the greater downtown area. Multiple reports of flooding in low-lying streets. Avoid travel if possible and seek higher ground immediately if in affected zones.',
  affectedArea: 'Downtown District, Riverside Park, Oak Street Corridor',
  severity: 'critical',
  issuedAt: '2026-07-11T08:30:00',
  expiresAt: '2026-07-11T20:00:00',
  contactNumber: '911',
};

export const mockNotifications: Notification[] = [
  {
    id: 'n-001',
    type: 'crime_alert',
    title: 'Armed Robbery Reported Nearby',
    description: 'An armed robbery was reported at the convenience store on 5th Avenue, 0.3 miles from your location. Suspect fled on foot heading north.',
    date: '2026-07-11',
    time: '14:23',
    priority: 'critical',
    isRead: false,
    location: '5th Avenue & Main Street',
    icon: 'alert-triangle',
    reportId: 'CR-2026-0412',
  },
  {
    id: 'n-002',
    type: 'investigation',
    title: 'Investigation Update — Case #CR-2026-0398',
    description: 'Your reported vehicle break-in case has been assigned to Detective Sarah Mitchell. She will contact you within 48 hours for additional details.',
    date: '2026-07-11',
    time: '11:45',
    priority: 'medium',
    isRead: false,
    location: 'Maple Street Parking Lot',
    icon: 'user-check',
    reportId: 'CR-2026-0398',
  },
  {
    id: 'n-003',
    type: 'emergency',
    title: 'Missing Person Alert — Emily Chen',
    description: 'A 16-year-old female, Emily Chen, has been missing since yesterday evening. Last seen wearing a blue hoodie near Lincoln Park. Please report any sightings.',
    date: '2026-07-11',
    time: '09:12',
    priority: 'critical',
    isRead: false,
    location: 'Lincoln Park Area',
    icon: 'user-x',
    reportId: 'CR-2026-0415',
  },
  {
    id: 'n-004',
    type: 'crime_alert',
    title: 'Vandalism Spike in Eastside Neighborhood',
    description: 'Multiple reports of property vandalism in the Eastside neighborhood over the past 48 hours. Police are increasing patrols in the area.',
    date: '2026-07-10',
    time: '18:30',
    priority: 'high',
    isRead: true,
    location: 'Eastside Neighborhood',
    icon: 'alert-circle',
  },
  {
    id: 'n-005',
    type: 'community',
    title: 'Neighborhood Watch Meeting — July 15th',
    description: 'Join the community safety meeting at City Hall to discuss recent crime trends and prevention strategies. All residents are encouraged to attend.',
    date: '2026-07-10',
    time: '10:00',
    priority: 'low',
    isRead: true,
    location: 'City Hall, Room 204',
    icon: 'users',
  },
  {
    id: 'n-006',
    type: 'investigation',
    title: 'Case Closed — Bicycle Theft #CR-2026-0345',
    description: 'Your bicycle theft report has been resolved. The stolen property was recovered and returned. Thank you for your cooperation.',
    date: '2026-07-10',
    time: '08:15',
    priority: 'low',
    isRead: true,
    location: 'University Campus',
    icon: 'check-circle',
    reportId: 'CR-2026-0345',
  },
  {
    id: 'n-007',
    type: 'emergency',
    title: 'Hazardous Material Spill — Industrial Zone',
    description: 'A chemical spill has been reported on Industrial Boulevard. Residents within a 1-mile radius are advised to stay indoors and close windows.',
    date: '2026-07-09',
    time: '16:45',
    priority: 'critical',
    isRead: true,
    location: 'Industrial Boulevard',
    icon: 'flask-conical',
  },
  {
    id: 'n-008',
    type: 'crime_alert',
    title: 'Suspicious Activity near School Zone',
    description: 'Multiple reports of a suspicious vehicle parked near Oakwood Elementary during school hours. Officers have been dispatched to investigate.',
    date: '2026-07-09',
    time: '13:20',
    priority: 'high',
    isRead: true,
    location: 'Oakwood Elementary',
    icon: 'eye',
  },
  {
    id: 'n-009',
    type: 'community',
    title: 'Free Self-Defense Workshop',
    description: 'The Police Department is hosting a free self-defense workshop for all community members. Learn basic techniques for personal safety.',
    date: '2026-07-09',
    time: '09:00',
    priority: 'low',
    isRead: true,
    location: 'Community Center, Gym B',
    icon: 'shield',
  },
  {
    id: 'n-010',
    type: 'system',
    title: 'App Update Available — v2.4.0',
    description: 'A new version of CrimeWatch is available with improved map performance, bug fixes, and new emergency alert features. Update now.',
    date: '2026-07-08',
    time: '12:00',
    priority: 'low',
    isRead: true,
    icon: 'download',
  },
  {
    id: 'n-011',
    type: 'crime_alert',
    title: 'Hit-and-Run Incident Reported',
    description: 'A hit-and-run incident occurred at the intersection of Oak and 3rd. Vehicle description: silver sedan with front-end damage. Dashcam footage requested.',
    date: '2026-07-08',
    time: '07:55',
    priority: 'high',
    isRead: true,
    location: 'Oak Street & 3rd Avenue',
    icon: 'car',
    reportId: 'CR-2026-0389',
  },
  {
    id: 'n-012',
    type: 'investigation',
    title: 'Evidence Request — Case #CR-2026-0380',
    description: 'Detective Roberts has requested additional security camera footage from the area of the reported assault. Please upload any relevant recordings.',
    date: '2026-07-08',
    time: '15:30',
    priority: 'medium',
    isRead: false,
    location: 'Downtown Arts District',
    icon: 'camera',
    reportId: 'CR-2026-0380',
  },
  {
    id: 'n-013',
    type: 'community',
    title: 'National Night Out — August 5th',
    description: 'Mark your calendars for National Night Out! Meet your local officers, enjoy food and activities, and strengthen community partnerships.',
    date: '2026-07-07',
    time: '14:00',
    priority: 'low',
    isRead: true,
    location: 'Central Park Pavilion',
    icon: 'calendar',
  },
  {
    id: 'n-014',
    type: 'emergency',
    title: 'Gas Leak Reported — Residential Area',
    description: 'A gas leak has been detected on Elm Street. Residents have been evacuated. Avoid the area until further notice.',
    date: '2026-07-07',
    time: '10:15',
    priority: 'critical',
    isRead: true,
    location: 'Elm Street, Block 400',
    icon: 'flame',
  },
  {
    id: 'n-015',
    type: 'crime_alert',
    title: 'Package Theft Ring Targeting Area',
    description: 'Police have identified a pattern of package thefts in the Maplewood subdivision. Consider using secure delivery lockers or requiring signature.',
    date: '2026-07-06',
    time: '11:00',
    priority: 'medium',
    isRead: true,
    location: 'Maplewood Subdivision',
    icon: 'package',
  },
];

export const mockInvestigationUpdates: InvestigationUpdate[] = [
  {
    id: 'iu-001',
    reportId: 'CR-2026-0398',
    reportTitle: 'Vehicle Break-In — Maple Street',
    status: 'assigned',
    date: '2026-07-11',
    time: '11:45',
    description: 'Detective Sarah Mitchell has been assigned to your case. She will review the evidence and contact you shortly.',
    officer: 'Det. Sarah Mitchell',
  },
  {
    id: 'iu-002',
    reportId: 'CR-2026-0380',
    reportTitle: 'Assault Report — Arts District',
    status: 'investigating',
    date: '2026-07-10',
    time: '09:30',
    description: 'Active investigation underway. Witness interviews are being conducted and surveillance footage is being analyzed.',
    officer: 'Det. James Roberts',
  },
  {
    id: 'iu-003',
    reportId: 'CR-2026-0345',
    reportTitle: 'Bicycle Theft — University Campus',
    status: 'closed',
    date: '2026-07-10',
    time: '08:15',
    description: 'The stolen bicycle was recovered from a local pawn shop. The item has been returned to the owner. Case closed.',
    officer: 'Officer Maria Garcia',
  },
  {
    id: 'iu-004',
    reportId: 'CR-2026-0412',
    reportTitle: 'Armed Robbery — 5th Avenue',
    status: 'reviewing',
    date: '2026-07-11',
    time: '15:00',
    description: 'Your report is being reviewed by the crimes unit. Preliminary evidence is being collected from the scene.',
    officer: 'Sgt. Michael Chen',
  },
];

export const mockAnnouncements: CommunityAnnouncement[] = [
  {
    id: 'ca-001',
    title: 'Summer Safety Campaign 2026',
    description: 'The City Police Department launches its annual summer safety campaign. Learn about water safety, heat precautions, and neighborhood security tips.',
    category: 'campaign',
    date: '2026-07-10',
    organizer: 'City Police Department',
    location: 'Citywide',
  },
  {
    id: 'ca-002',
    title: 'Cybersecurity Awareness Seminar',
    description: 'Free seminar covering online fraud prevention, phishing awareness, and protecting your personal information in the digital age.',
    category: 'awareness',
    date: '2026-07-12',
    organizer: 'Cyber Crime Unit',
    location: 'Public Library, Main Hall',
  },
  {
    id: 'ca-003',
    title: 'New Community Policing Initiative',
    description: 'Chief of Police announces a new community policing program aimed at strengthening relationships between officers and residents through regular engagement.',
    category: 'police',
    date: '2026-07-09',
    organizer: 'Office of the Chief',
  },
  {
    id: 'ca-004',
    title: 'Citizen Police Academy — Registration Open',
    description: 'An 8-week program giving residents an inside look at law enforcement operations. Classes start September 1st. Limited spots available.',
    category: 'event',
    date: '2026-07-08',
    organizer: 'Community Outreach Division',
    location: 'Police Academy, Building C',
  },
  {
    id: 'ca-005',
    title: 'Emergency Preparedness Workshop',
    description: 'Learn how to prepare your family for natural disasters and emergencies. Topics include evacuation plans, first aid kits, and communication strategies.',
    category: 'awareness',
    date: '2026-07-14',
    organizer: 'Emergency Management Office',
    location: 'Fire Station #7',
  },
];

export const mockTimelineSteps = [
  { status: 'received' as const, label: 'Report Received', completed: true },
  { status: 'reviewing' as const, label: 'Under Review', completed: true },
  { status: 'assigned' as const, label: 'Officer Assigned', completed: true },
  { status: 'investigating' as const, label: 'Investigation Started', completed: false },
  { status: 'closed' as const, label: 'Case Closed', completed: false },
];

export default {};
