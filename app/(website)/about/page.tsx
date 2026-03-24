import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import AboutHero from '@/components/website/about/AboutHero';
import AboutCompanyOverview from '@/components/website/about/AboutCompanyOverview';
import AboutVisionMission from '@/components/website/about/AboutVisionMission';
import AboutTeam from '@/components/website/about/AboutTeam';

export const metadata: Metadata = {
  title: 'About Us — Nigeria\'s Leading Procurement & Tender Company',
  description:
    'Tenders Alpha Limited — founded 2009, incorporated 2012. Learn how we\'ve become Nigeria\'s most trusted procurement, tender management, and construction company.',
};

export default async function AboutPage() {
  const [teamMembers, settings] = await Promise.all([
    prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.siteSetting.findMany({
      where: {
        key: {
          in: [
            'company_overview', 'founded_year', 'incorporated_year',
            'head_office_city', 'international_presence',
            'director_of_works', 'director_name',
            ...Array.from({ length: 8 }, (_, i) => [`timeline_${i + 1}_year`, `timeline_${i + 1}_event`]).flat(),
          ],
        },
      },
    }),
  ]);

  const s: Record<string, string> = {};
  settings.forEach((r) => { s[r.key] = r.value; });

  return (
    <>
      <AboutHero />
      <AboutCompanyOverview
        overview={s.company_overview}
        foundedYear={s.founded_year}
        incorporatedYear={s.incorporated_year}
        headOfficeCity={s.head_office_city}
        internationalPresence={s.international_presence}
        directorOfWorks={s.director_of_works}
        directorName={s.director_name}
        timelineEntries={Array.from({ length: 8 }, (_, i) => ({
          year: s[`timeline_${i + 1}_year`] || '',
          event: s[`timeline_${i + 1}_event`] || '',
        })).filter((e) => e.year && e.event)}
      />
      <AboutVisionMission />
      <AboutTeam members={teamMembers} />
    </>
  );
}
