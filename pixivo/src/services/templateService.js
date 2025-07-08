import { supabase, supabaseAdmin, handleSupabaseError, TABLES } from '../lib/supabase'

/**
 * Template Service - Handles all template-related database operations
 * Uses Supabase for data persistence instead of localStorage
 */

// =================== FETCH OPERATIONS ===================

/**
 * Get all published templates (for public website)
 * @param {Object} options - Query options
 * @param {string} options.category - Filter by category
 * @param {string} options.search - Search in title and description
 * @param {boolean} options.featured - Filter by featured status
 * @returns {Promise<Array>} Array of published templates
 */
export const getPublishedTemplates = async (options = {}) => {
  try {
    let query = supabase
      .from(TABLES.TEMPLATES)
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    // Apply filters
    if (options.category && options.category !== 'all') {
      if (options.category === 'latest') {
        // Get latest templates (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        query = query.gte('created_at', thirtyDaysAgo.toISOString())
      } else if (options.category === 'popular') {
        // Get popular templates (high download count)
        query = query.order('downloads', { ascending: false }).limit(20)
      } else {
        // Filter by specific category
        query = query.eq('category', options.category)
      }
    }

    if (options.featured !== undefined) {
      query = query.eq('featured', options.featured)
    }

    if (options.search) {
      query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`)
    }

    const { data, error } = await query

    handleSupabaseError(error)
    return data || []
  } catch (error) {
    console.error('Error fetching published templates:', error)
    throw error
  }
}

/**
 * Get all templates (for admin panel)
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of all templates
 */
export const getAllTemplates = async (options = {}) => {
  try {
    let query = supabaseAdmin
      .from(TABLES.TEMPLATES)
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (options.status && options.status !== 'all') {
      query = query.eq('status', options.status)
    }

    if (options.category && options.category !== 'all') {
      query = query.eq('category', options.category)
    }

    if (options.search) {
      query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`)
    }

    const { data, error } = await query

    handleSupabaseError(error)
    return data || []
  } catch (error) {
    console.error('Error fetching all templates:', error)
    throw error
  }
}

/**
 * Get single template by ID
 * @param {number} id - Template ID
 * @param {boolean} isAdmin - Whether this is admin access (can see draft templates)
 * @returns {Promise<Object|null>} Template object or null
 */
export const getTemplateById = async (id, isAdmin = false) => {
  try {
    const client = isAdmin ? supabaseAdmin : supabase
    
    // Build query conditions
    let query = client
      .from(TABLES.TEMPLATES)
      .select('*')
    
    if (isAdmin) {
      // Admin can see any template by ID
      query = query.eq('id', id)
    } else {
      // Public can only see published templates
      query = query.eq('id', id).eq('status', 'published')
    }

    const { data, error } = await query.maybeSingle()

    if (error) {
      console.error('Supabase error fetching template:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching template by ID:', error)
    return null
  }
}

/**
 * Get featured templates for homepage
 * @param {number} limit - Number of templates to fetch
 * @returns {Promise<Array>} Array of featured templates
 */
export const getFeaturedTemplates = async (limit = 6) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.TEMPLATES)
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    handleSupabaseError(error)
    return data || []
  } catch (error) {
    console.error('Error fetching featured templates:', error)
    throw error
  }
}

// =================== ADMIN OPERATIONS ===================

/**
 * Create new template (Admin only)
 * @param {Object} templateData - Template data
 * @returns {Promise<Object>} Created template
 */
export const createTemplate = async (templateData) => {
  try {
    // Convert array fields if they're strings
    const processedData = {
      ...templateData,
      technologies: Array.isArray(templateData.technologies) 
        ? templateData.technologies 
        : templateData.technologies ? [templateData.technologies] : [],
      features: Array.isArray(templateData.features) 
        ? templateData.features 
        : templateData.features ? [templateData.features] : [],
      compatible_with: Array.isArray(templateData.compatible_with) 
        ? templateData.compatible_with 
        : templateData.compatible_with ? [templateData.compatible_with] : [],
      // Map frontend field names to database field names
      image_url: templateData.image,
      full_description: templateData.fullDescription,
      demo_url: templateData.demoUrl,
      download_url: templateData.downloadUrl,
      file_size: templateData.fileSize,
    }

    // Remove fields that don't exist in database
    delete processedData.image
    delete processedData.fullDescription
    delete processedData.demoUrl
    delete processedData.downloadUrl
    delete processedData.fileSize

    const { data, error } = await supabaseAdmin
      .from(TABLES.TEMPLATES)
      .insert([processedData])
      .select()
      .single()

    handleSupabaseError(error)
    return data
  } catch (error) {
    console.error('Error creating template:', error)
    throw error
  }
}

/**
 * Update template (Admin only)
 * @param {number} id - Template ID
 * @param {Object} templateData - Updated template data
 * @returns {Promise<Object>} Updated template
 */
export const updateTemplate = async (id, templateData) => {
  try {
    // Convert array fields if they're strings
    const processedData = {
      ...templateData,
      technologies: Array.isArray(templateData.technologies) 
        ? templateData.technologies 
        : templateData.technologies ? [templateData.technologies] : [],
      features: Array.isArray(templateData.features) 
        ? templateData.features 
        : templateData.features ? [templateData.features] : [],
      compatible_with: Array.isArray(templateData.compatible_with) 
        ? templateData.compatible_with 
        : templateData.compatible_with ? [templateData.compatible_with] : [],
      // Map frontend field names to database field names
      image_url: templateData.image,
      full_description: templateData.fullDescription,
      demo_url: templateData.demoUrl,
      download_url: templateData.downloadUrl,
      file_size: templateData.fileSize,
    }

    // Remove fields that don't exist in database or shouldn't be updated
    delete processedData.id
    delete processedData.created_at
    delete processedData.image
    delete processedData.fullDescription
    delete processedData.demoUrl
    delete processedData.downloadUrl
    delete processedData.fileSize

    const { data, error } = await supabaseAdmin
      .from(TABLES.TEMPLATES)
      .update(processedData)
      .eq('id', id)
      .select()
      .single()

    handleSupabaseError(error)
    return data
  } catch (error) {
    console.error('Error updating template:', error)
    throw error
  }
}

