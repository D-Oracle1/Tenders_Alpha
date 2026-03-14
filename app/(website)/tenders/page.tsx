import { Metadata } from 'next';
import PageHero from '@/components/website/PageHero';
import TenderForm from '@/components/website/TenderForm';

export const metadata: Metadata = {
  title: 'Tender Submission Portal',
  description: 'Submit your tender to Tenders General Merchant Ltd. for review and evaluation.',
};

export default function TendersPage() {
  return (
    <>
      <PageHero
        title="Tender Submission Portal"
        subtitle="Submit your tender for review by our procurement team."
        breadcrumbs={[{ label: 'Tender Portal' }]}
      />
      <section className="py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-primary mb-2 font-heading">Submit a Tender</h2>
            <p className="text-gray-600 mb-8">Fill in the form below to submit your tender for evaluation by our team.</p>
            <TenderForm />
          </div>
        </div>
      </section>
    </>
  );
}
