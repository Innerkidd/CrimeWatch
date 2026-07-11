const { addPrimaryKey, addIndexes, auditFields } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('users', (table) => {
    addPrimaryKey(table);
    table.string('name', 100).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('phone', 20).nullable();
    table.text('password').notNullable();
    table.string('avatar', 500).nullable();
    table.text('address').nullable();
    table.string('city', 100).nullable();
    table.string('state', 100).nullable();
    table.string('pincode', 10).nullable();
    table.enu('role', ['citizen', 'police', 'admin']).defaultTo('citizen');
    table.enu('status', ['active', 'suspended', 'inactive']).defaultTo('active');
    auditFields(table);
    addIndexes(table, ['email', 'phone', 'role', 'status', 'city']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('users');
}

module.exports = { up, down, tableName: 'users' };
