import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Truck, Shield, Check, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod';
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = state.total > 2000 ? 0 : 199;
  const tax = Math.round(state.total * 0.18); // 18% GST
  const codCharges = selectedPayment?.type === 'cod' ? 50 : 0;
  const finalTotal = state.total + shipping + tax + codCharges;

  const steps = [
    { id: 1, name: 'Address', completed: !!selectedAddress },
    { id: 2, name: 'Payment', completed: !!selectedPayment },
    { id: 3, name: 'Review', completed: false }
  ];

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleAddressAdd = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleAddressEdit = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleAddressDelete = (addressId: string) => {
    if (selectedAddress?.id === addressId) {
      setSelectedAddress(null);
    }
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedPayment(method);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedPayment) {
      alert('Please select address and payment method');
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate order ID
    const orderId = 'FN' + Date.now().toString().slice(-8);
    
    // Clear cart
    clearCart();
    
    // Show success message
    alert(`Order placed successfully! Order ID: ${orderId}`);
    
    // Redirect to home
    navigate('/');
    
    setIsProcessing(false);
  };

  const canProceedToNext = () => {
    if (currentStep === 1) return !!selectedAddress;
    if (currentStep === 2) return !!selectedPayment;
    return true;
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-8" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Add some products to proceed with checkout
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              to="/cart"
              className="flex items-center text-emerald-600 hover:text-emerald-700 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep === step.id
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : step.completed
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}>
                  {step.completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep === step.id || step.completed
                    ? 'text-emerald-600'
                    : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step.completed ? 'bg-emerald-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <AddressForm
                  selectedAddress={selectedAddress}
                  onAddressSelect={handleAddressSelect}
                  onAddressAdd={handleAddressAdd}
                  onAddressEdit={handleAddressEdit}
                  onAddressDelete={handleAddressDelete}
                />
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <PaymentForm
                  selectedPayment={selectedPayment}
                  onPaymentSelect={handlePaymentSelect}
                  total={finalTotal}
                />
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Order Review</h3>
                  
                  {/* Address Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                    {selectedAddress && (
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">{selectedAddress.name}</div>
                        <div>{selectedAddress.phone}</div>
                        <div>
                          {selectedAddress.addressLine1}
                          {selectedAddress.addressLine2 && <>, {selectedAddress.addressLine2}</>}
                        </div>
                        <div>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</div>
                      </div>
                    )}
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                    {selectedPayment && (
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">{selectedPayment.name}</div>
                        <div>{selectedPayment.description}</div>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
                    <div className="space-y-3">
                      {state.items.map((item) => (
                        <div key={item.product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{item.product.name}</h5>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-8">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {currentStep < 3 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceedToNext()}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || !canProceedToNext()}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Place Order
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.itemCount} items)</span>
                  <span className="font-medium">₹{state.total.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                
                {codCharges > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">COD Charges</span>
                    <span className="font-medium">₹{codCharges}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-emerald-600 mr-2" />
                  <span>Secure & encrypted payment</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 text-emerald-600 mr-2" />
                  <span>Free shipping on orders over ₹2000</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-600 mr-2" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
