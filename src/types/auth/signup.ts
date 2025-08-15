import { User, AuthResponse } from './login';

  export interface SignupCredentials {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }