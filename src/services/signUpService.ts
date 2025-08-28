import { SignupResponse, SignupCredentials, SignupRequest, SignupUser, SignupValidation } from '@/types/auth/signup';
import { httpClient } from './httpClient';
export const SignupService = {
  async signup(credentials: SignupCredentials): Promise<SignupResponse> {
    const result = await httpClient.post<SignupResponse>('/api/auth/register', credentials);
    
    if (result.token) {
      httpClient.setAuthToken(result.token);
    }
    
    return result;
  },

  async signupWithDetails(request: SignupRequest): Promise<SignupResponse> {
    const result = await httpClient.post<SignupResponse>('/api/auth/register', request);
    
    if (result.token) {
      httpClient.setAuthToken(result.token);
    }
    
    return result;
  },

  async verifyEmail(token: string): Promise<{ message: string; user: SignupUser }> {
    return httpClient.post<{ message: string; user: SignupUser }>('/api/auth/verify-email', { token });
  },

  async resendVerification(email: string): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>('/api/auth/resend-verification', { email });
  },

  async getSignupValidation(): Promise<SignupValidation> {
    return httpClient.get<SignupValidation>('/api/auth/signup-requirements');
  },

  async checkUsernameAvailability(username: string): Promise<{ available: boolean }> {
    return httpClient.get<{ available: boolean }>('/api/auth/check-username', { 
      params: { username } 
    });
  },

  async checkEmailAvailability(email: string): Promise<{ available: boolean }> {
    return httpClient.get<{ available: boolean }>('/api/auth/check-email', { 
      params: { email } 
    });
  }
};