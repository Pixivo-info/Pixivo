// Admin Data Management Utility
// This will simulate a backend API with local state management

export const DEFAULT_TEMPLATES = [
  {
    id: 1,
    title: "Modern Dashboard",
    budget: 49,
    rating: 5,
    downloads: "2.3k",
    category: "dashboard",
    image: "https://res.cloudinary.com/dmsg2vpgy/image/upload/v1751864340/card1_bzp9dt.webp",
    technologies: ["React", "CSS", "JavaScript"],
    featured: true,
    description: "A comprehensive dashboard template designed for modern web applications.",
    fullDescription: "This premium dashboard template is crafted with attention to detail and modern design principles. Built with React and styled using Tailwind CSS, it offers a perfect foundation for creating professional admin interfaces and data visualization platforms.",
    features: [
      "Fully responsive design",
      "React & Tailwind CSS",
      "Dark/Light theme support", 
      "Multiple layout options",
      "Advanced charts & graphs",
      "Customizable components",
      "Clean, modern UI",
      "Well-documented code",
      "Regular updates",
      "Premium support"
    ],
    demoUrl: "https://demo.pixivo.com/dashboard",
    downloadUrl: "https://download.pixivo.com/dashboard",
    lastUpdated: "March 15, 2024",
    version: "2.1.0",
    fileSize: "12.4 MB",
    compatibleWith: ["React 18+", "Next.js 13+", "Vite 4+"],
    status: "published",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-15"
  },
  {
    id: 2,
    title: "E-commerce UI Kit",
    budget: 79,
    rating: 4,
    downloads: "1.8k",
    category: "ecommerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    technologies: ["Vue.js", "CSS", "Bootstrap"],
    featured: false,
    description: "Complete e-commerce UI kit with modern design patterns and components.",
    fullDescription: "A comprehensive e-commerce UI kit that includes all the necessary components and pages for building a modern online store. Features product listings, shopping cart, checkout flow, and user dashboard.",
    features: [
      "Complete e-commerce components",
      "Vue.js & Bootstrap",
      "Shopping cart functionality",
      "Checkout flow",
      "Product management",
      "User dashboard",
      "Payment integration ready",
      "Mobile optimized"
    ],
    demoUrl: "https://demo.pixivo.com/ecommerce",
    downloadUrl: "https://download.pixivo.com/ecommerce",
    lastUpdated: "February 28, 2024",
    version: "1.5.0",
    fileSize: "18.2 MB",
    compatibleWith: ["Vue 3+", "Nuxt 3+", "Bootstrap 5+"],
    status: "published",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-28"
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
    featured: true,
    description: "Modern mobile app design with intuitive user interface components.",
    fullDescription: "A sleek mobile app design template featuring modern UI patterns, smooth animations, and a comprehensive component library perfect for iOS and Android applications.",
    features: [
      "Cross-platform design",
      "React Native components",
      "Smooth animations",
      "Dark/Light themes",
      "Navigation patterns",
      "Form components",
      "Icon library",
      "Style guide included"
    ],
    demoUrl: "https://demo.pixivo.com/mobile",
    downloadUrl: "https://download.pixivo.com/mobile",
    lastUpdated: "March 10, 2024",
    version: "3.0.0",
    fileSize: "8.7 MB",
    compatibleWith: ["React Native 0.72+", "Expo 49+"],
    status: "published",
    createdAt: "2024-01-05",
    updatedAt: "2024-03-10"
  }
];

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

// Local storage key
const STORAGE_KEY = 'pixivo_admin_templates';

// Get templates from localStorage or use defaults
export const getStoredTemplates = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_TEMPLATES;
  } catch (error) {
    console.error('Error loading templates from storage:', error);
    return DEFAULT_TEMPLATES;
  }
};

// Save templates to localStorage
export const saveTemplatesToStorage = (templates) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error('Error saving templates to storage:', error);
  }
};

// Generate new ID
export const generateId = () => {
  return Date.now() + Math.random();
};

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