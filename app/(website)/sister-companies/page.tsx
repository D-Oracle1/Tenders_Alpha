import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import PageHero from '@/components/website/PageHero';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sister Companies',
  description: "Explore Tenders General Merchant Ltd.'s network of sister companies and strategic partnerships.",
};

export default async function SisterCompaniesPage() {
  const companies = await prisma.sisterCompany.findMany({
    where: { isActive: true },
    include: { services: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' },
  });

  return (
    <>
      <PageHero
        title="Sister Companies"
        subtitle="Our ecosystem of strategic partners delivering comprehensive solutions across Africa."
        breadcrumbs={[{ label: 'Sister Companies' }]}
      />

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {companies.map((company, i) => (
              <div key={company.id} className="card p-8">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl font-heading">{company.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-primary mb-1 font-heading">{company.name}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{company.description}</p>

                    {company.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {company.services.slice(0, 3).map((s) => (
                          <span key={s.id} className="badge-primary text-xs">{s.title}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/sister-companies/${company.slug}`}
                        className="text-primary text-sm font-semibold flex items-center gap-1 hover:text-accent transition-colors"
                      >
                        Learn More <ArrowRight size={14} />
                      </Link>
                      {company.websiteUrl && (
                        <a
                          href={company.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
