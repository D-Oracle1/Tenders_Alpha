export const revalidate = 0;

import { Metadata } from 'next';
import PageHero from '@/components/website/PageHero';
import TenderForm from '@/components/website/TenderForm';

export const metadata: Metadata = {
  title: 'Tender Portal — Submit a Tender in Nigeria',
  description:
    'Submit tenders online to Tenders Alpha Limited. Nigeria\'s trusted tender portal for government agencies, enterprises, and vendors. Fast evaluation. Transparent process.',
};

export default function TendersPage() {
  return (
    <>
      <PageHero
        title="Nigeria's Tender Submission Portal"
        subtitle="Submit your tender online and get a response from our procurement team within 48 hours. Transparent, fast, and fully digital."
        breadcrumbs={[{ label: 'Tender Portal' }]}
      />
      <section className="py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-primary mb-2 font-heading">Submit a Tender Online</h2>
            <p className="text-gray-600 mb-8">Complete the form below to submit your tender for evaluation by our experienced procurement team. All submissions are reviewed within 48 hours.</p>
            <TenderForm />
          </div>
        </div>
      </section>
    </>
  );
}
