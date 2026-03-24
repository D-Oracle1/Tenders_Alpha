import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const fixes = [
    { key: 'email_1', value: 'info@tendersalpha.com' },
    { key: 'meta_title', value: 'Tenders Alpha Limited | Construction, Engineering & Procurement' },
    { key: 'meta_description', value: "Nigeria's trusted partner in building construction, civil engineering, oil & gas procurement, beauty/cosmetics, and vocational skills. Founded 2009." },
  ];
  for (const f of fixes) {
    await prisma.siteSetting.update({ where: { key: f.key }, data: { value: f.value } });
    console.log('✅', f.key, '->', f.value);
  }
  await prisma.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
