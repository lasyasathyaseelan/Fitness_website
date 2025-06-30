import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, Search, ShoppingCart, Star, Gift, ArrowRight } from 'lucide-react';
import { Product, ProductCategory, Bundle } from '../../types';

interface ShopSlideProps {
  products: Product[];
  bundles: Bundle[];
  onAddToCart: (product: Product) => void;
  onAddBundleToCart: (bundleId: string) => void;
}

const ShopSlide: React.FC<ShopSlideProps> = ({ 
  products, 
  bundles, 
  onAddToCart, 
  onAddBundleToCart 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all' | 'bundles'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: { value: ProductCategory | 'all' | 'bundles'; label: string }[] = [
    { value: 'all', label: 'All Products' },
    { value: 'bundles', label: 'Bundle Deals' },
    { value: 'fitness-equipment', label: 'Fitness Equipment' },
    { value: 'wellness-accessories', label: 'Wellness' },
    { value: 'digital-products', label: 'Digital Products' },
    { value: 'apparel', label: 'Apparel' },
    { value: 'nutrition', label: 'Nutrition' }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    if (selectedCategory === 'bundles') return [];
    
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, selectedCategory, searchTerm, sortBy]);

  const showBundles = selectedCategory === 'bundles';
  const showProducts = selectedCategory !== 'bundles';

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Fitness & Wellness Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carefully curated products to help you achieve your health and fitness goals from the comfort of your home
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all' | 'bundles')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {!showBundles && (
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              )}

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bundle Deals Section */}
        {showBundles && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                <Gift className="w-4 h-4 mr-2" />
                Limited Time Offers
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Exclusive Bundle Deals
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {bundles.map((bundle) => (
                <div
                  key={bundle.id}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={bundle.image}
                      alt={bundle.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                      Save ₹{bundle.savings.toLocaleString()}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
                      <p className="text-white/90 text-sm">{bundle.description}</p>
                    </div>
                  </div>

                  <div className="p-6">
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
                    </div>

                    <button
                      onClick={() => onAddBundleToCart(bundle.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 group flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add Bundle to Cart
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {showProducts && (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600">
                Showing {filteredAndSortedProducts.length} products
                {selectedCategory !== 'all' && (
                  <span className="ml-1">
                    in {categories.find(c => c.value === selectedCategory)?.label}
                  </span>
                )}
              </p>
            </div>

            {filteredAndSortedProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  : "space-y-6"
              }>
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isBestSeller && (
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            BESTSELLER
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </span>
                        )}
                      </div>

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
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopSlide;