const schema = require('../schema/refresh_tokens.schema');

exports.up = async (knex) => schema.up(knex);
exports.down = async (knex) => schema.down(knex);
