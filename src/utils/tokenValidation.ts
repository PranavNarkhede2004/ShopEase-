// Token validation utilities
import { User } from '@/types';

export interface DecodedToken {
  userId?: string;
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  role?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  
  const exp = decoded.exp;
  if (!exp) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return exp < currentTime;
}

export function getTokenRemainingTime(token: string): number {
  const decoded = decodeToken(token);
  if (!decoded) return 0;
  
  const exp = decoded.exp;
  if (!exp) return 0;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return Math.max(0, exp - currentTime);
}

export function mapTokenToUser(decoded: DecodedToken): User {
  // Handle different token structures
  const firstName = decoded.firstName || 
                   (decoded.name ? decoded.name.split(' ')[0] : '') || 
                   '';
  
  const lastName = decoded.lastName || 
                  (decoded.name ? decoded.name.split(' ').slice(1).join(' ') : '') || 
                  '';
  
  return {
    _id: decoded.userId || decoded._id || '',
    email: decoded.email || '',
    firstName: firstName,
    lastName: lastName,
    role: decoded.role || 'user'
  };
}
