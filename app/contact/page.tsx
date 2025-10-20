"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: "Bhubaneswar, Odisha 751001, India",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 98765 43210",
      link: "tel:+919876543210",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@rentalservice.in",
      link: "mailto:info@rentalservice.in",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "24/7 Service Available",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
  <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            Have questions? We're here to help. Contact us anytime and we'll
            respond promptly.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {info.details}
                  </a>
                ) : (
                  <p className="text-gray-600">{info.details}</p>
                )}
              </div>
            ))}
          </div>

          {/* Form and Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* ✅ Contact Form (fixed) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map and Info Box */}
            <div className="flex flex-col gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3739.7461896127505!2d85.8245138!3d20.2961363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1912d5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quick Response
                </h3>
                <p className="text-gray-700 mb-4">
                  Our team typically responds within 1-2 hours during business
                  hours. For urgent inquiries, please call us directly.
                </p>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:underline"
                >
                  <Phone className="h-5 w-5" />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Book?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Start your rental journey today. We're available 24/7 to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition"
            >
              Call Now
            </a>
            <a
              href="mailto:info@rentalservice.in"
              className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
