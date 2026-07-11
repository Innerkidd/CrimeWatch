const config = require('./connection');
const query = require('./query');
const helpers = require('./helpers');

let initialized = false;

function getKnex() {
  try {
    return require('knex');
  } catch {
    return null;
  }
}

function init(customConfig) {
  if (initialized) return query.getDatabase();
  const knexLib = getKnex();
  if (!knexLib) {
    const mockDb = createMockDatabase();
    query.setDatabaseInstance(mockDb);
    initialized = true;
    console.warn('[DB] Knex not installed. Using in-memory mock database.');
    return mockDb;
  }
  const dbConfig = customConfig || config;
  const db = knexLib(dbConfig);
  query.setDatabaseInstance(db);
  initialized = true;
  return db;
}

function createMockDatabase() {
  const tables = {};
  return {
    raw: async (sql, bindings) => ({ rows: [], command: 'MOCK' }),
    transaction: async (cb) => cb(createMockTrx()),
    fn: { now: () => new Date().toISOString() },
    destroy: async () => { initialized = false; },
  };
}

function createMockTrx() {
  return {
    raw: async () => ({ rows: [] }),
    commit: async () => {},
    rollback: async () => {},
  };
}

async function destroy() {
  try {
    const db = query.getDatabase();
    if (db && db.destroy) await db.destroy();
  } catch { /* ignore */ }
  initialized = false;
}

module.exports = {
  init,
  destroy,
  config,
  query,
  helpers,
  get connection() { return query.getDatabase(); },
};
