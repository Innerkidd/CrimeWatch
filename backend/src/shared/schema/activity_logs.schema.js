const { addPrimaryKey, addForeignKey, addIndexes, auditFields } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('activity_logs', (table) => {
    addPrimaryKey(table);
    table.string('action', 100).notNullable();
    table.text('details').nullable();
    table.string('entity_type', 50).nullable();
    table.string('entity_id', 50).nullable();
    table.text('changes').nullable();
    table.string('ip_address', 45).nullable();
    table.string('user_agent', 500).nullable();
    addForeignKey(table, 'user_id', 'users.id', 'SET NULL');
    auditFields(table);
    addIndexes(table, ['user_id', 'action', 'entity_type', 'created_at']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('activity_logs');
}

module.exports = { up, down, tableName: 'activity_logs' };
