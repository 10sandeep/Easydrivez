import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://easydrivez.com"),
  title: "Contact Us | easydrivez - Get in Touch Today",
  description:
    "Have a question or need assistance? Contact easydrivez for booking help, partnerships, or support. We're here 24/7 to assist you.",
  keywords: [
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
    title: "Contact Us | easydrivez - We're Here to Help",
    description:
      "Reach out to the easydrivez team for support, inquiries, or partnership opportunities.",
    url: "https://easydrivez.com/contact",
    siteName: "easydrivez",
    type: "website",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "contact easydrivez customer support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@easydrivez",
    title: "Contact easydrivez - We're Here for You",
    description:
      "Need help with your booking or have a business inquiry? Contact easydrivez today!",
    images: ["/easydrivez-banner.png"],
  },
  alternates: {
    canonical: "https://easydrivez.com/contact",
  },
  category: "Customer Support",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen bg-background text-foreground">{children}</section>;
}
