const express = require('express');
const corsMiddleware = require('./shared/middleware/cors.middleware');
const { requestLogger } = require('./shared/middleware/logger.middleware');
const { rateLimiters } = require('./shared/middleware/rateLimiter.middleware');
const { errorHandler, notFoundHandler } = require('./shared/middleware/error.middleware');

const app = express();

app.use(corsMiddleware());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'CrimeWatch API is running', timestamp: new Date().toISOString() });
});

const apiRouter = express.Router();

apiRouter.use('/auth', rateLimiters.general, require('./features/auth/routes/auth.routes'));
apiRouter.use('/users', require('./features/users/routes/users.routes'));
apiRouter.use('/reports', rateLimiters.reportCreate, require('./features/reports/routes/reports.routes'));
apiRouter.use('/admin', rateLimiters.admin, require('./features/admin/routes/admin.routes'));
apiRouter.use('/police', require('./features/police/routes/police.routes'));
apiRouter.use('/map', require('./features/map/routes/map.routes'));
apiRouter.use('/notifications', rateLimiters.notification, require('./features/notifications/routes/notifications.routes'));
apiRouter.use('/dashboard', require('./features/dashboard/routes/dashboard.routes'));

app.use('/api/v1', apiRouter);

app.use('/api', (_req, res) => {
  res.json({ success: true, message: 'CrimeWatch API', version: '1.0.0' });
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
