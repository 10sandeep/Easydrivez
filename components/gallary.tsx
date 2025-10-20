import React from 'react';
import { galleryImages } from '@/lib/data';


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


export default function Gallary() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 animate-slide-up">
          Happy Customers
        </h2>
        <SectionDivider /> 
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer animate-scale-in"
              style={{ animationDelay: `${(idx % 5) * 0.1}s` }}
            >
              <img
                src={img}
                alt={`Happy customer ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}