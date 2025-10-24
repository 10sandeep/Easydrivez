"use client";

import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    storage: {
      list: (prefix: string) => Promise<{ keys: string[] }>;
      get: (key: string) => Promise<{ value: string } | null>;
      set: (key: string, value: string) => Promise<void>;
      delete: (key: string) => Promise<void>;
    };
  }
}

interface Vehicle {
  id: string;
  name: string;
  type: string;
  category: string;
  image: string;
  price12: string;
  price24: string;
  pricePerDay: number;
  fuelType: string;
  seating: string;
  features: string[];
}

export default function AdminPanel() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "car",
    category: "sedan",
    image: "",
    price12: "",
    price24: "",
    fuelType: "petrol",
    seating: "5",
    transmission: "manual",
  });
  const [uploadMethod, setUploadMethod] = useState<"url" | "upload">("url");

  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    if (!isFormOpen) {
      loadVehicles();
    }
  }, [isFormOpen]);

  const loadVehicles = async () => {
    try {
      const result = await window.storage.list("vehicle:");
      if (result && result.keys) {
        const vehiclePromises = result.keys.map(async (key) => {
          const data = await window.storage.get(key);
          return data ? JSON.parse(data.value) : null;
        });
        const loadedVehicles = (await Promise.all(vehiclePromises)).filter(Boolean);
        setVehicles(loadedVehicles);
      }
    } catch (error) {
      console.log("No vehicles found:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calculatePricePerDay = () => {
    const price24Num = parseInt(formData.price24.replace(/[^0-9]/g, "")) || 0;
    return price24Num;
  };

  const generateFeatures = () => {
    const features = [];
    
    if (formData.type === "car") {
      features.push(`${formData.seating} Seater`);
    } else {
      features.push("2 Seater");
    }
    
    features.push(formData.transmission.charAt(0).toUpperCase() + formData.transmission.slice(1));
    features.push(formData.fuelType.charAt(0).toUpperCase() + formData.fuelType.slice(1));
    
    return features;
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.image || !formData.price12 || !formData.price24) {
      alert("Please fill in all required fields");
      return;
    }

    const vehicleId = editingVehicle ? editingVehicle.id : `vehicle:${Date.now()}`;
    const pricePerDay = calculatePricePerDay();
    const features = generateFeatures();

    const newVehicle: Vehicle = {
      id: vehicleId,
      name: formData.name,
      type: formData.type === "car" ? "Car" : "Bike",
      category: formData.category.toUpperCase(),
      image: formData.image,
      price12: formData.price12.startsWith("₹") ? formData.price12 : `₹${formData.price12}`,
      price24: formData.price24.startsWith("₹") ? formData.price24 : `₹${formData.price24}`,
      pricePerDay: pricePerDay,
      fuelType: formData.fuelType,
      seating: formData.seating,
      features: features,
    };

    try {
      await window.storage.set(vehicleId, JSON.stringify(newVehicle));
      alert(editingVehicle ? "Vehicle updated successfully!" : "Vehicle added successfully!");
      
      setFormData({
        name: "",
        type: "car",
        category: "sedan",
        image: "",
        price12: "",
        price24: "",
        fuelType: "petrol",
        seating: "5",
        transmission: "manual",
      });
      setUploadMethod("url");
      setIsFormOpen(false);
      setEditingVehicle(null);
      loadVehicles();
    } catch (error) {
      alert("Error saving vehicle. Please try again.");
      console.error(error);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type.toLowerCase(),
      category: vehicle.category.toLowerCase(),
      image: vehicle.image,
      price12: vehicle.price12.replace("₹", ""),
      price24: vehicle.price24.replace("₹", ""),
      fuelType: vehicle.fuelType.toLowerCase(),
      seating: vehicle.seating,
      transmission: vehicle.features.some(f => f.toLowerCase().includes("automatic")) ? "automatic" : "manual",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (vehicleId: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await window.storage.delete(vehicleId);
        alert("Vehicle deleted successfully!");
        loadVehicles();
      } catch (error) {
        alert("Error deleting vehicle. Please try again.");
        console.error(error);
      }
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(vehicles, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vehicles-data.json";
    link.click();
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <div className="bg-black shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-400 mt-1">Manage your rental vehicles</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportData}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Data
              </button>
              <button
                onClick={() => {
                  setIsFormOpen(true);
                  setEditingVehicle(null);
                  setUploadMethod("url");
                  setFormData({
                    name: "",
                    type: "car",
                    category: "sedan",
                    image: "",
                    price12: "",
                    price24: "",
                    fuelType: "petrol",
                    seating: "5",
                    transmission: "manual",
                  });
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Vehicles</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{vehicles.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Cars</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {vehicles.filter(v => v.type === "Car").length}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 9l1.5-4.5h11L19 9H5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Bikes</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {vehicles.filter(v => v.type === "Bike").length}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="h-8 w-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L8 6.5V12h4V8.5L15.5 12H19l-5-7.5V2z"/>
                  <circle cx="6" cy="16" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                  <path d="M9 16h6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">All Vehicles</h2>
          </div>
          
          {vehicles.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-600 text-lg">No vehicles added yet</p>
              <p className="text-gray-500 text-sm mt-2">Click Add Vehicle to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">12 Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">24 Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img src={vehicle.image} alt={vehicle.name} className="h-12 w-16 object-cover rounded" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{vehicle.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          vehicle.type === "Car" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                        }`}>
                          {vehicle.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{vehicle.category}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{vehicle.price12}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{vehicle.price24}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {vehicle.features.map((feature, idx) => (
                            <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(vehicle)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Vehicle Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full my-8 border border-gray-700">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingVehicle ? "Edit Vehicle" : "Upload Vehicle"}
                </h2>
                <p className="text-blue-100 text-xs mt-1">
                  {editingVehicle ? "Update vehicle information" : "Add a new vehicle to your fleet"}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingVehicle(null);
                }}
                className="text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Vehicle Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Vehicle Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Toyota Fortuner"
                    className="w-full px-3 py-2 bg-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 text-sm"
                    autoComplete="off"
                  />
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Vehicle Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                  >
                    {formData.type === "car" ? (
                      <>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="luxury">Luxury</option>
                        <option value="coupe">Coupe</option>
                        <option value="hatchback">Hatchback</option>
                      </>
                    ) : (
                      <>
                        <option value="sports">Sports</option>
                        <option value="cruiser">Cruiser</option>
                        <option value="standard">Standard</option>
                        <option value="scooter">Scooter</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Vehicle Image *
                  </label>
                  
                  {/* Toggle between URL and Upload */}
                  <div className="flex gap-3 mb-2">
                    <button
                      type="button"
                      onClick={() => setUploadMethod("url")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        uploadMethod === "url"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMethod("upload")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        uploadMethod === "upload"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      Upload Image
                    </button>
                  </div>

                  {uploadMethod === "url" ? (
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 bg-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 text-sm"
                      autoComplete="off"
                    />
                  ) : (
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition bg-gray-800">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                      />
                      <label htmlFor="imageUpload" className="cursor-pointer">
                        <svg
                          className="h-10 w-10 text-gray-400 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-gray-300 font-medium text-sm">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </label>
                    </div>
                  )}
                  
                  {formData.image && (
                    <div className="mt-2 relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-32 w-full rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full transition"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Price 12 Hours */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    12 Hours Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                    <input
                      type="text"
                      name="price12"
                      value={formData.price12}
                      onChange={handleChange}
                      placeholder="1200"
                      className="w-full pl-7 pr-3 py-2 bg-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 text-sm"
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Price 24 Hours */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    24 Hours Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                    <input
                      type="text"
                      name="price24"
                      value={formData.price24}
                      onChange={handleChange}
                      placeholder="2000"
                      className="w-full pl-7 pr-3 py-2 bg-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 text-sm"
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Fuel Type *
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Seating Capacity */}
                {formData.type === "car" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Seating Capacity *
                    </label>
                    <select
                      name="seating"
                      value={formData.seating}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    >
                      <option value="2">2 Seater</option>
                      <option value="4">4 Seater</option>
                      <option value="5">5 Seater</option>
                      <option value="6">6 Seater</option>
                      <option value="7">7 Seater</option>
                    </select>
                  </div>
                )}

                {/* Transmission */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Transmission *
                  </label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                  >
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingVehicle(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition text-sm"
                >
                  {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}