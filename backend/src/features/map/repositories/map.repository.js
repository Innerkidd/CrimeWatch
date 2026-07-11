const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const reports = [
  { id: '1', title: 'Smartphone snatched at Central Park', description: 'Victim reported phone stolen while walking through the park at night.', category: 'Robbery', severity: 'high', location: { lat: 40.7829, lng: -73.9654, address: 'Central Park, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'pending', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-10T20:30:00'), updatedAt: new Date('2025-06-10T20:30:00') },
  { id: '2', title: 'Car break-in on 5th Avenue', description: 'Vehicle window smashed and laptop stolen.', category: 'Theft', severity: 'medium', location: { lat: 40.7527, lng: -73.9772, address: '5th Avenue, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'investigating', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: '1', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-09T14:15:00'), updatedAt: new Date('2025-06-10T09:00:00') },
  { id: '3', title: 'Assault at Downtown Bar', description: 'Physical altercation outside a bar resulting in minor injuries.', category: 'Assault', severity: 'high', location: { lat: 40.7128, lng: -74.0060, address: 'Downtown, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'investigating', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: '2', assignedToName: 'Officer John Roe', createdAt: new Date('2025-06-08T23:00:00'), updatedAt: new Date('2025-06-09T10:00:00') },
  { id: '4', title: 'Online fraud reported', description: 'Victim lost $2000 in a phishing scam.', category: 'Cyber Crime', severity: 'medium', location: { lat: 34.0522, lng: -118.2437, address: 'Los Angeles, CA' }, city: 'Los Angeles', district: 'Downtown', state: 'CA', status: 'pending', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-11T08:00:00'), updatedAt: new Date('2025-06-11T08:00:00') },
  { id: '5', title: 'Missing teenager last seen at mall', description: '14-year-old last seen at Westfield Mall around 6pm.', category: 'Missing Person', severity: 'high', location: { lat: 40.7357, lng: -73.9940, address: 'Westfield Mall, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'pending', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-11T12:00:00'), updatedAt: new Date('2025-06-11T12:00:00') },
  { id: '6', title: 'Drug deal observed in alley', description: 'Suspicious activity reported behind Main Street stores.', category: 'Drug Related', severity: 'medium', location: { lat: 40.7580, lng: -73.9855, address: 'Main Street, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'resolved', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: '1', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-05T16:45:00'), updatedAt: new Date('2025-06-07T11:30:00') },
  { id: '7', title: 'Hit and run accident', description: 'Vehicle struck pedestrian and fled the scene.', category: 'Accident', severity: 'high', location: { lat: 40.7484, lng: -73.9857, address: 'Empire State Building Area, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'investigating', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: '2', assignedToName: 'Officer John Roe', createdAt: new Date('2025-06-11T07:30:00'), updatedAt: new Date('2025-06-11T08:00:00') },
  { id: '8', title: 'Vandalism at City Park', description: 'Graffiti and damaged benches reported.', category: 'Other', severity: 'low', location: { lat: 34.0522, lng: -118.2437, address: 'City Park, Los Angeles' }, city: 'Los Angeles', district: 'Downtown', state: 'CA', status: 'rejected', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-01T10:00:00'), updatedAt: new Date('2025-06-03T15:00:00') },
  { id: '9', title: 'Burglary at Brooklyn Heights', description: 'Home broken into during daytime. Jewelry and electronics stolen.', category: 'Theft', severity: 'high', location: { lat: 40.6882, lng: -73.9935, address: 'Brooklyn Heights, NY' }, city: 'New York', district: 'Brooklyn', state: 'NY', status: 'pending', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-12T09:15:00'), updatedAt: new Date('2025-06-12T09:15:00') },
  { id: '10', title: 'Car theft in Queens', description: 'Vehicle stolen from parking lot overnight.', category: 'Theft', severity: 'medium', location: { lat: 40.7282, lng: -73.7949, address: 'Queens, NY' }, city: 'New York', district: 'Queens', state: 'NY', status: 'pending', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-11T22:00:00'), updatedAt: new Date('2025-06-11T22:00:00') },
  { id: '11', title: 'Shots fired in Bronx', description: 'Multiple gunshots heard near residential building.', category: 'Other', severity: 'critical', location: { lat: 40.8448, lng: -73.8648, address: 'Bronx, NY' }, city: 'New York', district: 'Bronx', state: 'NY', status: 'investigating', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: '1', assignedToName: 'Officer Jane Doe', createdAt: new Date('2025-06-12T02:30:00'), updatedAt: new Date('2025-06-12T03:00:00') },
  { id: '12', title: 'Package theft from porch', description: 'Amazon package stolen from front porch.', category: 'Theft', severity: 'low', location: { lat: 40.7282, lng: -73.7949, address: 'Queens, NY' }, city: 'New York', district: 'Queens', state: 'NY', status: 'pending', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-12T14:00:00'), updatedAt: new Date('2025-06-12T14:00:00') },
  { id: '13', title: 'Identity theft scheme', description: 'Multiple victims reported unauthorized credit card use.', category: 'Cyber Crime', severity: 'high', location: { lat: 41.8781, lng: -87.6298, address: 'Chicago, IL' }, city: 'Chicago', district: 'Downtown', state: 'IL', status: 'pending', reportedBy: '1', reportedByName: 'Alice Johnson', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-10T11:00:00'), updatedAt: new Date('2025-06-10T11:00:00') },
  { id: '14', title: 'Road rage incident', description: 'Driver assaulted after traffic dispute.', category: 'Assault', severity: 'medium', location: { lat: 41.8781, lng: -87.6298, address: 'Chicago, IL' }, city: 'Chicago', district: 'Downtown', state: 'IL', status: 'investigating', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: '3', assignedToName: 'Officer Sarah Miles', createdAt: new Date('2025-06-09T17:45:00'), updatedAt: new Date('2025-06-10T08:00:00') },
  { id: '15', title: 'Missing bicycle', description: 'Bicycle locked outside library was cut and taken.', category: 'Theft', severity: 'low', location: { lat: 40.7128, lng: -74.0060, address: 'Downtown, NY' }, city: 'New York', district: 'Manhattan', state: 'NY', status: 'pending', reportedBy: '2', reportedByName: 'Bob Smith', assignedTo: null, assignedToName: null, createdAt: new Date('2025-06-12T16:30:00'), updatedAt: new Date('2025-06-12T16:30:00') },
];

function reportToMarker(r) {
  return { id: r.id, lat: r.location.lat, lng: r.location.lng, title: r.title, category: r.category, status: r.status, severity: r.severity, city: r.city, createdAt: r.createdAt };
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const Repository = {
  // ─── All Reports / Markers ─────────────────────────────────────────────────────
  findAll: async (filters = {}) => {
    await sleep(10);
    let result = [...reports];
    if (filters.category) result = result.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
    if (filters.status) result = result.filter((r) => r.status === filters.status);
    if (filters.severity) result = result.filter((r) => r.severity === filters.severity);
    if (filters.city) result = result.filter((r) => r.city.toLowerCase() === filters.city.toLowerCase());
    if (filters.district) result = result.filter((r) => r.district.toLowerCase() === filters.district.toLowerCase());
    if (filters.dateFrom) result = result.filter((r) => r.createdAt >= new Date(filters.dateFrom));
    if (filters.dateTo) result = result.filter((r) => r.createdAt <= new Date(filters.dateTo));
    return result;
  },

  findMarkers: async (filters = {}) => {
    await sleep(8);
    const data = await Repository.findAll(filters);
    return data.map(reportToMarker);
  },

  findById: async (reportId) => {
    await sleep(5);
    return reports.find((r) => r.id === reportId) || null;
  },

  // ─── Nearby ─────────────────────────────────────────────────────────────────────
  findNearby: async (lat, lng, radiusKm, filters = {}) => {
    await sleep(10);
    let result = [...reports];
    result = result.filter((r) => {
      const dist = haversine(lat, lng, r.location.lat, r.location.lng);
      return dist <= radiusKm;
    });
    if (filters.category) result = result.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
    if (filters.status) result = result.filter((r) => r.status === filters.status);
    if (filters.severity) result = result.filter((r) => r.severity === filters.severity);
    return result.sort((a, b) => {
      const dA = haversine(lat, lng, a.location.lat, a.location.lng);
      const dB = haversine(lat, lng, b.location.lat, b.location.lng);
      return dA - dB;
    });
  },

  // ─── Heatmap ────────────────────────────────────────────────────────────────────
  getHeatmapByCity: async (filters = {}) => {
    await sleep(10);
    let data = [...reports];
    if (filters.category) data = data.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
    if (filters.status) data = data.filter((r) => r.status === filters.status);
    if (filters.dateFrom) data = data.filter((r) => r.createdAt >= new Date(filters.dateFrom));
    if (filters.dateTo) data = data.filter((r) => r.createdAt <= new Date(filters.dateTo));
    const map = {};
    data.forEach((r) => {
      const key = r.city;
      if (!map[key]) map[key] = { city: key, lat: r.location.lat, lng: r.location.lng, count: 0, severitySum: 0 };
      map[key].count++;
      const sev = { low: 1, medium: 2, high: 3, critical: 4 }[r.severity] || 2;
      map[key].severitySum += sev;
    });
    return Object.values(map).map((entry) => ({
      city: entry.city,
      lat: entry.lat,
      lng: entry.lng,
      intensity: parseFloat((entry.severitySum / entry.count).toFixed(2)),
      count: entry.count,
    }));
  },

  getHeatmapByGrid: async (gridSize = 0.05, filters = {}) => {
    await sleep(10);
    let data = [...reports];
    if (filters.category) data = data.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
    if (filters.status) data = data.filter((r) => r.status === filters.status);
    if (filters.dateFrom) data = data.filter((r) => r.createdAt >= new Date(filters.dateFrom));
    if (filters.dateTo) data = data.filter((r) => r.createdAt <= new Date(filters.dateTo));
    const map = {};
    data.forEach((r) => {
      const latKey = Math.floor(r.location.lat / gridSize) * gridSize;
      const lngKey = Math.floor(r.location.lng / gridSize) * gridSize;
      const key = `${latKey},${lngKey}`;
      if (!map[key]) map[key] = { lat: latKey + gridSize / 2, lng: lngKey + gridSize / 2, count: 0, severitySum: 0 };
      map[key].count++;
      const sev = { low: 1, medium: 2, high: 3, critical: 4 }[r.severity] || 2;
      map[key].severitySum += sev;
    });
    return Object.values(map).map((entry) => ({
      lat: parseFloat(entry.lat.toFixed(4)),
      lng: parseFloat(entry.lng.toFixed(4)),
      intensity: parseFloat((entry.severitySum / entry.count).toFixed(2)),
      count: entry.count,
    }));
  },

  // ─── Clusters ───────────────────────────────────────────────────────────────────
  getClusters: async (bounds, gridSize = 0.1, filters = {}) => {
    await sleep(10);
    let data = [...reports];
    if (bounds) {
      data = data.filter((r) =>
        r.location.lat >= bounds.south && r.location.lat <= bounds.north &&
        r.location.lng >= bounds.west && r.location.lng <= bounds.east
      );
    }
    if (filters.category) data = data.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
    if (filters.status) data = data.filter((r) => r.status === filters.status);
    if (filters.severity) data = data.filter((r) => r.severity === filters.severity);
    const map = {};
    data.forEach((r) => {
      const latKey = Math.floor(r.location.lat / gridSize) * gridSize;
      const lngKey = Math.floor(r.location.lng / gridSize) * gridSize;
      const key = `${latKey},${lngKey}`;
      if (!map[key]) map[key] = { center: { lat: parseFloat((latKey + gridSize / 2).toFixed(4)), lng: parseFloat((lngKey + gridSize / 2).toFixed(4)) }, count: 0, crimes: [] };
      map[key].count++;
      map[key].crimes.push(reportToMarker(r));
    });
    return Object.values(map).map((c) => ({
      ...c,
      radius: Math.min(c.count * 50, 500),
    }));
  },

  // ─── Search ─────────────────────────────────────────────────────────────────────
  search: async (query, filters = {}) => {
    await sleep(10);
    const q = query.toLowerCase();
    let result = reports.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.id === query ||
      r.location.address.toLowerCase().includes(q)
    );
    if (filters.category) result = result.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
    if (filters.status) result = result.filter((r) => r.status === filters.status);
    if (filters.city) result = result.filter((r) => r.city.toLowerCase() === filters.city.toLowerCase());
    return result.map(reportToMarker);
  },

  // ─── Filters Metadata ───────────────────────────────────────────────────────────
  getFilterOptions: async () => {
    await sleep(5);
    const categories = [...new Set(reports.map((r) => r.category))].sort();
    const statuses = [...new Set(reports.map((r) => r.status))].sort();
    const severities = [...new Set(reports.map((r) => r.severity))].sort();
    const cities = [...new Set(reports.map((r) => r.city))].sort();
    const districts = [...new Set(reports.map((r) => r.district))].sort();
    return { categories, statuses, severities, cities, districts };
  },
};

module.exports = Repository;
