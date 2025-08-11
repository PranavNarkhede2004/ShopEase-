// Authentication utility functions
const API_BASE_URL = 'http://localhost:5002';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

// Sign up function
export async function signUp(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to sign up');
  }

  return data;
}

// Sign in function
export async function signIn(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to sign in');
  }

  return data;
}

// Store token in localStorage
export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

// Get token from localStorage
export function getToken(): string | null {
  return localStorage.getItem('token');
}

// Remove token from localStorage
export function removeToken(): void {
  localStorage.removeItem('token');
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getToken();
}

// Get auth headers for API calls
export function getAuthHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

// Logout function
export function logout(): void {
  removeToken();
  window.location.href = '/signin';
}
