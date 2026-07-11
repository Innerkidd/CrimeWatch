const { addPrimaryKey, addForeignKey, addIndexes, auditFields } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('evidence', (table) => {
    addPrimaryKey(table);
    table.string('file_name', 255).notNullable();
    table.string('file_type', 100).nullable();
    table.bigInteger('file_size').defaultTo(0);
    table.text('file_url').notNullable();
    table.enu('type', ['image', 'video', 'document', 'audio', 'other']).defaultTo('image');
    table.text('description').nullable();
    addForeignKey(table, 'report_id', 'crime_reports.id', 'CASCADE');
    addForeignKey(table, 'uploaded_by', 'users.id', 'SET NULL');
    auditFields(table);
    addIndexes(table, ['report_id', 'type', 'file_type']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('evidence');
}

module.exports = { up, down, tableName: 'evidence' };
