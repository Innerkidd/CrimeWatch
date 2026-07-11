const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Users ──────────────────────────────────────────────────────────────────────
const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'citizen', status: 'active', createdAt: new Date('2025-01-15'), updatedAt: new Date('2025-01-15') },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'citizen', status: 'active', createdAt: new Date('2025-02-01'), updatedAt: new Date('2025-02-01') },
  { id: '3', name: 'Officer Jane Doe', email: 'jane.doe@police.gov', role: 'police', status: 'active', createdAt: new Date('2025-01-20'), updatedAt: new Date('2025-06-10') },
  { id: '4', name: 'Officer John Roe', email: 'john.roe@police.gov', role: 'police', status: 'active', createdAt: new Date('2025-03-01'), updatedAt: new Date('2025-06-11') },
  { id: '5', name: 'Admin User', email: 'admin@crimewatch.com', role: 'admin', status: 'active', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '6', name: 'Charlie Brown', email: 'charlie@example.com', role: 'citizen', status: 'suspended', createdAt: new Date('2025-02-15'), updatedAt: new Date('2025-03-01') },
  { id: '7', name: 'Officer Sarah Miles', email: 'sarah.miles@police.gov', role: 'police', status: 'active', createdAt: new Date('2025-02-10'), updatedAt: new Date('2025-06-09') },
  { id: '8', name: 'Diana Prince', email: 'diana@example.com', role: 'citizen', status: 'active', createdAt: new Date('2025-04-10'), updatedAt: new Date('2025-04-10') },
  { id: '9', name: 'Evan Wright', email: 'evan@example.com', role: 'citizen', status: 'active', createdAt: new Date('2025-05-01'), updatedAt: new Date('2025-05-01') },
  { id: '10', name: 'Officer Mike Torres', email: 'mike.torres@police.gov', role: 'police', status: 'inactive', createdAt: new Date('2025-04-01'), updatedAt: new Date('2025-05-15') },
];

