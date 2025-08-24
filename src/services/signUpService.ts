import { SignupApiCredentials, SignupResponse } from '@/types/auth/signup';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const SignupService = async (credentials: SignupApiCredentials): Promise<SignupResponse> => {
  console.log('Signup API service - sending credentials:', { 
    username: credentials.username,
    email: credentials.email,
    password: '***' 
  });
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials), 
    });

    console.log('Signup API response status:', response.status);

    // Handle different error status codes
    if (!response.ok) {
      let errorMessage = 'Signup failed';
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      } catch {
        // If JSON parsing fails, use status text
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      
      console.log('Signup API error response:', errorMessage);
      throw new Error(errorMessage);
    }

    const result: SignupResponse = await response.json();
    console.log('Signup API success response - user:', result.user?.username || 'No user data');
    
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