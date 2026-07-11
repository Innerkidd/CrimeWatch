const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let idCounter = 100;
const generateId = () => String(idCounter++);

const reports = [
  { id: '1', title: 'Smartphone snatched at Central Park', description: 'Victim reported phone stolen while walking through the park at night. Suspect described as male, tall, wearing dark hoodie.', category: 'Robbery', severity: 'high', location: { lat: 40.7829, lng: -73.9654, address: 'Central Park, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'pending', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', reportedByEmail: 'alice@example.com', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-10T20:30:00'), updatedAt: new Date('2025-06-10T20:30:00') },
  { id: '2', title: 'Car break-in on 5th Avenue', description: 'Vehicle window smashed and laptop bag stolen. Occurred in broad daylight.', category: 'Theft', severity: 'medium', location: { lat: 40.7527, lng: -73.9772, address: '5th Avenue, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'investigating', priority: 'normal', reportedBy: '2', reportedByName: 'Bob Smith', reportedByEmail: 'bob@example.com', assignedTo: '1', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-09T14:15:00'), updatedAt: new Date('2025-06-10T09:00:00') },
  { id: '3', title: 'Assault at Downtown Bar', description: 'Physical altercation outside a bar resulting in minor injuries. Victim treated at scene.', category: 'Assault', severity: 'high', location: { lat: 40.7128, lng: -74.0060, address: 'Downtown, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'investigating', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', reportedByEmail: 'alice@example.com', assignedTo: '2', assignedToName: 'Officer John Roe', createdAt: new Date('2025-06-08T23:00:00'), updatedAt: new Date('2025-06-09T10:00:00') },
  { id: '4', title: 'Online fraud reported', description: 'Victim lost $2000 in a phishing scam. Money transferred to offshore account.', category: 'Cyber Crime', severity: 'medium', location: { lat: 34.0522, lng: -118.2437, address: 'Los Angeles, CA' }, city: 'Los Angeles', district: 'Downtown', state: 'CA', status: 'pending', priority: 'normal', reportedBy: '2', reportedByName: 'Bob Smith', reportedByEmail: 'bob@example.com', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-11T08:00:00'), updatedAt: new Date('2025-06-11T08:00:00') },
  { id: '5', title: 'Missing teenager last seen at mall', description: '14-year-old female last seen at Westfield Mall around 6pm. Wearing blue jeans and white t-shirt.', category: 'Missing Person', severity: 'high', location: { lat: 40.7357, lng: -73.9940, address: 'Westfield Mall, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'pending', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', reportedByEmail: 'alice@example.com', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-11T12:00:00'), updatedAt: new Date('2025-06-11T12:00:00') },
  { id: '6', title: 'Drug deal observed in alley', description: 'Suspicious transaction observed behind Main Street stores. Possible drug deal.', category: 'Drug Crime', severity: 'medium', location: { lat: 40.7580, lng: -73.9855, address: 'Main Street, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'resolved', priority: 'normal', reportedBy: '2', reportedByName: 'Bob Smith', reportedByEmail: 'bob@example.com', assignedTo: '1', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-05T16:45:00'), updatedAt: new Date('2025-06-07T11:30:00') },
  { id: '7', title: 'Hit and run accident', description: 'Vehicle struck pedestrian at crosswalk and fled the scene. Pedestrian taken to hospital.', category: 'Accident', severity: 'high', location: { lat: 40.7484, lng: -73.9857, address: 'Empire State Building Area, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'investigating', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', reportedByEmail: 'alice@example.com', assignedTo: '2', assignedToName: 'Officer John Roe', createdAt: new Date('2025-06-11T07:30:00'), updatedAt: new Date('2025-06-11T08:00:00') },
  { id: '8', title: 'Vandalism at City Park', description: 'Graffiti sprayed on park benches and playground equipment. Damage estimated at $500.', category: 'Vandalism', severity: 'low', location: { lat: 34.0522, lng: -118.2437, address: 'City Park, Los Angeles' }, city: 'Los Angeles', district: 'Downtown', state: 'CA', status: 'rejected', priority: 'low', reportedBy: '2', reportedByName: 'Bob Smith', reportedByEmail: 'bob@example.com', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-01T10:00:00'), updatedAt: new Date('2025-06-03T15:00:00') },
  { id: '9', title: 'Burglary at Brooklyn Heights', description: 'Home broken into through rear window. Jewelry, cash, and electronics stolen.', category: 'Theft', severity: 'high', location: { lat: 40.6882, lng: -73.9935, address: 'Brooklyn Heights, NY' }, city: 'New York', district: 'Brooklyn', state: 'NY', status: 'pending', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', reportedByEmail: 'alice@example.com', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-12T09:15:00'), updatedAt: new Date('2025-06-12T09:15:00') },
  { id: '10', title: 'Car theft in Queens', description: 'Vehicle stolen from parking lot overnight. Silver Honda Civic, license plate ABC-1234.', category: 'Theft', severity: 'medium', location: { lat: 40.7282, lng: -73.7949, address: 'Queens, NY' }, city: 'New York', district: 'Queens', state: 'NY', status: 'pending', priority: 'normal', reportedBy: '2', reportedByName: 'Bob Smith', reportedByEmail: 'bob@example.com', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-11T22:00:00'), updatedAt: new Date('2025-06-11T22:00:00') },
  { id: '11', title: 'Shots fired in Bronx', description: 'Multiple gunshots heard near residential building around 2 AM. No injuries reported.', category: 'Other', severity: 'critical', location: { lat: 40.8448, lng: -73.8648, address: 'Bronx, NY' }, city: 'New York', district: 'Bronx', state: 'NY', status: 'investigating', priority: 'critical', reportedBy: '1', reportedByName: 'Alice Johnson', reportedByEmail: 'alice@example.com', assignedTo: '1', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-12T02:30:00'), updatedAt: new Date('2025-06-12T03:00:00') },
  { id: '12', title: 'Package theft from porch', description: 'Amazon package stolen from front porch at 2 PM. Doorbell camera captured suspect.', category: 'Theft', severity: 'low', location: { lat: 40.7282, lng: -73.7949, address: 'Queens, NY' }, city: 'New York', district: 'Queens', state: 'NY', status: 'assigned', priority: 'low', reportedBy: '2', reportedByName: 'Bob Smith', reportedByEmail: 'bob@example.com', assignedTo: '2', assignedToName: 'Officer John Roe', createdAt: new Date('2025-06-12T14:00:00'), updatedAt: new Date('2025-06-12T14:00:00') },
  { id: '13', title: 'Identity theft scheme', description: 'Multiple victims reported unauthorized credit card use. Suspects posing as bank officials.', category: 'Cyber Crime', severity: 'high', location: { lat: 41.8781, lng: -87.6298, address: 'Chicago, IL' }, city: 'Chicago', district: 'Downtown', state: 'IL', status: 'under_review', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', reportedByEmail: 'alice@example.com', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-10T11:00:00'), updatedAt: new Date('2025-06-10T11:00:00') },
  { id: '14', title: 'Road rage incident', description: 'Driver assaulted after minor traffic dispute. Both parties involved in physical altercation.', category: 'Assault', severity: 'medium', location: { lat: 41.8781, lng: -87.6298, address: 'Chicago, IL' }, city: 'Chicago', district: 'Downtown', state: 'IL', status: 'investigating', priority: 'normal', reportedBy: '2', reportedByName: 'Bob Smith', reportedByEmail: 'bob@example.com', assignedTo: '3', assignedToName: 'Officer Sarah Miles', createdAt: new Date('2025-06-09T17:45:00'), updatedAt: new Date('2025-06-10T08:00:00') },
  { id: '15', title: 'Missing bicycle', description: 'Bicycle locked outside public library was cut and taken during the afternoon.', category: 'Theft', severity: 'low', location: { lat: 40.7128, lng: -74.0060, address: 'Downtown, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'pending', priority: 'low', reportedBy: '2', reportedByName: 'Bob Smith', reportedByEmail: 'bob@example.com', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-12T16:30:00'), updatedAt: new Date('2025-06-12T16:30:00') },
  { id: '16', title: 'Domestic disturbance call', description: 'Neighbors reported loud arguing and sounds of items breaking.', category: 'Domestic Violence', severity: 'high', location: { lat: 40.7580, lng: -73.9855, address: 'Main Street, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'resolved', priority: 'high', reportedBy: '1', reportedByName: 'Alice Johnson', reportedByEmail: 'alice@example.com', assignedTo: '2', assignedToName: 'Officer John Roe', createdAt: new Date('2025-06-13T19:00:00'), updatedAt: new Date('2025-06-13T21:00:00') },
  { id: '17', title: 'Bank robbery downtown', description: 'Armed robbery at First National Bank. Suspect fled on foot with undisclosed cash amount.', category: 'Robbery', severity: 'critical', location: { lat: 40.7128, lng: -74.0060, address: 'Downtown, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'investigating', priority: 'critical', reportedBy: '1', reportedByName: 'Alice Johnson', reportedByEmail: 'alice@example.com', assignedTo: '1', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-13T09:00:00'), updatedAt: new Date('2025-06-13T09:15:00') },
  { id: '18', title: 'Car vandalism in Chicago', description: 'Vehicle tires slashed and paint scratched overnight. Multiple cars affected.', category: 'Vandalism', severity: 'low', location: { lat: 41.8781, lng: -87.6298, address: 'Chicago, IL' }, city: 'Chicago', district: 'Downtown', state: 'IL', status: 'pending', priority: 'low', reportedBy: '2', reportedByName: 'Bob Smith', reportedByEmail: 'bob@example.com', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-13T14:00:00'), updatedAt: new Date('2025-06-13T14:00:00') },
];

const evidenceStore = [
  { id: '1', reportId: '2', fileName: 'cctv_footage_5th_ave.mp4', fileType: 'video/mp4', fileSize: 24576000, fileUrl: '/uploads/evidence/2/cctv_5th_ave.mp4', type: 'video', description: 'Security camera footage from 5th Avenue', uploadedAt: new Date('2025-06-11T10:00:00') },
  { id: '2', reportId: '6', fileName: 'evidence_photo_1.jpg', fileType: 'image/jpeg', fileSize: 2048000, fileUrl: '/uploads/evidence/6/evidence_photo_1.jpg', type: 'image', description: 'Photo of evidence found at scene', uploadedAt: new Date('2025-06-06T09:00:00') },
  { id: '3', reportId: '11', fileName: 'shell_casings.jpg', fileType: 'image/jpeg', fileSize: 1536000, fileUrl: '/uploads/evidence/11/shell_casings.jpg', type: 'image', description: 'Shell casings found at scene', uploadedAt: new Date('2025-06-12T03:30:00') },
  { id: '4', reportId: '17', fileName: 'bank_surveillance.mp4', fileType: 'video/mp4', fileSize: 52428800, fileUrl: '/uploads/evidence/17/bank_surveillance.mp4', type: 'video', description: 'Bank security camera footage of robbery', uploadedAt: new Date('2025-06-13T09:30:00') },
  { id: '5', reportId: '12', fileName: 'doorbell_footage.mp4', fileType: 'video/mp4', fileSize: 10240000, fileUrl: '/uploads/evidence/12/doorbell_footage.mp4', type: 'video', description: 'Doorbell camera recording of package theft', uploadedAt: new Date('2025-06-12T14:30:00') },
];

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function applyFilters(data, filters) {
  let result = [...data];
  if (filters.status) result = result.filter((r) => r.status === filters.status);
  if (filters.category) result = result.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
  if (filters.severity) result = result.filter((r) => r.severity === filters.severity);
  if (filters.city) result = result.filter((r) => r.city.toLowerCase() === filters.city.toLowerCase());
  if (filters.district) result = result.filter((r) => r.district.toLowerCase() === filters.district.toLowerCase());
  if (filters.assignedTo) result = result.filter((r) => r.assignedTo === filters.assignedTo);
  if (filters.reportedBy) result = result.filter((r) => r.reportedBy === filters.reportedBy);
  if (filters.dateFrom) result = result.filter((r) => r.createdAt >= new Date(filters.dateFrom));
  if (filters.dateTo) result = result.filter((r) => r.createdAt <= new Date(filters.dateTo));
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.id === filters.search ||
      (r.reportedByName && r.reportedByName.toLowerCase().includes(q)) ||
      (r.assignedToName && r.assignedToName.toLowerCase().includes(q))
    );
  }
  return result;
}

function paginate(data, page, limit) {
  const p = parseInt(page, 10) || 1;
  const l = parseInt(limit, 10) || 20;
  const offset = (p - 1) * l;
  const total = data.length;
  return { reports: data.slice(offset, offset + l), total, page: p, limit: l, totalPages: Math.ceil(total / l) };
}

function reportResponse(r) {
  const ev = evidenceStore.filter((e) => e.reportId === r.id);
  return { ...r, evidence: ev };
}

const Repository = {
  // ─── CRUD ──────────────────────────────────────────────────────────────────────
  create: async (data) => {
    await sleep(10);
    const report = {
      id: generateId(),
      title: data.title,
      description: data.description || '',
      category: data.category,
      severity: data.severity || 'medium',
      location: data.location || { lat: 0, lng: 0, address: '' },
      city: data.city || '',
      district: data.district || '',
      state: data.state || '',
      status: 'pending',
      priority: data.severity === 'critical' ? 'critical' : data.severity === 'high' ? 'high' : 'normal',
      reportedBy: data.reportedBy,
      reportedByName: data.reportedByName || '',
      reportedByEmail: data.reportedByEmail || '',
      assignedTo: null,
      assignedToName: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    reports.push(report);
    return reportResponse(report);
  },

  findAll: async (filters = {}) => {
    await sleep(10);
    const result = applyFilters(reports, filters);
    const sortField = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;
    result.sort((a, b) => (new Date(a[sortField]) - new Date(b[sortField])) * sortOrder);
    return paginate(result, filters.page, filters.limit);
  },

  findById: async (reportId) => {
    await sleep(5);
    const r = reports.find((x) => x.id === reportId);
    return r ? reportResponse(r) : null;
  },

  updateById: async (reportId, updateData) => {
    await sleep(5);
    const r = reports.find((x) => x.id === reportId);
    if (!r) return null;
    const allowed = ['title', 'description', 'category', 'severity', 'location', 'city', 'district', 'state', 'status', 'assignedTo', 'assignedToName', 'priority'];
    for (const field of allowed) {
      if (updateData[field] !== undefined) r[field] = updateData[field];
    }
    r.updatedAt = new Date();
    return reportResponse(r);
  },

  deleteById: async (reportId) => {
    await sleep(5);
    const idx = reports.findIndex((x) => x.id === reportId);
    if (idx === -1) return false;
    reports.splice(idx, 1);
    const evIdx = evidenceStore.filter((e) => e.reportId === reportId);
    evIdx.forEach((e) => {
      const ei = evidenceStore.indexOf(e);
      if (ei !== -1) evidenceStore.splice(ei, 1);
    });
    return true;
  },

  // ─── Location ──────────────────────────────────────────────────────────────────
  findByLocation: async (lat, lng, radiusKm, filters = {}) => {
    await sleep(10);
    let result = reports.filter((r) => {
      const dist = haversine(lat, lng, r.location.lat, r.location.lng);
      return dist <= radiusKm;
    });
    result = applyFilters(result, filters);
    result.sort((a, b) => {
      const dA = haversine(lat, lng, a.location.lat, a.location.lng);
      const dB = haversine(lat, lng, b.location.lat, b.location.lng);
      return dA - dB;
    });
    return result.map(reportResponse);
  },

  // ─── Evidence ──────────────────────────────────────────────────────────────────
  addEvidence: async (reportId, data) => {
    await sleep(5);
    const r = reports.find((x) => x.id === reportId);
    if (!r) return null;
    const ev = {
      id: generateId(),
      reportId,
      fileName: data.fileName,
      fileType: data.fileType || 'application/octet-stream',
      fileSize: data.fileSize || 0,
      fileUrl: data.fileUrl || '',
      type: data.type || 'image',
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

  findEvidenceByReport: async (reportId) => {
    await sleep(3);
    return evidenceStore.filter((e) => e.reportId === reportId);
  },

  // ─── Category ──────────────────────────────────────────────────────────────────
  findByCategory: async (category, filters = {}) => {
    await sleep(8);
    const result = applyFilters(reports.filter((r) => r.category.toLowerCase() === category.toLowerCase()), filters);
    return paginate(result, filters.page, filters.limit);
  },

  // ─── Stats ─────────────────────────────────────────────────────────────────────
  getStats: async () => {
    await sleep(8);
    return {
      total: reports.length,
      byStatus: {}, // computed in service
      byCategory: {}, // computed in service
    };
  },
};

module.exports = Repository;
