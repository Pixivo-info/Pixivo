import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TemplateCard from '../../components/TemplateCard';

const TemplateDetail = () => {
  const { id } = useParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Sample template data - in real app, fetch by ID
  const template = {
    id: parseInt(id) || 1,
    title: "Modern Dashboard Template",
    budget: 49,
    rating: 5,
    downloads: "2.3k",
    category: "dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    description: "A comprehensive dashboard template designed for modern web applications. This template features a clean, intuitive interface with advanced data visualization components, responsive design, and customizable layouts perfect for admin panels, analytics dashboards, and business intelligence applications.",
    fullDescription: "This premium dashboard template is crafted with attention to detail and modern design principles. Built with React and styled using Tailwind CSS, it offers a perfect foundation for creating professional admin interfaces and data visualization platforms. The template includes multiple layout options, dark/light theme support, and a comprehensive component library.",
    features: [
      "Fully responsive design",
      "React & Tailwind CSS",
      "Dark/Light theme support", 
      "Multiple layout options",
      "Advanced charts & graphs",
      "Customizable components",
      "Clean, modern UI",
      "Well-documented code",
      "Regular updates",
      "Premium support"
    ],
    technologies: ["React", "Tailwind CSS", "Chart.js", "Framer Motion"],
    demoUrl: "https://demo.pixivo.com/dashboard",
    downloadUrl: "https://download.pixivo.com/dashboard",
    lastUpdated: "March 15, 2024",
    version: "2.1.0",
    fileSize: "12.4 MB",
    compatibleWith: ["React 18+", "Next.js 13+", "Vite 4+"]
  };

  // Related templates
  const relatedTemplates = [
    {
      id: 2,
      title: "E-commerce UI Kit",
      budget: 79,
      rating: 4,
      downloads: "1.8k",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Mobile App Design",
      budget: 65,
      rating: 5,
      downloads: "3.1k",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Landing Page Template",
      budget: 35,
      rating: 4,
      downloads: "1.5k",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    }
  ];

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
      
      {/* Breadcrumb */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center space-x-2 text-sm"
          >
            <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link to="/templates" className="text-gray-500 hover:text-primary transition-colors">
              Templates
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{template.title}</span>
          </motion.nav>
        </div>
      </section>

      {/* Template Detail Content */}
      <section ref={ref} className="py-16">
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
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                
                {/* Live Preview Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <a
                    href={template.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"
                  >
                    Live Preview
                  </a>
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
                  
                  <motion.a
                    href={template.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full text-center border-2 border-primary text-primary py-4 px-6 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Live Preview
                  </motion.a>
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
    </div>
  );
};

export default TemplateDetail; 