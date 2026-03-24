import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageHero from '@/components/website/PageHero';
import ContactForm from '@/components/website/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch With Our Procurement Team',
  description:
    'Contact Tenders Alpha Limited for tender inquiries, procurement partnerships, and project quotes. Offices in Lagos, Port Harcourt & UK. Response within 24 hours.',
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
                  A5 Victoria Bay Annex Off Royal Pine Estate Gate 3<br />
                  by Orchid Road, Eleganza, Lekki Phase 2,<br />
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
                  2 Melbourne Close off Aker Road, Iwofe,<br />
                  Port Harcourt, Rivers State, Nigeria
                </p>
              </div>

              {/* UK Office */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <h3 className="font-bold text-primary font-heading">UK Office — Southampton</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Cranbury Place,<br />
                  Southampton, United Kingdom SO14 0LG
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <a href="tel:+447771098749" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                  <Phone size={18} className="text-accent" />
                  <span>+44 7771 098749</span>
                </a>
                <a href="tel:+2348101365496" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                  <Phone size={18} className="text-accent" />
                  <span>+234 8101 365496</span>
                </a>
                <a href="mailto:info@tendersalpha.com" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                  <Mail size={18} className="text-accent" />
                  <span className="text-sm">info@tendersalpha.com</span>
                </a>
                <a href="mailto:Soibi.opaibomari@tendersalpha.com" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                  <Mail size={18} className="text-accent" />
                  <span className="text-sm">Soibi.opaibomari@tendersalpha.com</span>
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
