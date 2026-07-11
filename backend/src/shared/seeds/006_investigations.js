const now = new Date();
const daysAgo = (days) => new Date(now.getTime() - days * 86400000).toISOString();

const investigations = [
  {
    id: 'f0000000-0000-0000-0000-000000000001',
    report_id: 'd0000000-0000-0000-0000-000000000001',
    officer_id: 'c0000000-0000-0000-0000-000000000002',
    status: 'closed',
    notes: 'Reviewed CCTV footage. Suspect identified and apprehended. Property recovered.',
    findings: 'Suspect was found with the stolen phone. Charged with grand larceny.',
    started_at: daysAgo(4),
    closed_at: daysAgo(1),
    created_at: daysAgo(4),
    updated_at: daysAgo(1),
    created_by: 'c0000000-0000-0000-0000-000000000002',
    updated_by: 'c0000000-0000-0000-0000-000000000002',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000002',
    report_id: 'd0000000-0000-0000-0000-000000000002',
    officer_id: 'c0000000-0000-0000-0000-000000000003',
    status: 'in_progress',
    notes: 'Bank surveillance footage obtained. Suspect vehicle identified as 2019 dark sedan, CA plate 4ABC123.',
    findings: null,
    started_at: daysAgo(1),
    closed_at: null,
    created_at: daysAgo(1),
    updated_at: daysAgo(0.5),
    created_by: 'c0000000-0000-0000-0000-000000000003',
    updated_by: 'c0000000-0000-0000-0000-000000000003',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000003',
    report_id: 'd0000000-0000-0000-0000-000000000003',
    officer_id: 'c0000000-0000-0000-0000-000000000004',
    status: 'assigned',
    notes: 'Awaiting forensics team report. Neighbors being interviewed.',
    findings: null,
    started_at: null,
    closed_at: null,
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
    created_by: 'c0000000-0000-0000-0000-000000000004',
    updated_by: 'c0000000-0000-0000-0000-000000000004',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000004',
    report_id: 'd0000000-0000-0000-0000-000000000006',
    officer_id: 'c0000000-0000-0000-0000-000000000002',
    status: 'closed',
    notes: 'Fraud ring identified and dismantled. Three suspects arrested.',
    findings: 'Operation involved 3 suspects using stolen credit card numbers from a data breach.',
    started_at: daysAgo(8),
    closed_at: daysAgo(3),
    created_at: daysAgo(8),
    updated_at: daysAgo(3),
    created_by: 'c0000000-0000-0000-0000-000000000002',
    updated_by: 'c0000000-0000-0000-0000-000000000002',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000005',
    report_id: 'd0000000-0000-0000-0000-000000000009',
    officer_id: 'c0000000-0000-0000-0000-000000000003',
    status: 'in_progress',
    notes: 'Victim has been moved to a safe location. Suspect is being interviewed at station.',
    findings: null,
    started_at: daysAgo(1),
    closed_at: null,
    created_at: daysAgo(1),
    updated_at: daysAgo(0.5),
    created_by: 'c0000000-0000-0000-0000-000000000003',
    updated_by: 'c0000000-0000-0000-0000-000000000003',
  },
];

async function seed(knex) {
  const exists = await knex.schema.hasTable('investigations');
  if (!exists) return;
  const count = await knex('investigations').count('* as total').first();
  if (parseInt(count?.total || 0, 10) > 0) return;
  await knex.batchInsert('investigations', investigations, 50);
}

module.exports = { seed, name: 'investigations', dependencies: ['investigations'] };
