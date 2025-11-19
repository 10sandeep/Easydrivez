"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  Bike,
  Users,
  Package,
  TrendingUp,
  Calendar,
  DollarSign,
  BarChart3,
  Filter,
  Download,
  Search,
  Edit2,
  Trash2,
  Eye,
  Plus,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  LogOut,
  User,
  Shield,
  Loader2,
} from "lucide-react";

interface Car {
  _id: string;
  carPicturate: string;
  vehicleType: string;
  brand: string;
  modelName: string;
  fuelType: string;
  transmission: string;
  seatingCapacity: number;
  priceFor12Hours: number;
  priceFor24Hours: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  description?: string
}

interface Bike {
  _id: string;
  bikeImage: string;
  brand: string;
  model: string;
  seater: number;
  type: string;
  cc: number;
  rating: number;
  category: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  description?: string
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

interface VehicleDisplay {
  id: string;
  name: string;
  type: "Car" | "Bike";
  category: string;
  image: string;
  price12: string;
  price24: string;
  pricePerDay: number;
  fuelType: string;
  seating: string;
  features: string[];
  available: boolean;
  rating?: number;
  cc?: number;
}

interface Booking {
  _id: string;
  vehicleId: string;
  vehicleType: "car" | "bike";
  vehicleDetails: {
    brand: string;
    model: string;
    image?: string;
    type?: string;
    cc?: number;
    seater?: number;
    category?: string;
  };
  customer: {
    name: string;
    email: string;
    mobile: string;
  };
  rental: {
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
    duration: string;
    totalPrice: string;
  };
  status: "pending" | "approved" | "rejected" | "completed";
  createdAt: string;
  updatedAt?: string;
}

interface FormData {
  brand: string;
  model: string;
  image: string;
  available: boolean;
  vehicleType: string;
  fuelType: string;
  transmission: string;
  seatingCapacity: string;
  priceFor12Hours: string;
  priceFor24Hours: string;
  seater: string;
  bikeType: string;
  cc: string;
  rating: string;
  category: string;
  description: string
}

interface BlogFormData {
  title: string;
  description: string;
  category: string;
  author: string;
  content: string;
  image: string | File | null;
}

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "vehicles" | "bookings" | "reports" | "blog"
  >("dashboard");
  const [cars, setCars] = useState<Car[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [vehicleSubTab, setVehicleSubTab] = useState<"car" | "bike">("car");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<{
    item: Car | Bike;
    type: "car" | "bike";
  } | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formType, setFormType] = useState<"car" | "bike">("car");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [isBlogSubmitting, setIsBlogSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [vehicleImageFile, setVehicleImageFile] = useState<File | null>(null);
  const [vehicleImagePreview, setVehicleImagePreview] = useState<string | null>(
    null
  );

  const handleVehicleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setVehicleImageFile(file);
      if (vehicleImagePreview) {
        URL.revokeObjectURL(vehicleImagePreview);
      }
      setVehicleImagePreview(URL.createObjectURL(file));
    }
  };
  const [formData, setFormData] = useState<FormData>({
    brand: "",
    model: "",
    image: "",
    available: true,
    vehicleType: "",
    fuelType: "",
    transmission: "",
    seatingCapacity: "5",
    priceFor12Hours: "",
    priceFor24Hours: "",
    seater: "2",
    bikeType: "",
    cc: "",
    rating: "",
    category: "",
    description: ""
  });
  const [blogFormData, setBlogFormData] = useState<BlogFormData>({
    title: "",
    description: "",
    category: "",
    author: "Rideez",
    content: "",
    image: null,
  });

  // ✅ Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 [AdminPanel] Checking authentication...");

      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          console.log("❌ [AdminPanel] No token found in localStorage");
          router.push("/adminlogin");
          return;
        }

        console.log("🎫 [AdminPanel] Token found, verifying...");

        const res = await fetch("/api/adminverify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();
        console.log("📡 [AdminPanel] Verification response:", data);

        if (data.status && data.admin) {
          console.log("✅ [AdminPanel] Authentication successful");
          setAdminEmail(data.admin.email || "admin@example.com");
          setIsAuthenticated(true);
        } else {
          console.log("❌ [AdminPanel] Authentication failed, redirecting...");
          localStorage.removeItem("adminToken");
          router.push("/adminlogin");
        }
      } catch (error) {
        console.error("❌ [AdminPanel] Auth check error:", error);
        localStorage.removeItem("adminToken");
        router.push("/adminlogin");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // ✅ Fetch vehicles from API
  const fetchVehicles = async () => {
    if (!isAuthenticated) return;

    try {
      setVehiclesLoading(true);
      console.log("📡 [AdminPanel] Fetching vehicles...");

      const [carRes, bikeRes] = await Promise.all([
        fetch("/api/car", { cache: "no-store" }),
        fetch("/api/bike", { cache: "no-store" }),
      ]);

      const carData = await carRes.json();
      const bikeData = await bikeRes.json();

      console.log(bikeData)

      console.log("🚗 [AdminPanel] Cars response:", carData);
      console.log("🏍️ [AdminPanel] Bikes response:", bikeData);

      if (carData.status && carData.cars) {
        setCars(carData.cars);
      }
      if (bikeData.status && bikeData.bikes) {
        setBikes(bikeData.bikes);
      }
    } catch (error) {
      console.error("❌ [AdminPanel] Error fetching vehicles:", error);
    } finally {
      setVehiclesLoading(false);
    }
  };

  // ✅ Fetch blogs from API
  const fetchBlogs = async () => {
    if (!isAuthenticated) return;

    try {
      setBlogsLoading(true);
      console.log("📡 [AdminPanel] Fetching blogs...");

      const res = await fetch("/api/blog", { cache: "no-store" });

      const data = await res.json();
      console.log("📝 [AdminPanel] Blogs response:", data);

      if (data.status && data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("❌ [AdminPanel] Error fetching blogs:", error);
    } finally {
      setBlogsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchVehicles();
      fetchBlogs();
    }
  }, [isAuthenticated]);

  // ✅ Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      if (!isAuthenticated) return;

      try {
        setBookingsLoading(true);
        console.log("📡 [AdminPanel] Fetching bookings...");

        const res = await fetch("/api/bookings", {
          cache: "no-store",
        });

        const data = await res.json();
        console.log("📦 [AdminPanel] Bookings response:", data);

        if (data.success && data.bookings) {
          setBookings(data.bookings);
          console.log("✅ [AdminPanel] Bookings loaded:", data.bookings.length);
        } else {
          console.error("❌ [AdminPanel] Failed to fetch bookings");
        }
      } catch (error) {
        console.error("❌ [AdminPanel] Error fetching bookings:", error);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated]);

  // ✅ Logout handler
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      console.log("🚪 [AdminPanel] Logging out...");

      // Clear localStorage
      localStorage.removeItem("adminToken");

      // Clear cookies
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      console.log("✅ [AdminPanel] Logout successful, redirecting...");

      // Redirect to login
      window.location.href = "/adminlogin";
    }
  };

  // ✅ Calculate Statistics from Real Data
  const stats = {
    totalVehicles: cars.length + bikes.length,
    totalCars: cars.length,
    totalBikes: bikes.length,
    totalBlogs: blogs.length,
    totalBookings: bookings.length,
    activeBookings: bookings.filter((b) => b.status === "approved").length,
    completedBookings: bookings.filter((b) => b.status === "completed").length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    rejectedBookings: bookings.filter((b) => b.status === "rejected").length,
    totalRevenue: bookings
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => {
        const price = b.rental.totalPrice.replace(/[^0-9]/g, "");
        return sum + parseFloat(price || "0");
      }, 0),
    totalCarsBooked: bookings.filter((b) => b.vehicleType === "car").length,
    totalBikesBooked: bookings.filter((b) => b.vehicleType === "bike").length,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlogChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBlogFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlogImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setBlogFormData((prev) => ({ ...prev, image: file }));
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, available: e.target.checked }));
  };

  const handleAdd = () => {
    setEditingVehicle(null);
    setFormType(vehicleSubTab);
    setFormData({
      brand: "",
      model: "",
      image: "",
      available: true,
      vehicleType: "",
      fuelType: "Petrol",
      transmission: "Automatic",
      seatingCapacity: "5",
      priceFor12Hours: "",
      priceFor24Hours: "",
      seater: "2",
      bikeType: "",
      cc: "",
      rating: "4.5",
      category: "",
      description: ""
    });
    setVehicleImageFile(null);
    if (vehicleImagePreview) {
      URL.revokeObjectURL(vehicleImagePreview);
    }
    setVehicleImagePreview(null);
    setIsFormOpen(true);
  };

  const handleBlogAdd = () => {
    setEditingBlog(null);
    setBlogFormData({
      title: "",
      description: "",
      category: "",
      author: "Rideez",
      content: "",
      image: null,
    });
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setIsBlogFormOpen(true);
  };

  const handleEdit = (item: Car | Bike, type: "car" | "bike") => {
    setFormType(type);
    if (type === "car") {
      const c = item as Car;
      setFormData({
        brand: c.brand,
        model: c.modelName,
        image: c.carPicturate,
        available: c.available,
        vehicleType: c.vehicleType,
        fuelType: c.fuelType,
        transmission: c.transmission,
        seatingCapacity: c.seatingCapacity.toString(),
        priceFor12Hours: c.priceFor12Hours.toString(),
        priceFor24Hours: c.priceFor24Hours.toString(),
        seater: "2",
        bikeType: "",
        cc: "",
        rating: "",
        category: "",
        description: c.description || ""
      });
      setVehicleImagePreview(c.carPicturate);
    } else {
      const b = item as Bike;
      setFormData({
        brand: b.brand,
        model: b.model,
        image: b.bikeImage,
        available: b.available,
        vehicleType: "",
        fuelType: "",
        transmission: "",
        seatingCapacity: "5",
        priceFor12Hours: "",
        priceFor24Hours: "",
        seater: b.seater.toString(),
        bikeType: b.type,
        cc: b.cc.toString(),
        rating: b.rating.toString(),
        category: b.category,
        description: b.description || ""
      });
      setVehicleImagePreview(b.bikeImage);
    }
    setVehicleImageFile(null);
    setEditingVehicle({ item, type });
    setIsFormOpen(true);
  };

  const handleBlogEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogFormData({
      title: blog.title,
      description: blog.description,
      category: blog.category,
      author: blog.author,
      content: blog.content,
      image: blog.image,
    });
    setPreviewUrl(blog.image);
    setIsBlogFormOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.brand || !formData.model) {
      alert("Please fill in all required fields");
      return;
    }

    // For new vehicles, require image file
    if (!editingVehicle && !vehicleImageFile) {
      alert("Please upload an image");
      return;
    }

    if (
      formType === "car" &&
      (!formData.priceFor12Hours || !formData.priceFor24Hours)
    ) {
      alert("Please fill in price fields for car");
      return;
    }

    try {
      const formDataToSend = new FormData();

      if (formType === "car") {
        formDataToSend.append("brand", formData.brand);
        formDataToSend.append("modelName", formData.model);
        formDataToSend.append("available", formData.available.toString());
        formDataToSend.append("vehicleType", formData.vehicleType);
        formDataToSend.append("fuelType", formData.fuelType);
        formDataToSend.append("transmission", formData.transmission);
        formDataToSend.append("seatingCapacity", formData.seatingCapacity);
        formDataToSend.append("priceFor12Hours", formData.priceFor12Hours);
        formDataToSend.append("priceFor24Hours", formData.priceFor24Hours);
        formDataToSend.append("description", formData.description);

        // Add image file or keep existing URL
        if (vehicleImageFile) {
          formDataToSend.append("carPicturate", vehicleImageFile);
        } else if (editingVehicle && formData.image) {
          formDataToSend.append("carPicturate", formData.image);
        }
      } else {
        formDataToSend.append("brand", formData.brand);
        formDataToSend.append("model", formData.model);
        formDataToSend.append("available", formData.available.toString());
        formDataToSend.append("seater", formData.seater);
        formDataToSend.append("type", formData.bikeType);
        formDataToSend.append("cc", formData.cc);
        formDataToSend.append("rating", formData.rating);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("priceFor12Hours", formData.priceFor12Hours);
        formDataToSend.append("priceFor24Hours", formData.priceFor24Hours);
        formDataToSend.append("description", formData.description);

        // Add image file or keep existing URL
        if (vehicleImageFile) {
          formDataToSend.append("bikeImage", vehicleImageFile);
        } else if (editingVehicle && formData.image) {
          formDataToSend.append("bikeImage", formData.image);
        }
      }

      if (editingVehicle) {
        formDataToSend.append("id", editingVehicle.item._id);
      }

      const method = editingVehicle ? "PUT" : "POST";

      const url = editingVehicle
        ? `/api/${formType}` // e.g. /api/car or /api/bike when editing
        : `/api/${formType === "car" ? "createcar" : "createbike"}`; // e.g. /api/createcar or /api/createbike when creating

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const data = await res.json();

      if (data.status) {
        fetchVehicles(); // Refresh list
        alert(
          editingVehicle
            ? "Vehicle updated successfully!"
            : "Vehicle added successfully!"
        );
        setIsFormOpen(false);
        setEditingVehicle(null);
        setVehicleImageFile(null);
        if (vehicleImagePreview) {
          URL.revokeObjectURL(vehicleImagePreview);
        }
        setVehicleImagePreview(null);
      } else {
        alert(
          editingVehicle ? "Failed to update vehicle" : "Failed to add vehicle"
        );
      }
    } catch (error) {
      console.error("Error handling vehicle:", error);
      alert("Error handling vehicle");
    }

    // Reset form
    setFormData({
      brand: "",
      model: "",
      image: "",
      available: true,
      vehicleType: "",
      fuelType: "",
      transmission: "",
      seatingCapacity: "5",
      priceFor12Hours: "",
      priceFor24Hours: "",
      seater: "2",
      bikeType: "",
      cc: "",
      rating: "",
      category: "",
      description: ""
    });
  };

  // const handleBlogSubmit = async () => {
  //   if (
  //     !blogFormData.title ||
  //     !blogFormData.description ||
  //     !blogFormData.content ||
  //     !blogFormData.image
  //   ) {
  //     alert("Please fill all required fields");
  //     return;
  //   }

  //   const formDataToSend = new FormData();
  //   formDataToSend.append("title", blogFormData.title);
  //   formDataToSend.append("description", blogFormData.description);
  //   formDataToSend.append("category", blogFormData.category);
  //   formDataToSend.append("author", blogFormData.author);
  //   formDataToSend.append("content", blogFormData.content);

  //   console.log(
  //     "Form data to send from admin page ...............",
  //     formDataToSend
  //   );

  //   if (blogFormData.image) {
  //     if (blogFormData.image instanceof File) {
  //       formDataToSend.append("image", blogFormData.image);
  //     } else {
  //       formDataToSend.append("image", blogFormData.image);
  //     }
  //   }

  //   try {
  //     setIsBlogSubmitting(true);
  //     const method = editingBlog ? "PUT" : "POST";
  //     const url = editingBlog ? `/api/blog/${editingBlog._id}` : "/api/blog";

  //     const res = await fetch(url, {
  //       method,
  //       body: JSON.stringify(blogFormData),
  //     });

  //     const data = await res.json();

  //     if (data.status || data.success) {
  //       await fetchBlogs();
  //       alert(
  //         editingBlog
  //           ? "Blog updated successfully!"
  //           : "Blog added successfully!"
  //       );
  //       setIsBlogFormOpen(false);
  //       setEditingBlog(null);
  //       setBlogFormData({
  //         title: "",
  //         description: "",
  //         category: "",
  //         author: "Rideez",
  //         content: "",
  //         image: null,
  //       });
  //       if (previewUrl) {
  //         URL.revokeObjectURL(previewUrl);
  //       }
  //       setPreviewUrl(null);
  //     } else {
  //       alert(editingBlog ? "Failed to update blog" : "Failed to add blog");
  //     }
  //   } catch (error) {
  //     console.error("Error handling blog:", error);
  //     alert("Error handling blog");
  //   } finally {
  //     setIsBlogSubmitting(false);
  //   }
  // };
  const handleBlogSubmit = async () => {
    if (
      !blogFormData.title ||
      !blogFormData.description ||
      !blogFormData.content ||
      !blogFormData.image
    ) {
      alert("Please fill all required fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", blogFormData.title);
    formDataToSend.append("description", blogFormData.description);
    formDataToSend.append("category", blogFormData.category);
    formDataToSend.append("author", blogFormData.author);
    formDataToSend.append("content", blogFormData.content);

    if (blogFormData.image instanceof File) {
      formDataToSend.append("image", blogFormData.image);
    } else if (typeof blogFormData.image === "string") {
      formDataToSend.append("image", blogFormData.image); // existing URL when editing
    }

    try {
      setIsBlogSubmitting(true);
      const method = editingBlog ? "PUT" : "POST";
      const url = editingBlog ? `/api/blog/${editingBlog._id}` : "/api/blog";

      const res = await fetch(url, {
        method,
        body: formDataToSend, // ← THIS IS THE FIX
        // DO NOT set headers! Let browser auto-set multipart boundary
      });

      const data = await res.json();

      if (data.status || data.success) {
        await fetchBlogs();
        alert(editingBlog ? "Blog updated!" : "Blog created!");
        closeBlogForm(); // reuse your cleanup function
      } else {
        alert(data.message || "Failed to save blog");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Try again.");
    } finally {
      setIsBlogSubmitting(false);
    }
  };

  const handleDelete = async (id: string, type: "car" | "bike") => {
    if (
      !confirm(
        "Are you sure you want to delete this vehicle? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/${type}?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.status) {
        // Only remove from state if API confirms success
        if (type === "car") {
          setCars(cars.filter((c) => c._id !== id));
        } else {
          setBikes(bikes.filter((b) => b._id !== id));
        }
        alert(
          `${type.charAt(0).toUpperCase() + type.slice(1)
          } deleted successfully!`
        );
      } else {
        alert(data.message || "Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting vehicle. Please try again.");
    }
  };

  const handleBlogDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await fetch(`/api/blog/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (data.status || data.success) {
          await fetchBlogs();
          alert("Blog deleted successfully!");
        } else {
          alert("Failed to delete blog");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Error deleting blog");
      }
    }
  };

  // ✅ Update booking status via API
  const updateBookingStatus = async (
    bookingId: string,
    newStatus: "pending" | "approved" | "rejected" | "completed"
  ) => {
    try {
      console.log(
        `🔄 [AdminPanel] Updating booking ${bookingId} to ${newStatus}...`
      );

      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        setBookings(
          bookings.map((b) =>
            b._id === bookingId ? { ...b, status: newStatus } : b
          )
        );
        alert(`Booking ${newStatus} successfully!`);
        console.log("✅ [AdminPanel] Booking updated successfully");
      } else {
        alert("Failed to update booking status");
        console.error("❌ [AdminPanel] Failed to update booking");
      }
    } catch (error) {
      console.error("❌ [AdminPanel] Error updating booking:", error);
      alert("Error updating booking status");
    }
  };

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      statistics: stats,
      cars,
      bikes,
      blogs,
      bookings,
    };
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `admin-report-${new Date().toISOString().split("T")[0]
      }.json`;
    link.click();
  };

  const mapCarToDisplay = (car: Car): VehicleDisplay => ({
    id: car._id,
    name: `${car.brand} ${car.modelName}`,
    type: "Car",
    category: car.vehicleType,
    image: car.carPicturate,
    price12: `₹${car.priceFor12Hours.toLocaleString()}`,
    price24: `₹${car.priceFor24Hours.toLocaleString()}`,
    pricePerDay: car.priceFor24Hours,
    fuelType: car.fuelType.toLowerCase(),
    seating: car.seatingCapacity.toString(),
    features: [
      `${car.seatingCapacity} Seater`,
      car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1),
      car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1),
    ],
    available: car.available,
  });

  const mapBikeToDisplay = (bike: Bike): VehicleDisplay => ({
    id: bike._id,
    name: `${bike.brand} ${bike.model}`,
    type: "Bike",
    category: bike.category,
    image: bike.bikeImage,
    price12: `₹${bike.priceFor12Hours?.toLocaleString()}`,
    price24: `₹${bike.priceFor24Hours?.toLocaleString()}`,
    pricePerDay: Math.round(bike.cc * 2.5),
    fuelType: "petrol",
    seating: bike.seater.toString(),
    features: [
      `${bike.seater} Seater`,
      "Manual",
      "Petrol",
      `${bike.cc}cc`,
      `Rating: ${bike.rating}`,
    ],
    available: bike.available,
    rating: bike.rating,
    cc: bike.cc,

  });

  const getFilteredVehicles = (): VehicleDisplay[] => {
    const list = vehicleSubTab === "car" ? cars : bikes;
    const searchLower = searchTerm.toLowerCase();
    return list
      .filter((item) => {
        const name = `${item.brand} ${vehicleSubTab === "car"
          ? (item as Car).modelName
          : (item as Bike).model
          }`.toLowerCase();
        return name.includes(searchLower);
      })
      .map((item) =>
        vehicleSubTab === "car"
          ? mapCarToDisplay(item as Car)
          : mapBikeToDisplay(item as Bike)
      );
  };

  const filteredBookings = bookings.filter((b) => {
    const vehicleName = `${b.vehicleDetails.brand} ${b.vehicleDetails.model}`;
    const matchesSearch =
      vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeBlogForm = () => {
    setIsBlogFormOpen(false);
    setEditingBlog(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  // ✅ Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mb-4"></div>
          <p className="text-gray-600 font-medium">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  // ✅ Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-2 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Admin Panel
          </h1>

          {/* ✅ Admin Badge in Header */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Sticky Navigation Tabs with Profile Menu */}
        <div className="bg-white rounded-xl my-14 shadow-sm border border-gray-200 mb-6 sticky top-24 z-40">
          <div className="flex items-center justify-between p-4">
            <nav className="flex gap-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                { id: "vehicles", label: "Vehicles", icon: Package },
                { id: "bookings", label: "Bookings", icon: Calendar },
                { id: "blog", label: "Blog", icon: FileText },
                { id: "reports", label: "Reports", icon: TrendingUp },
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

            <div className="flex items-center gap-3">
              <button
                onClick={exportReport}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition font-medium shadow-sm"
              >
                <Download className="h-4 w-4" />
                Export Report
              </button>

              {/* ✅ Admin Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden md:block">
                    Admin
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowProfileMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          Admin Account
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {adminEmail}
                        </p>
                      </div>
                      <div className="px-2 py-2">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-green-50">
                          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-green-700 font-medium">
                            Active Session
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 mt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition text-sm font-medium"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
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
                    <p className="text-sm text-gray-600 font-medium">
                      Total Vehicles
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.totalVehicles}
                    </p>
                    <div className="flex gap-3 mt-3">
                      <span className="text-xs text-gray-600">
                        <Car className="h-3 w-3 inline mr-1" />
                        {stats.totalCars} Cars
                      </span>
                      <span className="text-xs text-gray-600">
                        <Bike className="h-3 w-3 inline mr-1" />
                        {stats.totalBikes} Bikes
                      </span>
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
                    <p className="text-sm text-gray-600 font-medium">
                      Total Bookings
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.totalBookings}
                    </p>
                    <p className="text-xs text-gray-600 mt-3 flex items-center gap-1">
                      <Car className="h-3 w-3" />
                      {stats.totalCarsBooked} Cars | {stats.totalBikesBooked}{" "}
                      Bikes
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
                    <p className="text-sm text-gray-600 font-medium">
                      Active Bookings
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.activeBookings}
                    </p>
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
                    <p className="text-sm text-gray-600 font-medium">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      ₹{stats.totalRevenue.toLocaleString()}
                    </p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Recent Bookings
                </h3>
                {bookingsLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                    <p className="text-sm text-gray-600 mt-2">
                      Loading bookings...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking) => (
                      <div
                        key={booking._id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {booking.customer.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {booking.vehicleDetails.brand}{" "}
                            {booking.vehicleDetails.model}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "approved"
                              ? "bg-blue-100 text-blue-700"
                              : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    ))}
                    {bookings.length === 0 && (
                      <p className="text-center text-gray-500 py-8">
                        No bookings found
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Booking Status Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Booking Status Overview
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-semibold text-gray-900">
                        {stats.pendingBookings}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${stats.totalBookings > 0
                            ? (stats.pendingBookings / stats.totalBookings) *
                            100
                            : 0
                            }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Approved/Active</span>
                      <span className="font-semibold text-gray-900">
                        {stats.activeBookings}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${stats.totalBookings > 0
                            ? (stats.activeBookings / stats.totalBookings) *
                            100
                            : 0
                            }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-semibold text-gray-900">
                        {stats.completedBookings}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${stats.totalBookings > 0
                            ? (stats.completedBookings /
                              stats.totalBookings) *
                            100
                            : 0
                            }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Rejected</span>
                      <span className="font-semibold text-gray-900">
                        {stats.rejectedBookings}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${stats.totalBookings > 0
                            ? (stats.rejectedBookings / stats.totalBookings) *
                            100
                            : 0
                            }%`,
                        }}
                      ></div>
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
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition font-medium shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add {vehicleSubTab === "car" ? "Car" : "Bike"}
              </button>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setVehicleSubTab("car")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${vehicleSubTab === "car"
                  ? "bg-yellow-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <Car className="h-4 w-4" />
                Cars ({cars.length})
              </button>
              <button
                onClick={() => setVehicleSubTab("bike")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${vehicleSubTab === "bike"
                  ? "bg-yellow-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <Bike className="h-4 w-4" />
                Bikes ({bikes.length})
              </button>
            </div>

            {vehiclesLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Loading vehicles...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredVehicles().map((vehicle) => {
                  const originalItem =
                    vehicleSubTab === "car"
                      ? cars.find((c) => c._id === vehicle.id)
                      : bikes.find((b) => b._id === vehicle.id);
                  return (
                    <div
                      key={vehicle.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition relative"
                    >
                      <div className="relative h-48">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-900 shadow-sm">
                          {vehicle.type}
                        </span>
                        {!vehicle.available && (
                          <span className="absolute top-3 right-3 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            Unavailable
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">
                          {vehicle.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {vehicle.category}
                        </p>
                        <div className="flex gap-2 mb-3 flex-wrap">
                          {vehicle.features.map((f, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                          <div>
                            <p className="text-xs text-gray-600">12 hrs</p>
                            <p className="font-bold text-gray-900">
                              {vehicle.price12}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">24 hrs</p>
                            <p className="font-bold text-gray-900">
                              {vehicle.price24}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() =>
                              originalItem &&
                              handleEdit(originalItem, vehicleSubTab)
                            }
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition text-sm font-medium"
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(vehicle.id, vehicleSubTab)
                            }
                            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition text-sm font-medium"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {getFilteredVehicles().length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No {vehicleSubTab} found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <button
                onClick={handleBlogAdd}
                className="flex items-center gap-2 px-4 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition font-medium shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add Blog
              </button>
            </div>

            {blogsLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Loading blogs...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
                  >
                    <div className="relative h-48">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {blog.description}
                      </p>
                      <div className="flex gap-2 mb-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {blog.category}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          by {blog.author}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBlogEdit(blog)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition text-sm font-medium"
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleBlogDelete(blog._id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition text-sm font-medium"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredBlogs.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No blogs found</p>
                  </div>
                )}
              </div>
            )}
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
                  className="w-full pl-10 pr-4 py-2.5 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 text-black py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {bookingsLoading ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mb-4"></div>
                <p className="text-gray-600 font-medium">Loading bookings...</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                          Booking ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                          Vehicle
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                          Duration
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredBookings.map((booking) => (
                        <tr
                          key={booking._id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-900">
                              #{booking._id.slice(-6)}
                            </p>
                            <p className="text-xs text-gray-600">
                              {new Date(booking.createdAt).toLocaleDateString()}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-900">
                              {booking.customer.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {booking.customer.mobile}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-900">
                              {booking.vehicleDetails.brand}{" "}
                              {booking.vehicleDetails.model}
                            </p>
                            <p className="text-xs text-gray-600">
                              {booking.vehicleType}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-900">
                              {booking.rental.duration}
                            </p>
                            <p className="text-xs text-gray-600">
                              {booking.rental.pickupDate}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-gray-900">
                              {booking.rental.totalPrice}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "approved"
                                  ? "bg-blue-100 text-blue-700"
                                  : booking.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                            >
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
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
                                <>
                                  <button
                                    onClick={() =>
                                      updateBookingStatus(
                                        booking._id,
                                        "approved"
                                      )
                                    }
                                    className="p-2 hover:bg-green-50 rounded-lg transition"
                                    title="Approve Booking"
                                  >
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateBookingStatus(
                                        booking._id,
                                        "rejected"
                                      )
                                    }
                                    className="p-2 hover:bg-red-50 rounded-lg transition"
                                    title="Reject Booking"
                                  >
                                    <X className="h-4 w-4 text-red-600" />
                                  </button>
                                </>
                              )}
                              {booking.status === "approved" && (
                                <>
                                  <button
                                    onClick={() =>
                                      updateBookingStatus(
                                        booking._id,
                                        "completed"
                                      )
                                    }
                                    className="p-2 hover:bg-purple-50 rounded-lg transition"
                                    title="Mark as Completed"
                                  >
                                    <CheckCircle className="h-4 w-4 text-purple-600" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateBookingStatus(
                                        booking._id,
                                        "rejected"
                                      )
                                    }
                                    className="p-2 hover:bg-red-50 rounded-lg transition"
                                    title="Cancel Booking"
                                  >
                                    <X className="h-4 w-4 text-red-600" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No bookings found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Report */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Revenue Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{stats.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">From Cars</p>
                      <p className="text-lg font-bold text-gray-900">
                        ₹
                        {bookings
                          .filter(
                            (b) =>
                              b.vehicleType === "car" &&
                              b.status === "completed"
                          )
                          .reduce(
                            (sum, b) =>
                              sum +
                              parseFloat(
                                b.rental.totalPrice.replace(/[^0-9]/g, "") ||
                                "0"
                              ),
                            0
                          )
                          .toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">From Bikes</p>
                      <p className="text-lg font-bold text-gray-900">
                        ₹
                        {bookings
                          .filter(
                            (b) =>
                              b.vehicleType === "bike" &&
                              b.status === "completed"
                          )
                          .reduce(
                            (sum, b) =>
                              sum +
                              parseFloat(
                                b.rental.totalPrice.replace(/[^0-9]/g, "") ||
                                "0"
                              ),
                            0
                          )
                          .toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Statistics */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Booking Statistics
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Total Bookings",
                      value: stats.totalBookings,
                      color: "text-blue-600",
                    },
                    {
                      label: "Completed",
                      value: stats.completedBookings,
                      color: "text-green-600",
                    },
                    {
                      label: "Active/Approved",
                      value: stats.activeBookings,
                      color: "text-orange-600",
                    },
                    {
                      label: "Pending",
                      value: stats.pendingBookings,
                      color: "text-yellow-600",
                    },
                    {
                      label: "Rejected",
                      value: stats.rejectedBookings,
                      color: "text-red-600",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">
                        {item.label}
                      </span>
                      <span className={`text-lg font-bold ${item.color}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-blue-600">
                    {new Set(bookings.map((b) => b.customer.mobile)).size}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Total Customers</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-green-600">
                    {stats.completedBookings > 0
                      ? Math.round(
                        (stats.completedBookings / stats.totalBookings) * 100
                      )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Completion Rate</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <Package className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-purple-600">
                    ₹
                    {stats.totalRevenue > 0 && stats.completedBookings > 0
                      ? Math.round(
                        stats.totalRevenue / stats.completedBookings
                      ).toLocaleString()
                      : 0}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Avg. Booking Value
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingVehicle
                    ? `Edit ${formType.charAt(0).toUpperCase() + formType.slice(1)}`
                    : `Add New ${formType.charAt(0).toUpperCase() + formType.slice(1)}`}{" "}
                  Vehicle
                </h2>
                <button
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingVehicle(null);
                    setVehicleImageFile(null);
                    if (vehicleImagePreview) {
                      URL.revokeObjectURL(vehicleImagePreview);
                    }
                    setVehicleImagePreview(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="space-y-4">
                  {/* Common Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Brand *
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Honda"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Model *
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="City ZX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* NEW: Description Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter vehicle description, features, and other details..."
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {formType === "car" ? "Car" : "Bike"} Image *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleVehicleImageChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {vehicleImagePreview && (
                      <img
                        src={vehicleImagePreview}
                        alt="Preview"
                        className="mt-3 h-32 w-full object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Available
                    </label>
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  {/* Car Specific Fields */}
                  {formType === "car" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Vehicle Type *
                        </label>
                        <select
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Type</option>
                          <option value="Sedan">Sedan</option>
                          <option value="SUV">SUV</option>
                          <option value="Hatchback">Hatchback</option>
                          <option value="Luxury">Luxury</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Fuel Type *
                        </label>
                        <select
                          name="fuelType"
                          value={formData.fuelType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Fuel</option>
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Electric">Electric</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Transmission *
                        </label>
                        <select
                          name="transmission"
                          value={formData.transmission}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Transmission</option>
                          <option value="Manual">Manual</option>
                          <option value="Automatic">Automatic</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Seating Capacity *
                        </label>
                        <select
                          name="seatingCapacity"
                          value={formData.seatingCapacity}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="4">4 Seater</option>
                          <option value="5">5 Seater</option>
                          <option value="7">7 Seater</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          12 Hours Price *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            ₹
                          </span>
                          <input
                            type="text"
                            name="priceFor12Hours"
                            value={formData.priceFor12Hours}
                            onChange={handleChange}
                            placeholder="2000"
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          24 Hours Price *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            ₹
                          </span>
                          <input
                            type="text"
                            name="priceFor24Hours"
                            value={formData.priceFor24Hours}
                            onChange={handleChange}
                            placeholder="3500"
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bike Specific Fields */}
                  {formType === "bike" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bike Type *
                        </label>
                        <select
                          name="bikeType"
                          value={formData.bikeType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Type</option>
                          <option value="Cruise">Cruise</option>
                          <option value="Standard">Standard</option>
                          <option value="Sport">Sport</option>
                          <option value="Scooter">Scooter</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Category</option>
                          <option value="Premium">Premium</option>
                          <option value="Standard">Standard</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Seater *
                        </label>
                        <select
                          name="seater"
                          value={formData.seater}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="1">1 Seater</option>
                          <option value="2">2 Seater</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">12 Hours Price *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <input
                            type="text"
                            name="priceFor12Hours"
                            value={formData.priceFor12Hours}
                            onChange={handleChange}
                            placeholder="2000"
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
                            name="priceFor24Hours"
                            value={formData.priceFor24Hours}
                            onChange={handleChange}
                            placeholder="3500"
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CC *</label>
                        <input
                          type="number"
                          name="cc"
                          value={formData.cc}
                          onChange={handleChange}
                          placeholder="350"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Rating
                        </label>
                        <input
                          type="number"
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}
                          min="0"
                          max="5"
                          step="0.1"
                          placeholder="4.8"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setIsFormOpen(false);
                      setEditingVehicle(null);
                      setVehicleImageFile(null);
                      if (vehicleImagePreview) {
                        URL.revokeObjectURL(vehicleImagePreview);
                      }
                      setVehicleImagePreview(null);
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

        {/* Blog Form Modal */}
        {isBlogFormOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingBlog ? "Edit" : "Add New"} Blog
                </h2>
                <button
                  onClick={closeBlogForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={blogFormData.title}
                      onChange={handleBlogChange}
                      placeholder="Enter blog title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={blogFormData.description}
                      onChange={handleBlogChange}
                      placeholder="Enter blog description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={blogFormData.category}
                        onChange={handleBlogChange}
                        placeholder="e.g., Safety"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Author *
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={blogFormData.author}
                        onChange={handleBlogChange}
                        placeholder="e.g., Rideez"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      name="content"
                      rows={10}
                      value={blogFormData.content}
                      onChange={handleBlogChange}
                      placeholder="Enter blog content"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBlogImageChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mt-3 h-32 w-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={closeBlogForm}
                    className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBlogSubmit}
                    disabled={isBlogSubmitting}
                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold rounded-lg transition flex items-center justify-center"
                  >
                    {isBlogSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {editingBlog ? "Updating..." : "Creating..."}
                      </>
                    ) : editingBlog ? (
                      "Update Blog"
                    ) : (
                      "Create Blog"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  Booking Details
                </h2>
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
                    <p className="font-semibold text-gray-900">
                      #{selectedBooking._id.slice(-8)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${selectedBooking.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : selectedBooking.status === "approved"
                          ? "bg-blue-100 text-blue-700"
                          : selectedBooking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {selectedBooking.status.charAt(0).toUpperCase() +
                        selectedBooking.status.slice(1)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Vehicle</p>
                    <div className="flex items-center gap-3">
                      {selectedBooking.vehicleDetails.image && (
                        <img
                          src={selectedBooking.vehicleDetails.image}
                          alt={`${selectedBooking.vehicleDetails.brand} ${selectedBooking.vehicleDetails.model}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">
                          {selectedBooking.vehicleDetails.brand}{" "}
                          {selectedBooking.vehicleDetails.model}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedBooking.vehicleType} |{" "}
                          {selectedBooking.vehicleDetails.category}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Customer Name</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.customer.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.customer.mobile}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.customer.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Pickup Date & Time
                    </p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.rental.pickupDate} at{" "}
                      {selectedBooking.rental.pickupTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Return Date & Time
                    </p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.rental.dropoffDate} at{" "}
                      {selectedBooking.rental.dropoffTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.rental.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      {selectedBooking.rental.totalPrice}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Booked On</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(selectedBooking.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {selectedBooking.updatedAt && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedBooking.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition"
                  >
                    Close
                  </button>
                  {selectedBooking.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking._id, "approved");
                          setSelectedBooking(null);
                        }}
                        className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
                      >
                        Approve Booking
                      </button>
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking._id, "rejected");
                          setSelectedBooking(null);
                        }}
                        className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
                      >
                        Reject Booking
                      </button>
                    </>
                  )}
                  {selectedBooking.status === "approved" && (
                    <>
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking._id, "completed");
                          setSelectedBooking(null);
                        }}
                        className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition"
                      >
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking._id, "rejected");
                          setSelectedBooking(null);
                        }}
                        className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
