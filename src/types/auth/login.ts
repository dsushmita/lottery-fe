export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  message?: string;
}

export interface AuthError {
  message: string;
  field?: keyof LoginFormData;
}