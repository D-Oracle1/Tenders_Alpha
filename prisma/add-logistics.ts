/**
 * One-time script to update the live database with:
 *  - A new "Logistics" service (with formatted details + gallery images)
 *  - Updated primary phone number (08101365496)
 *
 * Run with: npx tsx prisma/add-logistics.ts
 */

import { PrismaClient, ServiceCategory } from '@prisma/client';

const prisma = new PrismaClient();

const LOGISTICS_CONTENT = `Our logistics division delivers the seamless movement of goods from origin to destination, combining a trusted carrier network, a modern fleet, and experienced coordinators to keep your supply chain running smoothly.

We handle projects of every size — from single consignments to large, multi-modal operations for government and private-sector clients.

Our logistics services include:
- Freight forwarding by road, sea, and air
- Customs clearance and documentation
- Warehousing, storage, and inventory management
- Haulage and last-mile delivery nationwide
- Project cargo and heavy-equipment movement
- Real-time tracking and dedicated account support

Why choose us:
- Nationwide coverage through a reliable partner network
- Competitive, transparent pricing
- Safe handling with full cargo insurance options
- On-time delivery backed by proactive communication`;

const LOGISTICS_GALLERY = [
  { url: '/images/services/cargo.jpg', alt: 'Cargo handling and freight operations', order: 0 },
  { url: '/images/services/equipment.jpg', alt: 'Equipment and project cargo movement', order: 1 },
  { url: '/images/services/oil-gas.jpg', alt: 'Industrial and oil & gas logistics', order: 2 },
  { url: '/images/services/construction.jpg', alt: 'On-site delivery and haulage', order: 3 },
];

async function main() {
  console.log('🔄 Updating live database...');

  // 1. Update primary phone number everywhere it is read from settings
  await prisma.siteSetting.upsert({
    where: { key: 'phone_1' },
    update: { value: '08101365496' },
    create: { key: 'phone_1', value: '08101365496', group: 'contact', label: 'Primary Phone' },
  });
  console.log('  ✅ Primary phone number updated to 08101365496');

  // 2. Add / refresh the Logistics service
  const logistics = await prisma.service.upsert({
    where: { slug: 'logistics' },
    update: {
      title: 'Logistics',
      description:
        'Reliable, end-to-end logistics and supply chain solutions across Nigeria and beyond — moving your goods safely, on time, and cost-effectively.',
      content: LOGISTICS_CONTENT,
      category: ServiceCategory.LOGISTICS,
      featuredImage: '/images/services/logistics.jpg',
      isActive: true,
    },
    create: {
      title: 'Logistics',
      slug: 'logistics',
      description:
        'Reliable, end-to-end logistics and supply chain solutions across Nigeria and beyond — moving your goods safely, on time, and cost-effectively.',
      content: LOGISTICS_CONTENT,
      category: ServiceCategory.LOGISTICS,
      featuredImage: '/images/services/logistics.jpg',
      order: 6,
      isActive: true,
    },
  });
  console.log(`  ✅ Logistics service ready (id: ${logistics.id})`);

  // 3. Replace its gallery images with the current set
  await prisma.serviceImage.deleteMany({ where: { serviceId: logistics.id } });
  await prisma.serviceImage.createMany({
    data: LOGISTICS_GALLERY.map((img) => ({ ...img, serviceId: logistics.id })),
  });
  console.log(`  ✅ Logistics gallery images added (${LOGISTICS_GALLERY.length})`);

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
