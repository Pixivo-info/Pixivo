import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Refund = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 pt-30 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Refund{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
                Policy
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Please read our refund policy carefully before making a purchase
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                <strong>Last updated:</strong> July 7, 2025
              </p>

              <div className="bg-red-50 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold text-red-900 mb-4">No Refund Policy</h2>
                <p className="text-gray-700">
                  <strong>All sales are final.</strong> We do not offer refunds or exchanges for any digital 
                  products, templates, or services purchased from PixivoTheme. Please review all product 
                  descriptions, previews, and specifications carefully before making a purchase.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why We Don't Offer Refunds</h2>
              <p className="text-gray-600 mb-6">
                Due to the nature of digital products, once downloaded, templates and digital assets cannot be 
                "returned" in the traditional sense. To maintain fair pricing and protect our intellectual property:
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Digital products are delivered instantly and cannot be "returned"</li>
                <li>• Templates can be immediately used and integrated into projects</li>
                <li>• We provide detailed previews and descriptions before purchase</li>
                <li>• Our pricing reflects the no-refund policy</li>
                <li>• This policy allows us to offer competitive pricing</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Exceptional Circumstances</h2>
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 mb-4">
                  While we maintain a strict no-refund policy, we may consider refunds only in the following 
                  <strong> exceptional circumstances</strong>:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Technical Issues:</strong> If the template files are corrupted and cannot be fixed</li>
                  <li>• <strong>Billing Errors:</strong> If you were charged incorrectly due to a system error</li>
                  <li>• <strong>Duplicate Purchases:</strong> If you accidentally purchased the same item twice</li>
                  <li>• <strong>Fraudulent Charges:</strong> If unauthorized purchases were made on your account</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  <strong>Note:</strong> These exceptions are reviewed on a case-by-case basis and require 
                  proper documentation.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Before You Purchase</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 mb-4">
                  To ensure you're completely satisfied with your purchase, please:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Preview Carefully:</strong> Review all screenshots, demos, and descriptions</li>
                  <li>• <strong>Check Compatibility:</strong> Ensure the template works with your platform</li>
                  <li>• <strong>Read Requirements:</strong> Verify technical requirements and dependencies</li>
                  <li>• <strong>Contact Support:</strong> Ask questions before purchasing if you're unsure</li>
                  <li>• <strong>Review License:</strong> Understand usage rights and restrictions</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer Instead</h2>
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Free Support</h3>
                <p className="text-gray-700 mb-4">
                  While we don't offer refunds, we provide comprehensive support to ensure you can 
                  successfully use your purchased templates:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Technical Support:</strong> Help with installation and setup</li>
                  <li>• <strong>Documentation:</strong> Detailed guides and tutorials</li>
                  <li>• <strong>Bug Fixes:</strong> We fix any genuine technical issues</li>
                  <li>• <strong>Updates:</strong> Free updates and improvements</li>
                  <li>• <strong>Community:</strong> Access to our support community</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
              <p className="text-gray-600 mb-6">
                If you believe you have a legitimate case for a refund under our exceptional circumstances policy:
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• <strong>Contact Support:</strong> Email us at support@pixivo.com within 7 days of purchase</li>
                <li>• <strong>Provide Evidence:</strong> Include order details, screenshots, and documentation</li>
                <li>• <strong>Allow Review Time:</strong> We'll review your case within 3-5 business days</li>
                <li>• <strong>Final Decision:</strong> Our decision on exceptional cases is final</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  For questions about our refund policy or to report exceptional circumstances:
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> support@pixivo.com
                  <br />
                  <strong>Subject Line:</strong> "Refund Inquiry - Order #[Your Order Number]"
                  <br />
                  <strong>Response Time:</strong> 24-48 hours
                  <br />
                  <strong>Support Hours:</strong> Monday - Friday, 9AM - 6PM EST
                </p>
              </div>

              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <p className="text-orange-800 font-medium">
                  ⚠️ <strong>Important:</strong> By completing your purchase, you acknowledge that you have 
                  read and agree to our no-refund policy. Please make sure you're completely satisfied 
                  with your selection before proceeding with payment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Refund;
