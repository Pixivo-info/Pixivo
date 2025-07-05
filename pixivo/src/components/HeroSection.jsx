import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const glowAnimation = {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.5)",
      "0 0 40px rgba(59, 130, 246, 0.8)",
      "0 0 20px rgba(59, 130, 246, 0.5)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <Motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <Motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-400 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-4 border border-blue-400"></div>
        </Motion.div>
        
        <Motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 border border-blue-500 opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-3 border border-blue-500"></div>
        </Motion.div>

        {/* Glowing Orbs */}
        <Motion.div
          className="absolute top-1/2 left-1/6 w-4 h-4 bg-blue-500 rounded-full blur-sm"
          animate={floatingAnimation}
        />
        <Motion.div
          className="absolute top-1/3 right-1/6 w-3 h-3 bg-blue-600 rounded-full blur-sm"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1 },
          }}
        />
        <Motion.div
          className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full blur-sm"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 min-h-screen flex items-center">
        <Motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center w-full"
        >
          {/* Futuristic Badge */}
          <Motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-8"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">
              Next-Gen Digital Solutions
            </span>
          </Motion.div>

          {/* Main Heading with Glowing Effect */}
          <Motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-syne mb-6 relative"
          >
            <span className="text-blue-400">
              Create Amazing
            </span>
            <br />
            <Motion.span
              className="relative inline-block"
              animate={glowAnimation}
            >
              <span className="text-blue-500">
                Digital
              </span>
              <div className="absolute inset-0 text-blue-500 blur-sm -z-10">
                Digital
              </div>
            </Motion.span>
            <br />
            <span className="text-white">
              Experiences
            </span>
          </Motion.h1>

          {/* Subtitle */}
          <Motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Discover our collection of{' '}
            <span className="text-blue-400 font-semibold">premium templates</span>,{' '}
            <span className="text-blue-500 font-semibold">custom UI/UX designs</span>, and{' '}
            <span className="text-blue-600 font-semibold">development solutions</span>{' '}
            that bring your ideas to life with cutting-edge technology.
          </Motion.p>

          {/* Buttons */}
          <Motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={pulseAnimation}
            >
              <Link
                to="/templates"
                className="group relative inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30"
              >
                <span className="relative z-10 flex items-center">
                  Explore Templates
                  <svg
                    className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
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
                </span>
              </Link>
            </Motion.div>

            <Motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center px-8 py-4 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/30"
              >
                <span className="relative z-10">Get In Touch</span>
              </a>
            </Motion.div>
          </Motion.div>

        
        </Motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default HeroSection; 