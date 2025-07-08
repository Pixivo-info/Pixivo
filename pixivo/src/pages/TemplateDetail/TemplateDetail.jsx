import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TemplateCard from '../../components/TemplateCard';
import { getTemplateById, getPublishedTemplates } from '../../services/templateService';

const TemplateDetail = () => {
  const { id } = useParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [template, setTemplate] = useState(null);
  const [relatedTemplates, setRelatedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch template data from Supabase
  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [templateData, allTemplates] = await Promise.all([
          getTemplateById(parseInt(id), false), // false for public access
          getPublishedTemplates() // Get all published templates for related
        ]);

        if (templateData) {
          // Transform database fields to component format
          const transformedTemplate = {
            id: templateData.id,
            title: templateData.title,
            budget: templateData.budget,
            rating: templateData.rating,
            downloads: templateData.downloads,
            category: templateData.category,
            image: templateData.image_url,
            description: templateData.description,
            fullDescription: templateData.full_description || templateData.description,
            features: templateData.features || [],
            technologies: templateData.technologies || [],
            demoUrl: templateData.demo_url || '#',
            downloadUrl: templateData.download_url || '#',
            lastUpdated: new Date(templateData.updated_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            version: templateData.version || '1.0.0',
            fileSize: templateData.file_size || 'N/A',
            compatibleWith: templateData.compatible_with || []
          };
          
          setTemplate(transformedTemplate);

          // Filter related templates (same category, different ID)
          const related = allTemplates
            .filter(t => t.category === templateData.category && t.id !== templateData.id)
            .slice(0, 3)
            .map(t => ({
              id: t.id,
              title: t.title,
              budget: t.budget,
              rating: t.rating,
              downloads: t.downloads,
              category: t.category,
              image: t.image_url,
              technologies: t.technologies || []
            }));
          
          setRelatedTemplates(related);
        } else {
          setError('Template not found');
        }
      } catch (err) {
        setError('Failed to load template');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTemplateData();
    } else {
      setError('No template ID provided');
      setLoading(false);
    }
  }, [id]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsFullScreenOpen(false);
      }
    };

    if (isFullScreenOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Restore scrolling
    };
  }, [isFullScreenOpen]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-96 pt-40">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Template...</h3>
            <p className="text-gray-600">Please wait while we fetch the template details.</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state or template not found
  if (error || !template || !id) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-96 pt-40">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Template Not Found</h1>
            <p className="text-gray-600 mb-8">{error || "The template you're looking for doesn't exist."}</p>
            <Link to="/templates" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
              Back to Templates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Template Detail Content */}
      <section ref={ref} className="py-16 pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Template Preview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl group">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
              
                
                {/* Live Preview Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <button
                    onClick={() => setIsFullScreenOpen(true)}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"
                  >
                    Live Preview
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Template Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Back Button */}
              <div className="mb-6">
                <Link
                  to="/templates"
                  className="inline-flex items-center text-gray-600 hover:text-primary transition-colors duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Templates
                </Link>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-syne text-gray-900 mb-4">
                {template.title}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {template.description}
              </p>

              {/* Rating and Stats */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-1">
                  {renderStars(template.rating)}
                  <span className="ml-2 text-gray-600">({template.rating})</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {template.downloads} downloads
                </div>
              </div>

              {/* Price and Actions */}
              <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-primary">${template.budget}</span>
                    <span className="text-gray-600 ml-2">one-time purchase</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Download Now
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsFullScreenOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-green-500 text-green-500 py-4 px-6 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-all duration-300"
                  >
                    Live Preview
                  </motion.button>
                </div>
              </div>

              {/* Template Details */}
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{template.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-medium">{template.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">File Size:</span>
                  <span className="font-medium">{template.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{template.category}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          >
            {/* Full Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold font-syne text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {template.fullDescription}
              </p>

              <h3 className="text-xl font-bold font-syne text-gray-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {template.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold font-syne text-gray-900 mb-4">Compatible With</h3>
              <ul className="space-y-2">
                {template.compatibleWith.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Features List */}
            <div>
              <h2 className="text-2xl font-bold font-syne text-gray-900 mb-4">Features</h2>
              <ul className="space-y-3">
                {template.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center text-gray-600"
                  >
                    <svg className="w-4 h-4 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Related Templates */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-syne text-gray-900 mb-8 text-center">
              Related <span className="text-primary">Templates</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTemplates.map((relatedTemplate, index) => (
                <motion.div
                  key={relatedTemplate.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <TemplateCard template={relatedTemplate} index={index} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Full Screen Image Modal */}
      {isFullScreenOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsFullScreenOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsFullScreenOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Full Screen Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={template.image}
              alt={template.title}
              className="w-auto h-[720px] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
                  </motion.div>
        )}
      </div>
  );
};

export default TemplateDetail; 