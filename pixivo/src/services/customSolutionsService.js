import { supabase, supabaseAdmin, handleSupabaseError } from '../lib/supabase'

/**
 * Custom Solutions Service - Handles all custom solution-related database operations
 * Uses Supabase for data persistence
 */

const TABLE_NAME = 'custom_solutions';

// =================== PUBLIC OPERATIONS (Form Submission) ===================

/**
 * Submit new custom solution request (Public)
 * @param {Object} requestData - Form data from custom solutions page
 * @returns {Promise<Object>} Created request
 */
export const submitCustomSolutionRequest = async (requestData) => {
  try {
    console.log('📤 Submitting custom solution request:', requestData);
    
    // Process and clean the data
    const processedData = {
      name: requestData.name.trim(),
      email: requestData.email.toLowerCase().trim(),
      service: requestData.service,
      design_type: requestData.designType || null,
      website_type: requestData.websiteType || null,
      technologies: requestData.technologies || [],
      message: requestData.message?.trim() || '',
      status: 'pending',
      priority: 'medium'
    };

    console.log('📋 Processed data for database:', processedData);

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([processedData])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      handleSupabaseError(error);
    }

    console.log('✅ Custom solution request created:', data);
    return data;
  } catch (error) {
    console.error('💥 Error submitting custom solution request:', error);
    throw error;
  }
};

// =================== ADMIN OPERATIONS ===================

/**
 * Get all custom solution requests (Admin only)
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of all requests
 */
export const getAllCustomSolutions = async (options = {}) => {
  try {
    console.log('📊 Fetching all custom solutions with options:', options);
    
    let query = supabaseAdmin
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (options.status && options.status !== 'all') {
      query = query.eq('status', options.status);
    }

    if (options.service && options.service !== 'all') {
      query = query.eq('service', options.service);
    }

    if (options.priority && options.priority !== 'all') {
      query = query.eq('priority', options.priority);
    }

    if (options.search) {
      query = query.or(`name.ilike.%${options.search}%,email.ilike.%${options.search}%,message.ilike.%${options.search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Supabase error fetching custom solutions:', error);
      handleSupabaseError(error);
    }

    console.log('✅ Custom solutions fetched:', data?.length || 0, 'found');
    return data || [];
  } catch (error) {
    console.error('💥 Error fetching all custom solutions:', error);
    throw error;
  }
};

/**
 * Get single custom solution by ID (Admin only)
 * @param {number} id - Request ID
 * @returns {Promise<Object|null>} Request object or null
 */
export const getCustomSolutionById = async (id) => {
  try {
    console.log('🔍 Fetching custom solution by ID:', id);
    
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('❌ Supabase error fetching custom solution:', error);
      return null;
    }

    console.log('✅ Custom solution fetched:', data);
    return data;
  } catch (error) {
    console.error('💥 Error fetching custom solution by ID:', error);
    return null;
  }
};

/**
 * Update custom solution request (Admin only)
 * @param {number} id - Request ID
 * @param {Object} updates - Updated data
 * @returns {Promise<Object>} Updated request
 */
export const updateCustomSolution = async (id, updates) => {
  try {
    console.log('📝 Updating custom solution:', id, updates);
    
    // Add updated_at timestamp
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.created_at;

    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error updating custom solution:', error);
      handleSupabaseError(error);
    }

    console.log('✅ Custom solution updated:', data);
    return data;
  } catch (error) {
    console.error('💥 Error updating custom solution:', error);
    throw error;
  }
};

/**
 * Delete custom solution request (Admin only)
 * @param {number} id - Request ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteCustomSolution = async (id) => {
  try {
    console.log('🗑️ Deleting custom solution:', id);
    
    const { error } = await supabaseAdmin
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Supabase error deleting custom solution:', error);
      handleSupabaseError(error);
    }

    console.log('✅ Custom solution deleted successfully');
    return true;
  } catch (error) {
    console.error('💥 Error deleting custom solution:', error);
    throw error;
  }
};

/**
 * Update request status (Admin only)
 * @param {number} id - Request ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated request
 */
export const updateCustomSolutionStatus = async (id, status) => {
  try {
    console.log('🔄 Updating custom solution status:', id, status);
    
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error updating status:', error);
      handleSupabaseError(error);
    }

    console.log('✅ Status updated successfully:', data);
    return data;
  } catch (error) {
    console.error('💥 Error updating status:', error);
    throw error;
  }
};

/**
 * Update request priority (Admin only)
 * @param {number} id - Request ID
 * @param {string} priority - New priority
 * @returns {Promise<Object>} Updated request
 */
export const updateCustomSolutionPriority = async (id, priority) => {
  try {
    console.log('⚡ Updating custom solution priority:', id, priority);
    
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .update({ 
        priority, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error updating priority:', error);
      handleSupabaseError(error);
    }

    console.log('✅ Priority updated successfully:', data);
    return data;
  } catch (error) {
    console.error('💥 Error updating priority:', error);
    throw error;
  }
};

/**
 * Update request notes (Admin only)
 * @param {number} id - Request ID
 * @param {string} notes - New notes
 * @returns {Promise<Object>} Updated request
 */
export const updateCustomSolutionNotes = async (id, notes) => {
  try {
    console.log('📝 Updating custom solution notes:', id);
    
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .update({ 
        notes, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error updating notes:', error);
      handleSupabaseError(error);
    }

    console.log('✅ Notes updated successfully');
    return data;
  } catch (error) {
    console.error('💥 Error updating notes:', error);
    throw error;
  }
};

// =================== STATISTICS ===================

/**
 * Get custom solutions statistics for admin dashboard
 * @returns {Promise<Object>} Statistics object
 */
export const getCustomSolutionsStats = async () => {
  try {
    console.log('📈 Fetching custom solutions statistics');
    
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .select('*');

    if (error) {
      console.error('❌ Supabase error fetching stats:', error);
      handleSupabaseError(error);
    }

    if (!data) {
      return {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        cancelled: 0,
        uiUxDesign: 0,
        frontendDevelopment: 0,
        thisMonth: 0
      };
    }

    // Calculate statistics
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const stats = {
      total: data.length,
      pending: data.filter(r => r.status === 'pending').length,
      inProgress: data.filter(r => r.status === 'in-progress').length,
      completed: data.filter(r => r.status === 'completed').length,
      cancelled: data.filter(r => r.status === 'cancelled').length,
      uiUxDesign: data.filter(r => r.service === 'ui-ux-design').length,
      frontendDevelopment: data.filter(r => r.service === 'frontend-development').length,
      thisMonth: data.filter(r => new Date(r.created_at) >= thisMonthStart).length
    };

    console.log('✅ Custom solutions stats calculated:', stats);
    return stats;
  } catch (error) {
    console.error('💥 Error calculating statistics:', error);
    throw error;
  }
};

// =================== UTILITY FUNCTIONS ===================

/**
 * Validate custom solution request data
 * @param {Object} data - Request data
 * @returns {Object} Validation result
 */
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

export default {
  // Public methods
  submitCustomSolutionRequest,
  validateCustomSolutionRequest,
  
  // Admin methods
  getAllCustomSolutions,
  getCustomSolutionById,
  updateCustomSolution,
  deleteCustomSolution,
  updateCustomSolutionStatus,
  updateCustomSolutionPriority,
  updateCustomSolutionNotes,
  getCustomSolutionsStats
}; 