"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";

interface Bike {
  _id: string;
  bikeImage: string;
  brand: string;
  model: string;
  seater: number;
  type: string;
  cc: number;
  rating: number;
  category: string;
  available: boolean;
  description?: string;
  priceFor12Hours: number;
  priceFor24Hours: number;
}

export default function BikeRental() {
  const router = useRouter();
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/bike", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch bikes");

        const data = await res.json();
        if (data.status && data.bikes) {
          setBikes(data.bikes);
        } else {
          throw new Error(data.message || "Unexpected response");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handleBookNow = (bike: Bike) => {
    const bikeData = encodeURIComponent(JSON.stringify(bike));
    router.push(`/booking/${bike._id}?bike=${bikeData}`);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919090089708", "_blank");
  };

  const handlePhone = () => {
    window.location.href = "tel:+919090089708";
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-red-600 font-semibold text-xl">
          Oops! {error}
        </p>
      </div>
    );
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading Bikes...</p>
      </div>
    );

  if (bikes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No bikes available right now 🏍️</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Sticky Buttons */}
      <div className="fixed left-6 bottom-8 z-50 flex flex-col gap-4">
        <button
          onClick={handleWhatsApp}
          className="h-14 w-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all"
        >
          <MessageCircle className="h-6 w-6" />
        </button>

        <button
          onClick={handlePhone}
          className="h-14 w-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all"
        >
          <Phone className="h-6 w-6" />
        </button>
      </div>

      {/* Hero Section */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Bike Rental in Bhubaneswar
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Affordable self ride bikes and scooty on rent
          </p>
        </div>
      </div>

      {/* Bikes Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-14 text-gray-900">
            Available Bikes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {bikes.map((bike) => (
              <div
                key={bike._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={bike.bikeImage}
                    alt={`${bike.brand} ${bike.model} bike rental in Bhubaneswar`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {bike.brand} {bike.model}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    {bike.cc} CC • {bike.category}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-extrabold text-gray-900">
                      ₹{bike.priceFor12Hours}
                      <span className="text-sm font-medium text-gray-500">
                        {" "}
                        / 12 Hours
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleBookNow(bike)}
                    className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    Book Now
                  </button>
                </div>

                {/* Product Schema */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Product",
                      name: `${bike.brand} ${bike.model}`,
                      image: bike.bikeImage,
                      description: `Bike rental in Bhubaneswar - ${bike.brand} ${bike.model}`,
                      offers: {
                        "@type": "Offer",
                        priceCurrency: "INR",
                        price: bike.priceFor12Hours,
                        availability: bike.available
                          ? "https://schema.org/InStock"
                          : "https://schema.org/OutOfStock",
                      },
                    }),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">
          Affordable Bike Rental in Bhubaneswar
        </h2>
        <p className="mb-4 text-gray-600 leading-relaxed">
          EazyDrivez offers reliable and affordable bike rental in Bhubaneswar
          including scooty, Royal Enfield, sports bikes and touring motorcycles.
          Daily, weekly and monthly rental plans available.
        </p>

        <p className="text-gray-600">
          Looking for four-wheelers? Visit our{" "}
          <a href="/allcars" className="text-blue-600 underline font-medium">
            self drive car rental in Bhubaneswar
          </a>{" "}
          page.
        </p>
      </section>
    </div>
  );
}