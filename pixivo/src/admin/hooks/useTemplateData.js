import { useState, useEffect } from 'react';
import {
  getAllTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  toggleTemplateFeatured,
  updateTemplateStatus
} from '../../services/templateService';

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
      const templateData = await getAllTemplates();
      setTemplates(templateData);
    } catch (err) {
      setError('Failed to load templates');
      console.error('Error loading templates:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTemplate = async (newTemplate) => {
    try {
      const createdTemplate = await createTemplate(newTemplate);
      setTemplates(prev => [...prev, createdTemplate]);
      return true;
    } catch (err) {
      setError('Failed to create template');
      console.error('Error creating template:', err);
      return false;
    }
  };

  const updateTemplateData = async (templateId, updatedData) => {
    try {
      const updatedTemplate = await updateTemplate(templateId, updatedData);
      setTemplates(prev => prev.map(template =>
        template.id === templateId ? updatedTemplate : template
      ));
      return true;
    } catch (err) {
      setError('Failed to update template');
      console.error('Error updating template:', err);
      return false;
    }
  };

  const deleteTemplateData = async (templateId) => {
    try {
      await deleteTemplate(templateId);
      setTemplates(prev => prev.filter(template => template.id !== templateId));
      return true;
    } catch (err) {
      setError('Failed to delete template');
      console.error('Error deleting template:', err);
      return false;
    }
  };

  const toggleFeatured = async (templateId) => {
    try {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        const updatedTemplate = await toggleTemplateFeatured(templateId, !template.featured);
        setTemplates(prev => prev.map(t =>
          t.id === templateId ? updatedTemplate : t
        ));
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to toggle featured status');
      console.error('Error toggling featured status:', err);
      return false;
    }
  };

  const toggleStatus = async (templateId) => {
    try {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        const newStatus = template.status === 'published' ? 'draft' : 'published';
        const updatedTemplate = await updateTemplateStatus(templateId, newStatus);
        setTemplates(prev => prev.map(t =>
          t.id === templateId ? updatedTemplate : t
        ));
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to toggle status');
      console.error('Error toggling status:', err);
      return false;
    }
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
    updateTemplate: updateTemplateData,
    deleteTemplate: deleteTemplateData,
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