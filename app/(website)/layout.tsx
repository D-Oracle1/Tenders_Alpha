import prisma from '@/lib/prisma';
import Navbar from '@/components/website/Navbar';
import Footer from '@/components/website/Footer';

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const nameSetting = await prisma.siteSetting.findUnique({ where: { key: 'company_name' } });
  const companyName = nameSetting?.value || 'Tenders Alpha Limited';

  return (
    <>
      <Navbar companyName={companyName} />
      <main className="min-h-screen">{children}</main>
      <Footer companyName={companyName} />
    </>
  );
}
