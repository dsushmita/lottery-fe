import {
  ForgotPasswordData,
  LoginFormData,
  LoginResponse,
  ResetPasswordData,
  SignupFormData,
  SignupResponse,
  User,
} from "@/types/auth/auth";
import { httpClient } from "../lib/httpClient";

interface APIResponse<T> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data: T;
}
class AuthService {
  private readonly TOKEN_KEY = "auth_token";
  private readonly REFRESH_TOKEN_KEY = "refresh_token";
  private readonly USER_KEY = "user_data";

  // Token management
  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  // User management
  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  getStoredUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Login
  async login(credentials: LoginFormData): Promise<LoginResponse> {
    try {
      const data = await httpClient.post<LoginResponse>("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      if (data.success && data.token && data.user) {
        this.setToken(data.token);
        this.setUser(data.user);
      }

      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  }
  async loginWithTwitter(): Promise<LoginResponse> {
    return httpClient.post<LoginResponse>("/auth/twitter");
  }

  async loginWithDiscord(): Promise<LoginResponse> {
    return httpClient.post<LoginResponse>("/auth/discord");
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await httpClient.post("/auth/logout");
    } catch (error) {
      console.warn("Logout request failed:", error);
    } finally {
      this.clearTokens();
      this.clearUser();
    }
  }

  // Forgot password
  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    await httpClient.post("/auth/forgot-password", data);
  }

  // Reset password
  async resetPassword(
    data: Omit<ResetPasswordData, "confirmPassword">,
  ): Promise<void> {
    await httpClient.post("/auth/reset-password", {
      password: data.password,
      token: data.token,
      userId: data.userId,
    });
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await httpClient.get<User>("/auth/me");
      this.setUser(user);
      return user;
    } catch (error) {
      this.clearTokens();
      this.clearUser();
      return null;
    }
  }

  // Refresh token
  async refreshToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await httpClient.post<{
        token: string;
        refreshToken: string;
      }>("/auth/refresh", {
        refreshToken,
      });

      this.setToken(response.token);
      this.setRefreshToken(response.refreshToken);
      return response.token;
    } catch (error) {
      this.clearTokens();
      this.clearUser();
      return null;
    }
  }

  // Signup
  async signup(
    credentials: Omit<SignupFormData, "confirmPassword">,
  ): Promise<SignupResponse> {
    try {
      const data = await httpClient.post<SignupResponse>(
        "/auth/register",
        credentials,
      );

      if (data.success && data.token && data.user) {
        this.setToken(data.token);
        this.setUser(data.user);
      }

      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Signup failed");
    }
  }

  async loginWithGoogle(idToken: string): Promise<LoginResponse> {
    try {
      const data = await httpClient.post<LoginResponse>("/auth/google-login", {
        idToken, // backend expects this field
      });

      if (data.success && data.token && data.user) {
        this.setToken(data.token);
        this.setUser(data.user);
      }

      return data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Google login failed",
      );
    }
  }
 // Steam Login
  async getSteamLoginUrl(): Promise<string> {
    try {
      const response = await httpClient.get<APIResponse<string>>("/auth/steam-login-url");
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || "Failed to get Steam login URL");
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to get Steam login URL");
    }
  }

  async loginWithSteam(params: URLSearchParams): Promise<LoginResponse> {
    try {
      const response = await httpClient.get<LoginResponse>("/auth/steam/callback", { params } as any);
      if (response.success && response.token && response.user) {
        this.setToken(response.token);
        this.setUser({
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
         // Optional field
        });
      } else {
        throw new Error(response.message || "Steam login failed");
      }
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Steam login failed");
    }
  }
}

export const authService = new AuthService();
