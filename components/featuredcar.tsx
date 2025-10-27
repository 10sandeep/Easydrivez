'use client';

import React, { useState } from 'react';
import { featuredCars } from '@/lib/data';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SectionDivider = () => (
  <div className="flex items-center justify-center gap-4 my-2 mb-10">
    <div className="h-px w-24 bg-gray-300"></div>
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

export default function FeaturedCarsSection() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    carName: '',
    name: '',
    phone: '',
  });

  // ✅ Navigate to car detail page
  const handleBookClick = (carId: number) => {
    const car = featuredCars.find((c) => c.id === carId);

    console.log(car);
    if (!car) return;

    // Encode full car data in URL
    const carData = encodeURIComponent(JSON.stringify(car));
    router.push(`/booking/${carId}?car=${carData}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Booking submitted:', formData);
    alert(
      `Booking request for ${formData.carName}\nName: ${formData.name}\nPhone: ${formData.phone}`
    );

    setIsModalOpen(false);
    setFormData({ carName: '', name: '', phone: '' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ carName: '', name: '', phone: '' });
  };

  return (
    <>
      <div className="py-16 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 animate-slide-up">
            Featured Cars
          </h2>
          <SectionDivider />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer bg-white shadow-md card-hover animate-scale-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative overflow-hidden bg-gray-200">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-semibold bg-black/40 px-3 py-1 rounded-full">
                      {car.type}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {car.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                      <svg
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-900">
                        4.8
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Premium rental service
                  </p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {car.features.map((f, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-xs text-gray-600">from</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {car.price12}
                        </p>
                        <p className="text-xs text-gray-600">for 12 hours</p>
                      </div>
                      {/* ✅ Navigate to Car Page on click */}
                      <button
                        onClick={() => handleBookClick(car.id)}
                        className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-all active:scale-95"
                      >
                        Book
                      </button>
                    </div>
                    <p className="text-xs text-gray-600">
                      24 hours: {car.price24}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal (currently unused since we're navigating instead) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Book Car</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Car Name
                </label>
                <input
                  type="text"
                  value={formData.carName}
                  disabled
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 text-sm font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
