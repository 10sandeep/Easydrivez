import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import AdminPanel from "./admin/page";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "easydrivez - Premium Car Rental Services",
  description:
    "Experience luxury and comfort with MoCar. Professional chauffeur services, airport pickups, and premium car rentals.",
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
       {/* <AdminPanel/> */}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}