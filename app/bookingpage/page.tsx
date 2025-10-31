"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [carData, setCarData] = useState<any>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
  });

  useEffect(() => {
    // Get car data from URL parameters
    const carDataParam = searchParams.get("car");
    if (carDataParam) {
      try {
        const car = JSON.parse(decodeURIComponent(carDataParam));
        setCarData(car);
      } catch (error) {
        console.error("Error parsing car data:", error);
      }
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.dropDate) return 0;
    
    const pickup = new Date(formData.pickupDate);
    const drop = new Date(formData.dropDate);
    const diffTime = Math.abs(drop.getTime() - pickup.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays === 0 ? 1 : diffDays;
  };

  const calculatePrice = () => {
    if (!carData) return 0;
    
    const days = calculateDays();
    const basePrice = carData.pricePerDay || 0;
    
    return basePrice * days;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.pickupDate ||
      !formData.pickupTime ||
      !formData.dropDate ||
      !formData.dropTime
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    const estimatedPrice = calculatePrice();
    const rentalDays = calculateDays();

    console.log("Booking submitted:", formData);
    alert(
      `Booking request for ${carData?.name}\nName: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.mobile}\nDuration: ${rentalDays} day(s)\nEstimated Price: ₹${estimatedPrice.toLocaleString()}\nPayment: On Site (Cash/UPI)`
    );

    // Navigate back or to confirmation page
    router.push("/");
  };

  const estimatedPrice = calculatePrice();

  if (!carData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Car Details */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {carData.name}
            </h2>
            
            {/* Car Image */}
            <div className="mb-8">
              <img
                src={carData.image}
                alt={carData.name}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Rate Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">
                Rate
              </h3>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">
                    Estimated total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹ {estimatedPrice > 0 ? estimatedPrice.toLocaleString() : "0"}
                  </span>
                </div>
                {formData.pickupDate && formData.dropDate && (
                  <p className="text-sm text-gray-600 mt-2">
                    for {calculateDays()} {calculateDays() === 1 ? "day" : "days"}
                  </p>
                )}
              </div>

              {/* Pricing Info */}
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>12 hours rate:</span>
                  <span className="font-semibold text-gray-900">{carData.price12}</span>
                </div>
                <div className="flex justify-between">
                  <span>24 hours rate:</span>
                  <span className="font-semibold text-gray-900">{carData.price24}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Billing Details Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase">
              Billing Details
            </h2>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Mobile */}
              <div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Pickup Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Pickup Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Time*
                </label>
                <select
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select time</option>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i % 12 || 12;
                    const period = i < 12 ? 'AM' : 'PM';
                    return (
                      <option key={i} value={`${hour}:00 ${period}`}>
                        {hour}:00 {period}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Drop off Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date *
                </label>
                <input
                  type="date"
                  name="dropDate"
                  value={formData.dropDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Drop off Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Return Time*
                </label>
                <select
                  name="dropTime"
                  value={formData.dropTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select time</option>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i % 12 || 12;
                    const period = i < 12 ? 'AM' : 'PM';
                    return (
                      <option key={i} value={`${hour}:00 ${period}`}>
                        {hour}:00 {period}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="pt-4 border-t border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 select-none">
                    I accept the{" "}
                    <Link
                      href="/terms"
                      target="_blank"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline"
                    >
                      Terms and Conditions
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button with Payment Info */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={!acceptTerms}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg 
                           transition-all active:scale-95 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed
                           flex flex-col items-center gap-2"
                >
                  <span className="text-lg">Confirm Booking</span>
                  <span className="text-sm font-normal opacity-90">
                    Payment on Site (Cash/UPI)
                  </span>
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide">Need Help?</p>
                  <a href="tel:+919090089708" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                    +91 9090089708
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}