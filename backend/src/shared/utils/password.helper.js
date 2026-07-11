const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const key = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${key}`;
}

function verifyPassword(password, stored) {
  try {
    const [salt, key] = stored.split(':');
    if (!salt || !key) return false;
    const hash = scryptSync(password, salt, 64).toString('hex');
    if (hash.length !== key.length) return false;
    return timingSafeEqual(Buffer.from(hash), Buffer.from(key));
  } catch {
    return false;
  }
}

function generateResetToken() {
  return randomBytes(32).toString('hex');
}

function generateApiKey() {
  return randomBytes(24).toString('hex');
}

const PasswordHelper = {
  hashPassword,
  verifyPassword,
  generateResetToken,
  generateApiKey,
};

module.exports = PasswordHelper;
