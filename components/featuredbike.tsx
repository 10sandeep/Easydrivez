"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const SectionDivider = () => (
  <div className="flex items-center justify-center gap-4 my-2 mb-10">
    <div className="h-px w-24 bg-gray-300"></div>
    <svg
      className="h-6 w-6 text-gray-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 9l1.5-4.5h11L19 9H5z" />
    </svg>
    <div className="h-px w-24 bg-gray-300"></div>
  </div>
);

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

export default function FeaturedBikesSection() {
  const router = useRouter();

  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch bikes from backend
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/bike", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch bikes");

        const data = await res.json();
        if (data.status && data.bikes) {
          // Only take first 4 bikes for featured section
          setBikes(data.bikes.slice(0, 4));
        } else {
          throw new Error(data.message || "Unexpected response from server");
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
  const handleBookClick = (bike: Bike) => {
    const bikeData = encodeURIComponent(JSON.stringify(bike));
    router.push(`/booking/${bike._id}?bike=${bikeData}`);
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="py-16 bg-gray-200 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-gray-700">
          Loading featured bikes...
        </p>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="py-16 bg-gray-200 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <p className="text-red-600 text-xl font-semibold mb-3">
          Oops! {error}
        </p>
        <button
          onClick={() => location.reload()}
          className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // ✅ Empty state
  if (bikes.length === 0) {
    return (
      <div className="py-16 bg-gray-200 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <p className="text-xl font-semibold text-gray-800 mb-2">
          No featured bikes available 🏍️
        </p>
        <p className="text-gray-600 text-sm">
          Please check back later or explore all bikes.
        </p>
      </div>
    );
  }

  // ✅ Featured Bikes Section
  return (
    <div className="py-16 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 animate-slide-up">
          Featured Bikes
        </h2>
        <SectionDivider />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bikes.map((bike, idx) => (
            <div
              key={bike._id || idx}
              className="group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer bg-white shadow-md card-hover animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-200">
                <img
                  src={bike.bikeImage}
                  alt={bike.model}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-xs font-semibold bg-black/40 px-3 py-1 rounded-full">
                    {bike.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {bike.brand} {bike.model}
                  </h3>
                  <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                    <svg
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-900">
                      {bike.rating?.toFixed(1) || "4.9"}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 capitalize">
                  {bike.category} • {bike.cc} CC • {bike.seater} Seater
                </p>

                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    {bike.type}
                  </span>
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    {bike.category}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-600">from</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{Math.floor(bike.cc * 3)} /-
                      </p>
                      <p className="text-xs text-gray-600">for 12 hours</p>
                    </div>

                    <button
                      onClick={() => handleBookClick(bike)}
                      className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-all active:scale-95"
                    >
                      Book
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">
                    24 hours: ₹{Math.floor(bike.cc * 4.5)} /-
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
