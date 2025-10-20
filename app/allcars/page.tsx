"use client"

import React, { useState } from 'react';
import { featuredCars } from '@/lib/data';

export default function Cars() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({ carName: '', name: '', phone: '' });

  const handleBookNow = (car) => {
    setSelectedCar(car);
    setFormData({ carName: car.name, name: '', phone: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
    setFormData({ carName: '', name: '', phone: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Booking submitted:', formData);
    alert(`Booking request for ${formData.carName}\nName: ${formData.name}\nPhone: ${formData.phone}`);
    
    handleCloseModal();
  };

  return (
    <div>
      {/* Hero Section with Faded Background */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Car Rental in Bhubaneswar
          </h1>
          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            Premium car rental services at affordable prices
          </p>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Featured Cars
          </h2>
          
          {/* 3 Column Grid - 2-3 cars per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer bg-white shadow-lg hover:shadow-2xl hover:scale-105"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden bg-gray-200 h-72">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-full inline-block">
                      {car.type}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 bg-white">
                  {/* Title and Rating */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 line-clamp-2 flex-1">
                      {car.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg ml-2">
                      <svg
                        className="h-5 w-5 fill-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-lg font-bold text-gray-900">4.8</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 font-medium">Premium rental service</p>

                  {/* Features */}
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {car.features.map((f, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and Button */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-600">from</p>
                        <p className="text-3xl font-bold text-blue-600">
                          {car.price12}
                        </p>
                        <p className="text-sm text-gray-600">for 12 hours</p>
                      </div>
                      <button 
                        onClick={() => handleBookNow(car)}
                        className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-all active:scale-95 shadow-md"
                      >
                        Book Now
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      📅 24 hours: <span className="font-bold text-gray-900">{car.price24}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Book Car</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Car Name */}
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

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2.5 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}