import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://eazydrivez.com"),

  title:
    "Self Drive Car Rental in Bhubaneswar | Affordable SUV & Hatchback Cars | EazyDrivez",

  description:
    "Book self drive car rental in Bhubaneswar at the best price. Choose from SUV, hatchback, automatic and economy cars. Airport pickup and outstation trips available with EazyDrivez.",

  keywords: [
    // Primary Keywords
    "self drive car rental Bhubaneswar",
    "car rental without driver Bhubaneswar",
    "rent car in Bhubaneswar",
    "self drive cars near me Bhubaneswar",

    // Commercial Intent
    "book self drive car Bhubaneswar",
    "cheap car rental Bhubaneswar",
    "affordable car rental Bhubaneswar",
    "lowest price car rental Bhubaneswar",

    // Vehicle Types
    "SUV rental Bhubaneswar",
    "automatic car rental Bhubaneswar",
    "hatchback rental Bhubaneswar",
    "sedan rental Bhubaneswar",

    // Location-Based
    "airport car rental Bhubaneswar",
    "car rental near railway station Bhubaneswar",
    "IRC Village car rental",
    "Nayapali car rental",

    // Usage-Based
    "car rental for outstation from Bhubaneswar",
    "daily car rental Bhubaneswar",
    "weekly car rental Bhubaneswar",
    "monthly car rental Bhubaneswar",

    // Brand
    "EazyDrivez car rental",
    "EazyDrivez Bhubaneswar",
  ],

  openGraph: {
    title: "Self Drive Car Rental in Bhubaneswar | EazyDrivez",
    description:
      "Explore affordable self drive car rental options in Bhubaneswar including SUV, automatic and hatchback cars. Instant booking available.",
    url: "https://eazydrivez.com/allcars",
    siteName: "EazyDrivez",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "Self Drive Car Rental in Bhubaneswar - EazyDrivez",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Self Drive Car Rental in Bhubaneswar | EazyDrivez",
    description:
      "Rent SUV, hatchback and automatic self drive cars in Bhubaneswar at affordable prices.",
    images: ["/easydrivez-banner.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://eazydrivez.com/allcars",
  },

  category: "Car Rental Bhubaneswar",
};

export default function CarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-background text-foreground">
      {children}
    </section>
  );
}
