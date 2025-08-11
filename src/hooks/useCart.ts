import { useState, useEffect } from 'react';
import { getCartCountFromBackend } from '@/utils/cartUtils';
import { isAuthenticated } from '@/utils/auth';

export const useCart = () => {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCartCount = async () => {
    if (!isAuthenticated()) {
      setCartCount(0);
      return;
    }

    setLoading(true);
    try {
      const count = await getCartCountFromBackend();
      setCartCount(count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const updateCartCount = () => {
    fetchCartCount();
  };

  return { cartCount, updateCartCount, loading };
};
