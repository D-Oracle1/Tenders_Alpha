import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Projects Portfolio', href: '/projects' },
  { label: 'Sister Companies', href: '/sister-companies' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];

const services = [
  { label: 'Building Construction', href: '/services/building-construction' },
  { label: 'Civil Engineering', href: '/services/civil-engineering' },
  { label: 'Oil & Gas Procurement', href: '/services/oil-gas-procurement' },
  { label: 'Equipment Supply', href: '/services/equipment-supply' },
  { label: 'Cargo Handling', href: '/services/cargo-handling' },
  { label: 'Agricultural Activities', href: '/services/agricultural-activities' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl font-heading">TG</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-tight font-heading">Tenders General</div>
                <div className="text-accent text-sm font-semibold">Merchant Ltd.</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              A multi-faceted indigenous company with interests in Building Construction, Civil Engineering,
              Oil & Gas Procurement, Equipment Supply, Cargo Handling, and Agricultural Activities.
              Founded 2009 | Incorporated 2012.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-heading">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-white/70 hover:text-white hover:gap-3 transition-all text-sm"
                  >
                    <ArrowRight size={14} className="text-accent" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-heading">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-white/70 hover:text-white hover:gap-3 transition-all text-sm"
                  >
                    <ArrowRight size={14} className="text-accent" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-heading">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Head Office</p>
                  <p className="text-white/80 text-sm">
                    18 Essumei Street Off White House Bus Stop, Okokomaiko Badagry Expressway, Lagos State
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Branch Office</p>
                  <p className="text-white/80 text-sm">
                    9 Farm Road Off Location Bus Stop, Mbuogba NTA Road, Port Harcourt, Rivers State
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <div>
                  <a href="tel:07065220758" className="block text-white/80 text-sm hover:text-white transition-colors">
                    07065220758
                  </a>
                  <a href="tel:08073175838" className="block text-white/80 text-sm hover:text-white transition-colors">
                    08073175838
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:tendersgeneralmerchant@gmail.com"
                    className="block text-white/80 text-sm hover:text-white transition-colors break-all"
                  >
                    tendersgeneralmerchant@gmail.com
                  </a>
                  <a
                    href="mailto:okechukwuessumei@gmail.com"
                    className="block text-white/80 text-sm hover:text-white transition-colors"
                  >
                    okechukwuessumei@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Tenders General Merchant Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/tenders" className="text-white/60 hover:text-white text-sm transition-colors">
              Tender Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
