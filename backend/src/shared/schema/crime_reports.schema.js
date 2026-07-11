const { addPrimaryKey, addForeignKey, addIndexes, auditFields } = require('../database/helpers');

function up(knex) {
  return knex.schema.createTable('crime_reports', (table) => {
    addPrimaryKey(table);
    table.string('title', 200).notNullable();
    table.text('description').nullable();
    table.string('category', 100).notNullable();
    table.enu('severity', ['low', 'medium', 'high', 'critical']).defaultTo('medium');
    table.float('latitude').nullable();
    table.float('longitude').nullable();
    table.string('address', 500).nullable();
    table.string('city', 100).nullable();
    table.string('district', 100).nullable();
    table.string('state', 50).nullable();
    table.enu('status', ['pending', 'under_review', 'assigned', 'investigating', 'resolved', 'rejected']).defaultTo('pending');
    table.enu('priority', ['low', 'normal', 'high', 'critical']).defaultTo('normal');
    addForeignKey(table, 'reported_by', 'users.id', 'SET NULL');
    table.string('reported_by_name', 100).nullable();
    table.string('reported_by_email', 255).nullable();
    addForeignKey(table, 'assigned_to', 'police.id', 'SET NULL');
    table.string('assigned_to_name', 100).nullable();
    auditFields(table);
    addIndexes(table, ['category', 'status', 'severity', 'city', 'district', 'created_at', 'assigned_to', 'reported_by', 'priority']);
    table.index(['latitude', 'longitude'], 'idx_reports_location');
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('crime_reports');
}

module.exports = { up, down, tableName: 'crime_reports' };
