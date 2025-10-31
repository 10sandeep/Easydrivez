"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // ✅ Auto-verify existing session on page load
  useEffect(() => {
    console.log("🔍 [AdminLogin] useEffect - Starting session verification");
    console.log("📍 [AdminLogin] Current pathname:", pathname);

    const verifySession = async () => {
      try {
        // ✅ Get token from localStorage
        const token = localStorage.getItem("adminToken");
        console.log("💾 [AdminLogin] Token from localStorage:", token ? "EXISTS" : "MISSING");

        if (!token) {
          console.log("❌ [AdminLogin] No token in localStorage");
          setIsChecking(false);
          return;
        }

        console.log("📡 [AdminLogin] Calling /api/adminverify with token...");

        // ✅ Send token in Authorization header
        const res = await fetch("/api/adminverify", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include",
          cache: "no-store"
        });

        console.log("📡 [AdminLogin] Response status:", res.status);

        const data = await res.json();
        console.log("📡 [AdminLogin] Response data:", data);

        // ✅ Only redirect if authenticated
        if (data.status === true) {
          console.log("✅ [AdminLogin] User is authenticated, redirecting to /admin");
          router.push("/admin");
          router.refresh();
        } else {
          console.log("❌ [AdminLogin] User is NOT authenticated, clearing localStorage");
          localStorage.removeItem("adminToken");
        }
      } catch (err) {
        console.error("❌ [AdminLogin] Auto-verify failed:", err);
        localStorage.removeItem("adminToken");
      } finally {
        console.log("✅ [AdminLogin] Session verification complete");
        setIsChecking(false);
      }
    };

    verifySession();
  }, [router]);

  // ✅ Handle Login
  const handleLogin = async () => {
    console.log("🔐 [AdminLogin] handleLogin called");
    console.log("📧 [AdminLogin] Email:", email);

    setError("");
    if (!email || !password) {
      console.log("⚠️ [AdminLogin] Missing email or password");
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      console.log("📡 [AdminLogin] Sending login request to /api/adminlogin");

      const res = await fetch("/api/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      console.log("📡 [AdminLogin] Login response status:", res.status);

      const data = await res.json();
      console.log("📡 [AdminLogin] Login response data:", data);

      if (data.status && data.token) {
        console.log("✅ [AdminLogin] Login successful!");
        console.log("🎫 [AdminLogin] Token received:", data.token.substring(0, 20) + "...");

        // ✅ Store token in localStorage
        localStorage.setItem("adminToken", data.token);
        console.log("💾 [AdminLogin] Token saved to localStorage");

        // ✅ Verify immediately
        console.log("🔍 [AdminLogin] Verifying token before redirect...");
        const storedToken = localStorage.getItem("adminToken");
        console.log("💾 [AdminLogin] Token retrieved from localStorage:", storedToken ? "SUCCESS" : "FAILED");

        setShowSuccess(true);
        console.log("✨ [AdminLogin] Showing success dialog");

        // ✅ Verify the session with the new token
        setTimeout(async () => {
          console.log("🔍 [AdminLogin] Verifying session before redirect...");

          try {
            const verifyToken = localStorage.getItem("adminToken");

            if (!verifyToken) {
              console.error("❌ [AdminLogin] Token disappeared from localStorage!");
              setError("Token storage failed. Please try again.");
              setShowSuccess(false);
              return;
            }

            const verifyRes = await fetch("/api/adminverify", {
              headers: {
                "Authorization": `Bearer ${verifyToken}`,
              },
              credentials: "include",
              cache: "no-store"
            });

            const verifyData = await verifyRes.json();
            console.log("📡 [AdminLogin] Verify response:", verifyData);

            if (verifyData.status) {
              console.log("✅ [AdminLogin] Session verified! Redirecting now...");
              window.location.href = "/admin";
            } else {
              console.error("❌ [AdminLogin] Session verification FAILED!");
              setError("Login succeeded but session verification failed. Please try again.");
              setShowSuccess(false);
              localStorage.removeItem("adminToken");
            }
          } catch (err) {
            console.error("❌ [AdminLogin] Verify request failed:", err);
            // Try to redirect anyway
            window.location.href = "/admin";
          }
        }, 1500);
      } else {
        console.log("❌ [AdminLogin] Login failed:", data.message);
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("❌ [AdminLogin] Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      console.log("✅ [AdminLogin] Login process complete");
    }
  };

  // Show loading state while checking authentication
  if (isChecking) {
    console.log("⏳ [AdminLogin] Still checking authentication...");
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Checking authentication...</div>
      </div>
    );
  }

  console.log("🎨 [AdminLogin] Rendering login form");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
      {/* ✅ Success Dialog */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 text-center animate-fadeIn">
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Login Successful!
            </h2>
            <p className="text-gray-600 text-sm">
              Redirecting to admin dashboard...
            </p>
          </div>
        </div>
      )}

      {/* ✅ Login Card */}
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Login
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin email"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full text-white py-2 rounded-md transition font-medium ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          Use your admin credentials to access the dashboard.
        </p>
      </div>
    </div>
  );
}