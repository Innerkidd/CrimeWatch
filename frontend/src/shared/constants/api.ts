const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_BASE = API_BASE_URL;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  REPORTS: {
    SUBMIT: '/reports',
    MY_REPORTS: '/reports/my',
    MAP_REPORTS: '/reports/map',
    NEARBY: '/reports/nearby',
    GET_BY_ID: (id: string) => `/reports/${id}`,
    ADMIN_ALL: '/reports/admin/all',
    ADMIN_ACCEPT: (id: string) => `/reports/admin/${id}/accept`,
    ADMIN_REJECT: (id: string) => `/reports/admin/${id}/reject`,
    ADMIN_STATUS: (id: string) => `/reports/admin/${id}/status`,
    ADMIN_ASSIGN: (id: string) => `/reports/admin/${id}/assign`,
    ADMIN_RESOLVE: (id: string) => `/reports/admin/${id}/resolve`,
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    SEND: '/notifications/send',
    BROADCAST: '/notifications/broadcast',
  },
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    HEATMAP: '/analytics/heatmap',
  },
} as const;
