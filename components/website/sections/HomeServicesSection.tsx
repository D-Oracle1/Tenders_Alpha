import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
    <section className="py-24 bg-white">
      <div className="container-custom">
        {/* Header row */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-accent" />
              <span className="text-xs font-semibold tracking-widest uppercase text-accent">Procurement & Construction Services Nigeria</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-heading leading-tight">
              Our Core Services
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary/60 hover:text-primary transition-colors group"
          >
            View all
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} {...service} index={i} />
          ))}
        </div>

        {/* Mobile see all */}
        <div className="mt-10 sm:hidden">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            View all services <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
