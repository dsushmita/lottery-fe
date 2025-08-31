// types/auth/signup.ts
export interface SignupCredentials {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupRequest extends SignupCredentials {
  firstName?: string;
  lastName?: string;
  agreeToTerms: boolean;
  subscribeToNewsletter?: boolean;
}

export interface SignupResponse {
  token: string;
  refreshToken?: string;
  user: SignupUser;
  expiresIn?: number;
  message?: string;
  requiresVerification?: boolean;
}

export interface SignupUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export interface SignupError {
  message: string;
  field?: 'username' | 'email' | 'password' | 'confirmPassword' | 'general';
  code?: 'USERNAME_TAKEN' | 'EMAIL_TAKEN' | 'PASSWORD_WEAK' | 'PASSWORDS_DONT_MATCH';
}

export interface SignupValidation {
  username: {
    minLength: number;
    maxLength: number;
    allowedCharacters: string;
  };
  email: {
    required: boolean;
    format: string;
  };
  password: {
    minLength: number;
    requireUppercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
}