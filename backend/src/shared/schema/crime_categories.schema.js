const { addPrimaryKey, addIndexes, auditFields } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('crime_categories', (table) => {
    addPrimaryKey(table);
    table.string('name', 100).notNullable().unique();
    table.text('description').nullable();
    table.boolean('is_active').defaultTo(true);
    auditFields(table);
    addIndexes(table, ['name', 'is_active']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('crime_categories');
}

module.exports = { up, down, tableName: 'crime_categories' };
