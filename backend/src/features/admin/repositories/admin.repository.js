let idCounter = 1;
const generateId = () => String(idCounter++);

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'citizen', status: 'active', createdAt: new Date('2025-01-15'), updatedAt: new Date('2025-01-15') },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'citizen', status: 'active', createdAt: new Date('2025-02-01'), updatedAt: new Date('2025-02-01') },
  { id: '3', name: 'Officer Jane Doe', email: 'jane.doe@police.gov', role: 'police', status: 'active', createdAt: new Date('2025-01-20'), updatedAt: new Date('2025-01-20') },
  { id: '4', name: 'Officer John Roe', email: 'john.roe@police.gov', role: 'police', status: 'active', createdAt: new Date('2025-03-01'), updatedAt: new Date('2025-03-01') },
  { id: '5', name: 'Admin User', email: 'admin@crimewatch.com', role: 'admin', status: 'active', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '6', name: 'Charlie Brown', email: 'charlie@example.com', role: 'citizen', status: 'suspended', createdAt: new Date('2025-02-15'), updatedAt: new Date('2025-03-01') },
];

const reports = [
  { id: '1', title: 'Smartphone snatched at Central Park', description: 'Victim reported phone stolen while walking through the park at night.', category: 'Robbery', location: { lat: 40.7829, lng: -73.9654, address: 'Central Park, NY' }, city: 'New York', status: 'pending', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-10T20:30:00'), updatedAt: new Date('2025-06-10T20:30:00') },
  { id: '2', title: 'Car break-in on 5th Avenue', description: 'Vehicle window smashed and laptop stolen.', category: 'Theft', location: { lat: 40.7527, lng: -73.9772, address: '5th Avenue, NY' }, city: 'New York', status: 'investigating', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: '3', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-09T14:15:00'), updatedAt: new Date('2025-06-10T09:00:00') },
  { id: '3', title: 'Assault at Downtown Bar', description: 'Physical altercation outside a bar resulting in minor injuries.', category: 'Assault', location: { lat: 40.7128, lng: -74.0060, address: 'Downtown, NY' }, city: 'New York', status: 'investigating', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: '4', assignedToName: 'Officer John Roe', createdAt: new Date('2025-06-08T23:00:00'), updatedAt: new Date('2025-06-09T10:00:00') },
  { id: '4', title: 'Online fraud reported', description: 'Victim lost $2000 in a phishing scam.', category: 'Cyber Crime', location: { lat: 34.0522, lng: -118.2437, address: 'Los Angeles, CA' }, city: 'Los Angeles', status: 'pending', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-11T08:00:00'), updatedAt: new Date('2025-06-11T08:00:00') },
  { id: '5', title: 'Missing teenager last seen at mall', description: '14-year-old last seen at Westfield Mall around 6pm.', category: 'Missing Person', location: { lat: 40.7357, lng: -73.9940, address: 'Westfield Mall, NY' }, city: 'New York', status: 'pending', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-11T12:00:00'), updatedAt: new Date('2025-06-11T12:00:00') },
  { id: '6', title: 'Drug deal observed in alley', description: 'Suspicious activity reported behind Main Street stores.', category: 'Drug Related', location: { lat: 40.7580, lng: -73.9855, address: 'Main Street, NY' }, city: 'New York', status: 'closed', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: '3', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-05T16:45:00'), updatedAt: new Date('2025-06-07T11:30:00') },
  { id: '7', title: 'Hit and run accident', description: 'Vehicle struck pedestrian and fled the scene.', category: 'Accident', location: { lat: 40.7484, lng: -73.9857, address: 'Empire State Building Area, NY' }, city: 'New York', status: 'investigating', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: '4', assignedToName: 'Officer John Roe', createdAt: new Date('2025-06-11T07:30:00'), updatedAt: new Date('2025-06-11T08:00:00') },
  { id: '8', title: 'Vandalism at City Park', description: 'Graffiti and damaged benches reported.', category: 'Other', location: { lat: 34.0522, lng: -118.2437, address: 'City Park, Los Angeles' }, city: 'Los Angeles', status: 'closed', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-01T10:00:00'), updatedAt: new Date('2025-06-03T15:00:00') },
];

const officers = [
  { id: '1', name: 'Officer Jane Doe', badgeNumber: 'BDG-001', email: 'jane.doe@police.gov', phone: '+1-555-0101', department: 'NYPD', rank: 'Sergeant', status: 'active', createdAt: new Date('2025-01-20'), updatedAt: new Date('2025-01-20') },
  { id: '2', name: 'Officer John Roe', badgeNumber: 'BDG-002', email: 'john.roe@police.gov', phone: '+1-555-0102', department: 'NYPD', rank: 'Officer', status: 'active', createdAt: new Date('2025-03-01'), updatedAt: new Date('2025-03-01') },
  { id: '3', name: 'Officer Sarah Miles', badgeNumber: 'BDG-003', email: 'sarah.miles@police.gov', phone: '+1-555-0103', department: 'LAPD', rank: 'Detective', status: 'active', createdAt: new Date('2025-02-10'), updatedAt: new Date('2025-02-10') },
  { id: '4', name: 'Officer Mike Torres', badgeNumber: 'BDG-004', email: 'mike.torres@police.gov', phone: '+1-555-0104', department: 'NYPD', rank: 'Officer', status: 'inactive', createdAt: new Date('2025-04-01'), updatedAt: new Date('2025-05-15') },
];

const categories = [
  { id: '1', name: 'Theft', description: 'Unlawful taking of property', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '2', name: 'Assault', description: 'Physical attack or threat of harm', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '3', name: 'Robbery', description: 'Taking property by force or threat', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '4', name: 'Cyber Crime', description: 'Crime committed via computer or internet', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '5', name: 'Missing Person', description: 'Individual reported missing', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '6', name: 'Accident', description: 'Non-criminal incident requiring police response', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '7', name: 'Drug Related', description: 'Offenses involving controlled substances', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '8', name: 'Other', description: 'Miscellaneous incidents', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
];

const auditLogs = [];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Repository = {
  // ─── Dashboard ────────────────────────────────────────────────────────────────
  getDashboardStats: async () => {
    await sleep(10);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const totalCitizens = users.filter((u) => u.role === 'citizen').length;
    const totalPolice = officers.filter((o) => o.status === 'active').length;
    const totalReports = reports.length;
    const pendingReports = reports.filter((r) => r.status === 'pending').length;
    const investigatingReports = reports.filter((r) => r.status === 'investigating').length;
    const closedReports = reports.filter((r) => r.status === 'closed').length;
    const reportsToday = reports.filter((r) => r.createdAt >= todayStart).length;
    const reportsThisMonth = reports.filter((r) => r.createdAt >= monthStart).length;
    return { totalCitizens, totalPolice, totalReports, pendingReports, investigatingReports, closedReports, reportsToday, reportsThisMonth, totalUsers: users.length };
  },

  // ─── Users ────────────────────────────────────────────────────────────────────
  findAllUsers: async (filters = {}) => {
    await sleep(10);
    let result = [...users];
    if (filters.role) result = result.filter((u) => u.role === filters.role);
    if (filters.status) result = result.filter((u) => u.status === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    return result;
  },

  findUserById: async (userId) => {
    await sleep(5);
    return users.find((u) => u.id === userId) || null;
  },

  updateUserStatus: async (userId, status) => {
    await sleep(5);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    user.status = status;
    user.updatedAt = new Date();
    return user;
  },

  deleteUserById: async (userId) => {
    await sleep(5);
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  },

  // ─── Police Officers ──────────────────────────────────────────────────────────
  findAllOfficers: async (filters = {}) => {
    await sleep(10);
    let result = [...officers];
    if (filters.status) result = result.filter((o) => o.status === filters.status);
    if (filters.department) result = result.filter((o) => o.department === filters.department);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((o) => o.name.toLowerCase().includes(q) || o.badgeNumber.toLowerCase().includes(q));
    }
    return result;
  },

  findOfficerById: async (officerId) => {
    await sleep(5);
    return officers.find((o) => o.id === officerId) || null;
  },

  createOfficer: async (data) => {
    await sleep(5);
    const officer = {
      id: generateId(),
      name: data.name,
      badgeNumber: data.badgeNumber,
      email: data.email,
      phone: data.phone || '',
      department: data.department,
      rank: data.rank,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    officers.push(officer);
    return officer;
  },

  updateOfficer: async (officerId, data) => {
    await sleep(5);
    const officer = officers.find((o) => o.id === officerId);
    if (!officer) return null;
    if (data.name !== undefined) officer.name = data.name;
    if (data.badgeNumber !== undefined) officer.badgeNumber = data.badgeNumber;
    if (data.email !== undefined) officer.email = data.email;
    if (data.phone !== undefined) officer.phone = data.phone;
    if (data.department !== undefined) officer.department = data.department;
    if (data.rank !== undefined) officer.rank = data.rank;
    officer.updatedAt = new Date();
    return officer;
  },

  toggleOfficerStatus: async (officerId, status) => {
    await sleep(5);
    const officer = officers.find((o) => o.id === officerId);
    if (!officer) return null;
    officer.status = status;
    officer.updatedAt = new Date();
    return officer;
  },

  deleteOfficerById: async (officerId) => {
    await sleep(5);
    const index = officers.findIndex((o) => o.id === officerId);
    if (index === -1) return false;
    officers.splice(index, 1);
    return true;
  },

  // ─── Crime Categories ─────────────────────────────────────────────────────────
  findAllCategories: async () => {
    await sleep(5);
    return [...categories];
  },

  findCategoryById: async (categoryId) => {
    await sleep(3);
    return categories.find((c) => c.id === categoryId) || null;
  },

  createCategory: async (data) => {
    await sleep(5);
    const category = {
      id: generateId(),
      name: data.name,
      description: data.description || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    categories.push(category);
    return category;
  },

  updateCategory: async (categoryId, data) => {
    await sleep(5);
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return null;
    if (data.name !== undefined) category.name = data.name;
    if (data.description !== undefined) category.description = data.description;
    category.updatedAt = new Date();
    return category;
  },

  deleteCategoryById: async (categoryId) => {
    await sleep(5);
    const index = categories.findIndex((c) => c.id === categoryId);
    if (index === -1) return false;
    categories.splice(index, 1);
    return true;
  },

  // ─── Reports ───────────────────────────────────────────────────────────────────
  findAllReports: async (filters = {}) => {
    await sleep(10);
    let result = [...reports];
    if (filters.status) result = result.filter((r) => r.status === filters.status);
    if (filters.category) result = result.filter((r) => r.category === filters.category);
    if (filters.city) result = result.filter((r) => r.city === filters.city);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
    }
    if (filters.assignedTo) result = result.filter((r) => r.assignedTo === filters.assignedTo);
    return result;
  },

  findReportById: async (reportId) => {
    await sleep(5);
    return reports.find((r) => r.id === reportId) || null;
  },

  updateReport: async (reportId, data) => {
    await sleep(5);
    const report = reports.find((r) => r.id === reportId);
    if (!report) return null;
    if (data.title !== undefined) report.title = data.title;
    if (data.description !== undefined) report.description = data.description;
    if (data.category !== undefined) report.category = data.category;
    if (data.status !== undefined) report.status = data.status;
    if (data.location !== undefined) report.location = data.location;
    if (data.city !== undefined) report.city = data.city;
    report.updatedAt = new Date();
    return report;
  },

  assignReportToOfficer: async (reportId, officerId) => {
    await sleep(5);
    const report = reports.find((r) => r.id === reportId);
    if (!report) return null;
    const officer = officers.find((o) => o.id === officerId);
    if (!officer) return null;
    report.assignedTo = officerId;
    report.assignedToName = officer.name;
    if (report.status === 'pending') report.status = 'investigating';
    report.updatedAt = new Date();
    return report;
  },

  deleteReportById: async (reportId) => {
    await sleep(5);
    const index = reports.findIndex((r) => r.id === reportId);
    if (index === -1) return false;
    reports.splice(index, 1);
    return true;
  },

  // ─── Analytics ─────────────────────────────────────────────────────────────────
  getCrimesByCategory: async () => {
    await sleep(10);
    const map = {};
    reports.forEach((r) => {
      map[r.category] = (map[r.category] || 0) + 1;
    });
    return Object.entries(map).map(([category, count]) => ({ category, count }));
  },

  getCrimesByCity: async () => {
    await sleep(10);
    const map = {};
    reports.forEach((r) => {
      map[r.city] = (map[r.city] || 0) + 1;
    });
    return Object.entries(map).map(([city, count]) => ({ city, count }));
  },

  getMonthlyReports: async () => {
    await sleep(10);
    const map = {};
    reports.forEach((r) => {
      const key = `${r.createdAt.getFullYear()}-${String(r.createdAt.getMonth() + 1).padStart(2, '0')}`;
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));
  },

  getCrimeTrend: async () => {
    await sleep(10);
    const map = {};
    reports.forEach((r) => {
      const key = r.createdAt.toISOString().split('T')[0];
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  getTopLocations: async (limit = 10) => {
    await sleep(10);
    const map = {};
    reports.forEach((r) => {
      const key = `${r.location.lat},${r.location.lng}`;
      if (!map[key]) {
        map[key] = { lat: r.location.lat, lng: r.location.lng, address: r.location.address, count: 0 };
      }
      map[key].count++;
    });
    return Object.values(map)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  },

  // ─── Audit Logs ────────────────────────────────────────────────────────────────
  createAuditLog: async (entry) => {
    await sleep(3);
    const log = {
      id: generateId(),
      action: entry.action,
      performedBy: entry.performedBy,
      performedByName: entry.performedByName || '',
      targetId: entry.targetId || '',
      targetType: entry.targetType || '',
      details: entry.details || {},
      timestamp: new Date(),
    };
    auditLogs.push(log);
    return log;
  },

  findAllAuditLogs: async (filters = {}) => {
    await sleep(10);
    let result = [...auditLogs];
    if (filters.action) result = result.filter((l) => l.action === filters.action);
    if (filters.targetType) result = result.filter((l) => l.targetType === filters.targetType);
    if (filters.from) result = result.filter((l) => l.timestamp >= new Date(filters.from));
    if (filters.to) result = result.filter((l) => l.timestamp <= new Date(filters.to));
    return result.sort((a, b) => b.timestamp - a.timestamp);
  },
};

module.exports = Repository;
