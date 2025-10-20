'use client';

import Link from 'next/link';
import {
  Car,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
    services: [
      { label: 'Car Rentals', href: '/services#rentals' },
      { label: 'Chauffeur Services', href: '/services#chauffeur' },
      { label: 'Airport Pickup', href: '/services#airport' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-white border-t border-gray-200 text-gray-900">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Social */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                Easydrivez
              </span>
            </Link>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Premium car rental services with professional chauffeurs.
              Experience luxury and comfort on every journey.
            </p>

            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-10 w-10 rounded-full border border-gray-300 hover:bg-blue-600 hover:text-white transition-all hover:scale-110 flex items-center justify-center"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 mt-0.5 text-blue-600 flex-shrink-0" />
                <span>Bhubaneswar</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <a href="mailto:info@easydrivez.in">info@easydrivez.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; {currentYear} Easydrivez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}