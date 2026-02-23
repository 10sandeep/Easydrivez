import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://easydrivez.com"),

  title:
    "Car & Bike Rental FAQ in Bhubaneswar | Booking, Pricing & Policies | Eazydrivez",

  description:
    "Get answers to frequently asked questions about self drive car rental and bike rental in Bhubaneswar. Learn about booking process, pricing, security deposit, cancellation policy, documents required and more at Eazydrivez.",

  keywords: [
    "car rental FAQ Bhubaneswar",
    "bike rental FAQ Bhubaneswar",
    "self drive car rental questions",
    "bike rental booking process",
    "car rental cancellation policy",
    "bike rental deposit policy",
    "documents required for car rental",
    "documents required for bike rental",
    "Eazydrivez support",
    "car rental help Bhubaneswar",
    "bike rental help Bhubaneswar",
    "self drive car policies Bhubaneswar",
  ],

  openGraph: {
    title:
      "Car & Bike Rental FAQ in Bhubaneswar | Eazydrivez Support Center",
    description:
      "Find answers to booking, pricing, security deposit, cancellation and rental policies for car and bike rentals in Bhubaneswar.",
    url: "https://easydrivez.com/faq",
    siteName: "Eazydrivez",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "Car and Bike Rental FAQ in Bhubaneswar - Eazydrivez",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Car & Bike Rental FAQ | Eazydrivez Bhubaneswar",
    description:
      "Need help with your booking? Check our FAQ section for complete rental policies and support details.",
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
    canonical: "https://easydrivez.com/faq",
  },

  category: "Car and Bike Rental Support Bhubaneswar",
};

export default function FaqLayout({
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