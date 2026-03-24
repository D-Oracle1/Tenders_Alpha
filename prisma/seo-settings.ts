/**
 * Apply full SEO optimization to live DB settings and hero slides.
 * Run: npx tsx prisma/seo-settings.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  console.log('🔍 Applying SEO settings...');

  // 1. Site-wide SEO settings
  const seoSettings = [
    {
      key: 'meta_title',
      value: 'Tenders Alpha | Tender & Procurement Platform Nigeria',
    },
    {
      key: 'meta_description',
      value: "Nigeria's #1 tender management and procurement platform. Submit tenders, manage bids, and streamline procurement for government, enterprises & NGOs. Founded 2009.",
    },
    {
      key: 'company_tagline',
      value: "Where Nigeria Tenders. Where Africa Procures.",
    },
    // Homepage About section
    {
      key: 'home_about_title',
      value: "Nigeria's #1 Digital Tender & Procurement Platform",
    },
    {
      key: 'home_about_subtitle',
      value: "Helping government agencies, enterprises, and NGOs across Nigeria manage tenders, procurement, bids, and contracts — faster, smarter, and fully transparent.",
    },
    {
      key: 'home_about_description',
      value: "Founded in 2009 and incorporated in 2012, Tenders Alpha Limited has grown into Nigeria's most trusted platform for tender management, procurement automation, and bid submission. From Lagos to Abuja, Port Harcourt to Accra, we deliver end-to-end procurement solutions that bring speed, structure, and transparency to every contract your organisation awards — with an expanding footprint across the UK, USA, and Australia.",
    },
    {
      key: 'home_about_highlights',
      value: "Founded 2009 | Incorporated 2012\nEnd-to-end tender management\nGovernment & private sector trusted\nOffices in Lagos, Port Harcourt & UK\nTransparent, auditable procurement\nServing Nigeria and Africa",
    },
  ];

  for (const s of seoSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value, group: 'seo', label: s.key },
    });
    console.log('  ✅', s.key);
  }

  // 2. Update hero slides with SEO-optimized copy
  await prisma.heroSlide.upsert({
    where: { id: 'hero-slide-1' },
    update: {
      title: "Nigeria's #1 Tender & Procurement Platform",
      subtitle: "Submit tenders, manage bids, and award contracts — faster, smarter, and fully transparent. Trusted by government agencies, enterprises & NGOs across Nigeria.",
      buttonText: 'Submit a Tender',
      buttonLink: '/tenders',
    },
    create: {
      id: 'hero-slide-1',
      title: "Nigeria's #1 Tender & Procurement Platform",
      subtitle: "Submit tenders, manage bids, and award contracts — faster, smarter, and fully transparent. Trusted by government agencies, enterprises & NGOs across Nigeria.",
      backgroundImage: '/images/hero/hero-1.jpg',
      buttonText: 'Submit a Tender',
      buttonLink: '/tenders',
      order: 1,
      isActive: true,
    },
  });

  await prisma.heroSlide.upsert({
    where: { id: 'hero-slide-2' },
    update: {
      title: "End-to-End Procurement Management in Nigeria",
      subtitle: "From vendor registration to contract award — Tenders Alpha powers the entire procurement lifecycle for organisations across Nigeria and Africa.",
      buttonText: 'Explore Our Services',
      buttonLink: '/services',
    },
    create: {
      id: 'hero-slide-2',
      title: "End-to-End Procurement Management in Nigeria",
      subtitle: "From vendor registration to contract award — Tenders Alpha powers the entire procurement lifecycle for organisations across Nigeria and Africa.",
      backgroundImage: '/images/hero/hero-2.jpg',
      buttonText: 'Explore Our Services',
      buttonLink: '/services',
      order: 2,
      isActive: true,
    },
  });

  console.log('  ✅ Hero slides updated');

  // 3. Update typewriter words for hero slide 1 to be SEO-rich
  await prisma.heroTypewriterWord.deleteMany({
    where: { slide: { id: 'hero-slide-1' } },
  });

  const slide1 = await prisma.heroSlide.findUnique({ where: { id: 'hero-slide-1' } });
  if (slide1) {
    await prisma.heroTypewriterWord.createMany({
      data: [
        { word: 'Tender Management Nigeria', order: 1, slideId: slide1.id },
        { word: 'Procurement Software', order: 2, slideId: slide1.id },
        { word: 'Bid Submission Portal', order: 3, slideId: slide1.id },
        { word: 'Vendor Management', order: 4, slideId: slide1.id },
        { word: 'Contract Award Platform', order: 5, slideId: slide1.id },
      ],
    });
    console.log('  ✅ Typewriter words updated');
  }

  await prisma.$disconnect();
  console.log('\n🎉 SEO settings applied successfully!');
}

run().catch((e) => { console.error(e); process.exit(1); });
