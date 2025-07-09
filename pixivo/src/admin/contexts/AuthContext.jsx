import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        } else if (session?.user) {
          setIsAuthenticated(true);
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || 'Admin User',
            role: 'administrator'
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setIsAuthenticated(true);
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || 'Admin User',
            role: 'administrator'
          });
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        return { 
          success: false, 
          error: error.message === 'Invalid login credentials' 
            ? 'Invalid email or password' 
            : error.message 
        };
      }

      if (data?.user) {
        // Authentication successful, state will be updated by onAuthStateChange
        return { success: true };
      }

      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // State will be updated by onAuthStateChange listener
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout on error
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 