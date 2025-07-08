import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Demo credentials - in real app, this would be handled by backend
const DEMO_CREDENTIALS = {
  email: 'admin@pixivo.com',
  password: 'admin123'
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      const authData = localStorage.getItem('pixivo_admin_auth');
      if (authData) {
        try {
          const parsedData = JSON.parse(authData);
          if (parsedData.isAuthenticated && parsedData.user) {
            setIsAuthenticated(true);
            setUser(parsedData.user);
          }
        } catch (error) {
          console.error('Error parsing auth data:', error);
          localStorage.removeItem('pixivo_admin_auth');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        const userData = {
          id: 1,
          email: email,
          name: 'Admin User',
          role: 'administrator',
          avatar: null
        };

        const authData = {
          isAuthenticated: true,
          user: userData
        };

        // Store in localStorage
        localStorage.setItem('pixivo_admin_auth', JSON.stringify(authData));
        
        setIsAuthenticated(true);
        setUser(userData);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Invalid email or password' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('pixivo_admin_auth');
    setIsAuthenticated(false);
    setUser(null);
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