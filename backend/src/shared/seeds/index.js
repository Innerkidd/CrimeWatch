const db = require('../database');
const seeds = [
  require('./001_users'),
  require('./002_crime_categories'),
  require('./003_police'),
  require('./004_crime_reports'),
  require('./005_evidence'),
  require('./006_investigations'),
  require('./007_notifications'),
  require('./008_activity_logs'),
];

class SeedRunner {
  constructor(database) {
    this.db = database;
    this.connection = db.query.getDatabase();
  }

  async run() {
    console.log('[SEED] Starting seed...');
    for (const seed of seeds) {
      try {
        await seed.seed(this.connection);
        console.log(`[SEED] Completed: ${seed.name || 'unnamed'}`);
      } catch (err) {
        console.error(`[SEED] Error in ${seed.name || 'unnamed'}: ${err.message}`);
        throw err;
      }
    }
    console.log('[SEED] All seeds completed.');
  }

  async runSingle(name) {
    const seed = seeds.find((s) => s.name === name);
    if (!seed) throw new Error(`Seed "${name}" not found`);
    await seed.seed(this.connection);
    console.log(`[SEED] Completed: ${name}`);
  }

  async truncateAll() {
    const tables = seeds.flatMap((s) => s.dependencies || []);
    const uniqueTables = [...new Set(tables)].reverse();
    for (const table of uniqueTables) {
      try {
        await this.connection.raw(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`);
      } catch { /* table may not exist */ }
    }
  }

  async refresh() {
    await this.truncateAll();
    await this.run();
  }
}

async function seed(customDb) {
  const database = customDb || db.init();
  const runner = new SeedRunner(database);
  return runner.run();
}

async function refresh(customDb) {
  const database = customDb || db.init();
  const runner = new SeedRunner(database);
  return runner.refresh();
}

module.exports = {
  SeedRunner,
  seed,
  refresh,
};
