import React from "react";
import { reasons } from "@/lib/data";

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
const WhytoChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the best in vehicle rental with our premium service and
            unbeatable offers
          </p>
          <SectionDivider />
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>

              {/* Bottom accent line */}
              <div className="h-1 w-8 bg-black rounded-full mt-4 group-hover:w-12 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-black rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and book your perfect ride
            today
          </p>
          <button className="bg-white hover:bg-gray-200 text-black font-bold py-4 px-12 rounded-lg transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhytoChooseUs;
