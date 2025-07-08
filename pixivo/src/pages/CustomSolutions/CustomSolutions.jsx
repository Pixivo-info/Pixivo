import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomDropdown from "../../components/CustomDropdown";
import { addCustomSolutionRequest, validateCustomSolutionRequest } from "../../admin/utils/customSolutionsData";

const CustomSolutions = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    designType: "",
    websiteType: "",
    technologies: [],
    message: "",
  });

  const [showDesignDropdown, setShowDesignDropdown] = useState(false);
  const [showTechnologiesDropdown, setShowTechnologiesDropdown] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const serviceOptions = [
    { value: "ui-ux-design", label: "UI/UX Design" },
    { value: "frontend-development", label: "Frontend Development" },
  ];

  const designOptions = [
    { value: "website-design", label: "Website Design" },
    { value: "application-design", label: "Application Design" },
  ];

  const websiteTypes = [
    { value: "portfolio", label: "Portfolio Website" },
    { value: "e-commerce", label: "E-commerce Website" },
    { value: "blog", label: "Blog Website" },
    { value: "business", label: "Business Website" },
    { value: "landing-page", label: "Landing Page" },
    { value: "educational", label: "Educational Website" },
    { value: "news", label: "News Website" },
    { value: "social-media", label: "Social Media Platform" },
  ];

  const technologies = [
    { value: "html", label: "Html" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "webflow", label: "Webflow" },
    { value: "typescript", label: "Typescript" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "mysql", label: "MySQL" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
      designType: "",
      websiteType: "",
      technologies: [],
    }));
    setShowDesignDropdown(value === "ui-ux-design");
    setShowTechnologiesDropdown(false);
  };

  const handleDesignTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      designType: value,
    }));
  };

  const handleWebsiteTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      websiteType: value,
      technologies: [],
    }));
    setShowTechnologiesDropdown(true);
  };

  const handleTechnologyToggle = (value) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(value)
        ? prev.technologies.filter((tech) => tech !== value)
        : [...prev.technologies, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    // Validate form data
    const validation = validateCustomSolutionRequest(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Save the request to localStorage
      const savedRequest = addCustomSolutionRequest(formData);
      
      if (savedRequest) {
        setSuccessMessage("Thank you! Your request has been submitted successfully. We will get back to you soon.");
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          service: "",
          designType: "",
          websiteType: "",
          technologies: [],
          message: "",
        });
        setShowDesignDropdown(false);
        setShowTechnologiesDropdown(false);
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrors({ submit: "Failed to submit request. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
            <section className="py-20 pt-30 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    Custom{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
                      Solutions
                    </span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                   Tell us about your project and we'll create the perfect solution for you
                  </p>
                </motion.div>
              </div>
            </section>

      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
              >
                <div className="flex">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-green-800">{successMessage}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
              >
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{errors.submit}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Service Selection */}
              <div>
                <CustomDropdown
                  label="Select Service"
                    value={formData.service}
                  onChange={handleServiceChange}
                  options={serviceOptions}
                  placeholder="Choose a service"
                  required={true}
                  className={errors.service ? 'border-red-300' : ''}
                />
                {errors.service && (
                  <p className="mt-1 text-sm text-red-600">{errors.service}</p>
                )}
              </div>

              {/* Design Type Dropdown (for UI/UX Design) */}
              {showDesignDropdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <CustomDropdown
                    label="Design Type"
                        value={formData.designType}
                    onChange={handleDesignTypeChange}
                    options={designOptions}
                    placeholder="Choose design type"
                    required={true}
                  />

                  {/* Message Field for UI/UX Design */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Tell us about your design requirements, target audience, style preferences, and any specific features you need..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Website Type Dropdown (for Frontend Development) */}
              {formData.service === "frontend-development" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <CustomDropdown
                    label="Website Type"
                        value={formData.websiteType}
                    onChange={handleWebsiteTypeChange}
                    options={websiteTypes}
                    placeholder="Choose website type"
                    required={true}
                  />

                  {/* Technologies Multi-Select */}
                  {showTechnologiesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Technologies *
                        </label>
                        <div className="border border-gray-300 rounded-lg p-4 bg-white max-h-48 overflow-y-auto">
                          <div className="grid grid-cols-2 gap-2">
                            {technologies.map((tech) => (
                              <label
                                key={tech.value}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.technologies.includes(
                                    tech.value
                                  )}
                                  onChange={() =>
                                    handleTechnologyToggle(tech.value)
                                  }
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">
                                  {tech.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        {formData.technologies.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {formData.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                              >
                                {
                                  technologies.find((t) => t.value === tech)
                                    ?.label
                                }
                                <button
                                  type="button"
                                  onClick={() => handleTechnologyToggle(tech)}
                                  className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Message Field for Frontend Development */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Project Details
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Describe your project requirements, features you need, timeline, budget, and any specific functionalities..."
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={
                    isSubmitting || !formData.name || !formData.email || !formData.service
                  }
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomSolutions;