// ─── Reports ────────────────────────────────────────────────────────────────────
const reports = [
  { id: '1', title: 'Smartphone snatched at Central Park', category: 'Robbery', severity: 'high', location: { lat: 40.7829, lng: -73.9654 }, city: 'New York', district: 'Manhattan', status: 'pending', assignedTo: null, createdAt: new Date('2025-06-10T20:30:00'), updatedAt: new Date('2025-06-10T20:30:00') },
  { id: '2', title: 'Car break-in on 5th Avenue', category: 'Theft', severity: 'medium', location: { lat: 40.7527, lng: -73.9772 }, city: 'New York', district: 'Manhattan', status: 'investigating', assignedTo: '1', createdAt: new Date('2025-06-09T14:15:00'), updatedAt: new Date('2025-06-10T09:00:00') },
  { id: '3', title: 'Assault at Downtown Bar', category: 'Assault', severity: 'high', location: { lat: 40.7128, lng: -74.0060 }, city: 'New York', district: 'Manhattan', status: 'investigating', assignedTo: '2', createdAt: new Date('2025-06-08T23:00:00'), updatedAt: new Date('2025-06-09T10:00:00') },
  { id: '4', title: 'Online fraud reported', category: 'Cyber Crime', severity: 'medium', location: { lat: 34.0522, lng: -118.2437 }, city: 'Los Angeles', district: 'Downtown', status: 'pending', assignedTo: null, createdAt: new Date('2025-06-11T08:00:00'), updatedAt: new Date('2025-06-11T08:00:00') },
  { id: '5', title: 'Missing teenager last seen at mall', category: 'Missing Person', severity: 'high', location: { lat: 40.7357, lng: -73.9940 }, city: 'New York', district: 'Manhattan', status: 'pending', assignedTo: null, createdAt: new Date('2025-06-11T12:00:00'), updatedAt: new Date('2025-06-11T12:00:00') },
  { id: '6', title: 'Drug deal observed in alley', category: 'Drug Related', severity: 'medium', location: { lat: 40.7580, lng: -73.9855 }, city: 'New York', district: 'Manhattan', status: 'resolved', assignedTo: '1', createdAt: new Date('2025-06-05T16:45:00'), updatedAt: new Date('2025-06-07T11:30:00') },
  { id: '7', title: 'Hit and run accident', category: 'Accident', severity: 'high', location: { lat: 40.7484, lng: -73.9857 }, city: 'New York', district: 'Manhattan', status: 'investigating', assignedTo: '2', createdAt: new Date('2025-06-11T07:30:00'), updatedAt: new Date('2025-06-11T08:00:00') },
  { id: '8', title: 'Vandalism at City Park', category: 'Other', severity: 'low', location: { lat: 34.0522, lng: -118.2437 }, city: 'Los Angeles', district: 'Downtown', status: 'rejected', assignedTo: null, createdAt: new Date('2025-06-01T10:00:00'), updatedAt: new Date('2025-06-03T15:00:00') },
  { id: '9', title: 'Burglary at Brooklyn Heights', category: 'Theft', severity: 'high', location: { lat: 40.6882, lng: -73.9935 }, city: 'New York', district: 'Brooklyn', status: 'pending', assignedTo: null, createdAt: new Date('2025-06-12T09:15:00'), updatedAt: new Date('2025-06-12T09:15:00') },
  { id: '10', title: 'Car theft in Queens', category: 'Theft', severity: 'medium', location: { lat: 40.7282, lng: -73.7949 }, city: 'New York', district: 'Queens', status: 'pending', assignedTo: null, createdAt: new Date('2025-06-11T22:00:00'), updatedAt: new Date('2025-06-11T22:00:00') },
  { id: '11', title: 'Shots fired in Bronx', category: 'Other', severity: 'critical', location: { lat: 40.8448, lng: -73.8648 }, city: 'New York', district: 'Bronx', status: 'investigating', assignedTo: '1', createdAt: new Date('2025-06-12T02:30:00'), updatedAt: new Date('2025-06-12T03:00:00') },
  { id: '12', title: 'Package theft from porch', category: 'Theft', severity: 'low', location: { lat: 40.7282, lng: -73.7949 }, city: 'New York', district: 'Queens', status: 'resolved', assignedTo: '2', createdAt: new Date('2025-06-12T14:00:00'), updatedAt: new Date('2025-06-12T16:00:00') },
  { id: '13', title: 'Identity theft scheme', category: 'Cyber Crime', severity: 'high', location: { lat: 41.8781, lng: -87.6298 }, city: 'Chicago', district: 'Downtown', status: 'pending', assignedTo: null, createdAt: new Date('2025-06-10T11:00:00'), updatedAt: new Date('2025-06-10T11:00:00') },
  { id: '14', title: 'Road rage incident', category: 'Assault', severity: 'medium', location: { lat: 41.8781, lng: -87.6298 }, city: 'Chicago', district: 'Downtown', status: 'investigating', assignedTo: '3', createdAt: new Date('2025-06-09T17:45:00'), updatedAt: new Date('2025-06-10T08:00:00') },
  { id: '15', title: 'Missing bicycle', category: 'Theft', severity: 'low', location: { lat: 40.7128, lng: -74.0060 }, city: 'New York', district: 'Manhattan', status: 'pending', assignedTo: null, createdAt: new Date('2025-06-12T16:30:00'), updatedAt: new Date('2025-06-12T16:30:00') },
  { id: '16', title: 'Bank robbery downtown', category: 'Robbery', severity: 'critical', location: { lat: 40.7128, lng: -74.0060 }, city: 'New York', district: 'Manhattan', status: 'investigating', assignedTo: '1', createdAt: new Date('2025-06-13T09:00:00'), updatedAt: new Date('2025-06-13T09:15:00') },
  { id: '17', title: 'Domestic disturbance call', category: 'Other', severity: 'medium', location: { lat: 40.7580, lng: -73.9855 }, city: 'New York', district: 'Manhattan', status: 'resolved', assignedTo: '2', createdAt: new Date('2025-06-13T11:00:00'), updatedAt: new Date('2025-06-13T12:30:00') },
  { id: '18', title: 'Car vandalism in Chicago', category: 'Other', severity: 'low', location: { lat: 41.8781, lng: -87.6298 }, city: 'Chicago', district: 'Downtown', status: 'pending', assignedTo: null, createdAt: new Date('2025-06-13T14:00:00'), updatedAt: new Date('2025-06-13T14:00:00') },
];

