
import { LoginFormData, LoginResponse } from '@/types/auth/login';
import { httpClient } from '../lib/httpClient';

class AuthService {
  async login(credentials: LoginFormData): Promise<LoginResponse> {
    try {
      const data = await httpClient.post<LoginResponse>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });
      
      if (data.token && credentials.rememberMe) {
        localStorage.setItem('authToken', data.token);
      }

      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  async loginWithGoogle(): Promise<LoginResponse> {
    return httpClient.post<LoginResponse>('/auth/google');
  }

  async loginWithTwitter(): Promise<LoginResponse> {
    return httpClient.post<LoginResponse>('/auth/twitter');
  }

  async loginWithDiscord(): Promise<LoginResponse> {
    return httpClient.post<LoginResponse>('/auth/discord');
  }

  async logout(): Promise<void> {
    try {
      await httpClient.post('/auth/logout');
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      localStorage.removeItem('authToken');
    }
  }

  async refreshToken(): Promise<LoginResponse> {
    return httpClient.post<LoginResponse>('/auth/refresh');
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return httpClient.post('/auth/forgot-password', { email });
  }
}


export const authService = new AuthService();