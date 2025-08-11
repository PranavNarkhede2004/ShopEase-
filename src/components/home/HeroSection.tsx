export default function HeroSection() {
  return (
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
  );
}
