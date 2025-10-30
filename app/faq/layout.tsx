import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://easydrivez.com"),
  title: "FAQ | easydrivez - Frequently Asked Questions",
  description:
    "Find answers to common questions about booking, payments, cancellations, and rental policies at easydrivez.",
  keywords: [
    "easydrivez FAQ",
    "Car Rental Help",
    "Bike Rental Questions",
    "Rental Policies",
    "Booking Support",
  ],
  openGraph: {
    title: "FAQ | easydrivez - Help & Support Center",
    description:
      "Get quick answers to all your questions about car and bike rentals, booking, and customer support.",
    url: "https://easydrivez.com/faq",
    siteName: "easydrivez",
    type: "website",
    images: [
      {
        url: "/easydrivez-bannerpng",
        width: 1200,
        height: 630,
        alt: "easydrivez help and faq section",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@easydrivez",
    title: "FAQ | easydrivez Support",
    description:
      "Need help with your car or bike booking? Check out our FAQ section for all answers.",
    images: ["/easydrivez-banner.png"],
  },
  alternates: {
    canonical: "https://easydrivez.com/faq",
  },
  category: "Support",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen bg-background text-foreground">{children}</section>;
}
