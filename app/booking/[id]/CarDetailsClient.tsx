"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";

interface Vehicle {
  // Common fields for both car and bike
  brand: string;
  modelName?: string;
  model?: string;
  image?: string;
  carPicturate?: string;
  bikeImage?: string;
  type?: string;
  category?: string;
  cc?: number;
  seater?: number;
  fuelType?: string;
  transmission?: string;
  price12?: string;
  price24?: string;
  // Add other fields as needed
}

interface BookingResponse {
  booking?: {
    _id?: string;
    id?: string;
  };
  // Add other response fields as needed
}

export default function CarDetailsClient({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isBike, setIsBike] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pickupDate: new Date().toISOString().split("T")[0],
    pickupTime: "",
    dropoffDate: new Date().toISOString().split("T")[0],
    dropoffTime: "",
    acceptTerms: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Success modal state
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingResponse, setBookingResponse] =
    useState<BookingResponse | null>(null);

  // Decode vehicle passed in search params (car or bike)
  useEffect(() => {
    try {
      const carParam = searchParams.get("car");
      const bikeParam = searchParams.get("bike");
      const rawData = carParam || bikeParam;

      if (rawData) {
        const decoded = JSON.parse(decodeURIComponent(rawData));
        decoded.price12 = decoded.priceFor12Hours;
        decoded.price24 = decoded.priceFor24Hours;
        setVehicle(decoded);
        setIsBike(!!bikeParam);
        console.log("data", decoded);
      } else {
        setError("No vehicle data found in URL parameters.");
      }
    } catch (err) {
      console.error("Error decoding vehicle data:", err);
      setError("Failed to decode vehicle data from URL.");
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Calculate rental duration in hours (float)
  const calculateDurationHours = (): number => {
    if (
      !formData.pickupDate ||
      !formData.pickupTime ||
      !formData.dropoffDate ||
      !formData.dropoffTime
    )
      return 0;

    const pickup = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
    const dropoff = new Date(`${formData.dropoffDate}T${formData.dropoffTime}`);
    const durationMs = dropoff.getTime() - pickup.getTime();
    return Math.max(0, durationMs / (1000 * 60 * 60)); // hours
  };

  // Price calculation (unified for car and bike)
  const calculatePrice = () => {
    if (!vehicle) return { amount: 0, display: "₹ 0", hours: 0, breakdown: "" };

    const hours = calculateDurationHours();
    let rentalPrice = 0;
    let breakdown = "";

    const price12 =
      parseInt(String(vehicle.price12 || "").replace(/[^0-9]/g, "")) || 0;
    const price24 =
      parseInt(String(vehicle.price24 || "").replace(/[^0-9]/g, "")) || 0;

    if (hours <= 0) {
      return {
        amount: 0,
        display: `₹ 0`,
        hours: 0,
        breakdown: "",
      };
    }

    if (hours <= 12) {
      rentalPrice = price12;
      breakdown = `12h @ ₹${price12.toLocaleString("en-IN")}`;
    } else if (hours <= 24) {
      rentalPrice = price24;
      breakdown = `24h @ ₹${price24.toLocaleString("en-IN")}`;
    } else if (hours <= 36) {
      rentalPrice = price24 + price12;
      breakdown = `24h @ ₹${price24.toLocaleString("en-IN")} + 12h @ ₹${price12.toLocaleString("en-IN")}`;
    } else if (hours <= 48) {
      rentalPrice = price24 * 2;
      breakdown = `2 days @ ₹${price24.toLocaleString("en-IN")}/day`;
    } else {
      const days = Math.ceil(hours / 24);
      rentalPrice = days * price24;
      breakdown = `${days} days @ ₹${price24.toLocaleString("en-IN")}/day`;
    }

    const totalPrice = rentalPrice;
    return {
      amount: totalPrice,
      display: `₹ ${totalPrice.toLocaleString("en-IN")}`,
      hours: Math.round(hours * 10) / 10,
      breakdown,
    };
  };

  const priceDetails = calculatePrice();

  const formatDurationString = (hoursFloat: number) => {
    if (hoursFloat <= 0) return "0 hours";

    if (hoursFloat >= 24 && hoursFloat % 24 === 0) {
      const days = Math.floor(hoursFloat / 24);
      return `${days * 24} hours`;
    }
    const rounded = Math.round(hoursFloat * 10) / 10;
    return `${rounded} hours`;
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919090089708", "_blank");
  };

  const handlePhone = () => {
    window.location.href = "tel:+919090089708";
  };

  const closeModal = () => {
    setBookingSuccess(false);
    setBookingResponse(null);
  };

  const copyBookingId = () => {
    const bookingId =
      bookingResponse?.booking?._id || bookingResponse?.booking?.id;
    if (bookingId) {
      navigator.clipboard.writeText(bookingId).then(() => {
        // Optional: Show a toast or alert for copy success
        console.log("Booking ID copied to clipboard");
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    if (!formData.acceptTerms) {
      setErrorMessage("Please accept the terms and conditions.");
      setSubmitting(false);
      return;
    }

    if (priceDetails.hours <= 0) {
      setErrorMessage("Please select valid pickup and drop-off times.");
      setSubmitting(false);
      return;
    }

    // Construct the request body
    const requestBody = {
      vehicleId: params.id,
      vehicleType: isBike ? "bike" : "car",
      vehicleDetails: {
        brand: vehicle?.brand || "",
        model: vehicle?.modelName || vehicle?.model || "",
        image:
          vehicle?.carPicturate || vehicle?.bikeImage || vehicle?.image || "",
        type: vehicle?.type || vehicle?.category || "",
        cc: vehicle?.cc,
        seater: vehicle?.seater,
        category: vehicle?.category,
      },
      customer: {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
      },
      rental: {
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        dropoffDate: formData.dropoffDate,
        dropoffTime: formData.dropoffTime,
        duration: formatDurationString(priceDetails.hours),
        totalPrice: priceDetails.display,
      },
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBookingResponse(data);
      setBookingSuccess(true);

      // Optional: Reset form or redirect after success
      // setFormData({ ...formData, /* reset fields */ });
    } catch (error) {
      console.error("Booking creation failed:", error);
      setErrorMessage("Failed to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Loading
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 text-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
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
  if (!vehicle)
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Checkout
          </h1>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT — Vehicle Details */}
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {vehicle.brand} {vehicle.modelName || vehicle.model}
              </h1>
              <p className="text-gray-600 text-sm capitalize">
                {vehicle.type || vehicle.category}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={vehicle.carPicturate || vehicle.bikeImage || vehicle.image}
                alt={vehicle.modelName || vehicle.model}
                className="w-full h-64 object-cover"
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">
                Specifications:
              </h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.cc && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {vehicle.cc} CC
                  </span>
                )}
                {vehicle.seater && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {vehicle.seater} Seater
                  </span>
                )}
                {vehicle.fuelType && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {vehicle.fuelType}
                  </span>
                )}
                {vehicle.transmission && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {vehicle.transmission}
                  </span>
                )}
              </div>
            </div>

            {/* Rate Section */}
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">RATE</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium text-sm">
                    12 hours:
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {vehicle.price12}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700 font-medium text-sm">
                    24 hours:
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {vehicle.price24}
                  </span>
                </div>

                {priceDetails.hours > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-blue-800 font-medium text-sm">
                        Rental Duration:
                      </span>
                      <span className="text-sm font-bold text-blue-900">
                        {priceDetails.hours} hours
                      </span>
                    </div>
                    <div className="text-xs text-blue-600 mt-2 leading-relaxed">
                      {priceDetails.breakdown}
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 flex justify-between items-center mt-3 border-2 border-green-200">
                  <span className="text-gray-900 font-bold text-sm">
                    Total Price:
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {priceDetails.display}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Billing Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              BILLING DETAILS
            </h2>

            {errorMessage && (
              <div className="text-sm text-red-600 mb-4">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile"
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
              />

              {/* Pickup/Drop */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-900 text-sm mb-1 font-medium">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg text-sm [color-scheme:light]"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 text-sm mb-1 font-medium">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg text-sm [color-scheme:light]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-900 text-sm mb-1 font-medium">
                    Return Date
                  </label>
                  <input
                    type="date"
                    name="dropoffDate"
                    value={formData.dropoffDate}
                    onChange={handleChange}
                    min={formData.pickupDate}
                    required
                    className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg text-sm [color-scheme:light]"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 text-sm mb-1 font-medium">
                    Return Time
                  </label>
                  <input
                    type="time"
                    name="dropoffTime"
                    value={formData.dropoffTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg text-sm [color-scheme:light]"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-3">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <label className="text-xs text-gray-700 cursor-pointer">
                  I accept the{" "}
                  <a
                    href="/terms"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={
                  submitting || !formData.acceptTerms || priceDetails.hours <= 0
                }
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-sm px-6 py-3 rounded-lg transition-all shadow-lg active:scale-95 mt-5"
              >
                {submitting
                  ? "Booking..."
                  : priceDetails.hours > 0
                    ? `Payment On Site - ${priceDetails.display}`
                    : "Payment On Site"}
              </button>
            </form>
          </div>
        </div>
      </div>

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

      {/* SUCCESS MODAL (in-page) */}
      {bookingSuccess && (
        <div
          role="dialog"
          aria-labelledby="booking-success-title"
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <h2
                id="booking-success-title"
                className="text-2xl font-bold text-green-600 mb-2"
              >
                Booking Confirmed 🎉
              </h2>
              <p className="text-gray-700 mb-4">
                Your booking was created successfully. We'll email you the
                details shortly.
              </p>

              <div className="bg-gray-50 rounded-md p-4 mb-4">
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Vehicle:</strong> {vehicle.brand}{" "}
                  {vehicle.modelName || vehicle.model}
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Pickup:</strong> {formData.pickupDate}{" "}
                  {formData.pickupTime}
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Drop-off:</strong> {formData.dropoffDate}{" "}
                  {formData.dropoffTime}
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Duration:</strong> {priceDetails.hours} hours
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Total:</strong> {priceDetails.display}
                </div>

                {bookingResponse?.booking && (
                  <div className="mt-3 text-xs text-gray-600">
                    <div>
                      <strong>Booking ID:</strong>{" "}
                      <span className="font-mono">
                        {bookingResponse.booking._id ||
                          bookingResponse.booking.id}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={copyBookingId}
                  className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Copy Booking ID
                </button>
                {/* 
                <button
                  onClick={() => router.push("/my-bookings")}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View My Bookings
                </button> */}

                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md bg-green-50 border border-green-200 text-green-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}