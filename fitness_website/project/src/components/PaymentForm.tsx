import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Wallet, Shield, Check } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod';
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface PaymentFormProps {
  selectedPayment: PaymentMethod | null;
  onPaymentSelect: (method: PaymentMethod) => void;
  total: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  selectedPayment,
  onPaymentSelect,
  total
}) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      type: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay accepted'
    },
    {
      id: 'upi',
      type: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Pay using Google Pay, PhonePe, Paytm'
    },
    {
      id: 'netbanking',
      type: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'All major banks supported'
    },
    {
      id: 'wallet',
      type: 'wallet',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Paytm, Amazon Pay, MobiKwik'
    },
    {
      id: 'cod',
      type: 'cod',
      name: 'Cash on Delivery',
      icon: Shield,
      description: 'Pay when you receive your order'
    }
  ];

  const popularBanks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
    'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda',
    'Canara Bank', 'Union Bank of India', 'IDFC First Bank'
  ];

  const walletOptions = [
    { name: 'Paytm', logo: '💳' },
    { name: 'Amazon Pay', logo: '🛒' },
    { name: 'MobiKwik', logo: '📱' },
    { name: 'Freecharge', logo: '⚡' }
  ];

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    } else if (name === 'expiry') {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    } else if (name === 'cvv') {
      // Limit CVV to 3-4 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const renderPaymentForm = () => {
    if (!selectedPayment) return null;

    switch (selectedPayment.type) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleCardInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardInputChange}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Your card details are encrypted and secure</span>
            </div>
          </div>
        );

      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID *
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@paytm"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Popular UPI Apps</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                  <div key={app} className="flex items-center space-x-2 text-sm text-blue-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <Shield className="w-4 h-4 text-emerald-600 inline mr-2" />
              UPI payments are processed securely through your bank
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Bank *
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              >
                <option value="">Choose your bank</option>
                {popularBanks.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> You will be redirected to your bank's secure website to complete the payment.
              </p>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Wallet *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {walletOptions.map(wallet => (
                  <button
                    key={wallet.name}
                    type="button"
                    className="p-4 border border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-center"
                  >
                    <div className="text-2xl mb-2">{wallet.logo}</div>
                    <div className="text-sm font-medium">{wallet.name}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              You will be redirected to your selected wallet to complete the payment.
            </div>
          </div>
        );

      case 'cod':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Cash on Delivery</h4>
              <p className="text-sm text-green-700">
                Pay ₹{total.toLocaleString()} when your order is delivered to your doorstep.
              </p>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>No advance payment required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Pay in cash to delivery partner</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Additional ₹50 COD charges may apply</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <CreditCard className="w-5 h-5 mr-2 text-emerald-600" />
        Payment Method
      </h3>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedPayment?.id === method.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onPaymentSelect(method)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <method.icon className="w-6 h-6 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">{method.name}</div>
                  <div className="text-sm text-gray-600">{method.description}</div>
                </div>
              </div>
              {selectedPayment?.id === method.id && (
                <Check className="w-5 h-5 text-emerald-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Form */}
      {selectedPayment && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">
            {selectedPayment.name} Details
          </h4>
          {renderPaymentForm()}
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <strong>Secure Payment:</strong> Your payment information is encrypted and processed securely. 
            We never store your card details on our servers.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
