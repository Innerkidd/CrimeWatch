const { addPrimaryKey, addForeignKey, addIndexes, auditFields } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('notifications', (table) => {
    addPrimaryKey(table);
    table.string('title', 200).notNullable();
    table.text('message').notNullable();
    table.string('type', 50).defaultTo('info');
    table.enu('status', ['unread', 'read', 'archived']).defaultTo('unread');
    addForeignKey(table, 'user_id', 'users.id', 'CASCADE');
    addForeignKey(table, 'related_report_id', 'crime_reports.id', 'ON DELETE SET NULL').nullable();
    addForeignKey(table, 'created_by', 'users.id', 'SET NULL');
    auditFields(table);
    addIndexes(table, ['user_id', 'status', 'type', 'created_at']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('notifications');
}

module.exports = { up, down, tableName: 'notifications' };
