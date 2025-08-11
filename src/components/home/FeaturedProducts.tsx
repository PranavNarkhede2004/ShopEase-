import { useState, useEffect } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/common/ProductCard';
import Toast from '@/components/common/Toast';
import { addToCartBackend } from '@/utils/cartUtils';
import { useCart } from '@/hooks/useCart';
import { isAuthenticated } from '@/utils/auth';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({ message: '', type: 'success' as const, isVisible: false });
  const { updateCartCount } = useCart();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/products/featured');
      if (!response.ok) {
        throw new Error('Failed to fetch featured products');
      }
      
      const data = await response.json();
      setProducts(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const handleAddToCart = async (product: Product) => {
    try {
      if (!isAuthenticated()) {
        showToast('Please sign in to add items to your cart', 'info');
        return;
      }

      console.log('Adding to cart:', product.id, product.name);
      await addToCartBackend(product.id.toString(), 1);
      console.log('Successfully added to cart');
      
      // Update cart count
      await updateCartCount();
      
      // Show success message
      showToast(`${product.name} added to cart!`, 'success');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast(`Error adding to cart: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
        </div>
      </div>
      
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </section>
  );
}

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
