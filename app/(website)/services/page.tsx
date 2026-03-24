import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import ServiceCard from '@/components/website/ServiceCard';
import PageHero from '@/components/website/PageHero';
import SectionHeader from '@/components/website/SectionHeader';

export const metadata: Metadata = {
  title: 'Our Services — Procurement, Construction & Tender Management Nigeria',
  description:
    'Tenders Alpha delivers procurement, construction, oil & gas, equipment supply, cargo handling, beauty/cosmetics, and vocational skills services across Nigeria and Africa.',
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive solutions across construction, engineering, procurement, beauty, and vocational sectors."
        breadcrumbs={[{ label: 'Services' }]}
      />
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="What We Offer"
            title="Full Range of Services"
            subtitle="From building construction to oil & gas procurement, we have the expertise and resources to handle your most demanding projects."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.id} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
