export interface SignupCredentials {
  userName: string;
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
    userName: string;
    email: string;
    name?: string;
    createdAt: string;
  };
  token: string;
  message: string;
}

export interface SignupApiCredentials {
  userName: string;
  email: string;
  password: string;
}