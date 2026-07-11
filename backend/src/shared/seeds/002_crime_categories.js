const now = new Date().toISOString();

const categories = [
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    name: 'Theft',
    description: 'Illegal taking of another person\'s property without force',
    is_active: true,
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000002',
    name: 'Burglary',
    description: 'Unlawful entry into a building with intent to commit a crime',
    is_active: true,
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000003',
    name: 'Assault',
    description: 'Physical attack or threat of attack on another person',
    is_active: true,
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000004',
    name: 'Robbery',
    description: 'Taking property from a person through force or threat of force',
    is_active: true,
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000005',
    name: 'Vandalism',
    description: 'Willful destruction or damage to property',
    is_active: true,
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000006',
    name: 'Fraud',
    description: 'Wrongful deception intended to result in financial gain',
    is_active: true,
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000007',
    name: 'Drug Offense',
    description: 'Illegal possession, distribution, or manufacture of controlled substances',
    is_active: true,
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000008',
    name: 'Cyber Crime',
    description: 'Criminal activity conducted using computers or the internet',
    is_active: true,
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000009',
    name: 'Domestic Violence',
    description: 'Violent or abusive behavior within a household or intimate relationship',
    is_active: true,
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000010',
    name: 'Traffic Violation',
    description: 'Offenses committed while operating a motor vehicle',
    is_active: true,
    created_at: now,
    updated_at: now,
    created_by: 'system',
    updated_by: 'system',
  },
];

async function seed(knex) {
  const exists = await knex.schema.hasTable('crime_categories');
  if (!exists) return;
  const count = await knex('crime_categories').count('* as total').first();
  if (parseInt(count?.total || 0, 10) > 0) return;
  await knex.batchInsert('crime_categories', categories, 50);
}

module.exports = { seed, name: 'categories', dependencies: ['crime_categories'] };
