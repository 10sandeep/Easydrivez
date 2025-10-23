"use client"
import React, { useState } from 'react';
import { featuredBikes, Bike } from '@/lib/data';

export default function BikeRental() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [formData, setFormData] = useState({ bikeName: '', name: '', phone: '' });

  const handleBookNow = (bike: Bike) => {
    setSelectedBike(bike);
    setFormData({ bikeName: bike.name, name: '', phone: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBike(null);
    setFormData({ bikeName: '', name: '', phone: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Booking submitted:', formData);
    alert(`Booking request for ${formData.bikeName}\nName: ${formData.name}\nPhone: ${formData.phone}`);
    
    handleCloseModal();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Faded Background */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Bike Rental in Bhubaneswar
          </h1>
          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            Premium bike rental services at affordable prices
          </p>
        </div>
      </div>

      {/* Featured Bikes Section - Simple White Background */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            Featured Bikes
          </h2>
          
          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBikes.map((bike, idx) => (
              <div
                key={idx}
                className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden bg-gray-100 h-64">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-black text-sm font-medium bg-white px-3 py-1 rounded">
                      {bike.type}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title and Rating */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-black flex-1">
                      {bike.name}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      <svg
                        className="h-4 w-4 fill-black"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-sm font-bold text-black">4.9</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm">Premium rental service</p>

                  {/* Features */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {bike.features.map((f, i) => (
                      <span
                        key={i}
                        className="border border-gray-300 text-black px-3 py-1 rounded text-sm"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and Button */}
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-600">from</p>
                        <p className="text-2xl font-bold text-black">
                          {bike.price12}
                        </p>
                        <p className="text-sm text-gray-600">for 12 hours</p>
                      </div>
                      <button 
                        onClick={() => handleBookNow(bike)}
                        className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                    <p className="text-sm text-gray-700">
                      24 hours: <span className="font-bold">{bike.price24}</span>
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
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-300">
              <h2 className="text-2xl font-bold text-black">Book Bike</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-black transition"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Bike Name */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Bike Name
                </label>
                <input
                  type="text"
                  value={formData.bikeName}
                  disabled
                  className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded text-gray-700 text-sm font-medium focus:outline-none"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-black text-sm font-medium focus:outline-none focus:border-black autofill:bg-white autofill:text-black"
                  style={{
                    WebkitTextFillColor: 'black',
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-black text-sm font-medium focus:outline-none focus:border-black autofill:bg-white autofill:text-black"
                  style={{
                    WebkitTextFillColor: 'black',
                  }}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-100 text-black font-semibold rounded transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2.5 bg-black hover:bg-gray-800 text-white font-semibold rounded transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: black !important;
        }
      `}</style>
    </div>
  );
}