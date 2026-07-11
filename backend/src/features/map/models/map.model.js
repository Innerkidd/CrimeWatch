class MapModel {
  static CrimeMarker = {
    id: '',
    lat: 0,
    lng: 0,
    title: '',
    category: '',
    status: '',
    severity: 'normal',
    city: '',
    createdAt: null,
  };

  static CrimeReport = {
    id: '',
    title: '',
    description: '',
    category: '',
    severity: 'normal',
    location: { lat: 0, lng: 0, address: '' },
    city: '',
    district: '',
    state: '',
    status: '',
    reportedBy: '',
    reportedByName: '',
    assignedTo: null,
    assignedToName: null,
    createdAt: null,
    updatedAt: null,
  };

  static HeatmapPoint = {
    lat: 0,
    lng: 0,
    intensity: 0,
    count: 0,
    category: '',
  };

  static CrimeCluster = {
    center: { lat: 0, lng: 0 },
    count: 0,
    radius: 0,
    crimes: [],
    category: '',
  };

  static MapBounds = {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  };
}

module.exports = MapModel;
