const schema = require('../schema/police.schema');

exports.up = async (knex) => schema.up(knex);
exports.down = async (knex) => schema.down(knex);
