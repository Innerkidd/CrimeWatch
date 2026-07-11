import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/shared/layouts/MainLayout';
import AdminLayout from '@/shared/layouts/AdminLayout';
import PoliceLayout from '@/shared/layouts/PoliceLayout';

// Role-based route guards
import { RoleBasedRoute } from '@/features/auth/components/ProtectedRoute';

// Auth pages
import { CitizenLoginPage } from '@/features/auth/pages/citizen/CitizenLoginPage';
import { PoliceLoginPage } from '@/features/auth/pages/police/PoliceLoginPage';
import { AdminLoginPage } from '@/features/auth/pages/admin/AdminLoginPage';

// Feature pages
import { HomePage } from '@/features/home';
import { RegisterPage, ForgotPasswordPage } from '@/features/auth';
import { DashboardPage } from '@/features/dashboard';
import { MapPage } from '@/features/map';
import { SubmitReportPage } from '@/features/reports';
import { CrimeDetailsPage } from '@/features/crime-details';
import { NotificationsPage } from '@/features/notifications';
import { MyReportsPage } from '@/features/my-reports';
import { ProfilePage } from '@/features/profile';
import { AdminDashboardPage } from '@/features/admin';
import { PoliceDashboardPage } from '@/features/police';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* ======================== */}
        {/* CITIZEN ROUTES           */}
        {/* ======================== */}
        <Route path="/login" element={<CitizenLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Citizen protected routes */}
        <Route
          element={
            <RoleBasedRoute requiredRole="citizen">
              <MainLayout />
            </RoleBasedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/reports" element={<SubmitReportPage />} />
          <Route path="/my-reports" element={<MyReportsPage />} />
          <Route path="/crime/:id" element={<CrimeDetailsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* ======================== */}
        {/* POLICE ROUTES            */}
        {/* ======================== */}
        <Route path="/police/login" element={<PoliceLoginPage />} />

        {/* Police protected routes — self-contained dashboard with own sidebar */}
        <Route
          element={
            <RoleBasedRoute requiredRole="police">
              <PoliceLayout />
            </RoleBasedRoute>
          }
        >
          <Route path="/police/dashboard" element={<PoliceDashboardPage />} />
        </Route>

        {/* Police protected routes — shared pages with citizen layout */}
        <Route
          element={
            <RoleBasedRoute requiredRole="police">
              <MainLayout />
            </RoleBasedRoute>
          }
        >
          <Route path="/police/map" element={<MapPage />} />
          <Route path="/police/reports" element={<MyReportsPage />} />
          <Route path="/police/notifications" element={<NotificationsPage />} />
          <Route path="/police/profile" element={<ProfilePage />} />
        </Route>

        {/* ======================== */}
        {/* ADMIN ROUTES             */}
        {/* ======================== */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin protected routes */}
        <Route
          element={
            <RoleBasedRoute requiredRole="admin">
              <AdminLayout />
            </RoleBasedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/reports" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminDashboardPage />} />
          <Route path="/admin/settings" element={<AdminDashboardPage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
