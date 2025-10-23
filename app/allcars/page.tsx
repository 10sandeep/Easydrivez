"use client";

import React from "react";
import Link from "next/link";
import { featuredCars, Car } from "@/lib/data";

export default function AllCars() {
  const getBookingUrl = (car: Car) => {
    const carData = encodeURIComponent(JSON.stringify(car));
    return `/bookingpage=${carData}`;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Faded Background */}
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

      {/* Featured Cars Section - Simple White Background */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            Featured Cars
          </h2>

          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, idx) => (
              <div
                key={idx}
                className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden bg-gray-100 h-64">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-black text-sm font-medium bg-white px-3 py-1 rounded">
                      {car.type}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title and Rating */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-black flex-1">
                      {car.name}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      <svg className="h-4 w-4 fill-black" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-sm font-bold text-black">4.8</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm">
                    Premium rental service
                  </p>

                  {/* Features */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {car.features.map((f, i) => (
                      <span
                        key={i}
                        className="border border-gray-300 text-black px-3 py-1 rounded text-sm"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and Button */}
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-600">from</p>
                        <p className="text-2xl font-bold text-black">
                          {car.price12}
                        </p>
                        <p className="text-sm text-gray-600">for 12 hours</p>
                      </div>
                      <Link
                        href={getBookingUrl(car)}
                        className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded transition-colors"
                      >
                        Book Now
                      </Link>
                    </div>
                    <p className="text-sm text-gray-700">
                      24 hours: <span className="font-bold">{car.price24}</span>
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
