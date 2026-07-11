const http = require('http');
const { execSync } = require('child_process');
const app = require('./app');
const { SocketService } = require('./shared/services');

const BASE_PORT = parseInt(process.env.PORT, 10) || 5000;
const HOST = process.env.HOST || '0.0.0.0';
const MAX_PORT_ATTEMPTS = 10;

function killProcessOnPort(port) {
  try {
    const stdout = execSync(`netstat -ano | findstr ":${port} "`, { timeout: 3000, encoding: 'utf8' });
    const lines = stdout.trim().split('\n').filter((l) => l.includes('LISTENING'));
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && !isNaN(pid)) {
        try {
          process.kill(parseInt(pid, 10), 'SIGTERM');
          console.log(`[CrimeWatch] Killed existing process ${pid} on port ${port}`);
        } catch { /* process may already be dead */ }
      }
    }
  } catch { /* no process found or netstat unavailable */ }
}

function startServer(port) {
  const server = http.createServer(app);
  SocketService.initialize(server);

  server.listen(port, HOST);
  server.on('listening', () => {
    console.log(`[CrimeWatch] Server running on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${port}`);
    console.log(`[CrimeWatch] API: http://localhost:${port}/api/v1`);
    console.log(`[CrimeWatch] Health: http://localhost:${port}/health`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && port < BASE_PORT + MAX_PORT_ATTEMPTS) {
      console.log(`[CrimeWatch] Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(`[CrimeWatch] Failed to start server on port ${port}:`, err.message);
      process.exit(1);
    }
  });

  process.on('SIGTERM', () => { console.log('[CrimeWatch] SIGTERM received, shutting down...'); server.close(() => process.exit(0)); });
  process.on('SIGINT', () => { console.log('[CrimeWatch] SIGINT received, shutting down...'); server.close(() => process.exit(0)); });
  process.on('unhandledRejection', (reason) => { console.error('[CrimeWatch] Unhandled Rejection:', reason); });
  process.on('uncaughtException', (err) => {
    if (err.code !== 'EADDRINUSE') console.error('[CrimeWatch] Uncaught Exception:', err);
    if (err.code !== 'EADDRINUSE') process.exit(1);
  });
}

killProcessOnPort(BASE_PORT);
setTimeout(() => startServer(BASE_PORT), 300);
