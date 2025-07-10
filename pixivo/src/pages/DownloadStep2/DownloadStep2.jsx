import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { getTemplateById } from '../../services/templateService';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const DownloadStep2 = () => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [canDownload, setCanDownload] = useState(false);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTemplate();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanDownload(true);
    }
  }, [timeLeft]);

  const fetchTemplate = async () => {
    try {
      setLoading(true);
      const templateData = await getTemplateById(id);
      if (templateData) {
        setTemplate({
          id: templateData.id,
          title: templateData.title,
          downloadUrl: templateData.download_url || templateData.downloadUrl,
          image: templateData.image_url || templateData.image,
          budget: templateData.budget,
          fileSize: templateData.file_size || templateData.fileSize
        });
      } else {
        // If template not found, redirect back
        navigate('/templates');
      }
    } catch (error) {
      console.error('Error fetching template:', error);
      navigate('/templates');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (canDownload && template?.downloadUrl && template.downloadUrl !== '#') {
      // Open download URL in new window/tab
      window.open(template.downloadUrl, '_blank');
      
      // Optionally, you could also increment download count here
      // by calling an API endpoint
      
    } else if (canDownload && (!template?.downloadUrl || template.downloadUrl === '#')) {
      alert('Download link is not available yet. Please contact support for assistance.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading template information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Preparing</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your download is being prepared. Please wait a moment while we finalize everything for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Download Preparation Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Template Info Card */}
          {template && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg mb-12 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={template.image || '/placeholder-image.svg'} 
                    alt={template.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.svg';
                    }}
                  />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{template.title}</h3>
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span>Price: ${template.budget || 'Free'}</span>
                    </div>
                    {template.fileSize && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>Size: {template.fileSize}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Timer Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            {!canDownload ? (
              <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-4xl font-bold">
                    {formatTime(timeLeft)}
                  </div>
                </motion.div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Preparing Your Download</h2>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  We're gathering all the files, checking for the latest updates, and ensuring everything is ready for you. 
                  This process helps maintain the highest quality of our templates.
                </p>
                
                {/* Progress Animation */}
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-200 rounded-full h-3 mb-4">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((20 - timeLeft) / 20) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {Math.round(((20 - timeLeft) / 20) * 100)}% Complete
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-12 shadow-lg border border-gray-100"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full text-white mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Download!</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Your template is ready! Click the button below to start downloading your premium template package.
                </p>
                
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Now</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* What's Included Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-blue-50 rounded-xl p-8 border border-blue-200"
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">What's Included in Your Download</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📁</div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Source Files</h4>
                  <p className="text-blue-700 text-sm">Complete HTML, CSS, JavaScript files and all assets</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📖</div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Documentation</h4>
                  <p className="text-blue-700 text-sm">Detailed setup guide and customization instructions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🎨</div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Design Assets</h4>
                  <p className="text-blue-700 text-sm">Images, icons, fonts, and design resources</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">⚙️</div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Configuration Files</h4>
                  <p className="text-blue-700 text-sm">Package.json, build scripts, and environment setup</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DownloadStep2;
