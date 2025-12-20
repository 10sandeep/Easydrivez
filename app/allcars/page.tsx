"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
interface Car {
  _id: string;
  carPicturate: string;
  brand: string;
  modelName: string;
  vehicleType: string;
  fuelType: string;
  transmission: string;
  seatingCapacity: number;
  priceFor12Hours: number;
  priceFor24Hours: number;
  available: boolean;
  description?: string;
}

export default function CarRental() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch cars from API
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
          throw new Error(data.message || "Unexpected API response");
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

  // ✅ Navigate to booking page
  const handleBookNow = (car: Car) => {
    const carData = encodeURIComponent(JSON.stringify(car));
    router.push(`/booking/${car._id}?car=${carData}`);
  };

  // ✅ Error State
  if (error) {
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
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-orange-500 border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white"></div>
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

  // ✅ No Cars Found
  if (cars.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <p className="text-xl font-medium mb-4">
          No cars available right now 🚗
        </p>
        <p className="text-gray-600">
          Please check back later or contact support.
        </p>
      </div>
    );
  }
  const handleWhatsApp = () => {
    window.open("https://wa.me/919090089708", "_blank");
  };

  const handlePhone = () => {
    window.location.href = "tel:+919090089708";
  };
  // ✅ Main Render
  return (
    <div className="bg-white min-h-screen">

      <div className="fixed left-6 bottom-8 z-50 flex flex-col gap-4">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="h-14 w-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </button>

        {/* Phone Button */}
        <button
          onClick={handlePhone}
          className="h-14 w-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
          title="Call us"
        >
          <Phone className="h-6 w-6" />
        </button>
      </div>
      {/* Hero Section */}
      <div
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&h=400&fit=crop')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Best Car Rental in Bhubaneswar
          </h1>
          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            Premium car rental services at affordable prices
          </p>
        </div>
      </div>

      {/* Cars Section */}
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
                      {car.vehicleType}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-black flex-1">
                      {car.brand} {car.modelName}
                    </h3>
                    <span className="text-sm text-gray-500 capitalize">
                      {car.fuelType}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm capitalize">
                    Transmission: {car.transmission}
                  </p>



                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="border border-gray-300 text-black px-3 py-1 rounded text-sm">
                      {car.seatingCapacity} Seater
                    </span>
                    <span className="border border-gray-300 text-black px-3 py-1 rounded text-sm">
                      {car.vehicleType}
                    </span>
                    <span
                      className={`px-3 py-1 rounded text-sm ${car.available
                        ? "bg-green-100 text-green-700 border border-green-400"
                        : "bg-red-100 text-red-700 border border-red-400"
                        }`}
                    >
                      {car.available ? "Available" : "Booked"}
                    </span>
                  </div>

                  {/* Booking */}
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Starting from</p>
                        <p className="text-2xl font-bold text-black">
                          ₹{car.priceFor12Hours} /-
                        </p>
                        <p className="text-sm text-gray-600">per 12 hours</p>
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
                      <span className="font-bold">
                        ₹{car.priceFor24Hours} /-
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