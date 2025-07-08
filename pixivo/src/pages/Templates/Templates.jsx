import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import TemplateCard from '../../components/TemplateCard';
import Footer from '../../components/Footer';

const Templates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extended template data - replace with real data from API
  const allTemplates = useMemo(() => [
    {
      id: 1,
      title: "Modern Dashboard",
      budget: 49,
      rating: 5,
      downloads: "2.3k",
      category: "dashboard",
      image: "https://res.cloudinary.com/dmsg2vpgy/image/upload/v1751864340/card1_bzp9dt.webp",
      technologies: ["HTML", "CSS", "JS", "REACT"]
    },
    {
      id: 2,
      title: "E-commerce UI Kit",
      budget: 79,
      rating: 4,
      downloads: "1.8k",
      category: "ecommerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      technologies: ["HTML", "CSS", "JS", "BOOTSTRAP"]
    },
    {
      id: 3,
      title: "Mobile App Design",
      budget: 65,
      rating: 5,
      downloads: "3.1k",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      technologies: ["REACT", "CSS", "JS", "TAILWIND"]
    },
    {
      id: 4,
      title: "Landing Page Template",
      budget: 0,
      rating: 4,
      downloads: "1.5k",
      category: "landing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      technologies: ["HTML", "CSS", "JS", "BOOTSTRAP"]
    },
    {
      id: 5,
      title: "Portfolio Website",
      budget: 45,
      rating: 5,
      downloads: "2.7k",
      category: "portfolio",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      technologies: ["HTML", "CSS", "JS", "SCSS"]
    },
    {
      id: 6,
      title: "Admin Panel UI",
      budget: 89,
      rating: 4,
      downloads: "1.9k",
      category: "dashboard",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      technologies: ["VUE", "CSS", "JS", "BOOTSTRAP"]
    },
    {
      id: 7,
      title: "Blog Template",
      budget: 0,
      rating: 4,
      downloads: "1.2k",
      category: "blog",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      technologies: ["HTML", "CSS", "PHP", "MYSQL"]
    },
    {
      id: 8,
      title: "SaaS Landing Page",
      budget: 55,
      rating: 5,
      downloads: "2.8k",
      category: "landing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      technologies: ["NEXT.JS", "CSS", "JS", "TAILWIND"]
    },
    {
      id: 9,
      title: "Restaurant Website",
      budget: 42,
      rating: 4,
      downloads: "1.6k",
      category: "business",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      technologies: ["HTML", "CSS", "JS", "JQUERY"]
    },
    {
      id: 10,
      title: "Social Media App",
      budget: 75,
      rating: 5,
      downloads: "3.5k",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      technologies: ["REACT", "NODE.JS", "MONGODB", "CSS"]
    },
    {
      id: 11,
      title: "Finance Dashboard",
      budget: 95,
      rating: 5,
      downloads: "2.1k",
      category: "dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      technologies: ["ANGULAR", "TYPESCRIPT", "CSS", "BOOTSTRAP"]
    },
    {
      id: 12,
      title: "Agency Portfolio",
      budget: 0,
      rating: 4,
      downloads: "1.4k",
      category: "portfolio",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      technologies: ["HTML", "CSS", "JS", "GSAP"]
    }
  ], []);

  const categories = useMemo(() => [
    { id: 'all', name: 'All', count: allTemplates.length },
    { id: 'latest', name: 'Latest', count: allTemplates.filter(t => t.id >= 9).length }, // Latest templates (newer IDs)
    { id: 'popular', name: 'Popular', count: allTemplates.filter(t => parseInt(t.downloads.replace('k', '')) >= 2.5).length }, // High downloads
    { id: 'portfolio', name: 'Portfolio', count: allTemplates.filter(t => t.category === 'portfolio').length },
    { id: 'business', name: 'Business', count: allTemplates.filter(t => t.category === 'business').length },
    { id: 'ecommerce', name: 'E-Commerce', count: allTemplates.filter(t => t.category === 'ecommerce').length },
    { id: 'landing', name: 'Landing', count: allTemplates.filter(t => t.category === 'landing').length },
  ], [allTemplates]);

  // Optimized filter function using useMemo for better performance
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(template => {
      let categoryMatch = false;
      
      if (selectedCategory === 'all') {
        categoryMatch = true;
      } else if (selectedCategory === 'latest') {
        categoryMatch = template.id >= 9; // Latest templates (newer IDs)
      } else if (selectedCategory === 'popular') {
        categoryMatch = parseInt(template.downloads.replace('k', '')) >= 2.5; // High downloads
      } else {
        categoryMatch = template.category === selectedCategory;
      }
      
      const searchMatch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [allTemplates, selectedCategory, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced from 0.1 to 0.05
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Page Header */}
      <section className="bg-white py-16 pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne text-gray-900 mb-6">
              Premium <span className="text-primary">Templates</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our collection of professionally designed templates to kickstart your next project
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Templates Grid */}
      <section ref={ref} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-6 md:mb-8"
          >
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Desktop Layout */}
              <div className="hidden md:flex items-center px-6 py-4">
                <div className="flex-shrink-0 mr-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search templates by name, category, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 text-lg bg-transparent border-0 outline-none focus:outline-none placeholder-gray-400 text-gray-700"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-4 bg-gradient-to-r from-primary to-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Search
                </motion.button>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden p-4">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 mr-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 text-base bg-transparent border-0 outline-none focus:outline-none placeholder-gray-400 text-gray-700"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-primary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Search Templates
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Filter by Category</h3>
              
              {/* Mobile: Horizontal Scrollable */}
              <div className="md:hidden">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-sm text-sm ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200'
                      }`}
                    >
                      {category.name} 
                      <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Desktop: Flex Wrap */}
              <div className="hidden md:flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200'
                    }`}
                  >
                    {category.name} 
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 md:mb-8 px-2 md:px-0"
          >
            <p className="text-sm md:text-base text-gray-600">
              Showing <span className="font-semibold text-primary">{filteredTemplates.length}</span> templates
              {searchTerm && (
                <span className="block md:inline"> for "<span className="font-semibold text-primary">{searchTerm}</span>"</span>
              )}
            </p>
          </motion.div>

          {/* Templates Grid */}
          <motion.div
            key={selectedCategory} // Force re-render when category changes
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-2 md:px-0"
          >
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <TemplateCard template={template} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-300"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Templates; 