import { useState, useEffect } from 'react';
import { categories } from '@/data/categories';

interface Category {
  name: string;
  icon: string;
  productCount: number;
}

export default function CategoriesSection() {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // For now, we'll use the static categories but fetch product counts dynamically
      // In a real app, you might have a /api/categories endpoint
      const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          try {
            const response = await fetch(
              `http://localhost:5000/api/products/category/${encodeURIComponent(category.name)}`
            );
            const data = await response.json();
            return {
              ...category,
              productCount: data.count || 0
            };
          } catch (err) {
            // Fallback to static count if API fails
            return category;
          }
        })
      );
      
      setCategoryData(categoriesWithCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
      // Fallback to static data
      setCategoryData(categories);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6 animate-pulse">
                <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categoryData.map((category) => (
            <div key={category.name} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.productCount} products</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
