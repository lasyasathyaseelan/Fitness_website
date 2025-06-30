import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Zap, Target, Heart, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  
  const featuredProducts = products.filter(p => p.isBestSeller).slice(0, 3);
  const categories = [
    {
      name: 'Yoga Gear',
      image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: '/shop?category=yoga'
    },
    {
      name: 'Strength Equipment',
      image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: '/shop?category=strength'
    },
    {
      name: 'Wellness Kits',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: '/shop?category=wellness'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  Transform Your Home Into A Fitness Haven
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Fitness Journey
                  <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    Starts at Home
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover premium fitness equipment, wellness products, and personalized training programs designed for your home. No gym membership required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/quiz"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Take Fitness Quiz
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 group">
                  <Play className="w-5 h-5 mr-2 group-hover:text-emerald-600" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Home fitness setup"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating cards */}
                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Wellness First</div>
                      <div className="text-xs text-gray-600">Mind & Body Balance</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '3s' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Goal Focused</div>
                      <div className="text-xs text-gray-600">Personalized Plans</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find the perfect equipment for your fitness goals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <div className="flex items-center text-white/90">
                    <span className="text-sm">Explore Collection</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bestselling Products</h2>
            <p className="text-lg text-gray-600">Top-rated equipment trusted by thousands</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      BESTSELLER
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200 flex items-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Quick Add
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Home Fitness Journey Today!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers who have transformed their homes into personal fitness sanctuaries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-200"
            >
              Take Quiz
              <Target className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-300 mb-8">
            Get the latest fitness tips, product updates, and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg border-0 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-r-lg sm:rounded-l-none rounded-l-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 mt-2 sm:mt-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;