import React from 'react';
import { testimonials } from '@/lib/data';
// import {SectionDivider}from '@/app/page';


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


export default function Testimonials() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 animate-slide-up">
          What Our Customers Say
        </h2>
        <SectionDivider /> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl p-6 shadow-lg card-hover animate-slide-in-left"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}