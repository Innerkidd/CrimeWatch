let idCounter = 100;
const generateId = () => String(idCounter++);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const officers = [
  { id: '1', name: 'Officer Jane Doe', badgeNumber: 'BDG-001', email: 'jane.doe@police.gov', phone: '+1-555-0101', department: 'NYPD', rank: 'Sergeant', status: 'active', isAvailable: true, currentLocation: { lat: 40.7580, lng: -73.9855, address: 'NYPD HQ, NY' }, createdAt: new Date('2025-01-20'), updatedAt: new Date('2025-06-10') },
  { id: '2', name: 'Officer John Roe', badgeNumber: 'BDG-002', email: 'john.roe@police.gov', phone: '+1-555-0102', department: 'NYPD', rank: 'Officer', status: 'active', isAvailable: true, currentLocation: { lat: 40.7484, lng: -73.9857, address: 'Midtown, NY' }, createdAt: new Date('2025-03-01'), updatedAt: new Date('2025-06-11') },
  { id: '3', name: 'Officer Sarah Miles', badgeNumber: 'BDG-003', email: 'sarah.miles@police.gov', phone: '+1-555-0103', department: 'LAPD', rank: 'Detective', status: 'active', isAvailable: false, currentLocation: { lat: 34.0522, lng: -118.2437, address: 'LAPD HQ, Los Angeles' }, createdAt: new Date('2025-02-10'), updatedAt: new Date('2025-06-09') },
  { id: '4', name: 'Officer Mike Torres', badgeNumber: 'BDG-004', email: 'mike.torres@police.gov', phone: '+1-555-0104', department: 'NYPD', rank: 'Officer', status: 'inactive', isAvailable: false, currentLocation: { lat: 40.7128, lng: -74.0060, address: 'Downtown, NY' }, createdAt: new Date('2025-04-01'), updatedAt: new Date('2025-05-15') },
];

