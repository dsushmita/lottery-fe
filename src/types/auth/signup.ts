export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupFormData extends SignupCredentials {
  acceptTerms: boolean;
}

export interface SignupResponse {
  user: {
    id: string | number;
    username: string;
    email: string;
    name?: string;
    createdAt: string;
  };
  token: string;
  message: string;
}

export interface SignupApiCredentials {
  username: string;
  email: string;
  password: string;
}