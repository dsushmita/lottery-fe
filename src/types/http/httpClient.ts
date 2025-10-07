export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  success?: boolean;
  statusCode?: number;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
}

export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  message: string;
  error?: string;
  statusCode: number;
  timestamp?: string;
}

//http/methods.ts
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends RequestConfig {
  method?: HttpMethod;
  body?: any;
}