/**
 * Delete template (Admin only)
 * @param {number} id - Template ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteTemplate = async (id) => {
  try {
    const { error } = await supabaseAdmin
      .from(TABLES.TEMPLATES)
      .delete()
      .eq('id', id)

    handleSupabaseError(error)
    return true
  } catch (error) {
    console.error('Error deleting template:', error)
    throw error
  }
}

/**
 * Toggle template featured status (Admin only)
 * @param {number} id - Template ID
 * @param {boolean} featured - New featured status
 * @returns {Promise<Object>} Updated template
 */
export const toggleTemplateFeatured = async (id, featured) => {
  try {
    const { data, error } = await supabaseAdmin
      .from(TABLES.TEMPLATES)
      .update({ featured })
      .eq('id', id)
      .select()
      .single()

    handleSupabaseError(error)
    return data
  } catch (error) {
    console.error('Error toggling template featured status:', error)
    throw error
  }
}

/**
 * Update template status (Admin only)
 * @param {number} id - Template ID
 * @param {string} status - New status ('published' or 'draft')
 * @returns {Promise<Object>} Updated template
 */
export const updateTemplateStatus = async (id, status) => {
  try {
    const { data, error } = await supabaseAdmin
      .from(TABLES.TEMPLATES)
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    handleSupabaseError(error)
    return data
  } catch (error) {
    console.error('Error updating template status:', error)
    throw error
  }
}

// =================== STATISTICS ===================

/**
 * Get template statistics for admin dashboard
 * @returns {Promise<Object>} Statistics object
 */
export const getTemplateStats = async () => {
  try {
    // Get all templates
    const { data: allTemplates, error: allError } = await supabaseAdmin
      .from(TABLES.TEMPLATES)
      .select('*')

    handleSupabaseError(allError)

    if (!allTemplates) {
      return {
        totalTemplates: 0,
        publishedTemplates: 0,
        draftTemplates: 0,
        featuredTemplates: 0,
        totalDownloads: 0,
        averageRating: 0,
        categoriesCount: 0
      }
    }

    // Calculate statistics
    const totalTemplates = allTemplates.length
    const publishedTemplates = allTemplates.filter(t => t.status === 'published').length
    const draftTemplates = allTemplates.filter(t => t.status === 'draft').length
    const featuredTemplates = allTemplates.filter(t => t.featured).length
    
    // Calculate total downloads (convert "2.3k" format to numbers)
    const totalDownloads = allTemplates.reduce((sum, template) => {
      const downloads = template.downloads || '0'
      const num = parseFloat(downloads.replace('k', '')) * (downloads.includes('k') ? 1000 : 1)
      return sum + num
    }, 0)

    // Calculate average rating
    const averageRating = totalTemplates > 0 
      ? allTemplates.reduce((sum, t) => sum + (t.rating || 0), 0) / totalTemplates 
      : 0

    // Count unique categories
    const categoriesCount = [...new Set(allTemplates.map(t => t.category))].length

    return {
      totalTemplates,
      publishedTemplates,
      draftTemplates,
      featuredTemplates,
      totalDownloads: Math.round(totalDownloads),
      averageRating: Math.round(averageRating * 10) / 10,
      categoriesCount
    }
  } catch (error) {
    console.error('Error getting template statistics:', error)
    throw error
  }
}

// =================== UTILITY FUNCTIONS ===================

/**
 * Get unique categories from all templates
 * @returns {Promise<Array>} Array of category names
 */
export const getTemplateCategories = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.TEMPLATES)
      .select('category')
      .eq('status', 'published')

    handleSupabaseError(error)

    if (!data) return []

    // Get unique categories
    const categories = [...new Set(data.map(item => item.category))]
    return categories.sort()
  } catch (error) {
    console.error('Error getting template categories:', error)
    throw error
  }
}

/**
 * Search templates
 * @param {string} searchTerm - Search term
 * @param {Object} filters - Additional filters
 * @returns {Promise<Array>} Search results
 */
export const searchTemplates = async (searchTerm, filters = {}) => {
  try {
    let query = supabase
      .from(TABLES.TEMPLATES)
      .select('*')
      .eq('status', 'published')

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,technologies.cs.{${searchTerm}}`)
    }

    if (filters.category && filters.category !== 'all') {
      query = query.eq('category', filters.category)
    }

    if (filters.minPrice !== undefined) {
      query = query.gte('budget', filters.minPrice)
    }

    if (filters.maxPrice !== undefined) {
      query = query.lte('budget', filters.maxPrice)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    handleSupabaseError(error)
    return data || []
  } catch (error) {
    console.error('Error searching templates:', error)
    throw error
  }
}

export default {
  // Public methods
  getPublishedTemplates,
  getTemplateById,
  getFeaturedTemplates,
  getTemplateCategories,
  searchTemplates,
  
  // Admin methods
  getAllTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  toggleTemplateFeatured,
  updateTemplateStatus,
  getTemplateStats
} 