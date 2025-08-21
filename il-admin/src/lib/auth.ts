// Authentication utility functions
export const authUtils = {
  // Check if user is authenticated by calling /api/auth/me
  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  // Get current user data
  async getCurrentUser() {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch {
      return null;
    }
  },

  // Logout user
  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }

      return true;
    } catch {
      return false;
    }
  }
};
