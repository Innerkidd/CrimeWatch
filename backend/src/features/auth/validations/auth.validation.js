const ROLES = ['citizen', 'police', 'admin'];

function required(v, field) {
  if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) return `${field} is required`;
  return null;
}

function isEmail(v) {
  if (!v) return null;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(v) ? null : 'Invalid email format';
}

function minLength(v, min, field) {
  if (v && v.length < min) return `${field} must be at least ${min} characters`;
  return null;
}

function inList(v, list, field) {
  if (v && !list.includes(v)) return `${field} must be one of: ${list.join(', ')}`;
  return null;
}

// ─── Register ────────────────────────────────────────────────────────────────────

exports.validateRegister = (data) => {
  const errors = [];
  const nameErr = required(data.name, 'Name');
  if (nameErr) errors.push(nameErr);
  const emailErr = required(data.email, 'Email') || isEmail(data.email);
  if (emailErr) errors.push(emailErr);
  const passErr = required(data.password, 'Password') || minLength(data.password, 6, 'Password');
  if (passErr) errors.push(passErr);
  const roleErr = inList(data.role, ROLES, 'Role');
  if (roleErr) errors.push(roleErr);
  return errors;
};

// ─── Login ───────────────────────────────────────────────────────────────────────

exports.validateLogin = (data) => {
  const errors = [];
  const emailErr = required(data.email, 'Email') || isEmail(data.email);
  if (emailErr) errors.push(emailErr);
  const passErr = required(data.password, 'Password');
  if (passErr) errors.push(passErr);
  return errors;
};

// ─── Forgot Password ─────────────────────────────────────────────────────────────

exports.validateForgotPassword = (data) => {
  const errors = [];
  const emailErr = required(data.email, 'Email') || isEmail(data.email);
  if (emailErr) errors.push(emailErr);
  return errors;
};

// ─── Reset Password ──────────────────────────────────────────────────────────────

exports.validateResetPassword = (data) => {
  const errors = [];
  const tokenErr = required(data.token, 'Token');
  if (tokenErr) errors.push(tokenErr);
  const passErr = required(data.password, 'Password') || minLength(data.password, 6, 'Password');
  if (passErr) errors.push(passErr);
  return errors;
};

// ─── Refresh Token ───────────────────────────────────────────────────────────────

exports.validateRefreshToken = (data) => {
  const errors = [];
  const err = required(data.refreshToken, 'refreshToken');
  if (err) errors.push(err);
  return errors;
};

// ─── Logout ──────────────────────────────────────────────────────────────────────

exports.validateLogout = (data) => {
  const errors = [];
  const err = required(data.userId, 'userId');
  if (err) errors.push(err);
  return errors;
};
