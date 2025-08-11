import { Product } from '@/types';
import ProductCard from '@/components/common/ProductCard';
import { addToCart } from '@/utils/cartUtils';

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 89,
    badge: "New"
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviews: 256,
    badge: "Sale"
  },
  {
    id: 4,
    name: "Portable Coffee Maker",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 167
  }
];

export default function FeaturedProducts() {
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

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
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
