import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'Fitness Equipment', path: '/shop?category=strength' },
        { name: 'Yoga Gear', path: '/shop?category=yoga' },
        { name: 'Wellness Products', path: '/shop?category=wellness' },
        { name: 'Digital Products', path: '/shop?category=digital' },
        { name: 'Nutrition', path: '/shop?category=nutrition' },
        { name: 'Apparel', path: '/shop?category=apparel' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/contact' },
        { name: 'Shipping Info', path: '/contact' },
        { name: 'Returns & Exchanges', path: '/contact' },
        { name: 'Size Guide', path: '/contact' },
        { name: 'Product Care', path: '/contact' },
        { name: 'Contact Us', path: '/contact' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About FitNest', path: '/about' },
        { name: 'Our Story', path: '/about' },
        { name: 'Careers', path: '/contact' },
        { name: 'Press & Media', path: '/contact' },
        { name: 'Affiliate Program', path: '/contact' },
        { name: 'Wholesale', path: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Fitness Quiz', path: '/quiz' },
        { name: 'Workout Library', path: '/contact' },
        { name: 'Nutrition Guides', path: '/contact' },
        { name: 'Wellness Blog', path: '/contact' },
        { name: 'Exercise Videos', path: '/contact' },
        { name: 'Fitness Calculator', path: '/contact' }
      ]
    }
  ];

  const trustBadges = [
    { icon: CreditCard, text: 'Secure Payment' },
    { icon: Truck, text: 'Free Shipping' },
    { icon: Shield, text: 'Warranty' },
    { icon: RotateCcw, text: '30-Day Returns' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 text-center">
                <badge.icon className="w-8 h-8 text-emerald-400" />
                <span className="font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link to="/">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  FitNest
                </h3>
              </Link>
              
              <p className="text-gray-400 mt-2 max-w-md">
                Transform your home into a fitness haven with our premium equipment, expert guidance, and wellness products. Your journey to better health starts here.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3" />
                <span>support@fitnest.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-1">Stay in the loop</h4>
              <p className="text-gray-400">Get the latest fitness tips, product updates, and exclusive offers</p>
            </div>
            
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 rounded-r-lg font-semibold transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 FitNest. All rights reserved. Built with ❤️ for your wellness journey.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;