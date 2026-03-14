import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageHero from '@/components/website/PageHero';
import ContactForm from '@/components/website/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Tenders General Merchant Ltd. Contact our offices in Lagos and Port Harcourt for project inquiries, quotes, and partnership opportunities.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Reach out to our team for project inquiries, quotes, and partnership opportunities."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4 font-heading">Get In Touch</h2>
                <p className="text-gray-600 leading-relaxed">
                  We're ready to discuss your project needs. Contact any of our offices or fill out the form.
                </p>
              </div>

              {/* Head Office */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <h3 className="font-bold text-primary font-heading">Head Office — Lagos</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  18 Essumei Street Off White House Bus Stop,<br />
                  Okokomaiko Badagry Expressway,<br />
                  Lagos State, Nigeria
                </p>
              </div>

              {/* Branch Office */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <h3 className="font-bold text-primary font-heading">Branch Office — Port Harcourt</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  9 Farm Road Off Location Bus Stop,<br />
                  Mbuogba NTA Road,<br />
                  Port Harcourt, Rivers State, Nigeria
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <a href="tel:07065220758" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                  <Phone size={18} className="text-accent" />
                  <span>07065220758</span>
                </a>
                <a href="tel:08073175838" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                  <Phone size={18} className="text-accent" />
                  <span>08073175838</span>
                </a>
                <a href="mailto:tendersgeneralmerchant@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                  <Mail size={18} className="text-accent" />
                  <span className="text-sm">tendersgeneralmerchant@gmail.com</span>
                </a>
                <a href="mailto:okechukwuessumei@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                  <Mail size={18} className="text-accent" />
                  <span className="text-sm">okechukwuessumei@gmail.com</span>
                </a>
              </div>

              <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                <Clock size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-primary text-sm">Business Hours</p>
                  <p className="text-gray-600 text-sm">Monday – Friday: 8:00 AM – 5:00 PM</p>
                  <p className="text-gray-600 text-sm">Saturday: 9:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-primary mb-6 font-heading">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-lg h-80">
            <iframe
              src="https://maps.google.com/maps?q=Okokomaiko+Lagos+Nigeria&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
