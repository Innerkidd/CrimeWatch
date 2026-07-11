const schema = require('../schema/crime_reports.schema');

exports.up = async (knex) => schema.up(knex);
exports.down = async (knex) => schema.down(knex);
