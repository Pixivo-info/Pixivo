import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import TemplateCard from '../../components/TemplateCard';
import Footer from '../../components/Footer';
import { getPublishedTemplates, getTemplateCategories } from '../../services/templateService';

const Templates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [allTemplates, setAllTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch templates from Supabase
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPublishedTemplates();
        
        // Transform database fields to match component expectations
        const transformedData = data.map(template => ({
          id: template.id,
          title: template.title,
          budget: template.budget,
          rating: template.rating,
          downloads: template.downloads,
          category: template.category,
          image: template.image_url,
          technologies: template.technologies || []
        }));
        
        setAllTemplates(transformedData);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError('Failed to load templates');
        setAllTemplates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Dynamic categories based on actual template data
  const categories = useMemo(() => {
    if (!allTemplates.length) return [];
    
    const basCategories = [
      { id: 'all', name: 'All', count: allTemplates.length },
      { id: 'latest', name: 'Latest', count: allTemplates.filter(t => {
        const templateDate = new Date(t.created_at || Date.now());
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return templateDate >= thirtyDaysAgo;
      }).length },
      { id: 'popular', name: 'Popular', count: allTemplates.filter(t => {
        const downloads = parseInt(t.downloads.replace('k', '')) || 0;
        return downloads >= 2;
      }).length }
    ];

    // Get unique categories from templates
    const templateCategories = [...new Set(allTemplates.map(t => t.category))];
    
    // Add category-specific filters
    templateCategories.forEach(category => {
      const count = allTemplates.filter(t => t.category === category).length;
      if (count > 0) {
        basCategories.push({
          id: category,
          name: category.charAt(0).toUpperCase() + category.slice(1),
          count
        });
      }
    });

    return basCategories;
  }, [allTemplates]);

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

          {/* Templates Grid with Loading and Error States */}
          {loading ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg className="w-10 h-10 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Loading Templates...</h3>
              <p className="text-gray-600 text-lg">Please wait while we fetch the latest templates.</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Error Loading Templates</h3>
              <p className="text-gray-600 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
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
              {filteredTemplates.length === 0 && !loading && !error && (
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
            </>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Templates; 