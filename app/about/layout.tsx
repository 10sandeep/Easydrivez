import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://easydrivez.com"),
  title: "About Us | easydrivez - Premium Car & Bike Rental Company",
  description:
    "Learn more about easydrivez — India's trusted premium car and bike rental company. Discover our mission, vision, and the story behind providing seamless travel experiences.",
  keywords: [
    "About easydrivez",
    "Car Rental Company India",
    "Bike Rental Service",
    "Luxury Vehicle Hire",
    "easydrivez Mission",
    "Travel Solutions Company",
    "Self Drive Cars",
    "Affordable Bike Rentals",
    "easydrivez Story",
      "Contact easydrivez",
    "Car Rental Support",
    "Bike Rental Support",
    "Customer Care",
    "best car rental",
    "best bike rental",
    "best car rental in bhubaneswar",
    "best bike rental in bhubaneswar",
    "Car Rental",
    "Bike Rental",
    "Partner with easydrivez",
  ],
  openGraph: {
    title: "About Us | easydrivez - Premium Car & Bike Rental Company",
    description:
      "easydrivez is redefining travel comfort with premium cars and bikes. Learn about our journey, values, and dedication to quality service.",
    url: "https://easydrivez.com/about",
    siteName: "easydrivez",
    type: "article",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "About easydrivez team and company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@easydrivez",
    title: "About easydrivez - Our Story & Mission",
    description:
      "Discover how easydrivez became India’s go-to brand for premium car and bike rentals. Learn more about our values and services.",
    images: ["/easydrivez-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://easydrivez.com/about",
  },
  category: "Company Information",
};

export default function AboutLayout({
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
