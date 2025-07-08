import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const TemplateCard = ({ template, index }) => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  const handleCardClick = () => {
    navigate(`/template/${template.id}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
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
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Template Image */}
      <div className="relative overflow-hidden h-48 ">
        <img
          src={template.image_url || template.image}
          alt={template.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      
        
        {/* Preview button overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Link
            to={`/template/${template.id}`}
            className="bg-white text-primary px-4 py-2 rounded-lg font-semibold shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            Quick Preview
          </Link>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-4 md:p-5">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold font-syne text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {template.title}
        </h3>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.technologies && template.technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded"
            >
              {tech}
            </span>
          ))}
          {template.technologies && template.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-500 rounded">
              +{template.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          {renderStars(template.rating)}
          <span className="text-sm font-semibold text-gray-900 ml-2">
            ({template.rating}.0)
          </span>
          <div className="flex items-center ml-auto text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {template.downloads}
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-xl md:text-2xl font-bold text-green-600">
            {template.budget === 0 ? 'Free' : `$${template.budget}`}
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-600 rounded-lg hover:border-primary hover:text-primary transition-all duration-300"
              title="Preview"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/template/${template.id}`);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white py-2 px-4 md:px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center text-sm md:text-base"
              onClick={(e) => {
                e.stopPropagation();
                // Handle download logic here
                window.open(template.downloadUrl || '#', '_blank');
              }}
            >
              <svg className="w-4 h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Download</span>
              <span className="sm:hidden">Get</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard; 