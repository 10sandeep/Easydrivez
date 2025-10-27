"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CarDetailsClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [car, setCar] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: "",
    dropoffDate: new Date().toISOString().split('T')[0],
    dropoffTime: "",
    acceptTerms: false
  });

  useEffect(() => {
    const carData = searchParams.get(["car", 'bike'].find((key) => searchParams.get(key) !== null) || "");
    if (carData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(carData));
        setCar(decoded);
      } catch (err) {
        console.error("Error decoding car data:", err);
      }
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Calculate rental duration in hours
  const calculateDuration = () => {
    if (!formData.pickupDate || !formData.pickupTime || !formData.dropoffDate || !formData.dropoffTime) {
      return 0;
    }

    const pickupDateTime = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
    const dropoffDateTime = new Date(`${formData.dropoffDate}T${formData.dropoffTime}`);

    const durationMs = dropoffDateTime.getTime() - pickupDateTime.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);

    return Math.max(0, durationHours);
  };

  // Calculate price based on duration
  const calculatePrice = () => {
    if (!car) return { amount: 0, display: "₹ 0", hours: 0, breakdown: "" };

    const hours = calculateDuration();

    // Base booking fee
    const BASE_FEE = 1000;

    if (hours <= 0) {
      return { amount: BASE_FEE, display: `₹ ${BASE_FEE.toLocaleString('en-IN')}`, hours: 0, breakdown: "Base booking fee" };
    }

    // Extract numeric values from price strings (assuming format like "₹2,000" or "₹2000")
    const price12 = parseInt(car.price12.replace(/[^0-9]/g, '')) || 0;
    const price24 = parseInt(car.price24.replace(/[^0-9]/g, '')) || 0;

    let rentalPrice = 0;
    let breakdown = "";

    if (hours <= 12) {
      // For 12 hours or less, charge the 12-hour rate
      rentalPrice = price12;
      breakdown = `Base fee (₹${BASE_FEE.toLocaleString('en-IN')}) + 12h rate (${car.price12})`;
    } else if (hours <= 24) {
      // For more than 12 hours up to 24 hours, charge the 24-hour rate
      rentalPrice = price24;
      breakdown = `Base fee (₹${BASE_FEE.toLocaleString('en-IN')}) + 24h rate (${car.price24})`;
    } else {
      // For more than 24 hours, calculate based on full days and remaining hours
      const fullDays = Math.floor(hours / 24);
      const remainingHours = hours % 24;

      rentalPrice = fullDays * price24;

      if (remainingHours > 0) {
        if (remainingHours <= 12) {
          rentalPrice += price12;
          breakdown = `Base fee (₹${BASE_FEE.toLocaleString('en-IN')}) + ${fullDays} day(s) (${fullDays} × ${car.price24}) + ${remainingHours.toFixed(1)}h (${car.price12})`;
        } else {
          rentalPrice += price24;
          breakdown = `Base fee (₹${BASE_FEE.toLocaleString('en-IN')}) + ${fullDays + 1} day(s) (${fullDays + 1} × ${car.price24})`;
        }
      } else {
        breakdown = `Base fee (₹${BASE_FEE.toLocaleString('en-IN')}) + ${fullDays} day(s) (${fullDays} × ${car.price24})`;
      }
    }

    const totalPrice = BASE_FEE + rentalPrice;

    return {
      amount: totalPrice,
      display: `₹ ${totalPrice.toLocaleString('en-IN')}`,
      hours: Math.round(hours * 10) / 10, // Round to 1 decimal place
      breakdown: breakdown
    };
  };

  const getPrice = () => {
    return calculatePrice().display;
  };

  const getPriceDetails = () => {
    return calculatePrice();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    // Validate that drop-off is after pickup
    const duration = calculateDuration();
    if (duration <= 0) {
      alert("Drop-off time must be after pickup time. Please check your dates and times.");
      return;
    }

    try {
      const priceDetails = getPriceDetails();

      // Prepare booking data
      const bookingData = {
        car: {
          name: car.name,
          type: car.type,
          features: car.features,
          image: car.image
        },
        customer: {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile
        },
        rental: {
          duration: `${priceDetails.hours} hours`,
          price: priceDetails.display,
          pickupDate: formData.pickupDate,
          pickupTime: formData.pickupTime,
          dropoffDate: formData.dropoffDate,
          dropoffTime: formData.dropoffTime
        }
      };

      // Send email to both user and admin
      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert(`Booking confirmed for ${car.name}!\n\nDuration: ${priceDetails.hours} hours\nTotal Price: ${priceDetails.display}\n\nConfirmation emails have been sent to:\n- ${formData.email}\n- Admin\n\nPayment will be collected on-site.`);
        // Optionally redirect to a confirmation page
        // router.push('/booking-confirmation');
      } else {
        throw new Error('Failed to send booking confirmation');
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("There was an error processing your booking. Please try again or contact support.");
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading car details...</p>
        </div>
      </div>
    );
  }

  const priceDetails = getPriceDetails();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600 p-1.5 rounded-lg">
              <span className="text-white text-xl">🚗</span>
            </div>
            <button
              onClick={() => router.back()}
              className="text-gray-700 hover:text-gray-900 font-semibold flex items-center gap-1 text-sm"
            >
              ← Back
            </button>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-xs">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/cars" className="text-gray-600 hover:text-gray-900">All Cars</a>
            <a href="/bikes" className="text-gray-600 hover:text-gray-900">All Bikes</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="/terms" className="text-gray-600 hover:text-gray-900">Terms</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            <a href="/gallery" className="text-gray-600 hover:text-gray-900">Gallery</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors">
              FAQ
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 p-1.5 rounded-full text-white transition-colors text-sm">
              ⚙️
            </button>
          </div>
        </div>
      </header> */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Checkout
          </h1>
          {/* <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            Premium bike rental services at affordable prices
          </p> */}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Left Section - Car Details */}
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{car.name}</h1>
              <p className="text-gray-600 text-sm">{car.type}</p>
            </div>

            {/* Car Image - Full Width */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Features */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">Features:</h3>
              <div className="flex flex-wrap gap-2">
                {car.features && car.features.map((feature: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Rate Section */}
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">RATE</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium text-sm">Base booking fee:</span>
                  <span className="text-base font-bold text-gray-900">₹ 1,000</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium text-sm">12 hours:</span>
                  <span className="text-base font-bold text-gray-900">{car.price12}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium text-sm">24 hours:</span>
                  <span className="text-base font-bold text-gray-900">{car.price24}</span>
                </div>

                {/* Duration Display */}
                {priceDetails.hours > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-blue-800 font-medium text-sm">Rental Duration:</span>
                      <span className="text-sm font-bold text-blue-900">{priceDetails.hours} hours</span>
                    </div>
                    <div className="text-xs text-blue-600 mt-2 leading-relaxed">
                      {priceDetails.breakdown}
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 flex justify-between items-center mt-3 border-2 border-green-200">
                  <span className="text-gray-900 font-bold text-sm">
                    {priceDetails.hours > 0 ? "Total Price:" : "Starting from:"}
                  </span>
                  <span className="text-xl font-bold text-green-600">{getPrice()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Billing Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">BILLING DETAILS</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Mobile Field */}
              <div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Pickup Date */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
                  Pickup Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Pickup Time */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
                  Pickup Time<span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer text-sm"
                />
              </div>

              {/* Drop off Date */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
                  Drop off Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dropoffDate"
                  value={formData.dropoffDate}
                  onChange={handleChange}
                  required
                  min={formData.pickupDate}
                  className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Drop off Time */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
                  Drop off Time<span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="dropoffTime"
                  value={formData.dropoffTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer text-sm"
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start gap-2 pt-3">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 mt-0.5 accent-blue-600 cursor-pointer"
                />
                <label htmlFor="acceptTerms" className="text-xs text-gray-700 cursor-pointer">
                  I accept the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline font-semibold">
                    terms and conditions
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.acceptTerms || priceDetails.hours <= 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3 rounded-lg transition-all shadow-lg active:scale-95 mt-5"
              >
                {priceDetails.hours > 0 ? `Payment On Site - ${getPrice()}` : "Payment On Site"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50">
        <a
          href="tel:+919876543210"
          className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-xl flex items-center justify-center text-white text-xl transition-all hover:scale-110"
          aria-label="Call us"
        >
          📞
        </a>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-green-400 hover:bg-green-500 rounded-full shadow-xl flex items-center justify-center text-white text-xl transition-all hover:scale-110"
          aria-label="WhatsApp"
        >
          💬
        </a>
      </div>
    </div>
  );
}