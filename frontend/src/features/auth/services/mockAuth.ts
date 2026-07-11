export type UserRole = 'citizen' | 'police' | 'admin';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isVerified: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  token?: string;
  message?: string;
}

interface StoredUser {
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  isVerified: boolean;
  badgeNumber?: string;
}

const MOCK_USERS: StoredUser[] = [
  {
    email: 'citizen@crimewatch.com',
    password: 'Citizen@123',
    role: 'citizen',
    firstName: 'Citizen',
    lastName: 'User',
    phone: '+1 (555) 123-4567',
    isVerified: true,
  },
  {
    email: 'police@crimewatch.com',
    password: 'Police@123',
    role: 'police',
    firstName: 'Police',
    lastName: 'Officer',
    phone: '+1 (555) 987-6543',
    isVerified: true,
    badgeNumber: 'PO-2024-001',
  },
  {
    email: 'admin@crimewatch.com',
    password: 'Admin@123',
    role: 'admin',
    firstName: 'System',
    lastName: 'Administrator',
    phone: '+1 (555) 000-1111',
    isVerified: true,
  },
];

const STORAGE_KEY = 'cw_auth';

export const mockLogin = async (
  email: string,
  password: string,
  expectedRole: UserRole
): Promise<AuthResult> => {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 800));

  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }

  if (user.role !== expectedRole) {
    const roleLabels: Record<UserRole, string> = {
      citizen: 'Citizen',
      police: 'Police Officer',
      admin: 'Administrator',
    };
    return {
      success: false,
      message: `This account is not authorized for the ${roleLabels[expectedRole]} portal.`,
    };
  }

  const authUser: AuthUser = {
    id: `USR-${user.role.toUpperCase()}-${Date.now()}`,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    phone: user.phone,
    isVerified: user.isVerified,
  };

  const token = `mock-jwt-token-${user.role}-${Date.now()}`;

  // Save to localStorage
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ user: authUser, token })
  );

  return { success: true, user: authUser, token };
};

export const mockRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
  role: UserRole = 'citizen'
): Promise<AuthResult> => {
  await new Promise((r) => setTimeout(r, 800));

  const exists = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const newUser: StoredUser = {
    email,
    password,
    role,
    firstName,
    lastName,
    phone,
    isVerified: false,
  };
  MOCK_USERS.push(newUser);

  const authUser: AuthUser = {
    id: `USR-${role.toUpperCase()}-${Date.now()}`,
    firstName,
    lastName,
    email,
    role,
    phone,
    isVerified: false,
  };

  const token = `mock-jwt-token-${role}-${Date.now()}`;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ user: authUser, token })
  );

  return { success: true, user: authUser, token };
};

export const getStoredAuth = (): { user: AuthUser; token: string } | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const DEMO_CREDENTIALS: Record<UserRole, { email: string; password: string }> = {
  citizen: { email: 'citizen@crimewatch.com', password: 'Citizen@123' },
  police: { email: 'police@crimewatch.com', password: 'Police@123' },
  admin: { email: 'admin@crimewatch.com', password: 'Admin@123' },
};
