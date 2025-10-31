"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Car {
  _id: string;
  carPicturate: string;
  brand: string;
  modelName: string;
  seater: number;
  type: string;
  fuelType: string;
  transmission: string;
  price12: string;
  price24: string;
  rating: number;
  category: string;
  available: boolean;
}

export default function AllCars() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch all cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/car", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch cars");

        const data = await res.json();
        if (data.status && data.cars) {
          setCars(data.cars);
        } else {
          throw new Error(data.message || "Unexpected response from server");
        }
      } catch (err: any) {
        console.error("Error fetching cars:", err);
        setError(err.message || "Something went wrong while fetching cars.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // ✅ Navigate to booking page with car data
  const handleBookNow = (car: Car) => {
    const carData = encodeURIComponent(JSON.stringify(car));
    router.push(`/booking/${car._id}?car=${carData}`);
  };

  // ✅ Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading cars, please wait...</p>
      </div>
    );
  }

  // ✅ Render error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-4">
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

  // ✅ No cars available
  if (cars.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <p className="text-xl font-medium mb-4">No cars available right now 🚗</p>
        <p className="text-gray-600">
          Please check back later or contact our support team.
        </p>
      </div>
    );
  }

  // ✅ Render All Cars Page
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Car Rental in Bhubaneswar
          </h1>
          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            Premium car rental services at affordable prices
          </p>
        </div>
      </div>

      {/* Cars List */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            Available Cars
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-100 h-64">
                  <img
                    src={car.carPicturate}
                    alt={car.modelName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-black text-sm font-medium bg-white px-3 py-1 rounded">
                      {car.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-black flex-1">
                      {car.brand} {car.modelName}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      <svg className="h-4 w-4 fill-black" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-sm font-bold text-black">
                        {car.rating?.toFixed(1) || "4.8"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm capitalize">
                    Category: {car.category}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="border border-gray-300 text-black px-3 py-1 rounded text-sm">
                      {car.seater} Seater
                    </span>
                    <span className="border border-gray-300 text-black px-3 py-1 rounded text-sm">
                      {car.fuelType}
                    </span>
                    <span className="border border-gray-300 text-black px-3 py-1 rounded text-sm">
                      {car.transmission}
                    </span>
                  </div>

                  {/* Pricing + Book Button */}
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-600">starting from</p>
                        <p className="text-2xl font-bold text-black">
                          {car.price12}
                        </p>
                        <p className="text-sm text-gray-600">for 12 hours</p>
                      </div>
                      <button
                        onClick={() => handleBookNow(car)}
                        className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                    <p className="text-sm text-gray-700">
                      24 hours:{" "}
                      <span className="font-bold">{car.price24}</span>
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
