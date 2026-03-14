import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import ServiceCard from '../ServiceCard';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  featuredImage?: string | null;
  category: string;
}

export default function HomeServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="What We Do"
          title="Our Core Services"
          subtitle="We deliver comprehensive solutions across construction, engineering, procurement, and agricultural sectors to drive Nigeria's development."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} {...service} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-primary">
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
