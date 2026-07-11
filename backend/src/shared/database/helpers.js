const query = require('./query');

function timestamps(table) {
  table.timestamp('created_at').defaultTo(query.builder().fn.now());
  table.timestamp('updated_at').defaultTo(query.builder().fn.now());
}

function softDelete(table) {
  table.boolean('is_deleted').defaultTo(false);
  table.timestamp('deleted_at').nullable();
}

function auditFields(table) {
  table.string('created_by').nullable();
  table.string('updated_by').nullable();
  timestamps(table);
  softDelete(table);
}

function addPrimaryKey(table, name = 'id') {
  table.uuid(name).primary().defaultTo(query.builder().raw('gen_random_uuid()'));
}

function addForeignKey(table, column, references, onDelete = 'CASCADE') {
  table.uuid(column).references(references).onDelete(onDelete);
}

function addIndexes(table, columns) {
  columns.forEach((col) => {
    if (typeof col === 'string') {
      table.index(col);
    } else {
      table.index(col.columns, col.indexName, col.indexType);
    }
  });
}

function paginate(query, page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  return query.offset(offset).limit(limit);
}

async function paginatedResult(queryBuilder, page = 1, limit = 20) {
  const countQuery = queryBuilder.clone().clearSelect().clearOrder().count('* as total').first();
  const totalResult = await countQuery;
  const total = parseInt(totalResult?.total || totalResult?.count || 0, 10);
  const rows = await paginate(queryBuilder, page, limit);
  return {
    data: rows,
    pagination: {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total,
      totalPages: Math.ceil(total / parseInt(limit, 10)),
    },
  };
}

module.exports = {
  timestamps,
  softDelete,
  auditFields,
  addPrimaryKey,
  addForeignKey,
  addIndexes,
  paginate,
  paginatedResult,
};
