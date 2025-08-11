"use client";

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FeaturesSection from '@/components/home/FeaturesSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <FeaturesSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
