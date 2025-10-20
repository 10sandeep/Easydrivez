"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/allcars", label: "All Cars" },
    { href: "/allbikes", label: "All Bikes" },
    { href: "/about", label: "About" },
    { href: "/terms", label: "Terms" },
    { href: "/contact", label: "Contact" },
    {href:"/gallery",label:"Gallary"}
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-md border-gray-200 dark:border-gray-800"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
         <Link href="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600 rounded-lg blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative bg-blue-600 rounded-lg p-1.5 group-hover:bg-blue-700 transition-colors">
          <Car className="h-6 w-6 text-white" />
        </div>
      </div>
      <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        Easydrivez
      </span>
    </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`relative text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-cyan-400 ${
                    pathname === link.href
                      ? "text-blue-600 dark:text-cyan-400"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side (Theme + Mobile Menu) */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-800 dark:text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 transition-all duration-300">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-lg font-medium rounded-md transition-all hover:pl-2 hover:text-blue-600 dark:hover:text-cyan-400 ${
                    pathname === link.href
                      ? "text-blue-600 dark:text-cyan-400"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}