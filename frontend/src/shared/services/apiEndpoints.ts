import api from './api';
import { API_ENDPOINTS } from '../constants/api';

// Auth
export const authAPI = {
  register: (data: { firstName: string; lastName: string; email: string; password: string; phone: string }) =>
    api.post(API_ENDPOINTS.AUTH.REGISTER, data),

  login: (data: { email: string; password: string }) =>
    api.post(API_ENDPOINTS.AUTH.LOGIN, data),

  getMe: () =>
    api.get(API_ENDPOINTS.AUTH.ME),

  updateProfile: (data: Record<string, unknown>) =>
    api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data),
};

// Reports
export const reportsAPI = {
  submit: (formData: FormData) =>
    api.post(API_ENDPOINTS.REPORTS.SUBMIT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    }),

  getMyReports: (params?: Record<string, string>) =>
    api.get(API_ENDPOINTS.REPORTS.MY_REPORTS, { params }),

  getMapReports: (params?: Record<string, string>) =>
    api.get(API_ENDPOINTS.REPORTS.MAP_REPORTS, { params }),

  getNearbyReports: (lat: number, lng: number, radius = 10, params?: Record<string, string>) =>
    api.get(API_ENDPOINTS.REPORTS.NEARBY, { params: { lat: String(lat), lng: String(lng), radius: String(radius), ...params } }),

  getById: (id: string) =>
    api.get(API_ENDPOINTS.REPORTS.GET_BY_ID(id)),

  // Admin
  getAllReports: (params?: Record<string, string>) =>
    api.get(API_ENDPOINTS.REPORTS.ADMIN_ALL, { params }),

  acceptReport: (id: string) =>
    api.put(API_ENDPOINTS.REPORTS.ADMIN_ACCEPT(id)),

  rejectReport: (id: string, reason?: string) =>
    api.put(API_ENDPOINTS.REPORTS.ADMIN_REJECT(id), { reason }),

  updateStatus: (id: string, status: string, description?: string) =>
    api.put(API_ENDPOINTS.REPORTS.ADMIN_STATUS(id), { status, description }),

  assignOfficer: (id: string, officerId: string) =>
    api.put(API_ENDPOINTS.REPORTS.ADMIN_ASSIGN(id), { officerId }),

  resolveCase: (id: string, resolution?: string) =>
    api.put(API_ENDPOINTS.REPORTS.ADMIN_RESOLVE(id), { resolution }),
};

// Notifications
export const notificationsAPI = {
  getAll: (params?: Record<string, string>) =>
    api.get(API_ENDPOINTS.NOTIFICATIONS.LIST, { params }),

  markAsRead: (id: string) =>
    api.put(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id)),

  markAllAsRead: () =>
    api.put(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ),

  send: (data: { userId: string; type: string; title: string; message: string; priority?: string }) =>
    api.post(API_ENDPOINTS.NOTIFICATIONS.SEND, data),

  broadcast: (data: { title: string; message: string; severity?: string }) =>
    api.post(API_ENDPOINTS.NOTIFICATIONS.BROADCAST, data),
};

// Analytics
export const analyticsAPI = {
  getDashboard: () =>
    api.get(API_ENDPOINTS.ANALYTICS.DASHBOARD),

  getHeatmap: () =>
    api.get(API_ENDPOINTS.ANALYTICS.HEATMAP),
};
