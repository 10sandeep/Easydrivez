"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";

export default function HomeClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    vehicleType: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    pickupPeriod: "AM",
    dropDate: "",
    dropTime: "",
    dropPeriod: "AM",
  });

  const handleWhatsApp = () => {
    window.open("https://wa.me/919090089708", "_blank");
  };

  const handlePhone = () => {
    window.location.href = "tel:+919090089708";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formatTime = (time: string, period: string) => {
        if (!time) return "";
        let [hours, minutes] = time.split(":").map(Number);
        if (period === "PM" && hours < 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        return `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
      };

      const payload = {
        vehicleType: formData.vehicleType,
        pickupDate: formData.pickupDate,
        pickupTime: formatTime(formData.pickupTime, formData.pickupPeriod),
        dropoffDate: formData.dropDate,
        dropoffTime: formatTime(formData.dropTime, formData.dropPeriod),
      };

      const res = await fetch("/api/vehicle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (!data.success) {
        alert("Error finding vehicles. Please try again.");
        return;
      }

      if (payload.vehicleType === "car") {
        localStorage.setItem("availableCars", JSON.stringify(data.data));
        router.push("/allcars");
      } else if (payload.vehicleType === "bike") {
        localStorage.setItem("availableBikes", JSON.stringify(data.data));
        router.push("/allbikes");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      {/* Sticky Buttons */}
      <div className="fixed left-6 bottom-8 z-50 flex flex-col gap-4">
        <button
          onClick={handleWhatsApp}
          className="h-14 w-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
        >
          <MessageCircle className="h-6 w-6" />
        </button>

        <button
          onClick={handlePhone}
          className="h-14 w-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
        >
          <Phone className="h-6 w-6" />
        </button>
      </div>

      {/* Booking Section */}
      <section className="relative z-20 -mt-16 mb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3 items-end">

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <select
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
                  >
                    <option value="">Select Location</option>
                    <option value="bhubaneswar">Bhubaneswar</option>
                    <option value="atoffice">At Office</option>
                    <option value="airport">Bhubaneswar Airport</option>
                    <option value="pickupanddrop">Pick up and Drop</option>
                  </select>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
                  >
                    <option value="">Select Vehicle</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                  </select>
                </div>

                {/* Pickup Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
                  />
                </div>

                {/* Pickup Time */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Pickup Time
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className="flex-1 px-2 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
                    />
                    <select
                      name="pickupPeriod"
                      value={formData.pickupPeriod}
                      onChange={handleChange}
                      className="px-2 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                {/* Return Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Return Date
                  </label>
                  <input
                    type="date"
                    name="dropDate"
                    value={formData.dropDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
                  />
                </div>

                {/* Return Time */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Return Time
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      name="dropTime"
                      value={formData.dropTime}
                      onChange={handleChange}
                      className="flex-1 px-2 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
                    />
                    <select
                      name="dropPeriod"
                      value={formData.dropPeriod}
                      onChange={handleChange}
                      className="px-2 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2.5 px-4 rounded-lg transition-all text-sm mt-6"
                  >
                    {loading ? "Searching..." : "Find Vehicle"}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}