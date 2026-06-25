'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Building Construction', href: '/services/building-construction' },
      { label: 'Civil Engineering', href: '/services/civil-engineering' },
      { label: 'Oil & Gas Procurement', href: '/services/oil-gas-procurement' },
      { label: 'Equipment Supply', href: '/services/equipment-supply' },
      { label: 'Cargo Handling', href: '/services/cargo-handling' },
      { label: 'Logistics', href: '/services/logistics' },
      { label: 'Disinfection Machines', href: '/services/disinfection-machines' },
      { label: 'Beauty / Cosmetics', href: '/services/beauty-cosmetics' },
      { label: 'Vocational Skills', href: '/services/vocational-skills' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Sister Companies', href: '/sister-companies' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar({ companyName = 'Tenders Alpha Limited' }: { companyName?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:08101365496" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={14} />
              <span>08101365496</span>
            </a>
            <a href="tel:08073175838" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={14} />
              <span>08073175838</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@tendersalpha.com"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail size={14} />
              <span>info@tendersalpha.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Tenders Alpha"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
                priority
              />
              <div className="hidden sm:block">
                <div className="font-bold text-primary text-lg leading-tight font-heading">
                  {companyName}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'text-accent bg-accent/5'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    )}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} />}
                  </Link>

                  {/* Dropdown */}
                  {link.children && (
                    <AnimatePresence>
                      {activeDropdown === link.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3 flex-shrink-0"></span>
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link href="/contact" className="btn-accent text-sm py-2.5">
                Get A Quote
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container-custom py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                        pathname === link.href ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center px-4 py-2 rounded-lg text-xs text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-accent mr-2"></span>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Link href="/contact" className="btn-accent w-full justify-center text-sm py-3">
                    Get A Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
