export type UserRole = 'citizen' | 'police' | 'admin';
export type Theme = 'light' | 'dark' | 'system';
export type FontSize = 'small' | 'medium' | 'large';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  address: string;
  city: string;
  state: string;
  postalCode: string;
  role: UserRole;
  isVerified: boolean;
  memberSince: string;
  avatar?: string;
  reportsSubmitted: number;
  casesFollowed: number;
}

export interface NotificationPrefs {
  crimeAlerts: boolean;
  investigationUpdates: boolean;
  emergencyAlerts: boolean;
  communityAnnouncements: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface PrivacyPrefs {
  anonymousReporting: boolean;
  profileVisibleToPolice: boolean;
  shareLiveLocation: boolean;
  dataSharing: boolean;
}

export interface AppearancePrefs {
  theme: Theme;
  language: string;
  fontSize: FontSize;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface LoginHistory {
  id: string;
  date: string;
  time: string;
  device: string;
  location: string;
  status: 'success' | 'failed';
}

export const mockUserProfile: UserProfile = {
  id: 'USR-2026-0042',
  firstName: 'Sarah',
  lastName: 'Mitchell',
  email: 'sarah.mitchell@email.com',
  phone: '+1 (555) 234-5678',
  dateOfBirth: '1992-06-15',
  gender: 'female',
  address: '142 Oak Street, Apt 3B',
  city: 'Portland',
  state: 'Oregon',
  postalCode: '97201',
  role: 'citizen',
  isVerified: true,
  memberSince: '2025-11-15',
  reportsSubmitted: 7,
  casesFollowed: 3,
};

export const mockNotificationPrefs: NotificationPrefs = {
  crimeAlerts: true,
  investigationUpdates: true,
  emergencyAlerts: true,
  communityAnnouncements: false,
  smsNotifications: true,
  emailNotifications: false,
  pushNotifications: true,
};

export const mockPrivacyPrefs: PrivacyPrefs = {
  anonymousReporting: false,
  profileVisibleToPolice: true,
  shareLiveLocation: true,
  dataSharing: false,
};

export const mockAppearancePrefs: AppearancePrefs = {
  theme: 'dark',
  language: 'en',
  fontSize: 'medium',
};

export const mockEmergencyContacts: EmergencyContact[] = [
  { id: 'ec-001', name: 'David Mitchell', relationship: 'Spouse', phone: '+1 (555) 345-6789' },
  { id: 'ec-002', name: 'Linda Mitchell', relationship: 'Mother', phone: '+1 (555) 456-7890' },
  { id: 'ec-003', name: 'James Rivera', relationship: 'Friend', phone: '+1 (555) 567-8901' },
];

export const mockSessions: ActiveSession[] = [
  {
    id: 'sess-001',
    device: 'MacBook Pro',
    browser: 'Chrome 126',
    location: 'Portland, OR',
    lastActive: '2026-07-11T14:30:00',
    isCurrent: true,
  },
  {
    id: 'sess-002',
    device: 'iPhone 15',
    browser: 'Safari Mobile',
    location: 'Portland, OR',
    lastActive: '2026-07-11T12:15:00',
    isCurrent: false,
  },
  {
    id: 'sess-003',
    device: 'iPad Air',
    browser: 'Safari',
    location: 'Portland, OR',
    lastActive: '2026-07-10T20:45:00',
    isCurrent: false,
  },
];

export const mockLoginHistory: LoginHistory[] = [
  { id: 'lh-001', date: '2026-07-11', time: '14:30', device: 'MacBook Pro — Chrome', location: 'Portland, OR', status: 'success' },
  { id: 'lh-002', date: '2026-07-11', time: '08:15', device: 'iPhone 15 — Safari', location: 'Portland, OR', status: 'success' },
  { id: 'lh-003', date: '2026-07-10', time: '20:45', device: 'iPad Air — Safari', location: 'Portland, OR', status: 'success' },
  { id: 'lh-004', date: '2026-07-10', time: '09:00', device: 'Unknown — Firefox', location: 'Seattle, WA', status: 'failed' },
  { id: 'lh-005', date: '2026-07-09', time: '17:30', device: 'MacBook Pro — Chrome', location: 'Portland, OR', status: 'success' },
];

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh', label: '中文' },
  { code: 'ar', label: 'العربية' },
];

export default {};
