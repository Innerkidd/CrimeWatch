const { addPrimaryKey, addForeignKey, addIndexes, timestamps, softDelete } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('reset_tokens', (table) => {
    addPrimaryKey(table);
    table.text('token').notNullable().unique();
    addForeignKey(table, 'user_id', 'users.id', 'CASCADE');
    table.boolean('is_used').defaultTo(false);
    table.timestamp('expires_at').notNullable();
    timestamps(table);
    softDelete(table);
    addIndexes(table, ['token', 'user_id', 'is_used', 'expires_at']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('reset_tokens');
}

module.exports = { up, down, tableName: 'reset_tokens' };
