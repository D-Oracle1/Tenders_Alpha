export const revalidate = 0;

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import PageHero from '@/components/website/PageHero';
import { ExternalLink, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const company = await prisma.sisterCompany.findUnique({ where: { slug: params.slug } });
  if (!company) return { title: 'Company Not Found' };
  return {
    title: company.metaTitle || company.name,
    description: company.metaDescription || company.description.substring(0, 160),
  };
}

export default async function SisterCompanyDetailPage({ params }: { params: { slug: string } }) {
  const company = await prisma.sisterCompany.findFirst({
    where: { slug: params.slug, isActive: true },
    include: {
      services: { orderBy: { order: 'asc' } },
      projects: { orderBy: { order: 'asc' } },
    },
  });

  if (!company) notFound();

  return (
    <>
      <PageHero
        title={company.name}
        subtitle="Sister Company"
        breadcrumbs={[
          { label: 'Sister Companies', href: '/sister-companies' },
          { label: company.name },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-primary mb-4 font-heading">{company.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed text-justify mb-6">{company.description}</p>

              {company.content && (
                <div className="prose prose-lg max-w-none text-justify" dangerouslySetInnerHTML={{ __html: company.content }} />
              )}

              {company.services.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-primary mb-6 font-heading">Services Offered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {company.services.map((service) => (
                      <div key={service.id} className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2"></span>
                        <div>
                          <h4 className="font-semibold text-primary">{service.title}</h4>
                          {service.description && <p className="text-gray-600 text-sm mt-1">{service.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {company.projects.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-primary mb-6 font-heading">Notable Projects</h3>
                  <div className="space-y-4">
                    {company.projects.map((project) => (
                      <div key={project.id} className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-primary">{project.title}</h4>
                        {project.description && <p className="text-gray-600 text-sm mt-1">{project.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-primary mb-4 font-heading">Contact Information</h3>
                <div className="space-y-3">
                  {company.email && (
                    <a href={`mailto:${company.email}`} className="flex gap-3 hover:text-primary transition-colors">
                      <Mail size={18} className="text-accent flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{company.email}</span>
                    </a>
                  )}
                  {company.phone && (
                    <a href={`tel:${company.phone}`} className="flex gap-3 hover:text-primary transition-colors">
                      <Phone size={18} className="text-accent flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{company.phone}</span>
                    </a>
                  )}
                  {company.address && (
                    <div className="flex gap-3">
                      <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{company.address}</span>
                    </div>
                  )}
                  {company.websiteUrl && (
                    <a
                      href={company.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 text-primary hover:text-accent transition-colors"
                    >
                      <ExternalLink size={18} className="flex-shrink-0" />
                      <span className="text-sm font-medium">Visit Website</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-3 font-heading">Work With Us</h3>
                <p className="text-white/70 text-sm mb-5">Interested in partnering with our network?</p>
                <Link href="/contact" className="btn-accent w-full justify-center text-sm">
                  Get in Touch <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
