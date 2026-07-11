import { io, type Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const connectSocket = (userId: string): Socket => {
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    auth: { token: localStorage.getItem('cw_token') },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id);
    socket?.emit('join', userId);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message);
  });

  return socket;
};

export const connectAdminSocket = (): Socket => {
  if (socket?.connected) {
    socket.emit('joinAdmin');
    return socket;
  }

  socket = io(SOCKET_URL, {
    auth: { token: localStorage.getItem('cw_token') },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    socket?.emit('joinAdmin');
  });

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => socket;

// Event listeners
export const onNotification = (callback: (data: unknown) => void): void => {
  socket?.on('notification', callback);
};

export const onReportUpdate = (callback: (data: unknown) => void): void => {
  socket?.on('reportUpdate', callback);
};

export const onNewReport = (callback: (data: unknown) => void): void => {
  socket?.on('newReport', callback);
};

export const onEmergencyAlert = (callback: (data: unknown) => void): void => {
  socket?.on('emergencyAlert', callback);
};

// Cleanup
export const removeListeners = (): void => {
  socket?.off('notification');
  socket?.off('reportUpdate');
  socket?.off('newReport');
  socket?.off('emergencyAlert');
};
