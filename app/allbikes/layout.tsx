import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://eazydrivez.com"),

  title:
    "Bike Rental in Bhubaneswar | Self Ride Scooty & Royal Enfield on Rent | EazyDrivez",

  description:
    "Rent bikes in Bhubaneswar at affordable prices. Choose from scooty, Royal Enfield, sports bikes and two wheelers for daily, weekly or monthly rental. Self ride available with easy booking at EazyDrivez.",

  keywords: [
    // Primary Local Keywords
    "bike rental Bhubaneswar",
    "rent bike in Bhubaneswar",
    "self drive bike rental Bhubaneswar",
    "motorcycle rental Bhubaneswar",
    "two wheeler rental Bhubaneswar",

    // Commercial Intent
    "book bike online Bhubaneswar",
    "cheap bike rental Bhubaneswar",
    "affordable bike rental Bhubaneswar",
    "lowest price bike rental Bhubaneswar",
    "instant bike booking Bhubaneswar",

    // Vehicle Type Keywords
    "Royal Enfield rental Bhubaneswar",
    "scooty rental Bhubaneswar",
    "Activa on rent Bhubaneswar",
    "sports bike rental Bhubaneswar",
    "touring bike rental Bhubaneswar",

    // Location Specific
    "bike rental near airport Bhubaneswar",
    "Bhubaneswar airport bike rental",
    "bike rental near railway station Bhubaneswar",
    "IRC Village bike rental",
    "Nayapali bike rental",

    // Usage Based
    "daily bike rental Bhubaneswar",
    "weekly bike rental Bhubaneswar",
    "monthly bike rental Bhubaneswar",
    "bike rental for weekend trip Bhubaneswar",

    // Brand
    "EazyDrivez bike rental",
    "EazyDrivez Bhubaneswar",
  ],

  openGraph: {
    title:
      "Bike Rental in Bhubaneswar | Self Ride Scooty & Royal Enfield | EazyDrivez",
    description:
      "Affordable bike rental in Bhubaneswar including scooty, Royal Enfield and sports bikes. Easy online booking and self ride available.",
    url: "https://eazydrivez.com/allbikes",
    siteName: "EazyDrivez",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "Bike Rental in Bhubaneswar - EazyDrivez",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Bike Rental in Bhubaneswar | Self Ride Available | EazyDrivez",
    description:
      "Rent scooty, Royal Enfield and motorcycles in Bhubaneswar at best prices.",
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
    canonical: "https://eazydrivez.com/allbikes",
  },

  category: "Bike Rental Bhubaneswar",
};

export default function BikesLayout({
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