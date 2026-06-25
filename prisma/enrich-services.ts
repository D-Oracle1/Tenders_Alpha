/**
 * Enrich existing services with formatted multi-paragraph details and gallery
 * images so every service page shows a proper write-up and a variety of photos.
 *
 * Gallery images reuse the available in-repo photos as placeholders; replace
 * them with real photos anytime via Admin → Services → Gallery Images.
 *
 * Run with: npx tsx prisma/enrich-services.ts
 */

import { PrismaClient } from '@prisma/client';

export interface Enrichment {
  slug: string;
  content: string;
  gallery?: { url: string; alt: string }[];
}

export const enrichments: Enrichment[] = [
  {
    slug: 'logistics',
    content: `Our logistics division delivers the seamless movement of goods from origin to destination, combining a trusted carrier network, a modern fleet, and experienced coordinators to keep your supply chain running smoothly.

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
- On-time delivery backed by proactive communication`,
    gallery: [
      { url: '/images/services/cargo.jpg', alt: 'Cargo handling and freight operations' },
      { url: '/images/services/equipment.jpg', alt: 'Equipment and project cargo movement' },
      { url: '/images/services/oil-gas.jpg', alt: 'Industrial and oil & gas logistics' },
      { url: '/images/services/construction.jpg', alt: 'On-site delivery and haulage' },
    ],
  },
  {
    slug: 'building-construction',
    content: `We deliver high-quality residential, commercial, and industrial building construction projects across Nigeria, combining skilled craftsmanship with rigorous project management to bring your vision to life.

From foundation to finishing, our experienced team ensures timely delivery, structural integrity, and full compliance with all regulatory and safety standards.

What we build:
- Residential homes, estates, and apartment blocks
- Commercial offices, retail spaces, and warehouses
- Industrial facilities and factory structures
- Renovations, remodelling, and structural upgrades

Our approach:
- Transparent budgeting and detailed project scheduling
- Quality materials sourced from trusted suppliers
- Strict adherence to health, safety, and building codes
- Regular progress reporting from start to handover`,
    gallery: [
      { url: '/images/projects/commercial-building.jpg', alt: 'Commercial building project' },
      { url: '/images/services/civil-engineering.jpg', alt: 'Structural and civil works' },
      { url: '/images/services/equipment.jpg', alt: 'Construction equipment on site' },
    ],
  },
  {
    slug: 'civil-engineering',
    content: `Our civil engineering division provides comprehensive infrastructure solutions for both government and private-sector clients — from roads and bridges to drainage and public works.

We pair sound engineering design with dependable execution to deliver durable infrastructure that stands the test of time.

Our capabilities include:
- Road construction, paving, and rehabilitation
- Bridges, culverts, and drainage systems
- Earthworks, grading, and site preparation
- Water supply and public utility infrastructure

Why clients trust us:
- Qualified engineers and modern equipment
- Designs that balance durability with cost-efficiency
- Proven delivery on schedule and within budget
- Full compliance with engineering and safety standards`,
    gallery: [
      { url: '/images/projects/ring-road.jpg', alt: 'Road infrastructure project' },
      { url: '/images/services/construction.jpg', alt: 'Civil construction works' },
      { url: '/images/services/equipment.jpg', alt: 'Heavy engineering equipment' },
    ],
  },
  {
    slug: 'oil-gas-procurement',
    content: `We specialise in the procurement and supply of oil and gas facilities, equipment, and related materials, helping operators source quality products at competitive prices.

Our procurement experts leverage a verified network of global suppliers to ensure cost-effective, timely, and compliant sourcing for every project.

What we supply:
- Drilling, production, and processing equipment
- Pipes, valves, fittings, and instrumentation
- Safety and personal protective equipment
- Spare parts and consumables

Our procurement edge:
- Verified, vetted international and local suppliers
- Competitive pricing through established relationships
- Quality assurance and compliance checks
- Reliable logistics and on-time delivery`,
    gallery: [
      { url: '/images/projects/oil-equipment.jpg', alt: 'Oil & gas equipment' },
      { url: '/images/services/equipment.jpg', alt: 'Industrial equipment supply' },
      { url: '/images/services/cargo.jpg', alt: 'Materials handling and shipment' },
    ],
  },
  {
    slug: 'equipment-supply',
    content: `We supply a wide range of industrial, construction, and agricultural equipment, backed by an extensive network of manufacturers and suppliers.

Whether you need a single machine or a full fleet, we provide quality equipment at competitive prices, with support that does not end at delivery.

Equipment we supply:
- Heavy construction machinery and earthmovers
- Industrial tools and processing equipment
- Agricultural machinery and implements
- Generators, pumps, and power equipment

What sets us apart:
- Genuine equipment from reputable manufacturers
- Competitive pricing and flexible supply options
- Nationwide delivery and installation support
- After-sales service and spare-parts availability`,
    gallery: [
      { url: '/images/services/construction.jpg', alt: 'Construction machinery' },
      { url: '/images/services/oil-gas.jpg', alt: 'Industrial equipment' },
      { url: '/images/services/cargo.jpg', alt: 'Equipment delivery and handling' },
    ],
  },
  {
    slug: 'cargo-handling',
    content: `We provide comprehensive cargo handling services, ensuring your goods move safely and efficiently across Nigeria and internationally.

Our team manages every stage of the process — from documentation to delivery — so your cargo arrives on time and in perfect condition.

Our cargo services include:
- Freight forwarding and customs clearance
- Warehousing and secure storage
- Loading, offloading, and container handling
- Last-mile delivery and distribution

Why choose us:
- Experienced handlers and modern equipment
- Careful handling of fragile and high-value cargo
- Transparent tracking and communication
- Competitive rates with dependable timelines`,
    gallery: [
      { url: '/images/services/logistics.jpg', alt: 'Logistics and freight operations' },
      { url: '/images/services/equipment.jpg', alt: 'Cargo handling equipment' },
      { url: '/images/services/oil-gas.jpg', alt: 'Industrial cargo' },
    ],
  },
  {
    slug: 'disinfection-machines',
    content: `We supply and install state-of-the-art disinfection and sanitisation machines for hospitals, factories, schools, public spaces, and commercial buildings.

Our solutions help organisations maintain hygienic, safe environments and reduce the spread of infection, with equipment tailored to each setting.

Solutions we offer:
- Automated fogging and spraying systems
- Walk-through sanitisation gates
- Surface and air disinfection units
- Hospital-grade sterilisation equipment

Our commitment:
- Reliable, internationally sourced machines
- Professional installation and training
- Maintenance support and consumables supply
- Guidance on the right solution for your space`,
    gallery: [
      { url: '/images/projects/disinfection.jpg', alt: 'Disinfection equipment in use' },
      { url: '/images/services/equipment.jpg', alt: 'Sanitisation machinery' },
    ],
  },
  {
    slug: 'beauty-cosmetics',
    content: `Our beauty and cosmetics division offers a wide range of professional beauty products, skincare solutions, and cosmetics supply services for individuals and businesses.

We help salons, retailers, and beauty professionals access quality products and the support they need to grow.

What we offer:
- Skincare and cosmetic product supply
- Professional salon and spa products
- Bulk and wholesale supply for businesses
- Guidance on product selection and trends

Why partner with us:
- Quality, authentic products
- Competitive wholesale pricing
- Reliable supply and restocking
- Support for both individuals and businesses`,
  },
  {
    slug: 'vocational-skills',
    content: `We provide practical vocational training and skills development programmes designed to empower individuals with real, income-generating trades.

Our hands-on approach equips participants with the knowledge and confidence to start a career or build a business.

Programmes include:
- Forex and financial trading
- Hair beautification and styling
- Skincare and cosmetology
- Other practical trade skills

What you gain:
- Hands-on, practical training
- Experienced instructors and mentorship
- Flexible programmes for different skill levels
- Guidance on turning skills into income`,
  },
];

