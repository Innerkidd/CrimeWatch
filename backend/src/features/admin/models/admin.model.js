class AdminModel {
  static PoliceOfficer = {
    id: '',
    name: '',
    badgeNumber: '',
    email: '',
    phone: '',
    department: '',
    rank: '',
    status: 'active',
    createdAt: null,
    updatedAt: null,
  };

  static CrimeCategory = {
    id: '',
    name: '',
    description: '',
    createdAt: null,
    updatedAt: null,
  };

  static AuditLog = {
    id: '',
    action: '',
    performedBy: '',
    performedByName: '',
    targetId: '',
    targetType: '',
    details: {},
    timestamp: null,
  };

  static User = {
    id: '',
    name: '',
    email: '',
    role: 'citizen',
    status: 'active',
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
    reportedBy: '',
    reportedByName: '',
    assignedTo: null,
    assignedToName: null,
    createdAt: null,
    updatedAt: null,
  };
}

module.exports = AdminModel;
