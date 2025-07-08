import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const License = () => {
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
              License{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
                Agreement
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding your rights and restrictions when using our templates
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

              <h2 className="text-2xl font-bold text-gray-900 mb-4">PixivoTheme License Types</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Standard License</h3>
                <p className="text-gray-700 mb-4">
                  Our Standard License allows you to use our templates for personal and commercial projects.
                </p>
                <h4 className="font-semibold text-gray-900 mb-2">You CAN:</h4>
                <ul className="text-gray-600 mb-4 space-y-1">
                  <li>• Use the template for personal projects</li>
                  <li>• Use the template for commercial projects</li>
                  <li>• Modify and customize the template</li>
                  <li>• Use the template for client work</li>
                  <li>• Create unlimited projects with one license</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mb-2">You CANNOT:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Resell or redistribute the template</li>
                  <li>• Share the template files with others</li>
                  <li>• Use the template to create competing products</li>
                  <li>• Claim ownership of the original design</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-green-900 mb-3">Extended License</h3>
                <p className="text-gray-700 mb-4">
                  Our Extended License includes everything in the Standard License plus additional rights.
                </p>
                <h4 className="font-semibold text-gray-900 mb-2">Additional Rights:</h4>
                <ul className="text-gray-600 mb-4 space-y-1">
                  <li>• Use in products for sale (SaaS, themes, etc.)</li>
                  <li>• Create derivative works for commercial sale</li>
                  <li>• Use in unlimited client projects</li>
                  <li>• Priority support and updates</li>
                  <li>• Access to source files (PSD, Figma, etc.)</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-purple-900 mb-3">Free License</h3>
                <p className="text-gray-700 mb-4">
                  Our free templates come with a Creative Commons license.
                </p>
                <h4 className="font-semibold text-gray-900 mb-2">Terms:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Attribution required (link back to PixivoTheme)</li>
                  <li>• Can be used for personal and commercial projects</li>
                  <li>• Cannot be resold or redistributed</li>
                  <li>• Limited support</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">General Terms</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Copyright</h3>
              <p className="text-gray-600 mb-6">
                All templates remain the intellectual property of PixivoTheme. The license grants you the 
                right to use the template but does not transfer ownership.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Attribution</h3>
              <p className="text-gray-600 mb-6">
                While not required for paid licenses, we appreciate attribution to PixivoTheme. 
                Free templates require attribution as specified in the license.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Refunds</h3>
              <p className="text-gray-600 mb-6">
                All sales are final. However, we offer refunds within 30 days of purchase if the template 
                has significant issues that cannot be resolved. Please see our Refund Policy for details.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Updates</h3>
              <p className="text-gray-600 mb-6">
                We may update templates from time to time. License holders will receive notifications 
                of major updates and can download updated versions at no additional cost.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-600">
                If you have questions about licensing, please contact us at:
                <br />
                <strong>Email:</strong> license@pixivo.com
                <br />
                <strong>Support:</strong> support@pixivo.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default License;
