import React from 'react';
import { X, Plus, Minus, ShoppingBag, Truck, Shield, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 2000 ? 0 : 199;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50">
      <div className="bg-white h-full w-full max-w-md shadow-2xl overflow-hidden animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-blue-50">
          <div className="flex items-center">
            <ShoppingBag className="w-6 h-6 text-emerald-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <span className="ml-2 bg-emerald-100 text-emerald-700 text-sm px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center h-96 px-6">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 text-center mb-6">
              Add some products to get started with your fitness journey
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      ₹{item.product.price.toLocaleString()}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 text-sm mt-1 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Free Shipping Banner */}
            {subtotal < 2000 && (
              <div className="mx-6 mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-yellow-600 mr-2" />
                  <p className="text-sm text-yellow-800">
                    Add ₹{(2000 - subtotal).toLocaleString()} more for free shipping!
                  </p>
                </div>
                <div className="mt-2 w-full bg-yellow-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(subtotal / 2000) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 py-2">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Secure Payment
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-1" />
                  Fast Delivery
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center group">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Continue Shopping */}
              <button
                onClick={onClose}
                className="w-full text-gray-600 py-3 font-medium hover:text-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;