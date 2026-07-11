const { addPrimaryKey, addForeignKey, addIndexes, timestamps, softDelete } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('refresh_tokens', (table) => {
    addPrimaryKey(table);
    table.text('token').notNullable().unique();
    addForeignKey(table, 'user_id', 'users.id', 'CASCADE');
    table.boolean('is_revoked').defaultTo(false);
    table.timestamp('expires_at').notNullable();
    timestamps(table);
    softDelete(table);
    addIndexes(table, ['token', 'user_id', 'is_revoked', 'expires_at']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('refresh_tokens');
}

module.exports = { up, down, tableName: 'refresh_tokens' };
