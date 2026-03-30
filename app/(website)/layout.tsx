import prisma from '@/lib/prisma';
import Navbar from '@/components/website/Navbar';
import Footer from '@/components/website/Footer';

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.siteSetting.findMany({
    where: { key: { in: ['company_name', 'company_description', 'founded_year', 'incorporated_year'] } },
  });
  const get = (key: string) => settings.find((s) => s.key === key)?.value;

  const companyName = get('company_name') || 'Tenders Alpha Limited';
  const companyDescription = get('company_description') || '';
  const foundedYear = get('founded_year') || '2009';
  const incorporatedYear = get('incorporated_year') || '2012';

  return (
    <>
      <Navbar companyName={companyName} />
      <main className="min-h-screen">{children}</main>
      <Footer companyName={companyName} companyDescription={companyDescription} foundedYear={foundedYear} incorporatedYear={incorporatedYear} />
    </>
  );
}
