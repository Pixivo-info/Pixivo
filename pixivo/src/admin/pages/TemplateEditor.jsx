import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  validateTemplate,
  CATEGORIES,
  TECHNOLOGIES 
} from '../utils/adminData';
import { 
  getTemplateById, 
  createTemplate, 
  updateTemplate 
} from '../../services/templateService';
import CustomDropdown from '../components/CustomDropdown';

const TemplateEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    category: '',
    budget: 0,
    rating: 5,
    downloads: '0k',
    image: '',
    technologies: [],
    features: [''],
    featured: false,
    status: 'published',
    demoUrl: '',
    downloadUrl: '',
    version: '1.0.0',
    fileSize: '',
    compatibleWith: ['']
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  // Dropdown options
  const categoryOptions = CATEGORIES.map(category => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1)
  }));

  const ratingOptions = [1, 2, 3, 4, 5].map(num => ({
    value: num,
    label: `${num} Star${num !== 1 ? 's' : ''}`
  }));

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' }
  ];

  // Load template data if editing
  useEffect(() => {
    const loadTemplate = async () => {
      if (isEditing) {
        try {
          const template = await getTemplateById(parseInt(id), true); // true for admin access
          if (template) {
            setFormData({
              title: template.title || '',
              description: template.description || '',
              fullDescription: template.full_description || '',
              category: template.category || '',
              budget: template.budget || 0,
              rating: template.rating || 5,
              downloads: template.downloads || '0k',
              image: template.image_url || '',
              technologies: template.technologies || [],
              features: template.features && template.features.length > 0 ? template.features : [''],
              featured: template.featured || false,
              status: template.status || 'draft',
              demoUrl: template.demo_url || '',
              downloadUrl: template.download_url || '',
              version: template.version || '1.0.0',
              fileSize: template.file_size || '',
              compatibleWith: template.compatible_with && template.compatible_with.length > 0 ? template.compatible_with : ['']
            });
            setImagePreview(template.image_url || '');
          } else {
            navigate('/admin/templates');
          }
        } catch (error) {
          console.error('Error loading template:', error);
          navigate('/admin/templates');
        }
      }
    };

    loadTemplate();
  }, [id, isEditing, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Update image preview
    if (name === 'image') {
      setImagePreview(value);
    }
  };

  // Handle dropdown changes
  const handleDropdownChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user selects
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTechnologyToggle = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const handleArrayFieldChange = (fieldName, index, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) => i === index ? value : item)
    }));
  };

  const handleAddArrayField = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], '']
    }));
  };

  const handleRemoveArrayField = (fieldName, index) => {
    if (formData[fieldName].length > 1) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: prev[fieldName].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Clean up array fields (remove empty strings)
    const cleanFormData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      compatibleWith: formData.compatibleWith.filter(c => c.trim() !== '')
    };

    // Validate form
    const validation = validateTemplate(cleanFormData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setSaving(false);
      return;
    }

    try {
      // Prepare data for Supabase (map frontend field names to database field names)
      const templateData = {
        title: cleanFormData.title,
        description: cleanFormData.description,
        fullDescription: cleanFormData.fullDescription,
        category: cleanFormData.category,
        budget: parseFloat(cleanFormData.budget) || 0,
        rating: parseInt(cleanFormData.rating) || 5,
        downloads: cleanFormData.downloads || '0k',
        image: cleanFormData.image,
        technologies: cleanFormData.technologies,
        features: cleanFormData.features,
        featured: cleanFormData.featured,
        status: cleanFormData.status,
        demoUrl: cleanFormData.demoUrl,
        downloadUrl: cleanFormData.downloadUrl,
        version: cleanFormData.version || '1.0.0',
        fileSize: cleanFormData.fileSize,
        compatible_with: cleanFormData.compatibleWith
      };

      if (isEditing) {
        // Update existing template
        await updateTemplate(parseInt(id), templateData);
      } else {
        // Create new template
        await createTemplate(templateData);
      }
      
      // Navigate back to templates list
      navigate('/admin/templates');
    } catch (error) {
      console.error('Error saving template:', error);
      setErrors({ submit: 'Failed to save template. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/templates');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            to="/admin/templates"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Template' : 'Add New Template'}
          </h1>
        </div>
        <p className="text-sm md:text-base text-gray-600">
          {isEditing ? 'Update template information and settings' : 'Create a new template for your marketplace'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Title */}
            <div className="lg:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Template Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter template title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Category */}
            <div>
              <CustomDropdown
                label="Category *"
                options={categoryOptions}
                value={formData.category}
                onChange={(value) => handleDropdownChange('category', value)}
                placeholder="Select a category"
                className={errors.category ? 'border-red-300' : ''}
              />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 ${
                  errors.budget ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
            </div>

            {/* Short Description */}
            <div className="lg:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Short Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Brief description of the template"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Full Description */}
            <div className="lg:col-span-2">
              <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Full Description
              </label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                rows={5}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                placeholder="Detailed description of the template features and benefits"
              />
            </div>
          </div>
        </motion.div>

        {/* Media & Assets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Media & Assets</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Image URL */}
            <div className="lg:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Preview Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 ${
                  errors.image ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="lg:col-span-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <img
                    src={imagePreview}
                    alt="Template preview"
                    className="w-full h-48 md:h-64 object-cover rounded-lg"
                    onError={() => setImagePreview('')}
                  />
                </div>
              </div>
            )}

            {/* Demo URL */}
            <div>
              <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Demo URL
              </label>
              <input
                type="url"
                id="demoUrl"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                placeholder="https://demo.example.com"
              />
            </div>

            {/* Download URL */}
            <div>
              <label htmlFor="downloadUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Download URL
              </label>
              <input
                type="url"
                id="downloadUrl"
                name="downloadUrl"
                value={formData.downloadUrl}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                placeholder="https://download.example.com"
              />
            </div>
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used *</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TECHNOLOGIES.map(tech => (
              <label key={tech} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.technologies.includes(tech)}
                  onChange={() => handleTechnologyToggle(tech)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{tech}</span>
              </label>
            ))}
          </div>
          
          {errors.technologies && <p className="mt-2 text-sm text-red-600">{errors.technologies}</p>}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Features</h2>
            <button
              type="button"
              onClick={() => handleAddArrayField('features')}
              className="inline-flex items-center justify-center sm:justify-start px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Feature
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleArrayFieldChange('features', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                  placeholder="Enter a feature"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayField('features', index)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compatible With */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Compatible With</h2>
            <button
              type="button"
              onClick={() => handleAddArrayField('compatibleWith')}
              className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Compatibility
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.compatibleWith.map((compatibility, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={compatibility}
                  onChange={(e) => handleArrayFieldChange('compatibleWith', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                  placeholder="e.g., React 18+, Node.js 16+"
                />
                {formData.compatibleWith.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayField('compatibleWith', index)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Settings & Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings & Metadata</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating */}
            <div>
              <CustomDropdown
                label="Rating (1-5)"
                options={ratingOptions}
                value={formData.rating}
                onChange={(value) => handleDropdownChange('rating', value)}
                placeholder="Select rating"
              />
            </div>

            {/* Downloads */}
            <div>
              <label htmlFor="downloads" className="block text-sm font-medium text-gray-700 mb-1">
                Downloads
              </label>
              <input
                type="text"
                id="downloads"
                name="downloads"
                value={formData.downloads}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1.2k"
              />
            </div>

            {/* Version */}
            <div>
              <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">
                Version
              </label>
              <input
                type="text"
                id="version"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1.0.0"
              />
            </div>

            {/* File Size */}
            <div>
              <label htmlFor="fileSize" className="block text-sm font-medium text-gray-700 mb-1">
                File Size
              </label>
              <input
                type="text"
                id="fileSize"
                name="fileSize"
                value={formData.fileSize}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="12.4 MB"
              />
            </div>

            {/* Status */}
            <div>
              <CustomDropdown
                label="Status"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => handleDropdownChange('status', value)}
                placeholder="Select status"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Featured Template
              </label>
            </div>
          </div>
        </motion.div>

        {/* Form Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200"
        >
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {saving ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              isEditing ? 'Update Template' : 'Create Template'
            )}
          </button>
        </motion.div>

        {/* Error Display */}
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
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
      </form>
    </div>
  );
};

export default TemplateEditor; 