/**
 * Apply the enrichments (formatted details + gallery images) to whichever
 * services already exist. Safe to call from the seed script or run standalone.
 */
export async function applyEnrichments(prisma: PrismaClient) {
  for (const item of enrichments) {
    const service = await prisma.service.findUnique({ where: { slug: item.slug } });
    if (!service) {
      console.log(`  ⚠️  Skipped (not found): ${item.slug}`);
      continue;
    }

    await prisma.service.update({
      where: { id: service.id },
      data: { content: item.content },
    });

    if (item.gallery && item.gallery.length > 0) {
      await prisma.serviceImage.deleteMany({ where: { serviceId: service.id } });
      await prisma.serviceImage.createMany({
        data: item.gallery.map((img, i) => ({ ...img, order: i, serviceId: service.id })),
      });
      console.log(`  ✅ ${item.slug}: details + ${item.gallery.length} gallery images`);
    } else {
      console.log(`  ✅ ${item.slug}: details (no gallery images)`);
    }
  }
}

async function main() {
  const prisma = new PrismaClient();
  console.log('🔄 Enriching existing services...');
  try {
    await applyEnrichments(prisma);
    console.log('\n🎉 Service enrichment complete!');
  } catch (e) {
    console.error('❌ Enrichment failed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Only run automatically when executed directly (not when imported by seed.ts).
if (require.main === module) {
  main();
}
