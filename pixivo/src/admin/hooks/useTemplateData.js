import { useState, useEffect } from 'react';
import { getStoredTemplates, saveTemplatesToStorage } from '../utils/adminData';

/**
 * Custom hook for managing template data
 * Provides real-time template data and CRUD operations
 */
export const useTemplateData = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load templates on hook initialization
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const templateData = getStoredTemplates();
      setTemplates(templateData);
    } catch (err) {
      setError('Failed to load templates');
      console.error('Error loading templates:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveTemplates = async (updatedTemplates) => {
    try {
      saveTemplatesToStorage(updatedTemplates);
      setTemplates(updatedTemplates);
      return true;
    } catch (err) {
      setError('Failed to save templates');
      console.error('Error saving templates:', err);
      return false;
    }
  };

  const addTemplate = async (newTemplate) => {
    const updatedTemplates = [...templates, newTemplate];
    return await saveTemplates(updatedTemplates);
  };

  const updateTemplate = async (templateId, updatedData) => {
    const updatedTemplates = templates.map(template =>
      template.id === templateId
        ? { ...template, ...updatedData, updatedAt: new Date().toISOString().split('T')[0] }
        : template
    );
    return await saveTemplates(updatedTemplates);
  };

  const deleteTemplate = async (templateId) => {
    const updatedTemplates = templates.filter(template => template.id !== templateId);
    return await saveTemplates(updatedTemplates);
  };

  const toggleFeatured = async (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      return await updateTemplate(templateId, { featured: !template.featured });
    }
    return false;
  };

  const toggleStatus = async (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newStatus = template.status === 'published' ? 'draft' : 'published';
      return await updateTemplate(templateId, { status: newStatus });
    }
    return false;
  };

  const getTemplate = (templateId) => {
    return templates.find(template => template.id === templateId);
  };

  const getPublishedTemplates = () => {
    return templates.filter(template => template.status === 'published');
  };

  const getFeaturedTemplates = () => {
    return templates.filter(template => template.featured && template.status === 'published');
  };

  const getTemplatesByCategory = (category) => {
    return templates.filter(template => 
      template.category === category && template.status === 'published'
    );
  };

  const searchTemplates = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return templates.filter(template =>
      (template.title.toLowerCase().includes(term) ||
       template.description.toLowerCase().includes(term) ||
       template.technologies.some(tech => tech.toLowerCase().includes(term))) &&
      template.status === 'published'
    );
  };

  const getStats = () => {
    const totalTemplates = templates.length;
    const publishedTemplates = templates.filter(t => t.status === 'published').length;
    const featuredTemplates = templates.filter(t => t.featured).length;
    const draftTemplates = templates.filter(t => t.status === 'draft').length;
    const totalDownloads = templates.reduce((sum, t) => {
      const downloads = parseFloat(t.downloads.replace('k', '')) * 1000;
      return sum + downloads;
    }, 0);
    const averageRating = templates.length > 0 
      ? templates.reduce((sum, t) => sum + t.rating, 0) / templates.length 
      : 0;
    const categories = [...new Set(templates.map(t => t.category))].length;

    return {
      totalTemplates,
      publishedTemplates,
      featuredTemplates,
      draftTemplates,
      totalDownloads,
      averageRating: Math.round(averageRating * 10) / 10,
      categories
    };
  };

  return {
    templates,
    loading,
    error,
    loadTemplates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    toggleFeatured,
    toggleStatus,
    getTemplate,
    getPublishedTemplates,
    getFeaturedTemplates,
    getTemplatesByCategory,
    searchTemplates,
    getStats
  };
}; 