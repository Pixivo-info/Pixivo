import { createClient } from '@supabase/supabase-js'

// Supabase project configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY

// Environment variables loaded successfully

// Check if environment variables are configured
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  )
}

// Create single Supabase client instance to avoid multiple client warnings
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Disable to avoid multiple clients
    flowType: 'pkce',
    storageKey: 'pixivo-auth-token' // Custom storage key
  },
  global: {
    headers: {
      'x-application-name': 'pixivo-frontend'
    }
  }
})

// Create admin client only when service role key is available
export const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
        storageKey: 'pixivo-admin-token' // Different storage key for admin
      },
      global: {
        headers: {
          'x-application-name': 'pixivo-admin'
        }
      }
    })
  : supabase // Fallback to regular client if no service role key

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  if (error) {
    // Log detailed error for debugging (only in development)
    if (import.meta.env.DEV) {
      console.error('Supabase Error:', error)
    }
    // Throw user-friendly error
    throw new Error(error.message || 'An unexpected error occurred')
  }
}

// Database table names
export const TABLES = {
  TEMPLATES: 'templates',
  CUSTOM_SOLUTIONS: 'custom_solutions' // Custom solutions table
}

export default supabase 