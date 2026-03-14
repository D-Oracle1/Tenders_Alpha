import Navbar from '@/components/website/Navbar';
import Footer from '@/components/website/Footer';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
