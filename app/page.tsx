"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
// import {
//   featuredCars,
//   featuredBikes,
//   backgroundImages,
//   galleryImages,
//   services,
// } from "@/lib/data";
import HeroImage from "@/assets/hero.png";
import Testimonials from "@/components/testimonial";
import Gallary from "@/components/gallary";
import Services from "@/components/service";
import FeaturedBikesSection from "@/components/featuredbike";
import FeaturedCarsSection from "@/components/featuredcar";
import WhytoChooseUs from "@/components/whytochooseus";
import AdminPanel from "./admin/page";

export default function Home() {
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

  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const handleSubmit = () => {
    alert("Searching for available vehicles...");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRentCar = () => {
    router.push("/allcars");
  };

  const handleRentBike = () => {
    router.push("/allbikes");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919090089708", "_blank");
  };

  const handlePhone = () => {
    window.location.href = "tel:+919090089708";
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Contact Buttons */}
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
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroImage.src})` }}
        />

        {/* Dark Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center items-start h-full px-6 sm:px-8 md:px-16 lg:px-32 text-white py-24 md:py-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight max-w-xl">
            Drive Beyond Limits
            <br />
            with Eazydrivez
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-sm sm:max-w-md leading-relaxed">
            To drive meaningful impact and achieve our sustainability goals
            through collective innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleRentCar}
              className="px-6 py-3 sm:px-8 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors text-sm sm:text-base"
            >
              Rent Car
            </button>
            <button
              onClick={handleRentBike}
              className="px-6 py-3 sm:px-8 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-yellow-600 hover:text-black transition-colors text-sm sm:text-base"
            >
              Rent Bike
            </button>
          </div>
        </div>
      </section>

      {/* BOOKING FORM SECTION BELOW HERO */}
      <section className="relative z-20 -mt-16 mb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="p-5">
              {/* All Fields in One Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3 items-end">
                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none z-10">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <select
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      className="w-full pl-9 pr-8 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-medium 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer"
                    >
                      <option value="">Select Location</option>
                      <option value="bhubaneswar">Bhubaneswar</option>
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Vehicle Type
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none z-10">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 9l1.5-4.5h11L19 9H5z" />
                      </svg>
                    </div>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full pl-9 pr-8 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-medium 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer"
                    >
                      <option value="">Select Vehicle</option>
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
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
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-medium 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                             [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert"
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
                      className="flex-1 px-2 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-medium 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                               [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert"
                    />
                    <select
                      name="pickupPeriod"
                      value={formData.pickupPeriod}
                      onChange={handleChange}
                      className="px-2 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs font-semibold 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                {/* Drop Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Return Date
                  </label>
                  <input
                    type="date"
                    name="dropDate"
                    value={formData.dropDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-medium 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                             [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

                {/* Drop Time */}
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
                      className="flex-1 px-2 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-medium 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                               [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert"
                    />
                    <select
                      name="dropPeriod"
                      value={formData.dropPeriod}
                      onChange={handleChange}
                      className="px-2 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs font-semibold 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2.5 px-4 rounded-lg transition-all 
                             shadow-lg hover:shadow-xl active:scale-95 text-sm flex items-center justify-center gap-2 mt-6"
                  >
                    <svg
                      className="h-4 w-4 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Find Car
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-700 my-4"></div>

              {/* Contact Info */}
              <div className="flex justify-center">
                <a
                  href="tel:+91 9090089708"
                  className="group flex items-center gap-3"
                >
                  <div className="h-9 w-9 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition flex-shrink-0">
                    <svg
                      className="h-4 w-4 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Need Help?
                    </p>
                    <p className="text-sm font-bold text-white">
                      +91 9090089708
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <FeaturedCarsSection />
      <FeaturedBikesSection />
      <Gallary />
      <Testimonials />
      {/* <WhytoChooseUs/> */}
      {/* <AdminPanel/> */}
    </div>
  );
}
