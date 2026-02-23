"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Car, Shield, Clock, Award, Users, MapPin } from "lucide-react";
import { MessageCircle, Phone } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Car,
      title: "Wide Selection",
      description:
        "Choose from our extensive fleet of cars and bikes for every occasion",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description:
        "All vehicles are regularly maintained and thoroughly sanitized",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service for your convenience",
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Competitive rates with no hidden charges or surprises",
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Customers", target: 500 },
    { number: "100+", label: "Vehicles", target: 100 },
    { number: "3+", label: "Office in Cities", target: 3 },
    { number: "24/7", label: "Support", target: 0 },
  ];

  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

  // ✅ SEO Structured Data
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Eazydrivez",
      url: "https://easydrivez.com",
      logo: "https://easydrivez.com/easydrivez-banner.png",
      image: "https://easydrivez.com/easydrivez-banner.png",
      description:
        "Eazydrivez provides premium self drive car rental and bike rental services in Bhubaneswar with affordable pricing and 24/7 support.",
      telephone: "+91-9090090699",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "B-15 ID Market Nayapalli, in front of Saraswati Shishu Vidya Mandir",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        postalCode: "751015",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "20.2961",
        longitude: "85.8245",
      },
      openingHours: "Mo-Su 00:00-23:59",
      priceRange: "₹₹",
      areaServed: {
        "@type": "City",
        name: "Bhubaneswar",
      },
    }),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          stats.forEach((stat, index) => {
            if (stat.target === 0) return;

            let current = 0;
            const increment = stat.target / 50;

            const timer = setInterval(() => {
              current += increment;

              if (current >= stat.target) {
                setCounts((prev) => {
                  const updated = [...prev];
                  updated[index] = stat.target;
                  return updated;
                });
                clearInterval(timer);
              } else {
                setCounts((prev) => {
                  const updated = [...prev];
                  updated[index] = Math.floor(current);
                  return updated;
                });
              }
            }, 30);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, [hasAnimated]);

  const handleWhatsApp = () => {
    window.open("https://wa.me/919090089708", "_blank");
  };

  const handlePhone = () => {
    window.location.href = "tel:+919090089708";
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Fixed Contact Buttons */}
      <div className="fixed left-6 bottom-8 z-50 flex flex-col gap-4">
        <button
          onClick={handleWhatsApp}
          className="h-14 w-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
        >
          <MessageCircle className="h-6 w-6" />
        </button>

        <button
          onClick={handlePhone}
          className="h-14 w-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
        >
          <Phone className="h-6 w-6" />
        </button>
      </div>

      {/* Hero Section */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=400&fit=crop')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            About eazydrivez
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Your trusted partner for premium car and bike rental services in Bhubaneswar
          </p>
        </div>
      </div>

      {/* Stats Section */}
          {/* Stats Section */}
      <div className="py-16 bg-gray-100" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.target === 0 ? stat.number : `${counts[idx]}+`}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in Bhubaneswar, Eazydrivez has been providing reliable
                and affordable vehicle rental services to customers across the
                city. We understand that whether you're a tourist exploring the
                city or a local in need of temporary transportation, you deserve
                quality service at competitive prices.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our mission is simple: to make vehicle rentals easy, accessible,
                and hassle-free. With a diverse fleet of well-maintained cars
                and bikes, we cater to all your transportation needs.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We take pride in our customer-first approach, ensuring every
                journey with us is comfortable, safe, and memorable.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&h=600&fit=crop"
                alt="Our Fleet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best rental experience with our
              top-notch services and customer care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white border border-gray-700">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-8 w-8" />
                  <h2 className="text-3xl font-bold">Visit Us</h2>
                </div>
                <p className="text-gray-300 mb-6">
                  Come visit our office in Bhubaneswar or contact us for home
                  delivery of your rental vehicle.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                    <span>
                      B-15 ID Market Nayapalli, in front of Saraswati Shishu
                      Vidya Mandir, Beside Saura Shakti Enterprises Pvt. Ltd.,
                      Bhubaneswar, Odisha 751015
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-1 flex-shrink-0" />
                    <span>Open 24/7 for bookings and support</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <a
                  href="tel:+919090090699"
                  className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center gap-2"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Users className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Book your perfect ride today and experience the convenience of
            Easydrivez
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/allcars"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-lg"
            >
              Browse Cars
            </a>
            <a
              href="/allbikes"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-lg"
            >
              Browse Bikes
            </a>
          </div>
        </div>
      </div>

      {/* (Your Story, Features, Location, CTA sections remain EXACTLY SAME — unchanged) */}

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </div>
  );
}