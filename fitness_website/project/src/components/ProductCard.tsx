import React from 'react';
import { Star, ShoppingCart, Heart, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isBestSeller && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              BESTSELLER
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {discountPercentage}% OFF
            </span>
          )}
          {product.isDigital && (
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              DIGITAL
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 hover:text-red-500">
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => onAddToCart(product)}
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0 flex items-center"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Content */}
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
          
          {!product.inStock && (
            <span className="text-red-500 text-xs font-semibold bg-red-50 px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
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
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;