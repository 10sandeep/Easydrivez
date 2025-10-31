import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://easydrivez.com"),
  title: "Blog | easydrivez - Travel Tips, Rental Guides & Stories",
  description:
    "Read expert travel tips, car and bike rental guides, and customer stories on the easydrivez blog. Stay informed and inspired for your next journey.",
  keywords: [
    "easydrivez Blog",
    "Car Rental Blog",
    "Bike Rental Tips",
    "Travel Guide India",
    "Luxury Car Reviews",
    "Vehicle Maintenance Tips",
  ],
  openGraph: {
    title: "Blog | easydrivez - Travel Tips & Car Rental Guides",
    description:
      "Explore insights and stories from the easydrivez team — travel tips, vehicle reviews, and how-to guides for smooth journeys.",
    url: "https://easydrivez.com/blog",
    siteName: "easydrivez",
    type: "article",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "easydrivez blog - travel and car rental insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@easydrivez",
    title: "easydrivez Blog - Travel Tips & Rental Insights",
    description:
      "Your destination for travel tips, car rental guides, and journey inspiration. Explore the easydrivez blog today.",
    images: ["/easydrivez-banner.png"],
  },
  alternates: {
    canonical: "https://easydrivez.com/blog",
  },
  category: "Travel & Lifestyle",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen bg-background text-foreground">{children}</section>;
}
