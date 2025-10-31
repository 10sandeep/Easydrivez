import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://easydrivez.com"),
  title: "Terms & Conditions | easydrivez - Rental Policy & User Agreement",
  description:
    "Review easydrivez’s Terms and Conditions for vehicle rentals, user responsibilities, cancellation policies, and legal guidelines.",
  keywords: [
    "easydrivez Terms and Conditions",
    "Rental Policy",
    "User Agreement",
    "Car Rental Terms",
    "Bike Rental Rules",
  ],
  openGraph: {
    title: "Terms & Conditions | easydrivez - Rental Policy",
    description:
      "Understand easydrivez’s rental policies, terms of use, and customer rights before booking your next ride.",
    url: "https://easydrivez.com/terms",
    siteName: "easydrivez",
    type: "article",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "easydrivez rental policy and user agreement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@easydrivez",
    title: "Terms & Conditions | easydrivez",
    description:
      "Read easydrivez's complete terms of service and rental agreement before booking.",
    images: ["/easydrivez-banner.png"],
  },
  alternates: {
    canonical: "https://easydrivez.com/terms",
  },
  category: "Legal",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen bg-background text-foreground">{children}</section>;
}
