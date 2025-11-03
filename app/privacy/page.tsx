export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Last Updated */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8 rounded">
            <p className="text-sm text-blue-800 font-medium">
              <strong>Last Updated:</strong> November 3, 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-10">
            <p className="text-gray-700 leading-relaxed">
              At Eazydrivez, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our vehicle rental services.
            </p>
          </div>

          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">📋</span>
              Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              When you use Eazydrivez services, we collect information necessary to provide our vehicle rental services, including:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Personal identification information (Name, Address, Phone Number)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Government issued identification documents (Driving License, Aadhar Card, Voter ID)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Employment or educational institution details for verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Vehicle usage and GPS tracking data for security purposes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Payment and transaction information</span>
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">🎯</span>
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>To verify your identity and eligibility for vehicle rental</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>To process bookings and payments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>To track vehicles for security and safety purposes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>To provide customer support and roadside assistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>To communicate important updates about your booking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>To comply with legal and regulatory requirements</span>
              </li>
            </ul>
          </section>

          {/* Document Verification */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">✅</span>
              Document Verification
            </h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
              <p className="text-gray-700 leading-relaxed">
                For pre-verification of documents, customers can email their Driving License, Aadhar Card copy, or other valid ID along with a live photo to{" "}
                <a href="mailto:support@eazydrivez.com" className="text-blue-600 hover:underline font-semibold">
                  support@eazydrivez.com
                </a>
                . These documents are used solely for verification purposes and are handled with strict confidentiality.
              </p>
            </div>
          </section>

          {/* GPS Tracking */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">📍</span>
              GPS Tracking
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <p className="text-gray-700 leading-relaxed">
                All vehicles registered with Eazydrivez may be continuously tracked using GPS for security reasons and for reasons deemed fit and proper by Eazydrivez. This tracking helps ensure vehicle safety and assists in providing roadside assistance when needed.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">🔒</span>
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Information Sharing */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">🤝</span>
              Information Sharing
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>When required by law or legal process</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>To protect our rights, property, or safety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>With service providers who assist in our operations (under strict confidentiality agreements)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>In case of business transfer or merger</span>
              </li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">⏱️</span>
              Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Document copies and verification data are retained as per regulatory requirements.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">⚖️</span>
              Your Rights
            </h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Access your personal information we hold</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Request correction of inaccurate information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Request deletion of your information (subject to legal requirements)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Withdraw consent where applicable</span>
              </li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">📞</span>
              Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              For any privacy-related queries or concerns, please contact us at:
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-blue-200 rounded-lg p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a href="mailto:support@eazydrivez.com" className="text-blue-600 hover:underline font-semibold">
                    support@eazydrivez.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a href="tel:+919090089708" className="text-blue-600 hover:underline font-semibold">
                    +91 9090089708
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-gray-800 font-medium">
                       B-15 ID Market Nayapalli, in front of Saraswati Shishu Vidya
                  Mandir, Beside Saura Shakti Enterprises Pvt. Ltd.,
                  ,<br />
                  Bhubaneswar, Odisha 751015
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">🔄</span>
              Changes to Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          {/* Consent Notice */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-6 mt-8">
            <p className="text-gray-800 font-medium text-center">
              By using Eazydrivez services, you consent to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50">
        <a
          href="tel:+919090089708"
          className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-xl flex items-center justify-center text-white text-xl hover:scale-110 transition-all"
        >
          📞
        </a>
        <a
          href="https://wa.me/919090089708"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-green-400 hover:bg-green-500 rounded-full shadow-xl flex items-center justify-center text-white text-xl hover:scale-110 transition-all"
        >
          💬
        </a>
      </div>
    </div>
  );
}