import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Search, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'rating'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'strength', label: 'Strength' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'digital', label: 'Digital' },
    { value: 'apparel', label: 'Apparel' },
    { value: 'nutrition', label: 'Nutrition' }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, selectedCategory, searchTerm, priceRange, minRating, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop Fitness Equipment</h1>
          <p className="text-lg text-gray-600">
            Discover premium fitness and wellness products for your home
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    step="500"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <div className="space-y-2">
                  {[4, 3, 2, 1, 0].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={minRating === rating}
                        onChange={(e) => setMinRating(parseInt(e.target.value))}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {rating > 0 ? (
                          <>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-sm text-gray-600">& up</span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-600">All ratings</span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange([0, 15000]);
                  setMinRating(0);
                }}
                className="w-full px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600">
                Showing {filteredAndSortedProducts.length} products
              </p>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }>
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48' : ''}`}>
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                          viewMode === 'list' ? 'w-48 h-48' : 'w-full h-64'
                        }`}
                      />
                      
                      {/* Badges */}
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

                      {/* Quick Add Overlay */}
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

                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
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

                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-200">
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
                    setPriceRange([0, 15000]);
                    setMinRating(0);
                  }}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;