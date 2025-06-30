import React from 'react';
import { Play, ArrowRight, Zap, Target, Heart, ShoppingCart, Star } from 'lucide-react';

interface HomeSlideProps {
  onTakeQuiz: () => void;
  onAddToCart: (product: any) => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

const HomeSlide: React.FC<HomeSlideProps> = ({ 
  onTakeQuiz, 
  onAddToCart, 
  cartItemsCount, 
  onCartClick 
}) => {
  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Yoga Mat',
      price: 1299,
      originalPrice: 1699,
      image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Adjustable Dumbbells',
      price: 8999,
      originalPrice: 12999,
      image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Resistance Bands Set',
      price: 799,
      originalPrice: 1299,
      image: 'https://images.pexels.com/photos/4327024/pexels-photo-4327024.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              FitNest
            </h1>
            
            <button
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-emerald-600 transition-colors duration-200 p-2"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
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
              <button
                onClick={onTakeQuiz}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Target className="w-5 h-5 mr-2" />
                Take Fitness Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
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

          {/* Hero Image with Featured Products */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Home fitness setup"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating Product Cards */}
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-lg animate-float max-w-xs">
                <div className="flex items-center space-x-3">
                  <img 
                    src={featuredProducts[0].image} 
                    alt={featuredProducts[0].name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{featuredProducts[0].name}</h4>
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{featuredProducts[0].rating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-emerald-600">₹{featuredProducts[0].price.toLocaleString()}</span>
                      <span className="text-xs text-gray-500 line-through">₹{featuredProducts[0].originalPrice?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '3s' }}>
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

        {/* Quick Product Preview */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Products</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200 flex items-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Quick Add
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:from-emerald-700 hover:to-blue-700 transition-all duration-200"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlide;