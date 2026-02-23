import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";
import HeroImage from "@/assets/hero.png";
import Testimonials from "@/components/testimonial";
import Gallary from "@/components/gallary";
import Services from "@/components/service";
import FeaturedBikesSection from "@/components/featuredbike";
import FeaturedCarsSection from "@/components/featuredcar";
import HomeBlogSection from "@/components/homeblog";
import FAQ from "@/components/faq";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title:
    "Self Drive Car & Bike Rental in Bhubaneswar | EazyDrivez",
  description:
    "Affordable self drive car rental and bike rental in Bhubaneswar. Book cars & bikes without driver, airport pickup available, best price guaranteed at EazyDrivez.",
  keywords: [
    "self drive car rental Bhubaneswar",
    "bike rental Bhubaneswar",
    "car rental without driver Bhubaneswar",
    "rent bike Bhubaneswar",
    "airport car rental Bhubaneswar",
  ],
  alternates: {
    canonical: "https://eazydrivez.com/",
  },
  openGraph: {
    title:
      "Best Self Drive Car & Bike Rental in Bhubaneswar | EazyDrivez",
    description:
      "Book affordable self drive cars and bikes in Bhubaneswar with easy booking & instant confirmation.",
    url: "https://eazydrivez.com/",
    siteName: "EazyDrivez",
    locale: "en_IN",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      {/* LOCAL BUSINESS SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "EazyDrivez",
            url: "https://eazydrivez.com/",
            telephone: "+919090089708",
            image: "https://eazydrivez.com/hero.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "N-4/177, IRC Village, Nayapali",
              addressLocality: "Bhubaneswar",
              addressRegion: "Odisha",
              postalCode: "751015",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 20.2944588,
              longitude: 85.8156412,
            },
            areaServed: "Bhubaneswar",
            priceRange: "₹₹",
          }),
        }}
      />

      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is self drive car available in Bhubaneswar?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, EazyDrivez offers self drive car rental in Bhubaneswar with affordable pricing and easy booking.",
                },
              },
              {
                "@type": "Question",
                name: "What documents are required to rent a bike?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Valid driving license and government ID proof are required.",
                },
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen">

        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HeroImage.src})` }}
          />
          <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>

          <div className="relative z-20 flex flex-col justify-center items-start h-full px-6 sm:px-8 md:px-16 lg:px-32 text-white py-24 md:py-32">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-xl">
              Best Self Drive Car & Bike Rental in Bhubaneswar
            </h1>

            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-md leading-relaxed">
              Book affordable self drive car rental in Bhubaneswar and rent bikes without driver at the best price with EazyDrivez.
            </p>
          </div>
        </section>

        {/* HIDDEN SEO CONTENT (NO UI CHANGE) */}
        <section className="sr-only">
          <h2>Self Drive Car Rental in Bhubaneswar</h2>
          <p>
            EazyDrivez provides affordable self drive car rental and bike rental
            services in Bhubaneswar including airport pickup, outstation travel,
            hatchback, SUV, Royal Enfield and scooter rentals.
          </p>
        </section>

        {/* CLIENT INTERACTIVE COMPONENT */}
        <HomeClient />

        <Services />
        <FeaturedCarsSection />
        <FeaturedBikesSection />
        <Gallary />
        <HomeBlogSection />
        <Testimonials />
        <FAQ />

      </main>
    </>
  );
}