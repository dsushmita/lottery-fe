import {
  ErrorResponse,
  HttpClientConfig,
  RequestConfig,
} from "@/types/http/httpClient";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private readonly timeout: number;

  constructor(config?: HttpClientConfig) {
    this.baseURL =
      config?.baseURL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";
    this.timeout = config?.timeout || 10000; // 10 seconds default
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config?.defaultHeaders,
    };
  }

  // Configuration methods
  setAuthToken(token: string): void {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.defaultHeaders["Authorization"];
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  setDefaultHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  removeDefaultHeader(key: string): void {
    delete this.defaultHeaders[key];
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  // Build URL with query parameters
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  // Handle API response
  private async handleResponse<T>(response: Response): Promise<T> {
    console.log(`API Response - ${response.status} ${response.statusText}`);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData: ErrorResponse = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If JSON parsing fails, use status text
      }

      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    }

    try {
      const result = await response.json();
      return result as T;
    } catch (error) {
      console.error("Invalid JSON response from server", error);
      throw new Error("Invalid JSON response from server");
    }
  }

  // Log request data (hide sensitive information)
  private logRequest(method: string, endpoint: string, data?: any): void {
    if (!data) {
      console.log(`${method} ${endpoint}`);
      return;
    }

    // Create safe data object for logging
    const safeData = { ...data };

    // Hide sensitive fields
    const sensitiveFields = [
      "password",
      "confirmPassword",
      "userId",
      "currentPassword",
    ];
    sensitiveFields.forEach((field) => {
      if (safeData[field]) {
        safeData[field] = "***";
      }
    });

    console.log(`${method} ${endpoint}`, safeData);
  }

  // Generic request method
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params);

    const headers = {
      ...this.defaultHeaders,
      ...config?.headers,
    };

    // Special handling for FormData
    let body: string | FormData | undefined;
    if (data instanceof FormData) {
      body = data;
      // Remove Content-Type header for FormData (browser will set it)
      delete headers["Content-Type"];
    } else if (data) {
      body = JSON.stringify(data);
    }

    this.logRequest(method, endpoint, data);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        config?.timeout || this.timeout,
      );

      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return await this.handleResponse<T>(response);
    } catch (error) {
      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timeout. Please try again.");
        }
        if (error.message.includes("fetch") || error instanceof TypeError) {
          throw new Error("Network error. Please check your connection.");
        }
      }

      // Re-throw other errors (including our custom ones)
      throw error;
    }
  }

  // HTTP Methods
  async get<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, config);
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>("POST", endpoint, data, config);
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, data, config);
  }

  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, data, config);
  }

  async delete<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, config);
  }

  // Convenience method for file uploads
  async uploadFile<T = any>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>,
    config?: RequestConfig,
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>("POST", endpoint, formData, config);
  }

  // Convenience method for multiple file uploads
  async uploadFiles<T = any>(
    endpoint: string,
    files: File[],
    additionalData?: Record<string, any>,
    config?: RequestConfig,
  ): Promise<T> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append(`files`, file);
    });

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>("POST", endpoint, formData, config);
  }
}

// Create and export singleton instance
export const httpClient = new HttpClient();

// Export class for custom instances if needed
export { HttpClient };
