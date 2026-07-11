import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/shared/layouts/MainLayout';
import AuthLayout from '@/shared/layouts/AuthLayout';
import AdminLayout from '@/shared/layouts/AdminLayout';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Feature Pages
import { HomePage } from '@/features/home';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '@/features/auth';
import { DashboardPage } from '@/features/dashboard';
import { MapPage } from '@/features/map';
import { SubmitReportPage } from '@/features/reports';
import { CrimeDetailsPage } from '@/features/crime-details';
import { NotificationsPage } from '@/features/notifications';
import { MyReportsPage } from '@/features/my-reports';
import { ProfilePage } from '@/features/profile';
import { AdminDashboardPage } from '@/features/admin';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* Public Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/reports" element={<SubmitReportPage />} />
            <Route path="/my-reports" element={<MyReportsPage />} />
            <Route path="/crime/:id" element={<CrimeDetailsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/reports" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/users" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/settings" element={<Navigate to="/admin" replace />} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
