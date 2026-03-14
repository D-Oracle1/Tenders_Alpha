import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import AboutHero from '@/components/website/about/AboutHero';
import AboutCompanyOverview from '@/components/website/about/AboutCompanyOverview';
import AboutVisionMission from '@/components/website/about/AboutVisionMission';
import AboutTeam from '@/components/website/about/AboutTeam';
import AboutSisterCompanies from '@/components/website/about/AboutSisterCompanies';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Tenders General Merchant Ltd., founded in 2009. Our vision, mission, leadership team, and commitment to excellence in construction, engineering, and procurement.',
};

export default async function AboutPage() {
  const [teamMembers, sisterCompanies] = await Promise.all([
    prisma.teamMember.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    prisma.sisterCompany.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
  ]);

  return (
    <>
      <AboutHero />
      <AboutCompanyOverview />
      <AboutVisionMission />
      <AboutTeam members={teamMembers} />
      <AboutSisterCompanies companies={sisterCompanies} />
    </>
  );
}
