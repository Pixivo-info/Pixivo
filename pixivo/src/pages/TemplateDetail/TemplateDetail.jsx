import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TemplateCard from '../../components/TemplateCard';
import { getTemplateById, getPublishedTemplates } from '../../services/templateService';

const TemplateDetail = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [relatedTemplates, setRelatedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Fetch template data from Supabase
  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const templateId = parseInt(id);
        if (!templateId || isNaN(templateId)) {
          setError('Invalid template ID');
          setLoading(false);
          return;
        }
        
        const allPublishedTemplates = await getPublishedTemplates();
        const templateData = await getTemplateById(templateId, false);
        
        if (templateData) {
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

          const related = allPublishedTemplates
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
          setError(`Template with ID ${templateId} not found.`);
        }
      } catch (err) {
        setError('Failed to load template: ' + err.message);
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

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
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
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isFullScreenOpen]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-96 pt-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Template...</h3>
            <p className="text-gray-600">Please wait while we fetch the template details.</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !template || !id) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-96 pt-40">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Template Not Found</h1>
            <p className="text-gray-600 mb-8">{error || "The template you're looking for doesn't exist."}</p>
            <Link to="/templates" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
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
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                <span className="capitalize">{template.category}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {template.title}
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {template.description}
              </p>
              
              {/* Stats */}
              <div className="flex items-center space-x-6 text-white">
                <div className="flex items-center space-x-2">
                  {renderStars(template.rating)}
                  <span className="font-semibold">({template.rating})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-semibold">{template.downloads} downloads</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Price Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">${template.budget}</div>
                <div className="text-gray-600">One-time purchase</div>
              </div>
              
              <div className="space-y-4 mb-6">
                <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg">
                  Download Now
                </button>
                <button 
                  onClick={() => setIsFullScreenOpen(true)}
                  className="w-full border-2 border-green-500 text-green-500 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-500 hover:text-white transform hover:scale-[1.02] transition-all duration-200"
                >
                  Live Preview
                </button>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="font-medium text-gray-900">{template.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="font-medium text-gray-900">{template.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>File Size:</span>
                  <span className="font-medium text-gray-900">{template.fileSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Image and Description */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Template Preview */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Template Preview</h2>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group bg-white">
                <img
                  src={template.image || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop'}
                  alt={template.title}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop';
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setIsFullScreenOpen(true)}
                    className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-gray-100 transform scale-90 group-hover:scale-100 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Full Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {template.fullDescription}
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technologies Used</h2>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex flex-wrap gap-3">
                  {template.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features and Compatibility */}
          <div className="space-y-8">
            
            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <ul className="space-y-4">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Compatibility */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Compatibility</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <ul className="space-y-4">
                  {template.compatibleWith.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      <span className="ml-3 text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Related Templates */}
      {relatedTemplates.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Related Templates
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover more amazing templates in the same category
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTemplates.map((relatedTemplate, index) => (
                <div key={relatedTemplate.id} className="transform hover:scale-105 transition-transform duration-200">
                  <TemplateCard template={relatedTemplate} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Full Screen Modal */}
      {isFullScreenOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullScreenOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-6xl max-h-full">
            <img
              src={template.image || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop'}
              alt={template.title}
              className="w-full h-auto object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDetail; 