class UsersModel {
  static User = {
    id: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    avatar: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    role: 'citizen',
    status: 'active',
    createdAt: null,
    updatedAt: null,
  };

  static ROLES = ['citizen', 'police', 'admin'];
  static STATUSES = ['active', 'suspended', 'inactive'];
}

module.exports = UsersModel;
