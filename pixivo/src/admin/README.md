# Pixivo Admin Panel

A comprehensive frontend admin panel for managing the Pixivo template marketplace. This admin interface allows you to manage templates, monitor performance, and control all aspects of your template catalog.

## 🚀 Features

### Dashboard
- **Overview Statistics**: Total templates, downloads, featured templates, and more
- **Recent Templates**: Quick access to recently updated templates  
- **Quick Actions**: Shortcuts to common admin tasks
- **Performance Metrics**: Real-time stats and analytics

### Template Management
- **Full CRUD Operations**: Create, read, update, and delete templates
- **Advanced Filtering**: Filter by category, status, and search functionality
- **Bulk Operations**: Select and manage multiple templates at once
- **Sortable Columns**: Sort templates by various criteria
- **Live Preview**: Preview templates with modal overlay
- **Status Management**: Toggle between draft and published states
- **Featured Management**: Mark templates as featured with one click

### Template Editor
- **Comprehensive Form**: All template fields including metadata
- **Image Preview**: Real-time preview of template images
- **Technology Selection**: Multi-select for technologies used
- **Dynamic Arrays**: Add/remove features and compatibility items
- **Form Validation**: Real-time validation with error messages
- **Draft/Published Status**: Control template visibility

## 📁 Project Structure

```
src/admin/
├── components/
│   └── AdminLayout.jsx          # Main admin layout with sidebar
├── pages/
│   ├── AdminDashboard.jsx       # Dashboard overview page
│   ├── TemplateManagement.jsx   # Template listing and management
│   └── TemplateEditor.jsx       # Add/edit template form
├── utils/
│   └── adminData.js            # Data management utilities
├── hooks/
│   └── useTemplateData.js      # Custom hook for template operations
└── README.md                   # This documentation
```

## 🔧 Getting Started

### Access the Admin Panel

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the admin panel:
   ```
   http://localhost:5173/admin
   ```

### Navigation

The admin panel includes a collapsible sidebar with the following sections:
- **Dashboard**: Overview and statistics
- **Templates**: Manage your template collection

## 📊 Template Data Management

### Data Storage
Templates are stored in the browser's localStorage with the key `pixivo_admin_templates`. This allows for:
- Persistent data across browser sessions
- No backend requirements for development
- Easy migration to a real backend later

### Template Schema
Each template includes the following fields:

```javascript
{
  id: number,                    // Unique identifier
  title: string,                 // Template name
  description: string,           // Short description
  fullDescription: string,       // Detailed description
  category: string,              // Template category
  budget: number,                // Price in dollars
  rating: number,                // Rating (1-5)
  downloads: string,             // Download count (e.g., "2.3k")
  image: string,                 // Preview image URL
  technologies: string[],        // Technologies used
  features: string[],            // Template features
  featured: boolean,             // Featured status
  status: string,                // 'published' or 'draft'
  demoUrl: string,               // Live demo URL
  downloadUrl: string,           // Download link
  version: string,               // Template version
  fileSize: string,              // File size
  compatibleWith: string[],      // Compatibility list
  createdAt: string,             // Creation date
  updatedAt: string              // Last update date
}
```

## ⚡ Key Features Explained

### Dashboard Statistics
The dashboard automatically calculates and displays:
- Total number of templates
- Published vs. draft templates
- Featured templates count
- Total downloads across all templates
- Average rating
- Number of categories

### Template Management Table
The management interface provides:
- **Sortable columns**: Click headers to sort by any field
- **Multi-select**: Select multiple templates for bulk operations
- **Inline actions**: Quick edit, delete, and toggle operations
- **Status indicators**: Visual status badges for published/draft
- **Featured badges**: Easy identification of featured templates

### Advanced Filtering
Filter templates by:
- **Search**: Title and description text search
- **Category**: Filter by template category
- **Status**: Show published, draft, or all templates

### Template Editor
The editor includes:
- **Real-time validation**: Immediate feedback on required fields
- **Image preview**: See how template images will appear
- **Dynamic fields**: Add/remove features and compatibility items
- **Technology selection**: Multi-select checkbox interface
- **Auto-save metadata**: Automatic timestamp updates

## 🎨 Design System

The admin panel uses a clean, modern design with:
- **Tailwind CSS**: Utility-first styling approach
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Semantic HTML and keyboard navigation
- **Color Scheme**: Professional blue and gray palette

## 🔄 Integration with Main Website

The admin panel integrates seamlessly with the main Pixivo website:
- **Shared Data**: Templates created in admin appear on the public site
- **Real-time Updates**: Changes in admin reflect immediately
- **Status Control**: Only published templates show on the public site
- **Featured Control**: Featured templates appear in highlight sections

## 🛠 Customization

### Adding New Fields
To add new template fields:

1. Update the schema in `utils/adminData.js`
2. Add validation rules in `validateTemplate()`
3. Update the form in `TemplateEditor.jsx`
4. Add table columns in `TemplateManagement.jsx`

### Styling Modifications
The admin panel uses Tailwind CSS classes for styling. To customize:
- Modify existing Tailwind classes in components
- Add custom CSS in the main `styles.css` file
- Update the color scheme by changing the blue color classes

### Adding New Pages
To add new admin pages:

1. Create a new component in `pages/`
2. Add the route to `App.jsx`
3. Update the sidebar navigation in `AdminLayout.jsx`

## 📝 Best Practices

### Template Management
- Always add descriptive titles and descriptions
- Use high-quality preview images
- Select appropriate technologies
- Write clear feature lists
- Test demo URLs before publishing

### Performance
- The admin panel is optimized for performance with:
  - Lazy loading of heavy components
  - Efficient re-rendering with React hooks
  - Optimized filtering and sorting algorithms

### Data Consistency
- Always use the provided validation functions
- Maintain consistent data formats
- Regular backup of localStorage data recommended

## 🚧 Future Enhancements

Potential improvements for the admin panel:
- **Backend Integration**: Connect to a real API
- **User Authentication**: Add login/logout functionality
- **File Upload**: Direct image upload capabilities
- **Analytics**: Detailed download and view analytics
- **Export/Import**: Backup and restore template data
- **Bulk Edit**: Edit multiple templates simultaneously
- **Template Preview**: Live preview of template changes

## 📞 Support

For questions or issues with the admin panel:
1. Check the browser console for error messages
2. Verify localStorage data integrity
3. Ensure all required fields are filled
4. Check image URLs are accessible

The admin panel is designed to be intuitive and user-friendly while providing powerful template management capabilities for your Pixivo marketplace. 