class AuthModel {
  static User = {
    id: '',
    name: '',
    email: '',
    password: '',
    role: 'citizen',
    status: 'active',
    refreshToken: null,
    createdAt: null,
    updatedAt: null,
  };

  static ResetToken = {
    id: '',
    userId: '',
    token: '',
    expiresAt: null,
    used: false,
    createdAt: null,
  };

  static ROLES = ['citizen', 'police', 'admin'];
  static TOKEN_EXPIRY = '1h';
  static REFRESH_EXPIRY = '7d';
}

module.exports = AuthModel;
