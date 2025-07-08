// Admin Data Management Utility
// Utility functions for template validation and categories

export const CATEGORIES = [
  'dashboard',
  'ecommerce', 
  'mobile',
  'landing',
  'portfolio',
  'blog',
  'business'
];

export const TECHNOLOGIES = [
  'React',
  'Vue.js',
  'Angular',
  'Next.js',
  'Nuxt.js',
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'Bootstrap',
  'SCSS',
  'React Native',
  'Flutter',
  'Node.js',
  'PHP',
  'Python'
];

// Note: Template data is now managed via Supabase database

// Template validation
export const validateTemplate = (template) => {
  const errors = {};
  
  if (!template.title?.trim()) {
    errors.title = 'Title is required';
  }
  
  if (!template.description?.trim()) {
    errors.description = 'Description is required';
  }
  
  if (!template.category) {
    errors.category = 'Category is required';
  }
  
  if (!template.image?.trim()) {
    errors.image = 'Image URL is required';
  }
  
  if (template.budget < 0) {
    errors.budget = 'Budget must be 0 or greater';
  }
  
  if (!template.technologies || template.technologies.length === 0) {
    errors.technologies = 'At least one technology is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 