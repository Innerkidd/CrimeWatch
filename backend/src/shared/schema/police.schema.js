const { addPrimaryKey, addForeignKey, addIndexes, auditFields } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('police', (table) => {
    addPrimaryKey(table);
    table.string('name', 100).notNullable();
    table.string('badge_number', 50).notNullable().unique();
    table.string('email', 255).notNullable().unique();
    table.string('phone', 20).nullable();
    table.string('department', 100).nullable();
    table.string('rank', 100).nullable();
    table.enu('status', ['active', 'inactive']).defaultTo('active');
    table.boolean('is_available').defaultTo(true);
    table.float('current_lat').nullable();
    table.float('current_lng').nullable();
    table.string('current_address', 500).nullable();
    addForeignKey(table, 'user_id', 'users.id', 'CASCADE');
    auditFields(table);
    addIndexes(table, ['badge_number', 'email', 'department', 'status', 'is_available']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('police');
}

module.exports = { up, down, tableName: 'police' };
