"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";


const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);



  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* Hero Section with Faded Background */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=400&fit=crop')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            Everything you need to know about our self-drive rentals
          </p>
        </div>
      </div>


      {/* FAQ List */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between"
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-blue-600 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        {/* <div className="mt-12 bg-yellow-600 text-white rounded-lg p-2 text-center">
          <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
          <p className="mb-4">Contact our support team</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded font-medium">
            Contact Us
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FAQPage;
