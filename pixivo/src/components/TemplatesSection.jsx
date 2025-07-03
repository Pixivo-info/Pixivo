import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import TemplateCard from './TemplateCard';

const TemplatesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Template data
  const templates = [
    {
      id: 1,
      title: "Modern Dashboard",
      budget: 49,
      rating: 5,
      downloads: "2.3k",
      category: "dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      technologies: ["React", "CSS", "JavaScript"],
      featured: true
    },
    {
      id: 2,
      title: "E-commerce Store",
      budget: 79,
      rating: 4,
      downloads: "1.8k",
      category: "ecommerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      technologies: ["Vue.js", "CSS", "Bootstrap"],
      featured: false
    },
    {
      id: 3,
      title: "Mobile App Design",
      budget: 65,
      rating: 5,
      downloads: "3.1k",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      technologies: ["React Native", "CSS"],
      featured: true
    },
    {
      id: 4,
      title: "Business Landing",
      budget: 0,
      rating: 4,
      downloads: "1.5k",
      category: "landing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      technologies: ["HTML", "CSS", "JavaScript"],
      featured: false
    },
    {
      id: 5,
      title: "Portfolio Website",
      budget: 45,
      rating: 5,
      downloads: "2.7k",
      category: "portfolio",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      technologies: ["Next.js", "CSS"],
      featured: true
    },
    {
      id: 6,
      title: "Admin Panel",
      budget: 89,
      rating: 4,
      downloads: "1.9k",
      category: "dashboard",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      technologies: ["Angular", "CSS"],
      featured: false
    }
  ];



  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
         
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-syne text-gray-900 mb-4">
            Featured 
            <span className="text-primary">
               Templates
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover our premium collection of professionally crafted templates designed to elevate your projects to the next level
          </p>
        </motion.div>





        {/* Templates Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative w-full"
        >
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 w-full max-w-6xl mx-auto px-4 sm:px-0">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                All Templates
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {templates.length} template{templates.length !== 1 ? 's' : ''} available
              </p>
            </div>
            
            <Link
              to="/templates"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore All Templates
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Templates Grid */}
          {templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <TemplateCard template={template} index={index} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Templates Found</h3>
              <p className="text-gray-600 text-lg">Try selecting a different category to explore more templates.</p>
            </div>
          )}
        </motion.div>

      
      </div>
    </section>
  );
};

export default TemplatesSection; 