// ─── Investigations ─────────────────────────────────────────────────────────────
const investigations = [
  { id: '1', reportId: '2', officerId: '1', status: 'in_progress', notes: 'Reviewing CCTV footage.', startedAt: new Date('2025-06-10T09:00:00'), closedAt: null, createdAt: new Date('2025-06-10T09:00:00') },
  { id: '2', reportId: '3', officerId: '2', status: 'in_progress', notes: 'Interviewing witnesses.', startedAt: new Date('2025-06-09T10:00:00'), closedAt: null, createdAt: new Date('2025-06-09T10:00:00') },
  { id: '3', reportId: '6', officerId: '1', status: 'closed', notes: 'Suspect apprehended.', startedAt: new Date('2025-06-05T17:00:00'), closedAt: new Date('2025-06-07T11:30:00'), createdAt: new Date('2025-06-05T17:00:00') },
  { id: '4', reportId: '7', officerId: '2', status: 'in_progress', notes: 'Checking traffic cameras.', startedAt: new Date('2025-06-11T08:00:00'), closedAt: null, createdAt: new Date('2025-06-11T08:00:00') },
  { id: '5', reportId: '11', officerId: '1', status: 'in_progress', notes: 'Forensics team on site.', startedAt: new Date('2025-06-12T03:00:00'), closedAt: null, createdAt: new Date('2025-06-12T03:00:00') },
  { id: '6', reportId: '12', officerId: '2', status: 'closed', notes: 'Suspect identified from doorbell camera.', startedAt: new Date('2025-06-12T14:30:00'), closedAt: new Date('2025-06-12T16:00:00'), createdAt: new Date('2025-06-12T14:30:00') },
  { id: '7', reportId: '14', officerId: '3', status: 'in_progress', notes: 'Reviewing dashcam footage.', startedAt: new Date('2025-06-10T08:00:00'), closedAt: null, createdAt: new Date('2025-06-10T08:00:00') },
  { id: '8', reportId: '16', officerId: '1', status: 'in_progress', notes: 'Gathering bank security footage.', startedAt: new Date('2025-06-13T09:15:00'), closedAt: null, createdAt: new Date('2025-06-13T09:15:00') },
  { id: '9', reportId: '17', officerId: '2', status: 'closed', notes: 'Resolved through mediation.', startedAt: new Date('2025-06-13T11:00:00'), closedAt: new Date('2025-06-13T12:30:00'), createdAt: new Date('2025-06-13T11:00:00') },
];

