"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data";

const SectionDivider = () => (
  <div className="flex items-center justify-center gap-4 my-2 mb-10">
    <div className="h-px w-24 bg-gray-300"></div>
    
    {/* Car Icon */}
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

export default function Services() {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            OUR SERVICES
          </h2>
          <SectionDivider />
        </div>

        {/* Services Grid */}
        <div className="space-y-20">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              {/* Content - Left for Car, Right for Bike */}
              <div className={idx === 1 ? "md:order-2" : "md:order-1"}>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>

                {/* Features */}
                <div className="flex gap-4 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
                  {service.description}
                </p>

                {/* Button */}
                <button
                  onClick={() => handleNavigate(service.route)}
                  className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-md transition-colors"
                >
                  {service.title.split(" ")[2]}
                </button>
              </div>

              {/* Image - Right for Car, Left for Bike */}
              <div className={idx === 1 ? "md:order-1" : "md:order-2"}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}