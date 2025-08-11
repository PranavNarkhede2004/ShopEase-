const API_BASE_URL = 'http://localhost:5002';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  }

  // Auth endpoints
  async signUp(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async signIn(credentials: { email: string; password: string }) {
    return this.request('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Cart endpoints
  async getCart() {
    return this.request('/api/cart');
  }

  async addToCart(productId: string, quantity: number) {
    return this.request('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(productId: string, quantity: number) {
    return this.request('/api/cart', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async removeFromCart(productId: string) {
    return this.request(`/api/cart/${productId}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request('/api/cart/clear', {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
