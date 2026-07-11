let db = null;

function setDatabaseInstance(instance) {
  db = instance;
}

function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call init() first or set instance.');
  }
  return db;
}

async function transaction(callback) {
  const database = getDatabase();
  return database.transaction(async (trx) => {
    return callback(trx);
  });
}

async function raw(query, bindings) {
  const database = getDatabase();
  return database.raw(query, bindings);
}

function table(name) {
  const database = getDatabase();
  return database(name);
}

function builder() {
  const database = getDatabase();
  return database;
}

module.exports = {
  setDatabaseInstance,
  getDatabase,
  transaction,
  raw,
  table,
  builder,
};
