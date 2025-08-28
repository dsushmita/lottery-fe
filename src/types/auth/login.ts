// types/auth/login.ts

export interface User {
  id: string | number;
  username: string;
  email: string;
  name?: string;
  role?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthCredentials {
  username: string; // This is typically email
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  message?: string;
}

export interface LoginFormData extends AuthCredentials {
  rememberMe: boolean;
}


