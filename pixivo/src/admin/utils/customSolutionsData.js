// Custom Solutions Data Management
const CUSTOM_SOLUTIONS_STORAGE_KEY = 'pixivo_custom_solutions';

// Get stored custom solution requests
export const getStoredCustomSolutions = () => {
  try {
    const stored = localStorage.getItem(CUSTOM_SOLUTIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading custom solutions:', error);
    return [];
  }
};

// Save custom solution requests to storage
export const saveCustomSolutionsToStorage = (solutions) => {
  try {
    localStorage.setItem(CUSTOM_SOLUTIONS_STORAGE_KEY, JSON.stringify(solutions));
    return true;
  } catch (error) {
    console.error('Error saving custom solutions:', error);
    return false;
  }
};

// Add a new custom solution request
export const addCustomSolutionRequest = (requestData) => {
  try {
    const existingSolutions = getStoredCustomSolutions();
    const newRequest = {
      id: generateId(),
      ...requestData,
      status: 'pending',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '',
      assignedTo: null
    };
    
    const updatedSolutions = [newRequest, ...existingSolutions];
    saveCustomSolutionsToStorage(updatedSolutions);
    return newRequest;
  } catch (error) {
    console.error('Error adding custom solution request:', error);
    return null;
  }
};

// Update custom solution request
export const updateCustomSolutionRequest = (id, updates) => {
  try {
    const solutions = getStoredCustomSolutions();
    const updatedSolutions = solutions.map(solution =>
      solution.id === id
        ? { ...solution, ...updates, updatedAt: new Date().toISOString() }
        : solution
    );
    saveCustomSolutionsToStorage(updatedSolutions);
    return true;
  } catch (error) {
    console.error('Error updating custom solution request:', error);
    return false;
  }
};

// Delete custom solution request
export const deleteCustomSolutionRequest = (id) => {
  try {
    const solutions = getStoredCustomSolutions();
    const updatedSolutions = solutions.filter(solution => solution.id !== id);
    saveCustomSolutionsToStorage(updatedSolutions);
    return true;
  } catch (error) {
    console.error('Error deleting custom solution request:', error);
    return false;
  }
};

// Generate unique ID
export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Get statistics
export const getCustomSolutionsStats = () => {
  const solutions = getStoredCustomSolutions();
  
  return {
    total: solutions.length,
    pending: solutions.filter(s => s.status === 'pending').length,
    inProgress: solutions.filter(s => s.status === 'in-progress').length,
    completed: solutions.filter(s => s.status === 'completed').length,
    cancelled: solutions.filter(s => s.status === 'cancelled').length,
    uiUxDesign: solutions.filter(s => s.service === 'ui-ux-design').length,
    frontendDevelopment: solutions.filter(s => s.service === 'frontend-development').length,
    thisMonth: solutions.filter(s => {
      const requestDate = new Date(s.createdAt);
      const now = new Date();
      return requestDate.getMonth() === now.getMonth() && 
             requestDate.getFullYear() === now.getFullYear();
    }).length
  };
};

// Status options
export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'in-progress', label: 'In Progress', color: 'blue' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' }
];

// Priority options
export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'gray' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'urgent', label: 'Urgent', color: 'red' }
];

// Service type mapping
export const SERVICE_TYPES = {
  'ui-ux-design': 'UI/UX Design',
  'frontend-development': 'Frontend Development'
};

// Design type mapping
export const DESIGN_TYPES = {
  'website-design': 'Website Design',
  'application-design': 'Application Design'
};

// Website type mapping
export const WEBSITE_TYPES = {
  'portfolio': 'Portfolio Website',
  'e-commerce': 'E-commerce Website',
  'blog': 'Blog Website',
  'business': 'Business Website',
  'landing-page': 'Landing Page',
  'educational': 'Educational Website',
  'news': 'News Website',
  'social-media': 'Social Media Platform'
};

// Technology mapping
export const TECHNOLOGIES = {
  'html': 'HTML',
  'css': 'CSS',
  'javascript': 'JavaScript',
  'react': 'React',
  'tailwind': 'Tailwind CSS',
  'webflow': 'Webflow',
  'typescript': 'TypeScript',
  'bootstrap': 'Bootstrap',
  'mysql': 'MySQL'
};

// Validate custom solution request
export const validateCustomSolutionRequest = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.service) {
    errors.service = 'Please select a service';
  }

  if (data.service === 'ui-ux-design' && !data.designType) {
    errors.designType = 'Please select a design type';
  }

  if (data.service === 'frontend-development') {
    if (!data.websiteType) {
      errors.websiteType = 'Please select a website type';
    }
    if (!data.technologies || data.technologies.length === 0) {
      errors.technologies = 'Please select at least one technology';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 