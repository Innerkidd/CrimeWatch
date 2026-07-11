const PAGINATION = require('../constants').PAGINATION;

function getPaginationParams(query) {
  let page = parseInt(query.page, 10) || PAGINATION.DEFAULT_PAGE;
  let limit = parseInt(query.limit, 10) || PAGINATION.DEFAULT_LIMIT;
  if (page < 1) page = PAGINATION.DEFAULT_PAGE;
  if (limit < 1) limit = PAGINATION.DEFAULT_LIMIT;
  if (limit > PAGINATION.MAX_LIMIT) limit = PAGINATION.MAX_LIMIT;
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

function getSortParams(query, defaultSort = 'created_at', allowedFields = []) {
  let sortBy = query.sort_by || defaultSort;
  let sortOrder = query.sort_order === 'asc' ? 'asc' : 'desc';
  if (allowedFields.length > 0 && !allowedFields.includes(sortBy)) {
    sortBy = defaultSort;
  }
  return { sortBy, sortOrder };
}

function buildPaginationMeta(total, page, limit) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
    hasNext: page * limit < total,
    hasPrev: page > 1,
  };
}

function paginate(array, page, limit) {
  const start = (page - 1) * limit;
  return array.slice(start, start + limit);
}

const PaginationHelper = {
  getPaginationParams,
  getSortParams,
  buildPaginationMeta,
  paginate,
};

module.exports = PaginationHelper;
