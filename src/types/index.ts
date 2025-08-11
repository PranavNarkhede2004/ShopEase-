export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image?: string;
  badge?: string;
  quantity?: number;
}

export interface Category {
  name: string;
  icon: string;
  productCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
