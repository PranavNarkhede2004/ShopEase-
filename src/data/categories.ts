import { Category } from '@/types';

export const categories: Category[] = [
  { name: "Electronics", icon: "📱", productCount: 3 },
  { name: "Fashion", icon: "👕", productCount: 3 },
  { name: "Home & Garden", icon: "🏠", productCount: 3 },
  { name: "Sports", icon: "⚽", productCount: 3 },
  { name: "Beauty", icon: "💄", productCount: 3 },
  { name: "Books", icon: "📚", productCount: 3 }
];

export const categoryProducts: Record<string, any[]> = {
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
