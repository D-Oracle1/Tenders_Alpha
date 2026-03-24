/**
 * One-time script to update live database with:
 * - Company name: Tenders Alpha Limited
 * - Email: info@tendersalpha.com
 * - Remove Agricultural Activities service
 * - Add Beauty/Cosmetics and Vocational Skills services
 * - Replace sister companies with Tenders General Merchant Ltd. and Soibi Alpha House
 *
 * Run with: npx ts-node prisma/update-live-data.ts
 * Or:       npx tsx prisma/update-live-data.ts
 */

import { PrismaClient, ServiceCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Updating live database...');

  // 1. Update site settings
  const settingUpdates = [
    { key: 'company_name', value: 'Tenders Alpha Limited' },
    { key: 'email_1', value: 'info@tendersalpha.com' },
    {
      key: 'company_description',
      value:
        'Tenders Alpha Limited is a multi-faceted indigenous company with interests in Building Construction, Civil Engineering, Oil & Gas Procurement, Equipment Supply, Cargo Handling, Disinfection Machines, Beauty/Cosmetics, and Vocational Skills.',
    },
    {
      key: 'meta_description',
      value:
        "Nigeria's trusted partner in building construction, civil engineering, oil & gas procurement, beauty/cosmetics, and vocational skills. Founded 2009.",
    },
  ];

  for (const s of settingUpdates) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value, group: 'general', label: s.key },
    });
    console.log(`  ✅ Setting updated: ${s.key}`);
  }

  // 2. Deactivate Agricultural Activities service
  await prisma.service.updateMany({
    where: { slug: 'agricultural-activities' },
    data: { isActive: false },
  });
  console.log('  ✅ Agricultural Activities service deactivated');

  // 3. Add Beauty/Cosmetics service (upsert by slug)
  await prisma.service.upsert({
    where: { slug: 'beauty-cosmetics' },
    update: { isActive: true },
    create: {
      title: 'Beauty / Cosmetics',
      slug: 'beauty-cosmetics',
      description:
        'Our beauty and cosmetics division offers a wide range of professional beauty products, skincare solutions, and cosmetics supply services for individuals and businesses.',
      category: ServiceCategory.OTHER,
      featuredImage: '/images/services/beauty.jpg',
      order: 7,
      isActive: true,
    },
  });
  console.log('  ✅ Beauty/Cosmetics service added');

  // 4. Add Vocational Skills service
  await prisma.service.upsert({
    where: { slug: 'vocational-skills' },
    update: { isActive: true },
    create: {
      title: 'Vocational Skills',
      slug: 'vocational-skills',
      description:
        'We provide practical vocational training and skills development programmes in areas such as forex trading, hair beautification, skincare, and other trade skills to empower individuals.',
      category: ServiceCategory.OTHER,
      featuredImage: '/images/services/vocational.jpg',
      order: 8,
      isActive: true,
    },
  });
  console.log('  ✅ Vocational Skills service added');

  // 5. Deactivate old sister companies
  await prisma.sisterCompany.updateMany({
    where: {
      slug: {
        in: [
          'bouygies-construction',
          'green-dock-offshore-limited',
          'eaz-roc-limited',
          'coginar-limited',
          'entrec-association-limited',
        ],
      },
    },
    data: { isActive: false },
  });
  console.log('  ✅ Old sister companies deactivated');

  // 6. Add new sister companies
  await prisma.sisterCompany.upsert({
    where: { slug: 'tenders-general-merchant' },
    update: { name: 'Tenders General Merchant Ltd.', isActive: true },
    create: {
      name: 'Tenders General Merchant Ltd.',
      slug: 'tenders-general-merchant',
      description:
        'Tenders General Merchant Ltd. is a sister company headquartered in Lagos, Nigeria, specializing in general merchant services, procurement, and supply chain solutions across diverse sectors.',
      order: 1,
      isActive: true,
    },
  });
  console.log('  ✅ Tenders General Merchant Ltd. added');

  await prisma.sisterCompany.upsert({
    where: { slug: 'soibi-alpha-house' },
    update: { name: 'Soibi Alpha House', isActive: true },
    create: {
      name: 'Soibi Alpha House',
      slug: 'soibi-alpha-house',
      description:
        'Soibi Alpha House is focused on personal and professional development — equipping individuals with practical skills in forex trading, skincare, hair beautification, and other vocational trades.',
      order: 2,
      isActive: true,
    },
  });
  console.log('  ✅ Soibi Alpha House added');

  console.log('\n🎉 Live database update complete!');
}

main()
  .catch((e) => {
    console.error('❌ Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
