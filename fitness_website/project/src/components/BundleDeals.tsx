import React from 'react';
import { ShoppingCart, Star, Gift, ArrowRight } from 'lucide-react';
import { Bundle } from '../types';

interface BundleDealsProps {
  bundles: Bundle[];
  onAddToCart: (bundleId: string) => void;
}

const BundleDeals: React.FC<BundleDealsProps> = ({ bundles, onAddToCart }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Gift className="w-4 h-4 mr-2" />
            Limited Time Offers
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Exclusive Bundle Deals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Save more with our carefully curated product bundles designed for specific fitness goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Background Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Savings Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                  Save ₹{bundle.savings.toLocaleString()}
                </div>

                {/* Bundle Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
                  <p className="text-white/90 text-sm">{bundle.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Products Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                  <div className="space-y-2">
                    {bundle.products.map((product) => (
                      <div key={product.id} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                        <span>{product.name}</span>
                        <span className="ml-auto font-medium">₹{product.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{bundle.bundlePrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{bundle.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-emerald-600 font-medium">
                      {Math.round((bundle.savings / bundle.originalPrice) * 100)}% off
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-yellow-400 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                    <div className="text-xs text-gray-500">Bundle Rating</div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onAddToCart(bundle.id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 group flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add Bundle to Cart
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Additional Info */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Free shipping • 30-day return policy • 1-year warranty
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Can't find the perfect bundle? Create your own custom package!
          </p>
          <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200">
            Build Custom Bundle
          </button>
        </div>
      </div>
    </section>
  );
};

export default BundleDeals;