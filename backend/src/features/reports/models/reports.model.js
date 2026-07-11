class ReportsModel {
  static CrimeReport = {
    id: '',
    title: '',
    description: '',
    category: '',
    severity: 'medium',
    location: { lat: 0, lng: 0, address: '' },
    city: '',
    district: '',
    state: '',
    status: 'pending',
    priority: 'normal',
    reportedBy: '',
    reportedByName: '',
    reportedByEmail: '',
    assignedTo: null,
    assignedToName: null,
    evidence: [],
    createdAt: null,
    updatedAt: null,
  };

  static Evidence = {
    id: '',
    reportId: '',
    fileName: '',
    fileType: '',
    fileSize: 0,
    fileUrl: '',
    type: 'image',
    description: '',
    uploadedAt: null,
  };

  static CATEGORIES = ['Theft', 'Robbery', 'Assault', 'Cyber Crime', 'Domestic Violence', 'Missing Person', 'Accident', 'Drug Crime', 'Vandalism', 'Other'];

  static STATUSES = ['pending', 'under_review', 'assigned', 'investigating', 'resolved', 'rejected'];

  static SEVERITIES = ['low', 'medium', 'high', 'critical'];

  static EVIDENCE_TYPES = ['image', 'video', 'document', 'audio', 'other'];

  static ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/mov', 'video/avi', 'application/pdf', 'audio/mpeg', 'audio/wav'];
}

module.exports = ReportsModel;