const reports = [
  { id: '1', title: 'Smartphone snatched at Central Park', description: 'Victim reported phone stolen while walking through the park at night.', category: 'Robbery', location: { lat: 40.7829, lng: -73.9654, address: 'Central Park, NY' }, city: 'New York', status: 'pending', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-10T20:30:00'), updatedAt: new Date('2025-06-10T20:30:00') },
  { id: '2', title: 'Car break-in on 5th Avenue', description: 'Vehicle window smashed and laptop stolen.', category: 'Theft', location: { lat: 40.7527, lng: -73.9772, address: '5th Avenue, NY' }, city: 'New York', status: 'investigating', priority: 'normal', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: '1', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-09T14:15:00'), updatedAt: new Date('2025-06-10T09:00:00') },
  { id: '3', title: 'Assault at Downtown Bar', description: 'Physical altercation outside a bar resulting in minor injuries.', category: 'Assault', location: { lat: 40.7128, lng: -74.0060, address: 'Downtown, NY' }, city: 'New York', status: 'investigating', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: '2', assignedToName: 'Officer John Roe', createdAt: new Date('2025-06-08T23:00:00'), updatedAt: new Date('2025-06-09T10:00:00') },
  { id: '4', title: 'Online fraud reported', description: 'Victim lost $2000 in a phishing scam.', category: 'Cyber Crime', location: { lat: 34.0522, lng: -118.2437, address: 'Los Angeles, CA' }, city: 'Los Angeles', status: 'pending', priority: 'normal', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-11T08:00:00'), updatedAt: new Date('2025-06-11T08:00:00') },
  { id: '5', title: 'Missing teenager last seen at mall', description: '14-year-old last seen at Westfield Mall around 6pm.', category: 'Missing Person', location: { lat: 40.7357, lng: -73.9940, address: 'Westfield Mall, NY' }, city: 'New York', status: 'pending', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-11T12:00:00'), updatedAt: new Date('2025-06-11T12:00:00') },
  { id: '6', title: 'Drug deal observed in alley', description: 'Suspicious activity reported behind Main Street stores.', category: 'Drug Related', location: { lat: 40.7580, lng: -73.9855, address: 'Main Street, NY' }, city: 'New York', status: 'resolved', priority: 'normal', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: '1', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-05T16:45:00'), updatedAt: new Date('2025-06-07T11:30:00') },
  { id: '7', title: 'Hit and run accident', description: 'Vehicle struck pedestrian and fled the scene.', category: 'Accident', location: { lat: 40.7484, lng: -73.9857, address: 'Empire State Building Area, NY' }, city: 'New York', status: 'investigating', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: '2', assignedToName: 'Officer John Roe', createdAt: new Date('2025-06-11T07:30:00'), updatedAt: new Date('2025-06-11T08:00:00') },
  { id: '8', title: 'Vandalism at City Park', description: 'Graffiti and damaged benches reported.', category: 'Other', location: { lat: 34.0522, lng: -118.2437, address: 'City Park, Los Angeles' }, city: 'Los Angeles', status: 'rejected', priority: 'low', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-01T10:00:00'), updatedAt: new Date('2025-06-03T15:00:00') },
];

const investigations = [
  { id: '1', reportId: '2', officerId: '1', status: 'in_progress', notes: 'Interviewed witness at the scene. Security footage being reviewed.', findings: '', startedAt: new Date('2025-06-10T09:00:00'), closedAt: null, createdAt: new Date('2025-06-10T09:00:00'), updatedAt: new Date('2025-06-11T10:00:00') },
  { id: '2', reportId: '3', officerId: '2', status: 'assigned', notes: '', findings: '', startedAt: null, closedAt: null, createdAt: new Date('2025-06-09T10:00:00'), updatedAt: new Date('2025-06-09T10:00:00') },
  { id: '3', reportId: '6', officerId: '1', status: 'closed', notes: 'Suspect apprehended and charged.', findings: 'Found illegal substances on suspect. Case closed.', startedAt: new Date('2025-06-05T17:00:00'), closedAt: new Date('2025-06-07T11:30:00'), createdAt: new Date('2025-06-05T17:00:00'), updatedAt: new Date('2025-06-07T11:30:00') },
  { id: '4', reportId: '7', officerId: '2', status: 'in_progress', notes: 'Checking traffic cameras in the area.', findings: '', startedAt: new Date('2025-06-11T08:00:00'), closedAt: null, createdAt: new Date('2025-06-11T08:00:00'), updatedAt: new Date('2025-06-11T09:30:00') },
];

const evidenceStore = [
  { id: '1', investigationId: '1', fileName: 'cctv_footage_5th_ave.mp4', fileType: 'video/mp4', fileUrl: '/evidence/1/cctv_footage_5th_ave.mp4', description: 'Security camera footage from 5th Avenue', uploadedAt: new Date('2025-06-11T10:00:00') },
  { id: '2', investigationId: '3', fileName: 'evidence_photo_1.jpg', fileType: 'image/jpeg', fileUrl: '/evidence/3/evidence_photo_1.jpg', description: 'Photo of evidence found at scene', uploadedAt: new Date('2025-06-06T09:00:00') },
];

const activityLogs = [
  { id: '1', officerId: '1', action: 'LOGIN', details: { ip: '192.168.1.10' }, timestamp: new Date('2025-06-11T08:00:00') },
  { id: '2', officerId: '1', action: 'STATUS_UPDATE', details: { reportId: '2', from: 'assigned', to: 'investigating' }, timestamp: new Date('2025-06-10T09:00:00') },
  { id: '3', officerId: '2', action: 'LOGIN', details: { ip: '192.168.1.11' }, timestamp: new Date('2025-06-11T07:30:00') },
  { id: '4', officerId: '2', action: 'INVESTIGATION_NOTE', details: { reportId: '7', note: 'Checking traffic cameras' }, timestamp: new Date('2025-06-11T09:30:00') },
  { id: '5', officerId: '1', action: 'CASE_CLOSED', details: { reportId: '6', resolution: 'Suspect charged' }, timestamp: new Date('2025-06-07T11:30:00') },
];

function officerResponse(o) {
  return { id: o.id, name: o.name, badgeNumber: o.badgeNumber, email: o.email, phone: o.phone, department: o.department, rank: o.rank, status: o.status, isAvailable: o.isAvailable, currentLocation: o.currentLocation, createdAt: o.createdAt, updatedAt: o.updatedAt };
}

function reportResponse(r) {
  return { id: r.id, title: r.title, description: r.description, category: r.category, location: r.location, city: r.city, status: r.status, priority: r.priority, reportedBy: r.reportedBy, reportedByName: r.reportedByName, assignedTo: r.assignedTo, assignedToName: r.assignedToName, createdAt: r.createdAt, updatedAt: r.updatedAt };
}

const Repository = {
  // ─── Dashboard ──────────────────────────────────────────────────────────────────
  getDashboard: async (officerId) => {
    await sleep(10);
    const assignedCases = reports.filter((r) => r.assignedTo === officerId).length;
    const pendingCases = reports.filter((r) => r.assignedTo === officerId && r.status === 'pending').length;
    const activeInvestigations = investigations.filter((i) => i.officerId === officerId && i.status !== 'closed').length;
    const closedCases = reports.filter((r) => r.assignedTo === officerId && r.status === 'resolved').length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaysReports = reports.filter((r) => r.assignedTo === officerId && r.createdAt >= today).length;
    return { assignedCases, pendingCases, activeInvestigations, closedCases, todaysReports };
  },

  // ─── Profile ────────────────────────────────────────────────────────────────────
  findOfficerById: async (officerId) => {
    await sleep(5);
    const o = officers.find((x) => x.id === officerId);
    return o ? officerResponse(o) : null;
  },

  updateOfficerProfile: async (officerId, data) => {
    await sleep(5);
    const o = officers.find((x) => x.id === officerId);
    if (!o) return null;
    if (data.name !== undefined) o.name = data.name;
    if (data.email !== undefined) o.email = data.email;
    if (data.phone !== undefined) o.phone = data.phone;
    if (data.department !== undefined) o.department = data.department;
    if (data.rank !== undefined) o.rank = data.rank;
    o.updatedAt = new Date();
    return officerResponse(o);
  },

  updateAvailability: async (officerId, isAvailable) => {
    await sleep(5);
    const o = officers.find((x) => x.id === officerId);
    if (!o) return null;
    o.isAvailable = isAvailable;
    o.updatedAt = new Date();
    return officerResponse(o);
  },

  updateCurrentLocation: async (officerId, location) => {
    await sleep(5);
    const o = officers.find((x) => x.id === officerId);
    if (!o) return null;
    o.currentLocation = location;
    o.updatedAt = new Date();
    return officerResponse(o);
  },

  // ─── Assigned Reports ───────────────────────────────────────────────────────────
  findAssignedReports: async (officerId, filters = {}) => {
    await sleep(10);
    let result = reports.filter((r) => r.assignedTo === officerId);
    if (filters.status) result = result.filter((r) => r.status === filters.status);
    if (filters.priority) result = result.filter((r) => r.priority === filters.priority);
    if (filters.category) result = result.filter((r) => r.category === filters.category);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
    }
    return result.map(reportResponse);
  },

  findReportById: async (reportId) => {
    await sleep(5);
    const r = reports.find((x) => x.id === reportId);
    return r ? reportResponse(r) : null;
  },

  updateReportStatus: async (reportId, status) => {
    await sleep(5);
    const r = reports.find((x) => x.id === reportId);
    if (!r) return null;
    r.status = status;
    r.updatedAt = new Date();
    return reportResponse(r);
  },

  // ─── Investigations ─────────────────────────────────────────────────────────────
  findInvestigationsByOfficer: async (officerId, filters = {}) => {
    await sleep(10);
    let result = investigations.filter((i) => i.officerId === officerId);
    if (filters.status) result = result.filter((i) => i.status === filters.status);
    if (filters.reportId) result = result.filter((i) => i.reportId === filters.reportId);
    return result;
  },

  findInvestigationById: async (investigationId) => {
    await sleep(5);
    return investigations.find((i) => i.id === investigationId) || null;
  },

  findInvestigationByReport: async (reportId) => {
    await sleep(5);
    return investigations.find((i) => i.reportId === reportId) || null;
  },

  createInvestigation: async (data) => {
    await sleep(5);
    const inv = {
      id: generateId(),
      reportId: data.reportId,
      officerId: data.officerId,
      status: 'assigned',
      notes: data.notes || '',
      findings: '',
      startedAt: null,
      closedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    investigations.push(inv);
    return inv;
  },

  startInvestigation: async (investigationId, notes) => {
    await sleep(5);
    const inv = investigations.find((i) => i.id === investigationId);
    if (!inv) return null;
    inv.status = 'in_progress';
    inv.startedAt = new Date();
    if (notes) inv.notes = notes;
    inv.updatedAt = new Date();
    return inv;
  },

  updateInvestigationNotes: async (investigationId, notes) => {
    await sleep(5);
    const inv = investigations.find((i) => i.id === investigationId);
    if (!inv) return null;
    inv.notes = notes;
    inv.updatedAt = new Date();
    return inv;
  },

  closeInvestigation: async (investigationId, findings) => {
    await sleep(5);
    const inv = investigations.find((i) => i.id === investigationId);
    if (!inv) return null;
    inv.status = 'closed';
    inv.findings = findings || inv.findings;
    inv.closedAt = new Date();
    inv.updatedAt = new Date();
    return inv;
  },

  // ─── Evidence ───────────────────────────────────────────────────────────────────
  findEvidenceByInvestigation: async (investigationId) => {
    await sleep(5);
    return evidenceStore.filter((e) => e.investigationId === investigationId);
  },

  createEvidence: async (data) => {
    await sleep(5);
    const ev = {
      id: generateId(),
      investigationId: data.investigationId,
      fileName: data.fileName,
      fileType: data.fileType || 'application/octet-stream',
      fileUrl: data.fileUrl || '',
      description: data.description || '',
      uploadedAt: new Date(),
    };
    evidenceStore.push(ev);
    return ev;
  },

  deleteEvidence: async (evidenceId) => {
    await sleep(5);
    const idx = evidenceStore.findIndex((e) => e.id === evidenceId);
    if (idx === -1) return false;
    evidenceStore.splice(idx, 1);
    return true;
  },

  // ─── Nearby Crimes ──────────────────────────────────────────────────────────────
  findNearbyReports: async (lat, lng, radiusKm = 5, page = 1, limit = 20) => {
    await sleep(10);
    function degToRad(d) { return d * Math.PI / 180; }
    function haversine(lat1, lng1, lat2, lng2) {
      const R = 6371;
      const dLat = degToRad(lat2 - lat1);
      const dLng = degToRad(lng2 - lng1);
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLng / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
    let filtered = reports.filter((r) => {
      const dist = haversine(lat, lng, r.location.lat, r.location.lng);
      return dist <= radiusKm;
    });
    const total = filtered.length;
    const offset = (page - 1) * limit;
    filtered = filtered.slice(offset, offset + limit);
    return { reports: filtered.map(reportResponse), total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  // ─── Activity Logs ──────────────────────────────────────────────────────────────
  createActivityLog: async (entry) => {
    await sleep(3);
    const log = {
      id: generateId(),
      officerId: entry.officerId,
      action: entry.action,
      details: entry.details || {},
      timestamp: new Date(),
    };
    activityLogs.push(log);
    return log;
  },

  findActivityLogs: async (officerId, filters = {}) => {
    await sleep(10);
    let result = activityLogs.filter((l) => l.officerId === officerId);
    if (filters.action) result = result.filter((l) => l.action === filters.action);
    if (filters.from) result = result.filter((l) => l.timestamp >= new Date(filters.from));
    if (filters.to) result = result.filter((l) => l.timestamp <= new Date(filters.to));
    return result.sort((a, b) => b.timestamp - a.timestamp);
  },
};

module.exports = Repository;
