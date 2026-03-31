// Test API connection
const testConnection = async () => {
  try {
    console.log('Testing API connection...');
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    console.log('API Response:', data);
    return response.ok;
  } catch (error) {
    console.error('API Connection Error:', error);
    return false;
  }
};

// Mock data for testing without backend
const mockAuth = {
  register: async (userData) => {
    console.log('Mock registration:', userData);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Always return success for demo
    return {
      success: true,
      message: 'Registration successful! Please login to continue.'
    };
  },
  
  login: async (credentials) => {
    console.log('Mock login:', credentials);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Accept any email/password for demo
    if (credentials.email && credentials.password) {
      return {
        success: true,
        message: 'Login successful',
        user: {
          id: 1,
          full_name: credentials.email.split('@')[0],
          email: credentials.email,
          skills: ['JavaScript', 'React', 'Node.js'],
          target_job_role: 'Full Stack Developer'
        },
        token: 'mock-token-' + Date.now()
      };
    } else {
      return {
        success: false,
        message: 'Please enter email and password'
      };
    }
  }
};

// Export for use in components
window.testConnection = testConnection;
window.mockAuth = mockAuth;

// Make sure mock auth is always available
if (!window.mockAuth) {
  window.mockAuth = mockAuth;
}

console.log('Mock authentication system loaded');
console.log('Demo login: any email/password will work');

// Auto-test connection
testConnection();
