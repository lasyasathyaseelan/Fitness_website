import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navItems = [
    'Fitness Equipment',
    'Wellness',
    'Digital Products',
    'Apparel',
    'Nutrition'
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              FitNest
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-emerald-50 rounded-md"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className={`relative w-full transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-red-500 transition-colors duration-200">
              <Heart className="h-6 w-6" />
            </button>
            
            <button className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
              <User className="h-6 w-6" />
            </button>
            
            <button
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-emerald-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slideDown">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <div className="px-3 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;