"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
}

export default function BikeRental() {
  const router = useRouter();
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch bikes from the backend API
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/bike", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to fetch bikes");
        }

        const data = await res.json();
        if (data.status && data.bikes) {
          setBikes(data.bikes);
        } else {
          throw new Error(data.message || "Unexpected response");
        }
      } catch (err: any) {
        console.error("Error fetching bikes:", err);
        setError(err.message || "Something went wrong while fetching bikes.");
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  // ✅ Navigate to booking page
  const handleBookNow = (bike: Bike) => {
    const bikeData = encodeURIComponent(JSON.stringify(bike));
    router.push(`/booking/${bike._id}?bike=${bikeData}`);
  };

  // ✅ Render states
if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 text-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠</span>
          </div>
          <p className="text-red-600 text-xl font-semibold mb-3">
            Oops! {error}
          </p>
          <p className="text-gray-600 text-sm mb-6">
            We couldn't load the vehicle details. Please try again.
          </p>
          <button
            onClick={() => location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ✅ Loading State
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Animated wheel */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-orange-500 border-b-transparent border-l-transparent animate-spin"></div>
            {/* Inner hub */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            {/* Spokes effect */}
            <div className="absolute inset-8 flex items-center justify-center">
              <div className="w-full h-0.5 bg-white/50 rotate-45"></div>
              <div className="w-full h-0.5 bg-white/50 -rotate-45 absolute"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Getting Your Ride Ready
          </h2>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <span>Loading vehicle details</span>
            <span className="inline-flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </span>
          </p>
        </div>
      </div>
    );

  if (bikes.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <p className="text-xl font-medium mb-4">
          No bikes available right now 🏍️
        </p>
        <p className="text-gray-600">
          Please check back later or contact support.
        </p>
      </div>
    );
  }

  // ✅ Render main page
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Bike Rental in Bhubaneswar
          </h1>
          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            Premium bike rental services at affordable prices
          </p>
        </div>
      </div>

      {/* Featured Bikes Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            Available Bikes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bikes.map((bike) => (
              <div
                key={bike._id}
                className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-100 h-64">
                  <img
                    src={bike.bikeImage}
                    alt={bike.model}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-black text-sm font-medium bg-white px-3 py-1 rounded">
                      {bike.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-black flex-1">
                      {bike.brand} {bike.model}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      <svg className="h-4 w-4 fill-black" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-sm font-bold text-black">
                        {bike.rating?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm capitalize">
                    Type: {bike.category}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="border border-gray-300 text-black px-3 py-1 rounded text-sm">
                      {bike.cc} CC
                    </span>
                    <span className="border border-gray-300 text-black px-3 py-1 rounded text-sm">
                      {bike.type}
                    </span>
                    <span className="border border-gray-300 text-black px-3 py-1 rounded text-sm">
                      {bike.seater} Seater
                    </span>
                  </div>

                  {/* Booking */}
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-600">starting from</p>
                        <p className="text-2xl font-bold text-black">
                          ₹{Math.floor(bike.cc * 3)} /-
                        </p>
                        <p className="text-sm text-gray-600">per 12 hours</p>
                      </div>
                      <button
                        onClick={() => handleBookNow(bike)}
                        className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                    <p className="text-sm text-gray-700">
                      24 hours:{" "}
                      <span className="font-bold">
                        ₹{Math.floor(bike.cc * 4.5)} /-
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
