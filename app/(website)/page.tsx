export const revalidate = 0;

import prisma from '@/lib/prisma';
import HeroSlider from '@/components/website/HeroSlider';
import HomeAboutSection from '@/components/website/sections/HomeAboutSection';
import HomeServicesSection from '@/components/website/sections/HomeServicesSection';
import HomeProjectsSection from '@/components/website/sections/HomeProjectsSection';
import HomeTestimonials from '@/components/website/sections/HomeTestimonials';
import HomeCTA from '@/components/website/sections/HomeCTA';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://tendersalpha.com/#organization',
      name: 'Tenders Alpha Limited',
      url: 'https://tendersalpha.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tendersalpha.com/logo.png',
      },
      description:
        "Nigeria's leading tender management and procurement platform. Helping government agencies, enterprises, and NGOs manage bids, vendors, and contracts across Africa.",
      foundingDate: '2009',
      areaServed: ['Nigeria', 'Africa'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressRegion: 'Lagos State',
        addressCountry: 'NG',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+234-706-522-0758',
        contactType: 'customer service',
        email: 'info@tendersalpha.com',
        areaServed: 'NG',
      },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://tendersalpha.com/#website',
      url: 'https://tendersalpha.com',
      name: 'Tenders Alpha',
      description: "Nigeria's #1 Tender & Procurement Management Platform",
      publisher: { '@id': 'https://tendersalpha.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Tenders Alpha Procurement Portal',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'End-to-end tender management and procurement software for Nigerian government agencies, private enterprises, and NGOs.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'NGN',
        price: '0',
        description: 'Free tender submission portal',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Nigeria',
      },
    },
  ],
};

async function getHomeData() {
  const [slides, services, projects, testimonials, profileSetting] = await Promise.all([
    prisma.heroSlide.findMany({
      where: { isActive: true },
      include: { typewriterWords: { orderBy: { order: 'asc' } } } as const,
      orderBy: { order: 'asc' },
    }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 3,
    }),
    prisma.project.findMany({
      where: { isActive: true },
      include: { images: { take: 1, orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.siteSetting.findMany({
      where: {
        key: {
          in: [
            'company_profile_url',
            'home_about_title', 'home_about_subtitle', 'home_about_description', 'home_about_highlights',
            'stat_1_value', 'stat_1_label', 'stat_2_value', 'stat_2_label',
            'stat_3_value', 'stat_3_label', 'stat_4_value', 'stat_4_label',
          ],
        },
      },
    }),
  ]);

  const s: Record<string, string> = {};
  profileSetting.forEach((r) => { s[r.key] = r.value; });

  return { slides, services, projects, testimonials, homeSettings: s };
}

export default async function HomePage() {
  const { slides, services, projects, testimonials, homeSettings } = await getHomeData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSlider slides={slides as any} />
      <HomeAboutSection settings={homeSettings} />
      <HomeServicesSection services={services} />
      <HomeProjectsSection projects={projects} />
      <HomeTestimonials testimonials={testimonials} />
      <HomeCTA />
      <div className="bg-white h-20" />
    </>
  );
}
