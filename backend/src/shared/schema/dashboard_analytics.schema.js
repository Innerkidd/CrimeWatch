const { addPrimaryKey, addIndexes, auditFields } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('dashboard_analytics', (table) => {
    addPrimaryKey(table);
    table.string('metric_name', 100).notNullable();
    table.text('metric_value').notNullable();
    table.string('period', 50).defaultTo('daily');
    table.date('record_date').notNullable();
    auditFields(table);
    addIndexes(table, ['metric_name', 'period', 'record_date']);
    table.unique(['metric_name', 'period', 'record_date']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('dashboard_analytics');
}

module.exports = { up, down, tableName: 'dashboard_analytics' };
