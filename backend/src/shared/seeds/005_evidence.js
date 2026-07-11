const now = new Date().toISOString();

const evidence = [
  {
    id: 'e0000000-0000-0000-0000-000000000001',
    file_name: 'cctv_5th_ave.mp4',
    file_type: 'video/mp4',
    file_size: 15728640,
    file_url: 'https://storage.crimewatch.gov/evidence/cctv_5th_ave.mp4',
    type: 'video',
    description: 'CCTV footage from 5th Avenue showing the suspect grabbing the phone',
    report_id: 'd0000000-0000-0000-0000-000000000001',
    uploaded_by: 'a0000000-0000-0000-0000-000000000006',
    created_at: now,
    updated_at: now,
    created_by: 'a0000000-0000-0000-0000-000000000006',
    updated_by: 'a0000000-0000-0000-0000-000000000006',
  },
  {
    id: 'e0000000-0000-0000-0000-000000000002',
    file_name: 'bank_lobby_photo.jpg',
    file_type: 'image/jpeg',
    file_size: 2097152,
    file_url: 'https://storage.crimewatch.gov/evidence/bank_lobby_photo.jpg',
    type: 'image',
    description: 'Photo of suspect at bank counter during robbery',
    report_id: 'd0000000-0000-0000-0000-000000000002',
    uploaded_by: 'a0000000-0000-0000-0000-000000000007',
    created_at: now,
    updated_at: now,
    created_by: 'a0000000-0000-0000-0000-000000000007',
    updated_by: 'a0000000-0000-0000-0000-000000000007',
  },
  {
    id: 'e0000000-0000-0000-0000-000000000003',
    file_name: 'shell_casing_evidence.jpg',
    file_type: 'image/jpeg',
    file_size: 1048576,
    file_url: 'https://storage.crimewatch.gov/evidence/shell_casing.jpg',
    type: 'image',
    description: 'Shell casings recovered from the scene',
    report_id: 'd0000000-0000-0000-0000-000000000002',
    uploaded_by: 'c0000000-0000-0000-0000-000000000003',
    created_at: now,
    updated_at: now,
    created_by: 'c0000000-0000-0000-0000-000000000003',
    updated_by: 'c0000000-0000-0000-0000-000000000003',
  },
  {
    id: 'e0000000-0000-0000-0000-000000000004',
    file_name: 'burglary_report.pdf',
    file_type: 'application/pdf',
    file_size: 5242880,
    file_url: 'https://storage.crimewatch.gov/evidence/burglary_report.pdf',
    type: 'document',
    description: 'Detailed property inventory of stolen items',
    report_id: 'd0000000-0000-0000-0000-000000000003',
    uploaded_by: 'a0000000-0000-0000-0000-000000000008',
    created_at: now,
    updated_at: now,
    created_by: 'a0000000-0000-0000-0000-000000000008',
    updated_by: 'a0000000-0000-0000-0000-000000000008',
  },
  {
    id: 'e0000000-0000-0000-0000-000000000005',
    file_name: 'domestic_audio_recording.wav',
    file_type: 'audio/wav',
    file_size: 8388608,
    file_url: 'https://storage.crimewatch.gov/evidence/domestic_audio.wav',
    type: 'audio',
    description: 'Audio recording of the disturbance captured by neighbor',
    report_id: 'd0000000-0000-0000-0000-000000000009',
    uploaded_by: 'a0000000-0000-0000-0000-000000000007',
    created_at: now,
    updated_at: now,
    created_by: 'a0000000-0000-0000-0000-000000000007',
    updated_by: 'a0000000-0000-0000-0000-000000000007',
  },
];

async function seed(knex) {
  const exists = await knex.schema.hasTable('evidence');
  if (!exists) return;
  const count = await knex('evidence').count('* as total').first();
  if (parseInt(count?.total || 0, 10) > 0) return;
  await knex.batchInsert('evidence', evidence, 50);
}

module.exports = { seed, name: 'evidence', dependencies: ['evidence'] };
