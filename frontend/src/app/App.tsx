import React from 'react';
import { AuthProvider } from '@/shared/contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
