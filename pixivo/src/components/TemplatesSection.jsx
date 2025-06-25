import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import TemplateCard from './TemplateCard';

const TemplatesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  // Sample template data - replace with real data from API
  const templates = [
    {
      id: 1,
      title: "Modern Dashboard",
      budget: 49,
      rating: 5,
      downloads: "2.3k",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
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
    },
    {
      id: 5,
      title: "Portfolio Website",
      budget: 45,
      rating: 5,
      downloads: "2.7k",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Admin Panel UI",
      budget: 89,
      rating: 4,
      downloads: "1.9k",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-syne text-gray-900 mb-4"
          >
            Featured <span className="text-primary">Templates</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore our handpicked collection of premium templates designed to accelerate your projects
          </motion.p>
        </motion.div>

        {/* Templates Carousel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative "
        >
          {/* View More Templates Label */}
          <div className="flex justify-end mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/templates"
                className="inline-flex items-center text-primary font-semibold hover:text-primary-600 transition-colors duration-300"
              >
                View More Templates
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Carousel Container */}
          <div className="overflow-hidden p-10">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -100, -200, -300, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Duplicate templates for seamless loop */}
              {[...templates, ...templates].map((template, index) => (
                <motion.div
                  key={`${template.id}-${index}`}
                  className="flex-shrink-0 w-80"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: (index % templates.length) * 0.1 }}
                >
                  <TemplateCard template={template} index={index % templates.length} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Manual Navigation Cards for Mobile */}
          <div className="md:hidden mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {templates.slice(0, 4).map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <TemplateCard template={template} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/templates"
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-600 transition-all duration-300 hover:shadow-xl"
            >
              Browse All Templates
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesSection; 