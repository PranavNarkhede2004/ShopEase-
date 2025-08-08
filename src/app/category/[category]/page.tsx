"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const categoryProducts: Record<string, any[]> = {
  Electronics: [
    { id: 1, name: "Smartphone X1", price: 699, originalPrice: 799, rating: 4.7, reviews: 210, badge: "New" },
    { id: 2, name: "Wireless Earbuds Pro", price: 129, originalPrice: 159, rating: 4.5, reviews: 98, badge: "Best Seller" },
    { id: 3, name: "4K Action Camera", price: 249, originalPrice: 299, rating: 4.6, reviews: 67 },
  ],
  Fashion: [
    { id: 1, name: "Denim Jacket", price: 59, originalPrice: 89, rating: 4.8, reviews: 120, badge: "Sale" },
    { id: 2, name: "Sneakers Classic", price: 79, originalPrice: 99, rating: 4.7, reviews: 88 },
    { id: 3, name: "Cotton T-Shirt", price: 19, originalPrice: 29, rating: 4.9, reviews: 200 },
  ],
  "Home & Garden": [
    { id: 1, name: "Ceramic Vase", price: 35, originalPrice: 45, rating: 4.6, reviews: 54 },
    { id: 2, name: "LED Table Lamp", price: 49, originalPrice: 69, rating: 4.7, reviews: 32 },
    { id: 3, name: "Garden Tool Set", price: 39, originalPrice: 59, rating: 4.5, reviews: 21 },
  ],
  Sports: [
    { id: 1, name: "Football Pro", price: 29, originalPrice: 39, rating: 4.8, reviews: 60 },
    { id: 2, name: "Yoga Mat", price: 25, originalPrice: 35, rating: 4.7, reviews: 44 },
    { id: 3, name: "Tennis Racket", price: 89, originalPrice: 119, rating: 4.6, reviews: 18 },
  ],
  Beauty: [
    { id: 1, name: "Matte Lipstick", price: 15, originalPrice: 22, rating: 4.9, reviews: 80 },
    { id: 2, name: "Face Serum", price: 29, originalPrice: 39, rating: 4.8, reviews: 65 },
    { id: 3, name: "Hair Dryer", price: 49, originalPrice: 69, rating: 4.7, reviews: 40 },
  ],
  Books: [
    { id: 1, name: "The Great Novel", price: 12, originalPrice: 18, rating: 4.9, reviews: 150 },
    { id: 2, name: "Science Explained", price: 20, originalPrice: 28, rating: 4.8, reviews: 90 },
    { id: 3, name: "Cookbook Deluxe", price: 25, originalPrice: 35, rating: 4.7, reviews: 60 },
  ],
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const router = useRouter();
  const category = decodeURIComponent(params.category);
  const products = categoryProducts[category] || [];
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const count = cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
    setCartCount(count);
  }, []);

  const handleAddToCart = (product: { name: string; price: number; badge?: string; quantity?: number }) => {
    setCartCount((prev) => prev + 1);
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingIndex = cart.findIndex((item: { name: string }) => item.name === product.name);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cart));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{category} Products</h1>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold" onClick={() => router.push("/cart")}>Cart <ShoppingCart className="ml-2 h-5 w-5" /> <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <div className="text-gray-400 text-4xl">🛒</div>
                </div>
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">{product.badge}</span>
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
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
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
    </div>
  );
}
