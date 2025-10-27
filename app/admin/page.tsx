"use client";

import React, { useState, useEffect } from "react";
import {
  Car, Bike, Users, Package, TrendingUp, Calendar,
  DollarSign, BarChart3, Filter, Download, Search,
  Edit2, Trash2, Eye, Plus, X, CheckCircle, Clock,
  AlertCircle, FileText
} from "lucide-react";
// import {Vehicle,Booking,dummyVehicles,dummyBookings} from '@/lib/data'
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

interface Booking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehicleType: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupDate: string;
  returnDate: string;
  duration: string;
  totalAmount: string;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  bookingDate: string;
}

// Dummy Data
const dummyVehicles: Vehicle[] = [
  {
    id: "vehicle:1",
    name: "Toyota Fortuner",
    type: "Car",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop",
    price12: "₹2500",
    price24: "₹4000",
    pricePerDay: 4000,
    fuelType: "diesel",
    seating: "7",
    features: ["7 Seater", "Automatic", "Diesel"]
  },
  {
    id: "vehicle:2",
    name: "Honda City",
    type: "Car",
    category: "SEDAN",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop",
    price12: "₹1500",
    price24: "₹2500",
    pricePerDay: 2500,
    fuelType: "petrol",
    seating: "5",
    features: ["5 Seater", "Manual", "Petrol"]
  },
  {
    id: "vehicle:3",
    name: "Maruti Swift",
    type: "Car",
    category: "HATCHBACK",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    price12: "₹1200",
    price24: "₹2000",
    pricePerDay: 2000,
    fuelType: "petrol",
    seating: "5",
    features: ["5 Seater", "Manual", "Petrol"]
  },
  {
    id: "vehicle:4",
    name: "Hyundai Creta",
    type: "Car",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    price12: "₹2000",
    price24: "₹3500",
    pricePerDay: 3500,
    fuelType: "diesel",
    seating: "5",
    features: ["5 Seater", "Automatic", "Diesel"]
  },
  {
    id: "vehicle:5",
    name: "Royal Enfield Classic 350",
    type: "Bike",
    category: "CRUISER",
    image: "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=400&h=300&fit=crop",
    price12: "₹600",
    price24: "₹1000",
    pricePerDay: 1000,
    fuelType: "petrol",
    seating: "2",
    features: ["2 Seater", "Manual", "Petrol"]
  },
  {
    id: "vehicle:6",
    name: "Honda Activa 6G",
    type: "Bike",
    category: "SCOOTER",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop",
    price12: "₹400",
    price24: "₹700",
    pricePerDay: 700,
    fuelType: "petrol",
    seating: "2",
    features: ["2 Seater", "Automatic", "Petrol"]
  },
  {
    id: "vehicle:7",
    name: "KTM Duke 390",
    type: "Bike",
    category: "SPORT",
    image: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=400&h=300&fit=crop",
    price12: "₹800",
    price24: "₹1300",
    pricePerDay: 1300,
    fuelType: "petrol",
    seating: "2",
    features: ["2 Seater", "Manual", "Petrol"]
  },
  {
    id: "vehicle:8",
    name: "Yamaha FZ-S",
    type: "Bike",
    category: "STANDARD",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop",
    price12: "₹500",
    price24: "₹900",
    pricePerDay: 900,
    fuelType: "petrol",
    seating: "2",
    features: ["2 Seater", "Manual", "Petrol"]
  },
  {
    id: "vehicle:9",
    name: "BMW 5 Series",
    type: "Car",
    category: "LUXURY",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price12: "₹5000",
    price24: "₹8000",
    pricePerDay: 8000,
    fuelType: "diesel",
    seating: "5",
    features: ["5 Seater", "Automatic", "Diesel"]
  },
  {
    id: "vehicle:10",
    name: "Mahindra Thar",
    type: "Car",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    price12: "₹2200",
    price24: "₹3800",
    pricePerDay: 3800,
    fuelType: "diesel",
    seating: "4",
    features: ["4 Seater", "Manual", "Diesel"]
  }
];

