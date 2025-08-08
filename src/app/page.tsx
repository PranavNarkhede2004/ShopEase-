"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, Heart, Star, Truck, Shield, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    // Initialize cart count from localStorage
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const count = cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
    setCartCount(count);
  }, []);
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 124,
      image: "/api/placeholder/300/300",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.6,
      reviews: 89,
      image: "/api/placeholder/300/300",
      badge: "New"
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.9,
      reviews: 256,
      image: "/api/placeholder/300/300",
      badge: "Sale"
    },
    {
      id: 4,
      name: "Portable Coffee Maker",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 167,
      image: "/api/placeholder/300/300",
      badge: "Popular"
    }
  ];

  const categories = [
    { name: "Electronics", icon: "📱", count: "2.5k+" },
    { name: "Fashion", icon: "👕", count: "1.8k+" },
    { name: "Home & Garden", icon: "🏠", count: "1.2k+" },
    { name: "Sports", icon: "⚽", count: "950+" },
    { name: "Beauty", icon: "💄", count: "1.1k+" },
    { name: "Books", icon: "📚", count: "750+" }
  ];

  const handleAddToCart = (product: { name: string; price: number; badge?: string; quantity?: number }) => {
    setCartCount((prev) => prev + 1);
    // Get current cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    // Check if product already exists in cart
    const existingIndex = cart.findIndex((item: { name: string; price: number; badge?: string; quantity?: number }) => item.name === product.name);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cart));
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Discover Amazing
                <span className="block text-yellow-300">Products</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Shop the latest trends in fashion, electronics, home & garden, and more. 
                Get up to 70% off on selected items!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  Shop Now
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🎉</div>
                    <div className="font-semibold">Flash Sale</div>
                    <div className="text-sm text-blue-100">Up to 70% off</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🚚</div>
                    <div className="font-semibold">Free Shipping</div>
                    <div className="text-sm text-blue-100">On orders $50+</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="font-semibold">Premium Quality</div>
                    <div className="text-sm text-blue-100">100% guaranteed</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <div className="font-semibold">Secure Payment</div>
                    <div className="text-sm text-blue-100">SSL encrypted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => window.location.href = `/category/${encodeURIComponent(category.name)}`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <div className="text-gray-400 text-4xl">📱</div>
                  </div>
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
                  <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                    <Heart className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                    <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose ShopEase?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day money-back guarantee</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Curated selection of top brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8">Get the latest deals and product updates delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ShopEase</h3>
              <p className="text-gray-400">Your premium shopping destination for quality products and exceptional service.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fashion</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Home & Garden</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sports</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShopEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
