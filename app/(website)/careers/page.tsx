import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import PageHero from '@/components/website/PageHero';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Tenders Alpha team. Explore current job openings and career opportunities.',
};

export default async function CareersPage() {
  const jobs = await prisma.jobPosting.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <PageHero
        title="Careers"
        subtitle="Join our team of passionate professionals building Nigeria's future."
        breadcrumbs={[{ label: 'Careers' }]}
      />

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-primary mb-8 font-heading">
                {jobs.length > 0 ? `${jobs.length} Open Position${jobs.length !== 1 ? 's' : ''}` : 'Career Opportunities'}
              </h2>

              {jobs.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                  <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-500 mb-2">No Openings Currently</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    We don't have any open positions at the moment, but we're always looking for talented people.
                    Send your CV to our email and we'll keep it on file.
                  </p>
                  <a href="mailto:info@tendersalpha.com"
                    className="btn-primary mt-6 inline-flex">
                    Send Spontaneous Application
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="card p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-primary font-heading">{job.title}</h3>
                          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                            {job.department && (
                              <span className="flex items-center gap-1">
                                <Briefcase size={14} />
                                {job.department}
                              </span>
                            )}
                            {job.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {job.location}
                              </span>
                            )}
                            {job.type && (
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {job.type}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{job.description}</p>
                        </div>
                        <Link
                          href={`/careers/${job.slug}`}
                          className="btn-primary text-sm flex-shrink-0"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-3 font-heading">Why Work With Us?</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  {['Competitive compensation', 'Career growth opportunities', 'Diverse project experience', 'Professional development', 'Collaborative team culture'].map(b => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-primary mb-3 font-heading">Send Your CV</h3>
                <p className="text-gray-600 text-sm mb-4">Don't see a suitable position? Send your CV for future opportunities.</p>
                <a href="mailto:info@tendersalpha.com" className="btn-outline text-sm w-full justify-center">
                  Email Your CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