const dummyBookings: Booking[] = [
  {
    id: "booking:1",
    vehicleId: "vehicle:1",
    vehicleName: "Toyota Fortuner",
    vehicleType: "Car",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    customerEmail: "rahul.sharma@email.com",
    pickupDate: "2025-10-28",
    returnDate: "2025-10-30",
    duration: "2 Days",
    totalAmount: "₹8000",
    status: "active",
    bookingDate: "2025-10-25"
  },
  {
    id: "booking:2",
    vehicleId: "vehicle:2",
    vehicleName: "Honda City",
    vehicleType: "Car",
    customerName: "Priya Patel",
    customerPhone: "+91 87654 32109",
    customerEmail: "priya.patel@email.com",
    pickupDate: "2025-10-27",
    returnDate: "2025-10-28",
    duration: "1 Day",
    totalAmount: "₹2500",
    status: "pending",
    bookingDate: "2025-10-26"
  },
  {
    id: "booking:3",
    vehicleId: "vehicle:5",
    vehicleName: "Royal Enfield Classic 350",
    vehicleType: "Bike",
    customerName: "Amit Kumar",
    customerPhone: "+91 98765 12345",
    customerEmail: "amit.kumar@email.com",
    pickupDate: "2025-10-26",
    returnDate: "2025-10-27",
    duration: "1 Day",
    totalAmount: "₹1000",
    status: "completed",
    bookingDate: "2025-10-24"
  },
  {
    id: "booking:4",
    vehicleId: "vehicle:3",
    vehicleName: "Maruti Swift",
    vehicleType: "Car",
    customerName: "Sneha Reddy",
    customerPhone: "+91 91234 56789",
    customerEmail: "sneha.reddy@email.com",
    pickupDate: "2025-10-29",
    returnDate: "2025-10-31",
    duration: "2 Days",
    totalAmount: "₹4000",
    status: "confirmed",
    bookingDate: "2025-10-27"
  },
  {
    id: "booking:5",
    vehicleId: "vehicle:7",
    vehicleName: "KTM Duke 390",
    vehicleType: "Bike",
    customerName: "Vikram Singh",
    customerPhone: "+91 99887 76655",
    customerEmail: "vikram.singh@email.com",
    pickupDate: "2025-10-27",
    returnDate: "2025-10-29",
    duration: "2 Days",
    totalAmount: "₹2600",
    status: "active",
    bookingDate: "2025-10-26"
  },
  {
    id: "booking:6",
    vehicleId: "vehicle:4",
    vehicleName: "Hyundai Creta",
    vehicleType: "Car",
    customerName: "Anjali Gupta",
    customerPhone: "+91 98123 45678",
    customerEmail: "anjali.gupta@email.com",
    pickupDate: "2025-10-25",
    returnDate: "2025-10-26",
    duration: "1 Day",
    totalAmount: "₹3500",
    status: "completed",
    bookingDate: "2025-10-23"
  },
  {
    id: "booking:7",
    vehicleId: "vehicle:6",
    vehicleName: "Honda Activa 6G",
    vehicleType: "Bike",
    customerName: "Deepak Mehta",
    customerPhone: "+91 97654 32100",
    customerEmail: "deepak.mehta@email.com",
    pickupDate: "2025-10-28",
    returnDate: "2025-10-28",
    duration: "12 Hours",
    totalAmount: "₹400",
    status: "pending",
    bookingDate: "2025-10-27"
  },
  {
    id: "booking:8",
    vehicleId: "vehicle:9",
    vehicleName: "BMW 5 Series",
    vehicleType: "Car",
    customerName: "Rohan Kapoor",
    customerPhone: "+91 98888 77777",
    customerEmail: "rohan.kapoor@email.com",
    pickupDate: "2025-10-24",
    returnDate: "2025-10-26",
    duration: "2 Days",
    totalAmount: "₹16000",
    status: "completed",
    bookingDate: "2025-10-22"
  },
  {
    id: "booking:9",
    vehicleId: "vehicle:8",
    vehicleName: "Yamaha FZ-S",
    vehicleType: "Bike",
    customerName: "Neha Verma",
    customerPhone: "+91 96543 21098",
    customerEmail: "neha.verma@email.com",
    pickupDate: "2025-10-27",
    returnDate: "2025-10-28",
    duration: "1 Day",
    totalAmount: "₹900",
    status: "active",
    bookingDate: "2025-10-26"
  },
  {
    id: "booking:10",
    vehicleId: "vehicle:10",
    vehicleName: "Mahindra Thar",
    vehicleType: "Car",
    customerName: "Karan Malhotra",
    customerPhone: "+91 95432 10987",
    customerEmail: "karan.malhotra@email.com",
    pickupDate: "2025-10-30",
    returnDate: "2025-11-02",
    duration: "3 Days",
    totalAmount: "₹11400",
    status: "confirmed",
    bookingDate: "2025-10-27"
  }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "vehicles" | "bookings" | "reports">("dashboard");
  const [vehicles, setVehicles] = useState<Vehicle[]>(dummyVehicles);
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
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

  // Statistics Calculations
  const stats = {
    totalVehicles: vehicles.length,
    totalCars: vehicles.filter(v => v.type.toLowerCase() === "car").length,
    totalBikes: vehicles.filter(v => v.type.toLowerCase() === "bike").length,
    totalBookings: bookings.length,
    activeBookings: bookings.filter(b => b.status === "active").length,
    completedBookings: bookings.filter(b => b.status === "completed").length,
    pendingBookings: bookings.filter(b => b.status === "pending").length,
    totalRevenue: bookings
      .filter(b => b.status === "completed")
      .reduce((sum, b) => sum + parseFloat(b.totalAmount.replace(/[^0-9]/g, "")), 0),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.image || !formData.price12 || !formData.price24) {
      alert("Please fill in all required fields");
      return;
    }

    const vehicleId = editingVehicle ? editingVehicle.id : `vehicle:${Date.now()}`;
    const features = [
      formData.type === "car" ? `${formData.seating} Seater` : "2 Seater",
      formData.transmission.charAt(0).toUpperCase() + formData.transmission.slice(1),
      formData.fuelType.charAt(0).toUpperCase() + formData.fuelType.slice(1),
    ];

    const newVehicle: Vehicle = {
      id: vehicleId,
      name: formData.name,
      type: formData.type === "car" ? "Car" : "Bike",
      category: formData.category.toUpperCase(),
      image: formData.image,
      price12: formData.price12.startsWith("₹") ? formData.price12 : `₹${formData.price12}`,
      price24: formData.price24.startsWith("₹") ? formData.price24 : `₹${formData.price24}`,
      pricePerDay: parseInt(formData.price24.replace(/[^0-9]/g, "")) || 0,
      fuelType: formData.fuelType,
      seating: formData.seating,
      features: features,
    };

    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === vehicleId ? newVehicle : v));
      alert("Vehicle updated successfully!");
    } else {
      setVehicles([...vehicles, newVehicle]);
      alert("Vehicle added successfully!");
    }

    setFormData({
      name: "", type: "car", category: "sedan", image: "", price12: "", price24: "",
      fuelType: "petrol", seating: "5", transmission: "manual",
    });
    setIsFormOpen(false);
    setEditingVehicle(null);
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

  const handleDelete = (vehicleId: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter(v => v.id !== vehicleId));
      alert("Vehicle deleted successfully!");
    }
  };

  const updateBookingStatus = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    alert("Booking status updated!");
  };

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      statistics: stats,
      vehicles: vehicles,
      bookings: bookings,
    };
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const filteredVehicles = vehicles.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 ">
          <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-2 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Admin Pannel
          </h1>
          {/* <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            Premium car rental services at affordable prices
          </p> */}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        {/* Sticky Navigation Tabs - Above Content */}
        <div className="bg-white rounded-xl my-14 shadow-sm border border-gray-200 mb-6 sticky top-24 z-40">
          <div className="flex items-center justify-between p-4">
            <nav className="flex gap-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                { id: "vehicles", label: "Vehicles", icon: Package },
                { id: "bookings", label: "Bookings", icon: Calendar },
                { id: "reports", label: "Reports", icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${activeTab === tab.id
                        ? "bg-yellow-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
            <button
              onClick={exportReport}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition font-medium shadow-sm"
            >
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Vehicles</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalVehicles}</p>
                    <div className="flex gap-3 mt-3">
                      <span className="text-xs text-gray-600"><Car className="h-3 w-3 inline mr-1" />{stats.totalCars} Cars</span>
                      <span className="text-xs text-gray-600"><Bike className="h-3 w-3 inline mr-1" />{stats.totalBikes} Bikes</span>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBookings}</p>
                    <p className="text-xs text-green-600 mt-3 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12% from last month
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Active Bookings</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeBookings}</p>
                    <p className="text-xs text-gray-600 mt-3">
                      {stats.pendingBookings} pending approval
                    </p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">₹{stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 mt-3">
                      {stats.completedBookings} completed bookings
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{booking.customerName}</p>
                        <p className="text-xs text-gray-600">{booking.vehicleName}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === "completed" ? "bg-green-100 text-green-700" :
                          booking.status === "active" ? "bg-blue-100 text-yellow-700" :
                            booking.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                              booking.status === "confirmed" ? "bg-cyan-100 text-cyan-700" :
                                "bg-gray-100 text-gray-700"
                        }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vehicle Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Fleet Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Cars</span>
                      <span className="font-semibold text-gray-900">{stats.totalCars} / {stats.totalVehicles}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(stats.totalCars / stats.totalVehicles) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Bikes</span>
                      <span className="font-semibold text-gray-900">{stats.totalBikes} / {stats.totalVehicles}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(stats.totalBikes / stats.totalVehicles) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{stats.activeBookings}</p>
                        <p className="text-xs text-gray-600 mt-1">On Rent</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{stats.totalVehicles - stats.activeBookings}</p>
                        <p className="text-xs text-gray-600 mt-1">Available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition font-medium shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add Vehicle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                  <div className="relative h-48">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-900 shadow-sm">
                      {vehicle.type}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{vehicle.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{vehicle.category}</p>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {vehicle.features.map((f, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-600">12 hrs</p>
                        <p className="font-bold text-gray-900">{vehicle.price12}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">24 hrs</p>
                        <p className="font-bold text-gray-900">{vehicle.price24}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition text-sm font-medium"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition text-sm font-medium"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Booking ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Vehicle</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Duration</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">#{booking.id.split(':')[1]}</p>
                          <p className="text-xs text-gray-600">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
                          <p className="text-xs text-gray-600">{booking.customerPhone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{booking.vehicleName}</p>
                          <p className="text-xs text-gray-600">{booking.vehicleType}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{booking.duration}</p>
                          <p className="text-xs text-gray-600">{booking.pickupDate} to {booking.returnDate}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-gray-900">{booking.totalAmount}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "completed" ? "bg-green-100 text-green-700" :
                              booking.status === "active" ? "bg-blue-100 text-blue-700" :
                                booking.status === "confirmed" ? "bg-cyan-100 text-cyan-700" :
                                  booking.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                    "bg-red-100 text-red-700"
                            }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4 text-gray-600" />
                            </button>
                            {booking.status === "pending" && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                className="p-2 hover:bg-green-50 rounded-lg transition"
                                title="Confirm Booking"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Report */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-600">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">From Cars</p>
                      <p className="text-lg font-bold text-gray-900">
                        ₹{bookings.filter(b => b.vehicleType.toLowerCase() === "car" && b.status === "completed")
                          .reduce((sum, b) => sum + parseFloat(b.totalAmount.replace(/[^0-9]/g, "")), 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">From Bikes</p>
                      <p className="text-lg font-bold text-gray-900">
                        ₹{bookings.filter(b => b.vehicleType.toLowerCase() === "bike" && b.status === "completed")
                          .reduce((sum, b) => sum + parseFloat(b.totalAmount.replace(/[^0-9]/g, "")), 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Statistics */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Statistics</h3>
                <div className="space-y-3">
                  {[
                    { label: "Total Bookings", value: stats.totalBookings, color: "text-blue-600" },
                    { label: "Completed", value: stats.completedBookings, color: "text-green-600" },
                    { label: "Active", value: stats.activeBookings, color: "text-orange-600" },
                    { label: "Pending", value: stats.pendingBookings, color: "text-yellow-600" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-blue-600">{new Set(bookings.map(b => b.customerPhone)).size}</p>
                  <p className="text-sm text-gray-600 mt-2">Total Customers</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-green-600">{stats.completedBookings > 0 ? Math.round((stats.completedBookings / stats.totalBookings) * 100) : 0}%</p>
                  <p className="text-sm text-gray-600 mt-2">Completion Rate</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <Package className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-purple-600">₹{stats.totalRevenue > 0 ? Math.round(stats.totalRevenue / stats.completedBookings).toLocaleString() : 0}</p>
                  <p className="text-sm text-gray-600 mt-2">Avg. Booking Value</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vehicle Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingVehicle(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Toyota Fortuner"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {formData.type === "car" ? (
                      <>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="luxury">Luxury</option>
                      </>
                    ) : (
                      <>
                        <option value="standard">Standard</option>
                        <option value="sport">Sport</option>
                        <option value="cruiser">Cruiser</option>
                        <option value="scooter">Scooter</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Type *</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">12 Hours Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="text"
                      name="price12"
                      value={formData.price12}
                      onChange={handleChange}
                      placeholder="1200"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">24 Hours Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="text"
                      name="price24"
                      value={formData.price24}
                      onChange={handleChange}
                      placeholder="2000"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {formData.type === "car" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Seating *</label>
                    <select
                      name="seating"
                      value={formData.seating}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="2">2 Seater</option>
                      <option value="4">4 Seater</option>
                      <option value="5">5 Seater</option>
                      <option value="7">7 Seater</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Transmission *</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-3 h-32 w-full object-cover rounded-lg" />
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingVehicle(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
                >
                  {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                  <p className="font-semibold text-gray-900">#{selectedBooking.id.split(':')[1]}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${selectedBooking.status === "completed" ? "bg-green-100 text-green-700" :
                      selectedBooking.status === "active" ? "bg-blue-100 text-blue-700" :
                        selectedBooking.status === "confirmed" ? "bg-cyan-100 text-cyan-700" :
                          "bg-yellow-100 text-yellow-700"
                    }`}>
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Customer Name</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vehicle</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.vehicleName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pickup Date</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.pickupDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Return Date</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.returnDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">{selectedBooking.totalAmount}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition"
                >
                  Close
                </button>
                {selectedBooking.status === "pending" && (
                  <button
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, "confirmed");
                      setSelectedBooking(null);
                    }}
                    className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}