export const revalidate = 0;

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import PageHero from '@/components/website/PageHero';
import { PROJECT_CATEGORY_LABELS, PROJECT_STATUS_LABELS, formatDate } from '@/lib/utils';
import { MapPin, Calendar, Building2, Tag, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.metaTitle || project.projectName,
    description: project.metaDescription || project.description.substring(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findFirst({
    where: { slug: params.slug, isActive: true },
    include: {
      images: { orderBy: { order: 'asc' } },
      documents: true,
    },
  });

  if (!project) notFound();

  return (
    <>
      <PageHero
        title={project.projectName}
        subtitle={PROJECT_CATEGORY_LABELS[project.category] || project.category}
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          { label: project.projectName },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {project.featuredImage && (
                <div className="relative h-80 rounded-2xl overflow-hidden mb-8">
                  <Image src={project.featuredImage} alt={project.projectName} fill className="object-cover" />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="badge-primary">{PROJECT_CATEGORY_LABELS[project.category]}</span>
                <span className={cn(
                  'badge',
                  project.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                  project.status === 'ONGOING' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                )}>
                  {PROJECT_STATUS_LABELS[project.status]}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-primary mb-4 font-heading">{project.projectName}</h1>
              <p className="text-gray-600 text-lg leading-relaxed text-justify mb-6">{project.description}</p>

              {project.content && (
                <div className="prose prose-lg max-w-none text-justify" dangerouslySetInnerHTML={{ __html: project.content }} />
              )}

              {project.images.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-primary mb-6 font-heading">Project Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.images.map((img) => (
                      <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden">
                        <Image src={img.url} alt={img.alt || project.projectName} fill className="object-cover hover:scale-105 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.documents.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-primary mb-4 font-heading">Project Documents</h3>
                  <div className="space-y-3">
                    {project.documents.map((doc) => (
                      <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors group">
                        <FileText size={20} className="text-primary" />
                        <span className="text-gray-700 group-hover:text-primary">{doc.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-primary mb-4 font-heading">Project Details</h3>
                <div className="space-y-4">
                  {project.client && (
                    <div className="flex gap-3">
                      <Building2 size={18} className="text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Client</p>
                        <p className="text-gray-700 font-medium">{project.client}</p>
                      </div>
                    </div>
                  )}
                  {project.location && (
                    <div className="flex gap-3">
                      <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-gray-700 font-medium">{project.location}</p>
                      </div>
                    </div>
                  )}
                  {project.completionDate && (
                    <div className="flex gap-3">
                      <Calendar size={18} className="text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Completion Date</p>
                        <p className="text-gray-700 font-medium">{formatDate(project.completionDate)}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Tag size={18} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-gray-700 font-medium">{PROJECT_CATEGORY_LABELS[project.category]}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-3 font-heading">Have a Similar Project?</h3>
                <p className="text-white/70 text-sm mb-5">Let us deliver the same excellence for your project.</p>
                <Link href="/contact" className="btn-accent w-full justify-center text-sm">
                  Get a Quote <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
