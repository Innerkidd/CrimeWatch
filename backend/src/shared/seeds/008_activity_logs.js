const now = new Date();
const daysAgo = (days) => new Date(now.getTime() - days * 86400000).toISOString();

const logs = [
  {
    action: 'CREATE_REPORT',
    details: 'Report created: Smartphone Snatched on 5th Avenue',
    entity_type: 'crime_reports',
    entity_id: 'd0000000-0000-0000-0000-000000000001',
    changes: null,
    user_id: 'a0000000-0000-0000-0000-000000000006',
    ip_address: '192.168.1.100',
    created_at: daysAgo(5),
    updated_at: daysAgo(5),
    created_by: 'a0000000-0000-0000-0000-000000000006',
    updated_by: 'a0000000-0000-0000-0000-000000000006',
  },
  {
    action: 'ASSIGN_POLICE',
    details: 'Officer Johnson assigned to report: Smartphone Snatched',
    entity_type: 'crime_reports',
    entity_id: 'd0000000-0000-0000-0000-000000000001',
    changes: JSON.stringify({ assigned_to: null, assigned_to_name: null, new_assigned_to: 'c0000000-0000-0000-0000-000000000002', new_assigned_to_name: 'Officer Johnson' }),
    user_id: 'a0000000-0000-0000-0000-000000000001',
    ip_address: '10.0.0.1',
    created_at: daysAgo(4),
    updated_at: daysAgo(4),
    created_by: 'a0000000-0000-0000-0000-000000000001',
    updated_by: 'a0000000-0000-0000-0000-000000000001',
  },
  {
    action: 'RESOLVE_REPORT',
    details: 'Report resolved: Smartphone Snatched on 5th Avenue',
    entity_type: 'crime_reports',
    entity_id: 'd0000000-0000-0000-0000-000000000001',
    changes: JSON.stringify({ status: 'investigating', new_status: 'resolved' }),
    user_id: 'c0000000-0000-0000-0000-000000000002',
    ip_address: '10.0.0.50',
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
    created_by: 'c0000000-0000-0000-0000-000000000002',
    updated_by: 'c0000000-0000-0000-0000-000000000002',
  },
  {
    action: 'CREATE_REPORT',
    details: 'Report created: Bank Robbery Downtown LA',
    entity_type: 'crime_reports',
    entity_id: 'd0000000-0000-0000-0000-000000000002',
    changes: null,
    user_id: 'a0000000-0000-0000-0000-000000000007',
    ip_address: '192.168.1.101',
    created_at: daysAgo(2),
    updated_at: daysAgo(2),
    created_by: 'a0000000-0000-0000-0000-000000000007',
    updated_by: 'a0000000-0000-0000-0000-000000000007',
  },
  {
    action: 'ADD_EVIDENCE',
    details: 'Evidence added to report: Bank Robbery Downtown LA',
    entity_type: 'evidence',
    entity_id: 'e0000000-0000-0000-0000-000000000002',
    changes: JSON.stringify({ type: 'image', file_name: 'bank_lobby_photo.jpg' }),
    user_id: 'a0000000-0000-0000-0000-000000000007',
    ip_address: '192.168.1.101',
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
    created_by: 'a0000000-0000-0000-0000-000000000007',
    updated_by: 'a0000000-0000-0000-0000-000000000007',
  },
  {
    action: 'USER_LOGIN',
    details: 'User logged in: admin@crimewatch.gov',
    entity_type: 'users',
    entity_id: 'a0000000-0000-0000-0000-000000000001',
    changes: null,
    user_id: 'a0000000-0000-0000-0000-000000000001',
    ip_address: '10.0.0.1',
    created_at: daysAgo(0),
    updated_at: daysAgo(0),
    created_by: 'a0000000-0000-0000-0000-000000000001',
    updated_by: 'a0000000-0000-0000-0000-000000000001',
  },
  {
    action: 'SUSPEND_USER',
    details: 'User suspended: suspended@email.com',
    entity_type: 'users',
    entity_id: 'a0000000-0000-0000-0000-000000000009',
    changes: JSON.stringify({ status: 'active', new_status: 'suspended' }),
    user_id: 'a0000000-0000-0000-0000-000000000001',
    ip_address: '10.0.0.1',
    created_at: daysAgo(7),
    updated_at: daysAgo(7),
    created_by: 'a0000000-0000-0000-0000-000000000001',
    updated_by: 'a0000000-0000-0000-0000-000000000001',
  },
];

async function seed(knex) {
  const exists = await knex.schema.hasTable('activity_logs');
  if (!exists) return;
  const count = await knex('activity_logs').count('* as total').first();
  if (parseInt(count?.total || 0, 10) > 0) return;
  await knex.batchInsert('activity_logs', logs, 50);
}

module.exports = { seed, name: 'activity_logs', dependencies: ['activity_logs'] };
