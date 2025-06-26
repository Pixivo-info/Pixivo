import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TemplateCard from './TemplateCard';

const TemplatesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });


  // Featured template data with complete details matching Templates.jsx
  const templates = [
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
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative overflow-visible"
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

          {/* Swiper Carousel */}
          <div className="relative px-4 sm:px-8 lg:px-12">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              navigation={{
                prevEl: '.custom-prev',
                nextEl: '.custom-next',
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              loop={false}
              grabCursor={true}
              effect="slide"
              speed={600}
              breakpoints={{
                480: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                  centeredSlides: false,
                },
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                  centeredSlides: false,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 2.8,
                  spaceBetween: 30,
                },
                1440: {
                  slidesPerView: 3.2,
                  spaceBetween: 30,
                },
              }}
              className="templates-swipera "
            >
              {templates.map((template, index) => (
                <SwiperSlide key={template.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <TemplateCard template={template} index={index} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <button className="custom-prev absolute left-0 sm:left-2 lg:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-xl transition-all duration-300 group hover:bg-gray-50">
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:scale-110 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button className="custom-next absolute right-0 sm:right-2 lg:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-xl transition-all duration-300 group hover:bg-gray-50">
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:scale-110 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesSection; 