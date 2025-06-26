import React, { useState, useRef, useMemo } from 'react';
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

  // Extended template data - replace with real data from API
  const allTemplates = useMemo(() => [
    {
      id: 1,
      title: "Modern Dashboard",
      budget: 49,
      rating: 5,
      downloads: "2.3k",
      category: "dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
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
      <section className="bg-white py-16">
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
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-primary/10'
                  }`}
                >
                  {category.name} <span className="ml-1 text-sm opacity-75">({category.count})</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates by name, category, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-300">
                Search
              </button>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredTemplates.length}</span> templates
              {searchTerm && (
                <span> for "<span className="font-semibold text-primary">{searchTerm}</span>"</span>
              )}
            </p>
          </motion.div>

          {/* Templates Grid */}
          <motion.div
            key={selectedCategory} // Force re-render when category changes
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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