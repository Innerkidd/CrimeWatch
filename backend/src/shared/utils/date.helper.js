function formatDate(date, format = 'iso') {
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  switch (format) {
    case 'iso':
      return d.toISOString();
    case 'date':
      return d.toISOString().split('T')[0];
    case 'datetime':
      return d.toISOString().replace('T', ' ').split('.')[0];
    case 'time':
      return d.toTimeString().split(' ')[0];
    case 'short':
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    case 'full':
      return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    default:
      return d.toISOString();
  }
}

function daysAgo(days, from = new Date()) {
  const d = new Date(from);
  d.setDate(d.getDate() - days);
  return d;
}

function hoursAgo(hours, from = new Date()) {
  const d = new Date(from);
  d.setHours(d.getHours() - hours);
  return d;
}

function isExpired(date) {
  return new Date(date) < new Date();
}

function diffInDays(date1, date2 = new Date()) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

function diffInHours(date1, date2 = new Date()) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2 - d1) / (1000 * 60 * 60));
}

function toTimestamp(date) {
  return Math.floor(new Date(date).getTime() / 1000);
}

function getDateRange(period) {
  const now = new Date();
  let start;
  switch (period) {
    case 'today':
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'week':
      start = daysAgo(7);
      break;
    case 'month':
      start = daysAgo(30);
      break;
    case 'quarter':
      start = daysAgo(90);
      break;
    case 'year':
      start = daysAgo(365);
      break;
    default:
      start = daysAgo(30);
  }
  return { start, end: now };
}

const DateHelper = {
  formatDate,
  daysAgo,
  hoursAgo,
  isExpired,
  diffInDays,
  diffInHours,
  toTimestamp,
  getDateRange,
};

module.exports = DateHelper;
