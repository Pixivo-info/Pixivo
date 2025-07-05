import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { id } = useParams();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/#contact' },
  ];

  // Sample template data for breadcrumb - in real app, this would come from context or props
  const getTemplateName = (templateId) => {
    const templates = {
      1: "Modern Dashboard Template",
      2: "E-commerce UI Kit",
      3: "Mobile App Design",
      4: "Landing Page Template",
      5: "Portfolio Website",
      6: "Admin Panel UI",
      7: "Blog Template",
      8: "SaaS Landing Page",
      9: "Restaurant Website",
      10: "Social Media App",
      11: "Finance Dashboard",
      12: "Agency Portfolio"
    };
    return templates[templateId] || "Template";
  };

  // Generate breadcrumbs based on current route
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Home', path: '/' }];

    if (pathSegments.length > 0) {
      switch (pathSegments[0]) {
        case 'templates':
          breadcrumbs.push({ name: 'Templates', path: '/templates' });
          break;
        case 'template':
          breadcrumbs.push({ name: 'Templates', path: '/templates' });
          if (pathSegments[1]) {
            breadcrumbs.push({ 
              name: getTemplateName(parseInt(pathSegments[1])), 
              path: `/template/${pathSegments[1]}`,
              isActive: true 
            });
          }
          break;
        case 'about':
          breadcrumbs.push({ name: 'About', path: '/about' });
          break;
        default:
          break;
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const showBreadcrumb = location.pathname.includes('/template/') || location.pathname === '/templates';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const glowAnimation = {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 30px rgba(59, 130, 246, 0.5)",
      "0 0 20px rgba(59, 130, 246, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-lg border-b border-gray-800/50 shadow-2xl shadow-blue-500/10' 
          : 'bg-gray-900/90 backdrop-blur-sm border-b border-gray-800/30'
      }`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Floating Particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 relative"
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.div 
                className="relative p-2 rounded-lg bg-blue-500/20 border border-blue-500/30"
                animate={glowAnimation}
              >
                <img 
                  src="/Logo.png" 
                  alt="Pixivo Logo" 
                  className="h-8 w-8 object-contain"
                />
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm"></div>
              </motion.div>
              <span className="text-2xl font-bold font-syne text-blue-400">
                Pixivo
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                      isActive(link.path)
                        ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        className="absolute inset-0 bg-blue-500/20 rounded-lg blur-sm -z-10"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 rounded-lg transition-all duration-300"></div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500/50 transition-all duration-300"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ 
            height: isOpen ? 'auto' : 0, 
            opacity: isOpen ? 1 : 0,
            scaleY: isOpen ? 1 : 0.95
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`md:hidden overflow-hidden origin-top`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-gray-900/95 backdrop-blur-lg rounded-lg border border-gray-800/50 mt-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                    isActive(link.path)
                      ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Breadcrumb Navigation */}
        {showBreadcrumb && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="py-3 border-t border-gray-700/30"
          >
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className="text-gray-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.span>
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {crumb.isActive ? (
                      <span className="text-blue-400 font-medium px-2 py-1 bg-blue-500/10 rounded-md">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        to={crumb.path}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300 px-2 py-1 rounded-md hover:bg-blue-500/10"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </motion.div>
                </React.Fragment>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar; 