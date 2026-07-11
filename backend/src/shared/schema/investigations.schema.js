const { addPrimaryKey, addForeignKey, addIndexes, auditFields } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('investigations', (table) => {
    addPrimaryKey(table);
    addForeignKey(table, 'report_id', 'crime_reports.id', 'CASCADE');
    addForeignKey(table, 'officer_id', 'police.id', 'CASCADE');
    table.enu('status', ['assigned', 'in_progress', 'closed']).defaultTo('assigned');
    table.text('notes').nullable();
    table.text('findings').nullable();
    table.timestamp('started_at').nullable();
    table.timestamp('closed_at').nullable();
    auditFields(table);
    addIndexes(table, ['report_id', 'officer_id', 'status']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('investigations');
}

module.exports = { up, down, tableName: 'investigations' };
