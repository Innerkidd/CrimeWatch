const config = {
  client: process.env.DB_CLIENT || 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || 'crimewatch',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
  pool: {
    min: parseInt(process.env.DB_POOL_MIN, 10) || 2,
    max: parseInt(process.env.DB_POOL_MAX, 10) || 10,
    idleTimeoutMillis: 30000,
  },
  migrations: {
    directory: process.env.MIGRATIONS_DIR || './src/shared/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: process.env.SEEDS_DIR || './src/shared/seeds',
  },
};

module.exports = config;
