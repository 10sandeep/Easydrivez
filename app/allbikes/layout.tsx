import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://easydrivez.com"),
  title: "All Bikes | easydrivez - Rent Premium Bikes & Motorcycles",
  description:
    "Explore all bikes available at easydrivez. From scooters to superbikes, find and rent your ideal ride with easy booking, affordable pricing, and doorstep delivery.",
  keywords: [
    "Bike Rental",
    "Motorcycle Rental",
    "Self Drive Bike",
    "Superbike on Rent",
    "Scooter Hire",
    "Bike Rental Near Me",
    "Affordable Bike Rental",
    "Daily Bike Rental",
    "Touring Bike Rental",
    "easydrivez Bikes",
  ],
  openGraph: {
    title: "All Bikes | easydrivez - Rent Premium Bikes & Motorcycles",
    description:
      "Choose from a wide range of bikes at easydrivez — from scooters to superbikes. Book online and ride your dream bike today.",
    url: "https://easydrivez.com/bikes",
    siteName: "easydrivez",
    type: "website",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "easydrivez premium bike rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@easydrivez",
    title: "All Bikes | easydrivez - Rent Premium Bikes & Motorcycles",
    description:
      "Explore easydrivez’s complete fleet of bikes for rent — perfect for city rides, trips, or adventure tours.",
    images: ["/easydrivez-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://easydrivez.com/bikes",
  },
  category: "Vehicle Rentals",
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
