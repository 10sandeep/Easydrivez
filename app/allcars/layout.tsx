import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://easydrivez.com"),
  title: "All Cars | easydrivez - Rent Premium & Self-Drive Cars",
  description:
    "Browse all available cars at easydrivez. Choose from luxury, economy, and SUV models for rent — perfect for business trips, city drives, or weekend getaways.",
  keywords: [
    "Car Rental",
    "Self Drive Cars",
    "Luxury Car Hire",
    "SUV Rental",
    "Economy Car Rental",
    "Car Rental Near Me",
    "Affordable Car Rental",
    "Daily Car Rental",
    "Premium Cars for Rent",
    "easydrivez Cars",
  ],
  openGraph: {
    title: "All Cars | easydrivez - Rent Premium & Self-Drive Cars",
    description:
      "Explore the full range of premium, self-drive, and chauffeur-driven cars at easydrivez. Book easily and enjoy flexible rental options.",
    url: "https://easydrivez.com/cars",
    siteName: "easydrivez",
    type: "website",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "easydrivez premium car rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@easydrivez",
    title: "All Cars | easydrivez - Rent Premium & Self-Drive Cars",
    description:
      "Find your perfect car for rent with easydrivez. From luxury sedans to SUVs, experience comfort and convenience on every drive.",
    images: ["/easydrivez-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://easydrivez.com/cars",
  },
  category: "Vehicle Rentals",
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
