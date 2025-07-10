import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const DownloadStep1 = () => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [canContinue, setCanContinue] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Validate that we have a template ID
    if (!id || isNaN(parseInt(id))) {
      navigate('/templates');
      return;
    }
  }, [id, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanContinue(true);
    }
  }, [timeLeft]);

  const handleContinue = () => {
    if (canContinue) {
      navigate(`/download-step-2/${id}`);
    }
  };

  const instructions = [
    {
      icon: "📋",
      title: "Before You Download",
      description: "Please read these important instructions to ensure proper installation and usage of your template."
    },
    {
      icon: "💻",
      title: "System Requirements",
      description: "Ensure your system meets the minimum requirements: Modern web browser, Node.js 16+, and a code editor like VS Code."
    },
    {
      icon: "📁",
      title: "File Structure",
      description: "The download includes source files, documentation, assets, and example configurations. Everything you need to get started."
    },
    {
      icon: "🛠️",
      title: "Installation Guide",
      description: "Follow the README.md file for step-by-step installation instructions. Most templates require npm install and npm start."
    },
    {
      icon: "🎨",
      title: "Customization",
      description: "All templates are fully customizable. Modify colors, fonts, layouts, and content to match your brand and requirements."
    },
    {
      icon: "📞",
      title: "Support & Updates",
      description: "Free technical support for 30 days and lifetime updates included. Contact us if you need any assistance."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 pt-34 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prepare for <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">Download</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Please read the following instructions carefully to ensure you get the most out of your template download.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Instructions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these guidelines to ensure smooth installation and optimal use of your premium template.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructions.map((instruction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{instruction.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{instruction.title}</h3>
                <p className="text-gray-600 leading-relaxed">{instruction.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Important Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-12"
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Important Notes</h3>
                <ul className="text-yellow-700 space-y-2">
                  <li>• This is a premium template with a single-user license</li>
                  <li>• Please do not redistribute or resell this template</li>
                  <li>• For commercial projects, please check the license terms</li>
                  <li>• Support is provided via email for technical issues only</li>
                  <li>• Customization services are available at additional cost</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-12"
          >
            <div className="mb-6">
              {!canContinue ? (
                <div className="inline-flex items-center space-x-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-lg">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                  <span className="font-medium">
                    Please wait {timeLeft} second{timeLeft !== 1 ? 's' : ''} to continue...
                  </span>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="inline-flex items-center space-x-3 bg-green-50 text-green-700 px-6 py-3 rounded-lg mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Ready to continue!</span>
                  </div>
                </motion.div>
              )}
            </div>
            
            <motion.button
              onClick={handleContinue}
              disabled={!canContinue}
              whileHover={canContinue ? { scale: 1.05 } : {}}
              whileTap={canContinue ? { scale: 0.95 } : {}}
              className={`inline-flex items-center space-x-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                canContinue
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Continue to Download</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DownloadStep1;
