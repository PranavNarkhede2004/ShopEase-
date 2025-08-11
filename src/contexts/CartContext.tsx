'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { api } from '@/services/api';
import { cartEvents } from '@/utils/cartEvents';

interface CartContextType {
  cartCount: number;
  cartItems: any[];
  loading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = async (forceRefresh = false) => {
    if (!isAuthenticated) {
      setCartCount(0);
      setCartItems([]);
      return;
    }

    setLoading(true);
    try {
      // Use cache-busting only when explicitly requested
      const cacheParam = forceRefresh ? `?t=${Date.now()}` : '';
      const response = await fetch(`http://localhost:5002/api/cart${cacheParam}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      
      const cart = await response.json();
      setCartItems(cart.items || []);
      
      // Calculate total quantity - ensure it's always a number
      const totalQuantity = cart.items?.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) || 0;
      const newCount = Math.max(0, totalQuantity);
      setCartCount(newCount);
      
      return newCount;
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartCount(0);
      setCartItems([]);
      return 0;
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    if (!isAuthenticated) return;
    
    try {
      // Optimistic update - show immediate count change
      const currentItem = cartItems.find(item => item.product._id === productId);
      const optimisticCount = cartCount + (currentItem ? quantity : quantity);
      setCartCount(Math.max(0, optimisticCount));
      
      const result = await api.addToCart(productId, quantity);
      
      // Update cart with actual data from server
      if (result.items) {
        setCartItems(result.items);
        const totalQuantity = result.items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
        const newCount = Math.max(0, totalQuantity);
        setCartCount(newCount);
        cartEvents.emit('cart-updated', { type: 'add', productId, quantity, newCount });
      } else {
        await fetchCart(true);
      }
    } catch (error) {
      // Revert optimistic update on error
      await fetchCart(true);
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!isAuthenticated) return;
    
    try {
      const result = await api.removeFromCart(productId);
      
      // Update cart instantly with the new data
      if (result.items) {
        setCartItems(result.items);
        const totalQuantity = result.items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
        const newCount = Math.max(0, totalQuantity);
        setCartCount(newCount);
        cartEvents.emit('cart-updated', { type: 'remove', productId, newCount });
      } else {
        // Fallback to fetching if result doesn't contain items
        await fetchCart(true);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    if (!isAuthenticated) return;
    
    try {
      const result = await api.updateCartItem(productId, quantity);
      
      // Update cart instantly with the new data
      if (result.items) {
        setCartItems(result.items);
        const totalQuantity = result.items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
        const newCount = Math.max(0, totalQuantity);
        setCartCount(newCount);
        cartEvents.emit('cart-updated', { type: 'update', productId, quantity, newCount });
      } else {
        // Fallback to fetching if result doesn't contain items
        await fetchCart(true);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  const refreshCart = async () => {
    await fetchCart(true);
  };

  // Listen for cart update events from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCart(true);
    };

    cartEvents.on('cart-updated', handleCartUpdate);

    return () => {
      cartEvents.off('cart-updated', handleCartUpdate);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const value = {
    cartCount,
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateCartItem,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
