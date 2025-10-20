'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { termsAndConditionsData } from '@/lib/data';

export default function Terms() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);
  const { header, sections, contact, acknowledgment, lastUpdated } = termsAndConditionsData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header with Background Image */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {header.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
            {header.subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-lg font-bold text-gray-900 text-left">
                  {section.title}
                </h2>
                <ChevronDown
                  className={`h-6 w-6 text-blue-600 transition-transform ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSection === section.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-700">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-1">
                <span className="font-bold text-gray-900">Phone:</span> {contact.phone}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-bold text-gray-900">Email:</span> {contact.email}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">
                <span className="font-bold text-gray-900">Address:</span> {contact.address}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-gray-900">Hours:</span> {contact.hours}
              </p>
            </div>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <p className="text-gray-800 text-center">
            {acknowledgment}
          </p>
          <p className="text-gray-600 text-center text-sm mt-4">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
}