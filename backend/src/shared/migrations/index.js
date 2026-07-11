const db = require('../database');
const schemas = require('../schema');

const MIGRATIONS_TABLE = '_migrations';
const BATCH_SIZE = 1;

class MigrationRunner {
  constructor(database) {
    this.db = database;
    this.connection = db.query.getDatabase();
  }

  async ensureMigrationsTable() {
    const exists = await this.connection.schema.hasTable(MIGRATIONS_TABLE);
    if (!exists) {
      await this.connection.schema.createTable(MIGRATIONS_TABLE, (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable().unique();
        table.string('batch', 50).notNullable();
        table.timestamp('migrated_at').defaultTo(this.connection.fn.now());
      });
    }
  }

  async getExecutedMigrations() {
    await this.ensureMigrationsTable();
    return this.connection(MIGRATIONS_TABLE).select('*').orderBy('id', 'asc');
  }

  async getPendingMigrations() {
    const executed = await this.getExecutedMigrations();
    const executedNames = new Set(executed.map((m) => m.name));
    return schemas.getAllSchemas().filter((s) => !executedNames.has(s.name));
  }

  async up(name) {
    const schema = schemas.getSchema(name);
    if (!schema) throw new Error(`Schema "${name}" not found`);
    await schema.schema.up(this.connection);
    const batch = new Date().toISOString().split('T')[0];
    await this.connection(MIGRATIONS_TABLE).insert({ name, batch });
    console.log(`[MIGRATION] UP: ${name}`);
  }

  async down(name) {
    const schema = schemas.getSchema(name);
    if (!schema) throw new Error(`Schema "${name}" not found`);
    await schema.schema.down(this.connection);
    await this.connection(MIGRATIONS_TABLE).where({ name }).del();
    console.log(`[MIGRATION] DOWN: ${name}`);
  }

  async migrate() {
    const pending = await this.getPendingMigrations();
    if (pending.length === 0) {
      console.log('[MIGRATION] All migrations are up to date.');
      return { migrated: [] };
    }
    const migrated = [];
    for (const schema of pending) {
      await this.up(schema.name);
      migrated.push(schema.name);
    }
    console.log(`[MIGRATION] Completed: ${migrated.join(', ')}`);
    return { migrated };
  }

  async rollback(steps = 1) {
    const executed = await this.getExecutedMigrations();
    const toRollback = executed.reverse().slice(0, steps);
    for (const migration of toRollback.reverse()) {
      await this.down(migration.name);
    }
    return { rolledBack: toRollback.map((m) => m.name) };
  }

  async rollbackAll() {
    const executed = await this.getExecutedMigrations();
    const reversed = [...executed].reverse();
    for (const migration of reversed) {
      await this.down(migration.name);
    }
    return { rolledBack: executed.map((m) => m.name) };
  }

  async reset() {
    await this.rollbackAll();
    return this.migrate();
  }

  async status() {
    await this.ensureMigrationsTable();
    const executed = await this.getExecutedMigrations();
    const all = schemas.getAllSchemas();
    const statuses = all.map((s) => {
      const exec = executed.find((e) => e.name === s.name);
      return {
        name: s.name,
        version: s.version,
        status: exec ? 'migrated' : 'pending',
        migratedAt: exec ? exec.migrated_at : null,
        batch: exec ? exec.batch : null,
      };
    });
    return statuses;
  }
}

async function migrate(customDb) {
  const database = customDb || db.init();
  const runner = new MigrationRunner(database);
  return runner.migrate();
}

async function rollback(customDb, steps = 1) {
  const database = customDb || db.init();
  const runner = new MigrationRunner(database);
  return runner.rollback(steps);
}

async function reset(customDb) {
  const database = customDb || db.init();
  const runner = new MigrationRunner(database);
  return runner.reset();
}

async function status(customDb) {
  const database = customDb || db.init();
  const runner = new MigrationRunner(database);
  return runner.status();
}

module.exports = {
  MigrationRunner,
  migrate,
  rollback,
  reset,
  status,
};
