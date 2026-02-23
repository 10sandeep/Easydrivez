import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
// import AdminPanel from "./admin/page"; // optional

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://eazydrivez.com"),

  title: {
    default:
      "Self Drive Car & Bike Rental in Bhubaneswar | EazyDrivez",
    template: "%s | EazyDrivez Bhubaneswar",
  },

  description:
    "Affordable self drive car rental and bike rental in Bhubaneswar. Rent cars and bikes without driver, airport pickup available, best prices guaranteed at EazyDrivez.",

  keywords: [
    "self drive car rental Bhubaneswar",
    "bike rental Bhubaneswar",
    "car rental without driver Bhubaneswar",
    "rent bike Bhubaneswar",
    "self drive cars near me",
    "SUV rental Bhubaneswar",
    "Royal Enfield rental Bhubaneswar",
    "airport car rental Bhubaneswar",
    "cheap car rental Bhubaneswar",
    "EazyDrivez",
  ],

  authors: [
    {
      name: "EazyDrivez",
      url: "https://eazydrivez.com",
    },
  ],

  creator: "EazyDrivez",
  publisher: "EazyDrivez",

  openGraph: {
    title:
      "Self Drive Car & Bike Rental in Bhubaneswar | EazyDrivez",
    description:
      "Book self drive cars and bikes in Bhubaneswar with easy online booking, affordable pricing, and reliable service.",
    url: "https://eazydrivez.com",
    siteName: "EazyDrivez",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "Self Drive Car & Bike Rental in Bhubaneswar - EazyDrivez",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Self Drive Car & Bike Rental in Bhubaneswar | EazyDrivez",
    description:
      "Affordable self drive car and bike rental service in Bhubaneswar with instant booking and airport pickup.",
    images: ["/easydrivez-banner.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://eazydrivez.com",
  },

  category: "Travel & Transportation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          {/* <AdminPanel /> */}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
