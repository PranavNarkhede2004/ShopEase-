"use client";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  
  const { refreshCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setLoading(false);
      setCartItems([]);
      setTotal(0);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const cart = await api.getCart();
      setCartItems(cart.items || []);
      setTotal(cart.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cart");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    try {
      setUpdatingItems(prev => new Set(prev).add(productId));
      await api.updateCartItem(productId, newQuantity);
      await refreshCart();
      await fetchCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update quantity");
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      setUpdatingItems(prev => new Set(prev).add(productId));
      await api.removeFromCart(productId);
      await refreshCart();
      await fetchCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item");
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  const handleClearCart = async () => {
    try {
      setLoading(true);
      await api.clearCart();
      await refreshCart();
      await fetchCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    window.location.href = "/checkout";
  };

  if (loading && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h2>
          <p className="text-gray-600 mb-4">Sign in to view your cart</p>
          <Link href="/signin" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <ShoppingCart className="h-8 w-8" />
              Your Shopping Cart
            </h2>
            <p className="text-blue-100 mt-2">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} • Total: ₹{total.toLocaleString('en-IN')}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-24 w-24 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.product.images?.[0] || '/placeholder-image.jpg'}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{item.product.name}</h3>
                      <p className="text-gray-600">₹{item.product.price.toLocaleString('en-IN')}</p>
                      <p className="text-sm text-gray-500">Stock: {item.product.stock}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                        disabled={updatingItems.has(item.product._id)}
                        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                        disabled={updatingItems.has(item.product._id) || item.quantity >= item.product.stock}
                        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-lg">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        disabled={updatingItems.has(item.product._id)}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold">Subtotal</span>
                  <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleClearCart}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
