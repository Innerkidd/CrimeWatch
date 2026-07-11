import { Navigate, useLocation } from 'react-router-dom';
import { getStoredAuth, type UserRole } from '../services/mockAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const auth = getStoredAuth();

  if (!auth) {
    // Not logged in — redirect to citizen login by default
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    // Logged in but wrong role — redirect to their own dashboard
    const dashboardMap: Record<UserRole, string> = {
      citizen: '/dashboard',
      police: '/police/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={dashboardMap[auth.user.role]} replace />;
  }

  return <>{children}</>;
};

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}

export const RoleBasedRoute = ({ children, requiredRole }: RoleBasedRouteProps) => {
  const auth = getStoredAuth();

  if (!auth) {
    const loginMap: Record<UserRole, string> = {
      citizen: '/login',
      police: '/police/login',
      admin: '/admin/login',
    };
    return <Navigate to={loginMap[requiredRole]} replace />;
  }

  if (auth.user.role !== requiredRole) {
    const dashboardMap: Record<UserRole, string> = {
      citizen: '/dashboard',
      police: '/police/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={dashboardMap[auth.user.role]} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
