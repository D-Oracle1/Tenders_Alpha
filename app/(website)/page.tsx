import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import HeroSlider from '@/components/website/HeroSlider';
import HomeAboutSection from '@/components/website/sections/HomeAboutSection';
import HomeServicesSection from '@/components/website/sections/HomeServicesSection';
import HomeProjectsSection from '@/components/website/sections/HomeProjectsSection';
import HomeSisterCompanies from '@/components/website/sections/HomeSisterCompanies';
import HomeWhyChooseUs from '@/components/website/sections/HomeWhyChooseUs';
import HomeTestimonials from '@/components/website/sections/HomeTestimonials';
import HomeCTA from '@/components/website/sections/HomeCTA';
import HomeStats from '@/components/website/sections/HomeStats';

async function getHomeData() {
  const [slides, services, projects, sisterCompanies, testimonials] = await Promise.all([
    prisma.heroSlide.findMany({
      where: { isActive: true },
      include: { typewriterWords: { orderBy: { order: 'asc' } } } as const,
      orderBy: { order: 'asc' },
    }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 6,
    }),
    prisma.project.findMany({
      where: { isActive: true },
      include: { images: { take: 1, orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.sisterCompany.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return { slides, services, projects, sisterCompanies, testimonials };
}

export default async function HomePage() {
  const { slides, services, projects, sisterCompanies, testimonials } = await getHomeData();

  return (
    <>
      <HeroSlider slides={slides as any} />
      <HomeStats />
      <HomeAboutSection />
      <HomeServicesSection services={services} />
      <HomeWhyChooseUs />
      <HomeProjectsSection projects={projects} />
      <HomeSisterCompanies companies={sisterCompanies} />
      <HomeTestimonials testimonials={testimonials} />
      <HomeCTA />
    </>
  );
}
