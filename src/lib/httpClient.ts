interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(config: HttpClientConfig = {}) {
    this.baseURL = config.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    this.timeout = config.timeout || 10000;
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private async makeRequest<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const headers = {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout || this.timeout);

    try {
      const response = await fetch(url, {
        method: config.method || 'GET',
        headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      
      throw new Error('Network error');
    }
  }

  async get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'PUT', body });
  }

  async patch<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'PATCH', body });
  }

  async delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// Create and export a singleton instance
export const httpClient = new HttpClient();