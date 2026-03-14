import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import PageHero from '@/components/website/PageHero';
import { SERVICE_CATEGORY_LABELS } from '@/lib/utils';
import { ArrowRight, FileText } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } });
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.description.substring(0, 160),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await prisma.service.findFirst({
    where: { slug: params.slug, isActive: true },
    include: {
      images: { orderBy: { order: 'asc' } },
      documents: true,
    },
  });

  if (!service) notFound();

  const relatedServices = await prisma.service.findMany({
    where: { isActive: true, id: { not: service.id } },
    take: 3,
    orderBy: { order: 'asc' },
  });

  return (
    <>
      <PageHero
        title={service.title}
        subtitle={SERVICE_CATEGORY_LABELS[service.category] || service.category}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {service.featuredImage && (
                <div className="relative h-80 rounded-2xl overflow-hidden mb-8">
                  <Image src={service.featuredImage} alt={service.title} fill className="object-cover" />
                </div>
              )}

              <span className="badge-primary mb-4 inline-flex">
                {SERVICE_CATEGORY_LABELS[service.category] || service.category}
              </span>
              <h1 className="text-3xl font-bold text-primary mb-4 font-heading">{service.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{service.description}</p>

              {service.content && (
                <div
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              )}

              {/* Gallery */}
              {service.images.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-primary mb-6 font-heading">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {service.images.map((img) => (
                      <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden">
                        <Image src={img.url} alt={img.alt || service.title} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {service.documents.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-primary mb-4 font-heading">Related Documents</h3>
                  <div className="space-y-3">
                    {service.documents.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors group"
                      >
                        <FileText size={20} className="text-primary" />
                        <span className="text-gray-700 group-hover:text-primary transition-colors">{doc.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-3 font-heading">Need This Service?</h3>
                <p className="text-white/70 text-sm mb-5">Contact us today for a free consultation and project quote.</p>
                <Link href="/contact" className="btn-accent w-full justify-center text-sm">
                  Request a Quote
                  <ArrowRight size={16} />
                </Link>
                <a href="tel:07065220758" className="mt-3 block text-center text-white/70 hover:text-white text-sm transition-colors">
                  or call: 07065220758
                </a>
              </div>

              {/* Other Services */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-primary mb-4 font-heading">Other Services</h3>
                <div className="space-y-3">
                  {relatedServices.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                      {s.title}
                    </Link>
                  ))}
                </div>
                <Link href="/services" className="text-accent text-sm font-semibold mt-4 flex items-center gap-1 hover:gap-2 transition-all">
                  View All Services <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
