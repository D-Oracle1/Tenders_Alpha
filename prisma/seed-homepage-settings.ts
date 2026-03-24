import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const settings = [
  { key: 'home_about_title', value: "Building Nigeria's Future Since 2009", group: 'homepage', label: 'About Section Title' },
  { key: 'home_about_subtitle', value: 'We are a multi-faceted indigenous company with deep expertise in construction, engineering, procurement, beauty/cosmetics, and vocational skills.', group: 'homepage', label: 'About Section Subtitle' },
  { key: 'home_about_description', value: "Founded in 2009 and incorporated in 2012, Tenders Alpha Limited has grown into a respected force in Nigeria's infrastructure landscape and beyond — delivering world-class construction, engineering, and procurement solutions across government and private sectors, with an expanding international footprint in the UK, USA, and Australia.", group: 'homepage', label: 'About Section Paragraph' },
  { key: 'home_about_highlights', value: 'Founded in 2009, Incorporated 2012\n8 core service areas\nOffices in Lagos, Port Harcourt & UK\nServing government and private sectors\nInternational presence: UK, USA & Australia\nDiversified group: construction to education', group: 'homepage', label: 'Highlight Points (one per line)' },
  { key: 'stat_1_value', value: '15+', group: 'homepage', label: 'Stat 1 Value' },
  { key: 'stat_1_label', value: 'Years of Excellence', group: 'homepage', label: 'Stat 1 Label' },
  { key: 'stat_2_value', value: '200+', group: 'homepage', label: 'Stat 2 Value' },
  { key: 'stat_2_label', value: 'Projects Delivered', group: 'homepage', label: 'Stat 2 Label' },
  { key: 'stat_3_value', value: '8', group: 'homepage', label: 'Stat 3 Value' },
  { key: 'stat_3_label', value: 'Service Categories', group: 'homepage', label: 'Stat 3 Label' },
  { key: 'stat_4_value', value: '100%', group: 'homepage', label: 'Stat 4 Value' },
  { key: 'stat_4_label', value: 'Client Satisfaction', group: 'homepage', label: 'Stat 4 Label' },
];

async function run() {
  console.log('Seeding homepage settings...');
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, label: s.label },
      create: s,
    });
    console.log('✅', s.key);
  }
  await prisma.$disconnect();
  console.log('Done!');
}

run().catch((e) => { console.error(e); process.exit(1); });
