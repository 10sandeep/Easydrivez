"use client";
import Image from "next/image";
import Logo from "@/assets/logo1.png";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { href: "/", label: "Home" },
      { href: "/allcars", label: "All Cars" },
      { href: "/allbikes", label: "All Bikes" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/gallary", label: "Gallery" },
    ],
    services: [
      { label: "Car Rentals", href: "/allcars" },
      { label: "Airport Pickup", href: "/allcars" },
    ],
    legals:[
      {href : "/terms", label: "Terms & Conditions"},
      {href : "/privacy", label:"Privacy & Policy"}
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1MJjR6xeLP/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/eazydrivez?igsh=MXM2bWhlMnVoN3RhaQ==", label: "Instagram" },
    {icon:Twitter, href:"https://x.com/eazydrivez?t=j2krss8y8khr8yzIWWFh5A&s=09",label: "Twitter"}

  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 text-gray-800">
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src={Logo}
                alt="EazyDrivez Logo"
                width={200}
                height={80}
                className="h-20 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
              Premium vehicle rental services — from economy to luxury rides.
              Drive comfort and class with Eazydrivez.
            </p>

            {/* Social Icons */}
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
            <ul className="space-y-2 text-sm">
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
            <ul className="space-y-2 text-sm">
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

  <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Legals
            </h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.legals.map((link) => (
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
            <ul className="space-y-4 text-sm">
              {/* Address with Map Link */}
              <li className="flex items-start space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                <MapPin className="h-5 w-5 mt-0.5 text-blue-600 flex-shrink-0" />
                <a
                  href="https://share.google/bavAd0rZrhngZvt94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed hover:underline"
                >
<<<<<<< Updated upstream
                 N-4/177,IRC Village,Nayapali,Bhubaneswar-15
=======
                  N-4/177,IRC Village,Nayapali,Bhubaneswar,Odisha
>>>>>>> Stashed changes
                </a>
              </li>

              {/* Phone Numbers */}
              <li className="flex flex-col gap-2 text-gray-600">
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <a href="tel:+919090090699">+91 9090090699</a>
                </div>
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <a href="tel:+919090089708">+91 9090089708</a>
                </div>
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <a href="tel:+918093806834">+91 8093806834</a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <a href="mailto:support@eazydrivez.com" className="hover:underline">
                  support@eazydrivez.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>
            &copy; {currentYear} <span className="font-semibold text-blue-600">Eazydrivez</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
