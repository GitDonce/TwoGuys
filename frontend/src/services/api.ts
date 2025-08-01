const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Item {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface InfoSection {
  title: string;
  items: string[];
}

export interface LinkButton {
  text: string;
  href: string;
}

export interface CitySection {
  title: string;
  icon: string; // lucide icon name
  defaultExpanded?: boolean;
  infoSections: InfoSection[];
  links: LinkButton[];
}

export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  population: string;
  highlights: string[];
  icon: string;
  path: string;
  sections?: CitySection[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}

class ApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
      };
    }
    return {};
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Items API
  async getItems(): Promise<ApiResponse<Item[]>> {
    return this.request<Item[]>('/items');
  }

  async getItem(id: string): Promise<ApiResponse<Item>> {
    return this.request<Item>(`/items/${id}`);
  }

  async createItem(item: Omit<Item, 'id' | 'createdAt' | 'completed'>): Promise<ApiResponse<Item>> {
    return this.request<Item>('/items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateItem(id: string, updates: Partial<Pick<Item, 'title' | 'description' | 'completed'>>): Promise<ApiResponse<Item>> {
    return this.request<Item>(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteItem(id: string): Promise<ApiResponse<Item>> {
    return this.request<Item>(`/items/${id}`, {
      method: 'DELETE',
    });
  }

  // Cities API
  async getCities(): Promise<ApiResponse<City[]>> {
    return this.request<City[]>('/cities');
  }

  async getCity(id: string): Promise<ApiResponse<City>> {
    return this.request<City>(`/cities/${id}`);
  }

  async createCity(city: Omit<City, 'id'>): Promise<ApiResponse<City>> {
    return this.request<City>('/cities', {
      method: 'POST',
      body: JSON.stringify(city),
    });
  }

  async updateCity(id: string, updates: Partial<Omit<City, 'id'>>): Promise<ApiResponse<City>> {
    return this.request<City>(`/cities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteCity(id: string): Promise<ApiResponse<City>> {
    return this.request<City>(`/cities/${id}`, {
      method: 'DELETE',
    });
  }

  // User-specific Cities API
  async getUserCities(): Promise<ApiResponse<City[]>> {
    return this.request<City[]>('/user/cities');
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
    return response.json();
  }
}

export const apiService = new ApiService(); 