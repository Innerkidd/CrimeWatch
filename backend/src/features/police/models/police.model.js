class PoliceModel {
  static PoliceOfficer = {
    id: '',
    name: '',
    badgeNumber: '',
    email: '',
    phone: '',
    department: '',
    rank: '',
    status: 'active',
    isAvailable: true,
    currentLocation: { lat: 0, lng: 0, address: '' },
    createdAt: null,
    updatedAt: null,
  };

  static Report = {
    id: '',
    title: '',
    description: '',
    category: '',
    location: { lat: 0, lng: 0, address: '' },
    city: '',
    status: 'pending',
    priority: 'normal',
    reportedBy: '',
    reportedByName: '',
    assignedTo: null,
    assignedToName: null,
    createdAt: null,
    updatedAt: null,
  };

  static Investigation = {
    id: '',
    reportId: '',
    officerId: '',
    status: 'assigned',
    notes: '',
    findings: '',
    startedAt: null,
    closedAt: null,
    createdAt: null,
    updatedAt: null,
  };

  static Evidence = {
    id: '',
    investigationId: '',
    fileName: '',
    fileType: '',
    fileUrl: '',
    description: '',
    uploadedAt: null,
  };

  static ActivityLog = {
    id: '',
    officerId: '',
    action: '',
    details: {},
    timestamp: null,
  };
}

module.exports = PoliceModel;
