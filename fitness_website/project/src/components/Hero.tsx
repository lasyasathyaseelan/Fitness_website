import React from 'react';
import { Play, ArrowRight, Zap, Target, Heart } from 'lucide-react';

interface HeroProps {
  onTakeQuiz: () => void;
}

const Hero: React.FC<HeroProps> = ({ onTakeQuiz }) => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
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

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Home fitness setup"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Wellness First</div>
                    <div className="text-xs text-gray-600">Mind & Body Balance</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '3s' }}>
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
      </div>
    </section>
  );
};

export default Hero;