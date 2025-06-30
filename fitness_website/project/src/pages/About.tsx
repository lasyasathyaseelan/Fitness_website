import React from 'react';
import { Heart, Target, Users, Award, Leaf, Shield } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Health at Home',
      description: 'We believe everyone deserves access to quality fitness equipment and wellness products in the comfort of their own home.'
    },
    {
      icon: Leaf,
      title: 'Sustainable Fitness',
      description: 'Our eco-friendly products are designed to last, reducing waste while supporting your long-term health goals.'
    },
    {
      icon: Users,
      title: 'Inclusive Community',
      description: 'Fitness is for everyone. We create products and content that welcome people of all fitness levels and backgrounds.'
    },
    {
      icon: Target,
      title: 'Goal-Focused',
      description: 'Every product is carefully selected to help you achieve specific fitness goals with personalized recommendations.'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded during the pandemic with a mission to bring gym-quality fitness to homes across India.'
    },
    {
      year: '2021',
      title: 'Product Expansion',
      description: 'Expanded our catalog to include wellness accessories, nutrition supplements, and digital fitness content.'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Launched our AI-powered fitness quiz to provide personalized product recommendations.'
    },
    {
      year: '2023',
      title: 'Community Growth',
      description: 'Reached 10,000+ satisfied customers and launched our expert content library.'
    },
    {
      year: '2024',
      title: 'Innovation Continues',
      description: 'Introduced smart fitness tracking and expanded our sustainable product line.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '4.9★', label: 'Average Rating' },
    { number: '50+', label: 'Expert Partners' }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              About
              <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                FitNest
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform homes into personal fitness sanctuaries. 
              Since 2020, we've been helping thousands of people achieve their health and wellness goals 
              with premium equipment, expert guidance, and personalized support.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At FitNest, we believe that fitness should be accessible, sustainable, and enjoyable. 
                Our mission is to democratize health and wellness by bringing professional-grade 
                fitness equipment and expert guidance directly to your doorstep.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're not just selling products – we're building a community of health-conscious 
                individuals who prioritize their well-being and understand that the best gym is 
                the one you'll actually use.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Home fitness setup"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Quality Assured</div>
                    <div className="text-sm text-gray-600">Premium Products Only</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from product selection to customer service
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <value.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a small startup to a trusted fitness partner for thousands
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold text-emerald-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-white border-4 border-emerald-500 rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FitNest?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're more than just an e-commerce store – we're your fitness partners
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Guarantee</h3>
              <p className="text-gray-600">
                Every product is tested and approved by our fitness experts. 
                We offer a 1-year warranty and 30-day return policy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Approach</h3>
              <p className="text-gray-600">
                Our AI-powered quiz and expert recommendations ensure you get 
                the right products for your specific goals and space.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-600">
                Join our community of fitness enthusiasts. Get access to exclusive 
                content, tips, and support from fellow members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers who have made FitNest their trusted fitness partner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              Start Shopping
            </a>
            <a
              href="/quiz"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-200"
            >
              Take Our Quiz
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;