// ─── Notifications ──────────────────────────────────────────────────────────────
const notifications = [
  { id: '1', userId: '1', type: 'crime_alert', title: 'New crime reported nearby', status: 'unread', createdAt: new Date('2025-06-10T20:35:00') },
  { id: '2', userId: '2', type: 'status_update', title: 'Report status updated', status: 'unread', createdAt: new Date('2025-06-10T09:00:00') },
  { id: '3', userId: '1', type: 'police_update', title: 'Police assigned to your report', status: 'read', createdAt: new Date('2025-06-09T10:00:00') },
  { id: '4', userId: '1', type: 'crime_alert', title: 'Emergency: Shots fired in Bronx', status: 'unread', createdAt: new Date('2025-06-12T02:35:00') },
  { id: '5', userId: '2', type: 'system_notification', title: 'Profile updated', status: 'read', createdAt: new Date('2025-06-08T12:00:00') },
  { id: '6', userId: '3', type: 'admin_broadcast', title: 'System maintenance tonight', status: 'unread', createdAt: new Date('2025-06-11T10:00:00') },
  { id: '7', userId: '3', type: 'crime_alert', title: 'Investigation completed', status: 'archived', createdAt: new Date('2025-06-07T11:30:00') },
  { id: '8', userId: '1', type: 'status_update', title: 'Report resolved', status: 'unread', createdAt: new Date('2025-06-07T11:30:00') },
  { id: '9', userId: '1', type: 'police_update', title: 'Officer assigned to your case', status: 'unread', createdAt: new Date('2025-06-11T08:00:00') },
  { id: '10', userId: '2', type: 'system_notification', title: 'Welcome to CrimeWatch', status: 'read', createdAt: new Date('2025-04-01T00:00:00') },
  { id: '11', userId: '1', type: 'crime_alert', title: 'Bank robbery alert', status: 'unread', createdAt: new Date('2025-06-13T09:00:00') },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────
function applyFilters(data, filters) {
  let result = [...data];
  if (filters.city) result = result.filter((r) => r.city.toLowerCase() === filters.city.toLowerCase());
  if (filters.category) result = result.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
  if (filters.status) result = result.filter((r) => r.status === filters.status);
  if (filters.severity) result = result.filter((r) => r.severity === filters.severity);
  if (filters.dateFrom) result = result.filter((r) => r.createdAt >= new Date(filters.dateFrom));
  if (filters.dateTo) result = result.filter((r) => r.createdAt <= new Date(filters.dateTo));
  return result;
}

function countBy(arr, keyFn) {
  const map = {};
  arr.forEach((item) => {
    const k = keyFn(item);
    map[k] = (map[k] || 0) + 1;
  });
  return Object.entries(map).map(([key, count]) => ({ key, count }));
}

const Repository = {
  // ─── 1. Overview ──────────────────────────────────────────────────────────────
  getOverview: async (filters = {}) => {
    await sleep(15);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const filtered = applyFilters(reports, filters);
    const totalUsers = users.filter((u) => u.status === 'active').length;
    const totalPolice = users.filter((u) => u.role === 'police').length;
    const totalReports = filtered.length;
    const pendingReports = filtered.filter((r) => r.status === 'pending').length;
    const activeInvestigations = filtered.filter((r) => r.status === 'investigating').length;
    const resolvedReports = filtered.filter((r) => r.status === 'resolved').length;
    const reportsToday = filtered.filter((r) => r.createdAt >= todayStart).length;
    const reportsThisMonth = filtered.filter((r) => r.createdAt >= monthStart).length;
    return { totalUsers, totalPolice, totalReports, pendingReports, activeInvestigations, resolvedReports, reportsToday, reportsThisMonth };
  },

  // ─── 2. Crime Statistics ──────────────────────────────────────────────────────
  getCrimeStatistics: async (filters = {}) => {
    await sleep(15);
    const filtered = applyFilters(reports, filters);
    const byCategory = countBy(filtered, (r) => r.category);
    const byCity = countBy(filtered, (r) => r.city);
    const byStatus = countBy(filtered, (r) => r.status);
    const bySeverity = countBy(filtered, (r) => r.severity);
    return { byCategory, byCity, byStatus, bySeverity };
  },

  // ─── 3. Charts ────────────────────────────────────────────────────────────────
  getMonthlyTrend: async (filters = {}) => {
    await sleep(10);
    const filtered = applyFilters(reports, filters);
    const map = {};
    filtered.forEach((r) => {
      const key = `${r.createdAt.getFullYear()}-${String(r.createdAt.getMonth() + 1).padStart(2, '0')}`;
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).map(([month, count]) => ({ month, count })).sort((a, b) => a.month.localeCompare(b.month));
  },

  getDailyTrend: async (filters = {}) => {
    await sleep(10);
    const filtered = applyFilters(reports, filters);
    const map = {};
    filtered.forEach((r) => {
      const key = r.createdAt.toISOString().split('T')[0];
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date));
  },

  getWeeklyTrend: async (filters = {}) => {
    await sleep(10);
    const filtered = applyFilters(reports, filters);
    const map = {};
    filtered.forEach((r) => {
      const d = new Date(r.createdAt);
      const dayOfWeek = d.getDay();
      const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const monday = new Date(d.setDate(diff));
      const key = monday.toISOString().split('T')[0];
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).map(([week, count]) => ({ week, count })).sort((a, b) => a.week.localeCompare(b.week));
  },

  getCategoryDistribution: async (filters = {}) => {
    await sleep(8);
    const filtered = applyFilters(reports, filters);
    return countBy(filtered, (r) => r.category);
  },

  getStatusDistribution: async (filters = {}) => {
    await sleep(8);
    const filtered = applyFilters(reports, filters);
    return countBy(filtered, (r) => r.status);
  },

  // ─── 4. Recent Activity ───────────────────────────────────────────────────────
  getRecentActivity: async (limit = 10, filters = {}) => {
    await sleep(12);
    const filtered = applyFilters(reports, filters);
    const latestReports = [...filtered]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit)
      .map((r) => ({ id: r.id, title: r.title, category: r.category, city: r.city, status: r.status, createdAt: r.createdAt }));
    const latestInvestigations = [...investigations]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit)
      .map((i) => {
        const r = reports.find((x) => x.id === i.reportId);
        return { id: i.id, reportId: i.reportId, reportTitle: r ? r.title : 'Unknown', status: i.status, startedAt: i.startedAt, createdAt: i.createdAt };
      });
    const latestNotifications = [...notifications]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit)
      .map((n) => ({ id: n.id, userId: n.userId, title: n.title, type: n.type, status: n.status, createdAt: n.createdAt }));
    return { latestReports, latestInvestigations, latestNotifications };
  },

  // ─── 5. Heatmap Analytics ────────────────────────────────────────────────────
  getTopCrimeAreas: async (limit = 10, filters = {}) => {
    await sleep(10);
    const filtered = applyFilters(reports, filters);
    const map = {};
    filtered.forEach((r) => {
      const key = `${r.location.lat},${r.location.lng}`;
      if (!map[key]) map[key] = { lat: r.location.lat, lng: r.location.lng, address: `${r.district}, ${r.city}`, count: 0 };
      map[key].count++;
    });
    return Object.values(map).sort((a, b) => b.count - a.count).slice(0, limit);
  },

  getHighRiskZones: async (filters = {}) => {
    await sleep(10);
    const filtered = applyFilters(reports, filters);
    const highSeverity = filtered.filter((r) => r.severity === 'high' || r.severity === 'critical');
    const map = {};
    highSeverity.forEach((r) => {
      const key = `${r.district}, ${r.city}`;
      if (!map[key]) map[key] = { zone: key, city: r.city, district: r.district, count: 0, criticalCount: 0 };
      map[key].count++;
      if (r.severity === 'critical') map[key].criticalCount++;
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  },

  getCrimeDensity: async (gridSize = 0.1, filters = {}) => {
    await sleep(10);
    const filtered = applyFilters(reports, filters);
    const map = {};
    filtered.forEach((r) => {
      const latKey = Math.floor(r.location.lat / gridSize) * gridSize;
      const lngKey = Math.floor(r.location.lng / gridSize) * gridSize;
      const key = `${latKey},${lngKey}`;
      if (!map[key]) map[key] = { lat: parseFloat((latKey + gridSize / 2).toFixed(4)), lng: parseFloat((lngKey + gridSize / 2).toFixed(4)), count: 0 };
      map[key].count++;
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  },

  // ─── 6. Police Analytics ──────────────────────────────────────────────────────
  getPoliceAnalytics: async (filters = {}) => {
    await sleep(12);
    const filtered = applyFilters(reports, filters);
    const casesAssigned = filtered.filter((r) => r.assignedTo).length;
    const casesSolved = filtered.filter((r) => r.status === 'resolved').length;
    const casesPending = filtered.filter((r) => r.status === 'pending').length;
    const closedInvs = investigations.filter((i) => i.status === 'closed' && i.closedAt && i.startedAt);
    let totalHours = 0;
    closedInvs.forEach((i) => totalHours += (i.closedAt - i.startedAt) / (1000 * 60 * 60));
    const averageResolutionHours = closedInvs.length > 0 ? parseFloat((totalHours / closedInvs.length).toFixed(1)) : 0;
    const byOfficer = {};
    filtered.filter((r) => r.assignedTo).forEach((r) => {
      if (!byOfficer[r.assignedTo]) byOfficer[r.assignedTo] = { officerId: r.assignedTo, assigned: 0, solved: 0 };
      byOfficer[r.assignedTo].assigned++;
      if (r.status === 'resolved') byOfficer[r.assignedTo].solved++;
    });
    return { casesAssigned, casesSolved, casesPending, averageResolutionHours, byOfficer: Object.values(byOfficer) };
  },

  // ─── 7. System Analytics ──────────────────────────────────────────────────────
  getSystemAnalytics: async () => {
    await sleep(10);
    const activeUsers = users.filter((u) => u.status === 'active').length;
    const onlinePolice = users.filter((u) => u.role === 'police' && u.status === 'active').length;
    const totalNotificationsSent = notifications.length;
    const closedInvs = investigations.filter((i) => i.status === 'closed' && i.closedAt && i.createdAt);
    let totalResponseHours = 0;
    closedInvs.forEach((i) => totalResponseHours += (i.closedAt - i.createdAt) / (1000 * 60 * 60));
    const averageResponseHours = closedInvs.length > 0 ? parseFloat((totalResponseHours / closedInvs.length).toFixed(1)) : 0;
    return { activeUsers, onlinePolice, totalNotificationsSent, averageResponseHours };
  },
};

module.exports = Repository;
