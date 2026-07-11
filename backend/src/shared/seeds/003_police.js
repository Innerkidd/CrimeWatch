const now = new Date().toISOString();

const officers = [
  {
    id: 'c0000000-0000-0000-0000-000000000001',
    user_id: 'a0000000-0000-0000-0000-000000000002',
    name: 'Police Commissioner',
    badge_number: 'NYPD-001',
    email: 'commissioner@crimewatch.gov',
    phone: '+1-555-0101',
    department: 'New York Police Department',
    rank: 'Commissioner',
    status: 'active',
    is_available: true,
    current_lat: 40.7128,
    current_lng: -74.006,
    current_address: '1 Police Plaza, New York, NY 10038',
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'c0000000-0000-0000-0000-000000000002',
    user_id: 'a0000000-0000-0000-0000-000000000003',
    name: 'Officer Johnson',
    badge_number: 'NYPD-042',
    email: 'johnson@crimewatch.gov',
    phone: '+1-555-0102',
    department: 'New York Police Department',
    rank: 'Detective',
    status: 'active',
    is_available: true,
    current_lat: 40.7589,
    current_lng: -73.9851,
    current_address: 'Times Square, New York, NY',
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'c0000000-0000-0000-0000-000000000003',
    user_id: 'a0000000-0000-0000-0000-000000000004',
    name: 'Officer Williams',
    badge_number: 'LAPD-015',
    email: 'williams@crimewatch.gov',
    phone: '+1-555-0103',
    department: 'Los Angeles Police Department',
    rank: 'Sergeant',
    status: 'active',
    is_available: true,
    current_lat: 34.0522,
    current_lng: -118.2437,
    current_address: '100 W 1st St, Los Angeles, CA 90012',
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'c0000000-0000-0000-0000-000000000004',
    user_id: 'a0000000-0000-0000-0000-000000000005',
    name: 'Officer Brown',
    badge_number: 'CPD-033',
    email: 'brown@crimewatch.gov',
    phone: '+1-555-0104',
    department: 'Chicago Police Department',
    rank: 'Investigator',
    status: 'active',
    is_available: false,
    current_lat: 41.8781,
    current_lng: -87.6298,
    current_address: '3510 S Michigan Ave, Chicago, IL 60653',
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
];

async function seed(knex) {
  const exists = await knex.schema.hasTable('police');
  if (!exists) return;
  const count = await knex('police').count('* as total').first();
  if (parseInt(count?.total || 0, 10) > 0) return;
  await knex.batchInsert('police', officers, 50);
}

module.exports = { seed, name: 'police', dependencies: ['police'] };
