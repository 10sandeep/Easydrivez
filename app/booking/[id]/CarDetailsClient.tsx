"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Vehicle = {
  _id?: string;
  id?: string;
  brand?: string;
  model?: string;
  modelName?: string;
  image?: string;
  carPicturate?: string;
  bikeImage?: string;
  price12?: string;
  price24?: string;
  cc?: number;
  seater?: number;
  fuelType?: string;
  transmission?: string;
  type?: string;
  category?: string;
  [key: string]: any;
};

type BookingPayload = {
  vehicleId: string;
  vehicleType: string;
  vehicleDetails: Vehicle;
  customer: {
    name: string;
    email: string;
    mobile: string;
  };
  rental: {
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
    duration: string;
    totalPrice: string;
  };
};

export default function CarDetailsClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isBike, setIsBike] = useState(false);

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
  const [bookingResponse, setBookingResponse] = useState<any | null>(null);

  // Decode vehicle passed in search params (car or bike)
  useEffect(() => {
    try {
      const carParam = searchParams.get("car");
      const bikeParam = searchParams.get("bike");
      const rawData = carParam || bikeParam;

      if (rawData) {
        const decoded = JSON.parse(decodeURIComponent(rawData));
        setVehicle(decoded);
        setIsBike(!!bikeParam);
      } else {
        // If vehicle is not passed in search params, you may fetch by params.id server-side.
        // For now we assume vehicle data present in search params as per your previous flow.
      }
    } catch (err) {
      console.error("Error decoding vehicle data:", err);
      setErrorMessage("Failed to load vehicle details.");
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

  // Price calculation (same logic)
  const calculatePrice = () => {
    if (!vehicle) return { amount: 0, display: "₹ 0", hours: 0, breakdown: "" };

    const hours = calculateDurationHours();
    const BASE_FEE = 1000;
    let rentalPrice = 0;
    let breakdown = "";

    if (isBike) {
      const rate12 = Math.floor((vehicle.cc || 0) * 3);
      const rate24 = Math.floor((vehicle.cc || 0) * 4.5);

      if (hours <= 0) {
        return {
          amount: BASE_FEE,
          display: `₹ ${BASE_FEE.toLocaleString("en-IN")}`,
          hours: 0,
          breakdown: "Base booking fee",
        };
      }

      if (hours <= 12) {
        rentalPrice = rate12;
        breakdown = `Base (₹${BASE_FEE}) + 12h @ ₹${rate12}`;
      } else if (hours <= 24) {
        rentalPrice = rate24;
        breakdown = `Base (₹${BASE_FEE}) + 24h @ ₹${rate24}`;
      } else {
        const fullDays = Math.floor(hours / 24);
        rentalPrice = fullDays * rate24;
        breakdown = `Base (₹${BASE_FEE}) + ${fullDays} day(s) @ ₹${rate24}/day`;
      }
    } else {
      const price12 =
        parseInt(String(vehicle.price12 || "").replace(/[^0-9]/g, "")) || 0;
      const price24 =
        parseInt(String(vehicle.price24 || "").replace(/[^0-9]/g, "")) || 0;

      if (hours <= 0) {
        return {
          amount: BASE_FEE,
          display: `₹ ${BASE_FEE.toLocaleString("en-IN")}`,
          hours: 0,
          breakdown: "Base booking fee",
        };
      }

      if (hours <= 12) {
        rentalPrice = price12;
        breakdown = `Base (₹${BASE_FEE}) + 12h rate (${vehicle.price12})`;
      } else if (hours <= 24) {
        rentalPrice = price24;
        breakdown = `Base (₹${BASE_FEE}) + 24h rate (${vehicle.price24})`;
      } else {
        const fullDays = Math.floor(hours / 24);
        rentalPrice = fullDays * price24;
        breakdown = `Base (₹${BASE_FEE}) + ${fullDays} day(s) × ${vehicle.price24}`;
      }
    }

    const totalPrice = BASE_FEE + rentalPrice;
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

  const buildBookingPayload = (): BookingPayload | null => {
    if (!vehicle) return null;
    const vehicleIdFromParams = params?.id || vehicle._id || vehicle.id || "";

    if (!vehicleIdFromParams) {
      setErrorMessage("Missing vehicle id.");
      return null;
    }

    return {
      vehicleId: String(vehicleIdFromParams),
      vehicleType: isBike ? "bike" : "car",
      vehicleDetails: {
        brand: vehicle.brand,
        model: vehicle.model || vehicle.modelName,
        image: vehicle.carPicturate || vehicle.bikeImage || vehicle.image,
        type: vehicle.type || vehicle.category,
        cc: vehicle.cc,
        seater: vehicle.seater,
        category: vehicle.category,
      },
      customer: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.acceptTerms) {
      setErrorMessage("Please accept the terms and conditions.");
      return;
    }

    const duration = calculateDurationHours();
    if (duration <= 0) {
      setErrorMessage("Drop-off time must be after pickup time.");
      return;
    }

    if (!vehicle) {
      setErrorMessage("Vehicle data not loaded yet.");
      return;
    }

    if (!formData.name || !formData.email || !formData.mobile) {
      setErrorMessage("Please fill name, email, and mobile.");
      return;
    }

    const payload = buildBookingPayload();
    if (!payload) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Booking error:", data);
        setErrorMessage(
          data?.message || "Failed to create booking. Please try again."
        );
        setSubmitting(false);
        return;
      }

      // Successful booking — show modal dialog with booking details (no redirect)
      setBookingResponse(data);
      setBookingSuccess(true);
      setSubmitting(false);
    } catch (err) {
      console.error("Network error while creating booking:", err);
      setErrorMessage("Network or server error. Please try later.");
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setBookingSuccess(false);
    // Optionally clear form or navigate; keeping on same page per request
  };

  const copyBookingId = async () => {
    try {
      const bookingId =
        bookingResponse?.booking?._id || bookingResponse?.booking?.id || "";
      if (!bookingId) return;
      await navigator.clipboard.writeText(bookingId);
      // small UI feedback could be added; using alert for simplicity
      alert("Booking ID copied to clipboard");
    } catch (err) {
      console.error("Copy failed", err);
      alert("Failed to copy. Please copy manually.");
    }
  };

  // Loading placeholder while vehicle is not available
  if (!vehicle)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading vehicle details...</p>
          {errorMessage && (
            <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
          )}
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
                    Base booking fee:
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    ₹ 1,000
                  </span>
                </div>

                {!isBike && (
                  <>
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
                  </>
                )}

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
                    className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm"
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
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-900 text-sm mb-1 font-medium">
                    Drop off Date
                  </label>
                  <input
                    type="date"
                    name="dropoffDate"
                    value={formData.dropoffDate}
                    onChange={handleChange}
                    min={formData.pickupDate}
                    required
                    className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 text-sm mb-1 font-medium">
                    Drop off Time
                  </label>
                  <input
                    type="time"
                    name="dropoffTime"
                    value={formData.dropoffTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm"
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

      {/* Floating Buttons */}
      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50">
        <a
          href="tel:+919876543210"
          className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-xl flex items-center justify-center text-white text-xl hover:scale-110 transition-all"
        >
          📞
        </a>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-green-400 hover:bg-green-500 rounded-full shadow-xl flex items-center justify-center text-white text-xl hover:scale-110 transition-all"
        >
          💬
        </a>
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
                  <strong>Vehicle:</strong>{" "}
                  {vehicle.brand} {vehicle.modelName || vehicle.model}
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Pickup:</strong> {formData.pickupDate} {formData.pickupTime}
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Drop-off:</strong> {formData.dropoffDate} {formData.dropoffTime}
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
                        {bookingResponse.booking._id || bookingResponse.booking.id}
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
