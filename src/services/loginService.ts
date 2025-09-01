import { AuthCredentials, AuthResponse } from '@/types/auth/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const LoginService = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  console.log('API service - sending credentials:', { 
    username: credentials.username, 
    password: '***' // Don't log actual password for security
  });
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials), 
    });

    console.log('API response status:', response.status);

    // Handle different error status codes
    if (!response.ok) {
      let errorMessage = 'Login failed';
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      } catch {
        // If JSON parsing fails, use status text
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      
      console.log('API error response:', errorMessage);
      throw new Error(errorMessage);
    }

    const result: AuthResponse = await response.json();
    console.log('API success response - user:', result.user?.username || 'No user data');
    
    // Validate the response structure
    if (!result.token || !result.user) {
      throw new Error('Invalid response from server');
    }
    
    return result;
    
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection.');
    }
    
    // Re-throw other errors (including our custom ones)
    throw error;
  }
};