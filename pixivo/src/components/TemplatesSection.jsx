import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import TemplateCard from './TemplateCard';

const TemplatesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [swiperRef, setSwiperRef] = useState(null);

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





        {/* Swiper Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative w-full"
        >
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 sm:mb-8 w-full max-w-6xl mx-auto px-4 sm:px-0">
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

          {/* Main Swiper Container */}
          {templates.length > 0 ? (
            <div className="relative w-full flex justify-center">
              {/* Main Container with Overflow Hidden */}
              <div className="relative bg-white rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden w-full max-w-6xl">
                
                {/* Visible Area Mask */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {/* Left fade */}
                  <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-white to-transparent z-20"></div>
                  {/* Right fade */}
                  <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-white to-transparent z-20"></div>
                </div>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  onSwiper={setSwiperRef}
                  spaceBetween={24}
                  slidesPerView={'auto'}
                  centeredSlides={false}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  pagination={{
                    el: '.swiper-pagination-custom',
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 12,
                      centeredSlides: true,
                    },
                    480: {
                      slidesPerView: 1.3,
                      spaceBetween: 16,
                      centeredSlides: false,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 18,
                      centeredSlides: false,
                    },
                    768: {
                      slidesPerView: 2.2,
                      spaceBetween: 20,
                      centeredSlides: false,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                      centeredSlides: false,
                    },
                    1280: {
                      slidesPerView: 3.2,
                      spaceBetween: 24,
                      centeredSlides: false,
                    },
                  }}
                  className="templates-swiper"
                >
                  {templates.map((template, index) => (
                    <SwiperSlide key={template.id} className="!w-80">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full"
                      >
                        <TemplateCard template={template} index={index} />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation */}
                <div className="swiper-button-prev-custom absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 cursor-pointer group border border-gray-200">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                
                <div className="swiper-button-next-custom absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 cursor-pointer group border border-gray-200">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Custom Pagination */}
                <div className="swiper-pagination-custom flex justify-center items-center mt-6 w-full"></div>
              </div>
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

      {/* Custom Styles */}
      <style jsx>{`
        .templates-swiper {
          padding: 20px 0;
          overflow: visible;
          margin: 0 auto;
          width: 100%;
          max-width: 100%;
        }
        
        .templates-swiper .swiper-wrapper {
          align-items: center;
        }
        
        .templates-swiper .swiper-slide {
          height: auto;
          transition: all 0.3s ease;
          opacity: 1;
        }
        
        /* Cards that go behind the container edges */
        .templates-swiper .swiper-slide:first-child,
        .templates-swiper .swiper-slide:last-child {
          opacity: 0.6;
        }
        
        .swiper-pagination-custom {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          position: relative !important;
        }
        
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 1;
          margin: 0 4px;
          transition: all 0.3s ease;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          width: 24px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 5px;
        }
        
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          transform: translateY(-50%) scale(1.1);
        }
        
        /* Responsive card widths */
        .templates-swiper .swiper-slide {
          width: 320px !important;
          flex-shrink: 0;
        }
        
        /* Large tablets and small desktops */
        @media (max-width: 1280px) {
          .templates-swiper .swiper-slide {
            width: 300px !important;
          }
        }
        
        /* Tablets */
        @media (max-width: 1024px) {
          .templates-swiper .swiper-slide {
            width: 280px !important;
          }
        }
        
        /* Small tablets */
        @media (max-width: 768px) {
          .templates-swiper {
            margin: 0 auto;
            width: 100%;
            padding: 15px 0;
          }
          
          .templates-swiper .swiper-slide {
            width: 260px !important;
          }
        }
        
        /* Large phones */
        @media (max-width: 640px) {
          .templates-swiper .swiper-slide {
            width: 240px !important;
          }
        }
        
        /* Small phones */
        @media (max-width: 480px) {
          .templates-swiper {
            padding: 10px 0;
          }
          
          .templates-swiper .swiper-slide {
            width: 220px !important;
          }
        }
        
        /* Extra small phones */
        @media (max-width: 380px) {
          .templates-swiper .swiper-slide {
            width: 200px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TemplatesSection; 