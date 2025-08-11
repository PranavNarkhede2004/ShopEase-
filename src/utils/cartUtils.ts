import { CartItem, Product } from '@/types';
import { api } from '@/services/api';

// Get cart from backend
export const getCartFromBackend = async () => {
  try {
    const response = await api.getCart();
    return response;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { items: [], total: 0 };
  }
};

// Add item to cart via backend
export const addToCartBackend = async (productId: string, quantity: number) => {
  try {
    const response = await api.addToCart(productId, quantity);
    return response;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Update cart item quantity via backend
export const updateCartItemBackend = async (productId: string, quantity: number) => {
  try {
    const response = await api.updateCartItem(productId, quantity);
    return response;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Remove item from cart via backend
export const removeFromCartBackend = async (productId: string) => {
  try {
    const response = await api.removeFromCart(productId);
    return response;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Get cart count from backend
export const getCartCountFromBackend = async (): Promise<number> => {
  try {
    const cart = await api.getCart();
    return cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
  } catch (error) {
    console.error('Error fetching cart count:', error);
    return 0;
  }
};

// Clear cart via backend
export const clearCartBackend = async () => {
  try {
    const response = await api.clearCart();
    return response;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Legacy local storage functions (for fallback or non-authenticated users)
export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem("cartItems") || "[]");
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem("cartItems", JSON.stringify(cart));
};

export const addToCart = (product: Product): CartItem[] => {
  const cart = getCartFromStorage();
  const existingIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingIndex !== -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCartToStorage(cart);
  return cart;
};

export const getCartCount = (): number => {
  const cart = getCartFromStorage();
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
};
