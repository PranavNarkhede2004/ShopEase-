import { CartItem, Product } from '@/types';

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
