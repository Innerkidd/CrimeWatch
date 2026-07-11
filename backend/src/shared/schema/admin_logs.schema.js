const { addPrimaryKey, addForeignKey, addIndexes, auditFields } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('admin_logs', (table) => {
    addPrimaryKey(table);
    table.string('action', 100).notNullable();
    table.text('details').nullable();
    table.string('entity_type', 50).nullable();
    table.string('entity_id', 50).nullable();
    table.enu('action_type', ['create', 'update', 'delete', 'assign', 'suspend', 'activate', 'login', 'other']).defaultTo('other');
    table.text('changes').nullable();
    table.string('ip_address', 45).nullable();
    addForeignKey(table, 'admin_id', 'users.id', 'SET NULL');
    auditFields(table);
    addIndexes(table, ['admin_id', 'action', 'action_type', 'entity_type', 'created_at']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('admin_logs');
}

module.exports = { up, down, tableName: 'admin_logs' };
