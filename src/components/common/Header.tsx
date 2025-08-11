'use client';

import { ShoppingCart, Search, Heart, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ShopEase</h1>
          </div>
          
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Heart className="h-6 w-6" />
            </button>
            <Link href="/cart" passHref legacyBehavior>
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </Link>
            <Link href="/orders" passHref legacyBehavior>
              <button className="p-2 text-gray-600 hover:text-gray-900 font-semibold">
                My Orders
              </button>
            </Link>
            
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" passHref legacyBehavior>
                  <button className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors cursor-pointer">
                    <UserCircle className="h-8 w-8 text-blue-600" />
                    <div className="text-left">
                      <span className="text-sm font-medium text-gray-900 block">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="text-xs text-gray-500 block">{user.email}</span>
                    </div>
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/signin" passHref legacyBehavior>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/signup" passHref legacyBehavior>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ml-2">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
