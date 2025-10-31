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
  metadataBase: new URL("https://easydrivez.com"),
  title: "Easydrivez - Premium Car & Bike Rental Services",
  description:
    "Book premium cars and bikes with Easydrivez — your go-to rental service for luxury rides, airport transfers, and city travel. Easy booking, affordable rates, and top-rated service.",
  keywords: [
    "Car Rental",
    "Bike Rental",
    "Luxury Car Hire",
    "Self Drive Cars",
    "Chauffeur Service",
    "Airport Transfers",
    "Affordable Car Rental",
    "Motorbike Hire",
    "easydrivez",
    "Car and Bike Rental in India",
    "Premium Vehicle Rentals",
  ],
  authors: [{ name: "Easydrivez Team", url: "https://easydrivez.com" }],
  creator: "Easydrivez",
  publisher: "Easydrivez",
  openGraph: {
    title: "Easydrivez - Premium Car & Bike Rental Services",
    description:
      "Drive in style with Easydrivez. Rent cars and bikes effortlessly with flexible pricing, 24/7 support, and seamless online booking.",
    url: "https://easydrivez.com",
    siteName: "Easydrivez",
    type: "website",
    images: [
      {
        url: "/easydrivez-banner.png",
        width: 1200,
        height: 630,
        alt: "easydrivez premium car and bike rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@easydrivez",
    title: "easydrivez - Premium Car & Bike Rental Services",
    description:
      "Explore the city in comfort and style. Book premium cars and bikes with easydrivez today!",
    images: ["/easydrivez-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: "https://easydrivez.com",
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
