import { useState, useEffect } from 'react';
import { getCartCount } from '@/utils/cartUtils';

export const useCart = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());
  }, []);

  const updateCartCount = () => {
    setCartCount(getCartCount());
  };

  return { cartCount, updateCartCount };
};
