import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Target, Award, Sparkles, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';

interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string; value: string }[];
}

interface QuizResult {
  goal: string;
  experience: string;
  preferences: string[];
  recommendations: any[];
}

const Quiz: React.FC = () => {
  const { addToCart } = useCart();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);

  const quizQuestions: QuizQuestion[] = [
    {
      id: '1',
      question: 'What is your primary fitness goal?',
      options: [
        { id: '1a', text: 'Weight Loss & Fat Burning', value: 'weight-loss' },
        { id: '1b', text: 'Muscle Building & Strength', value: 'muscle-building' },
        { id: '1c', text: 'General Fitness & Health', value: 'general-fitness' },
        { id: '1d', text: 'Stress Relief & Wellness', value: 'wellness' },
        { id: '1e', text: 'Flexibility & Mobility', value: 'flexibility' }
      ]
    },
    {
      id: '2',
      question: 'What is your current fitness experience level?',
      options: [
        { id: '2a', text: 'Complete Beginner - Just starting out', value: 'beginner' },
        { id: '2b', text: 'Some Experience - Worked out before', value: 'intermediate' },
        { id: '2c', text: 'Advanced - Regular fitness routine', value: 'advanced' }
      ]
    },
    {
      id: '3',
      question: 'What type of workouts do you prefer?',
      options: [
        { id: '3a', text: 'High-Intensity Cardio & HIIT', value: 'cardio' },
        { id: '3b', text: 'Strength Training & Weight Lifting', value: 'strength' },
        { id: '3c', text: 'Yoga & Mindful Movement', value: 'yoga' },
        { id: '3d', text: 'Mixed Workouts - Variety is key', value: 'mixed' }
      ]
    },
    {
      id: '4',
      question: 'How much space do you have for workouts?',
      options: [
        { id: '4a', text: 'Small Space - Apartment/Room', value: 'small' },
        { id: '4b', text: 'Medium Space - Living Room', value: 'medium' },
        { id: '4c', text: 'Large Space - Dedicated Room/Garage', value: 'large' }
      ]
    },
    {
      id: '5',
      question: 'How much time can you dedicate to workouts?',
      options: [
        { id: '5a', text: '15-30 minutes per day', value: 'short' },
        { id: '5b', text: '30-60 minutes per day', value: 'medium' },
        { id: '5c', text: '60+ minutes per day', value: 'long' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      generateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const generateResults = () => {
    const goal = answers['1'] || 'general-fitness';
    const experience = answers['2'] || 'beginner';
    const workoutType = answers['3'] || 'mixed';
    const space = answers['4'] || 'medium';
    const time = answers['5'] || 'medium';

    // Smart recommendation logic
    let recommendedProducts: any[] = [];
    
    if (goal === 'weight-loss') {
      recommendedProducts = products.filter(p => 
        p.tags.includes('cardio') || p.category === 'nutrition' || p.tags.includes('resistance')
      );
    } else if (goal === 'muscle-building') {
      recommendedProducts = products.filter(p => 
        p.tags.includes('strength') || p.tags.includes('muscle-building') || p.category === 'nutrition'
      );
    } else if (goal === 'wellness') {
      recommendedProducts = products.filter(p => 
        p.category === 'wellness' || p.tags.includes('yoga') || p.tags.includes('meditation')
      );
    } else if (goal === 'flexibility') {
      recommendedProducts = products.filter(p => 
        p.tags.includes('yoga') || p.tags.includes('stretching') || p.tags.includes('balance')
      );
    } else {
      recommendedProducts = products.filter(p => p.isBestSeller);
    }

    // Filter by space constraints
    if (space === 'small') {
      recommendedProducts = recommendedProducts.filter(p => 
        p.tags.includes('portable') || p.category === 'yoga' || p.category === 'digital'
      );
    }

    // Limit to top 6 recommendations
    recommendedProducts = recommendedProducts.slice(0, 6);

    const result: QuizResult = {
      goal,
      experience,
      preferences: [workoutType, space, time],
      recommendations: recommendedProducts
    };

    setResults(result);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  const getGoalDescription = (goal: string) => {
    const descriptions = {
      'weight-loss': 'Focus on cardio equipment and nutrition supplements to help you burn calories and lose weight effectively.',
      'muscle-building': 'Build strength with resistance training equipment and protein supplements for muscle growth.',
      'general-fitness': 'Maintain overall health with versatile equipment suitable for various workout types.',
      'wellness': 'Prioritize mental and physical well-being with yoga, meditation, and relaxation products.',
      'flexibility': 'Improve mobility and flexibility with yoga equipment and stretching accessories.'
    };
    return descriptions[goal as keyof typeof descriptions] || descriptions['general-fitness'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">AI Fitness Quiz</h1>
                    <p className="text-white/90">Get personalized product recommendations</p>
                  </div>
                </div>
                <div className="text-white/90 font-medium">
                  {currentQuestion + 1} / {quizQuestions.length}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-8 pt-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-center mt-2 text-sm text-gray-600">
                {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete
              </div>
            </div>

            {/* Question */}
            <div className="px-8 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {quizQuestions[currentQuestion].question}
              </h2>
              
              <div className="space-y-4">
                {quizQuestions[currentQuestion].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.value)}
                    className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      answers[quizQuestions[currentQuestion].id] === option.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                        answers[quizQuestions[currentQuestion].id] === option.value
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[quizQuestions[currentQuestion].id] === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium text-lg">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between px-8 py-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              
              <button
                onClick={nextQuestion}
                disabled={!answers[quizQuestions[currentQuestion].id]}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Get Results' : 'Next'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-8 py-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Your Personalized Plan is Ready!
              </h1>
              <p className="text-white/90 text-lg">
                Based on your answers, here are our top recommendations
              </p>
            </div>

            <div className="px-8 py-8">
              {results && (
                <div className="space-y-8">
                  {/* Profile Summary */}
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center text-xl">
                      <Sparkles className="w-6 h-6 mr-2 text-emerald-600" />
                      Your Fitness Profile
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                      <div>
                        <strong>Primary Goal:</strong> {results.goal.replace('-', ' ').toUpperCase()}
                      </div>
                      <div>
                        <strong>Experience Level:</strong> {results.experience.toUpperCase()}
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <p className="text-gray-600">
                        {getGoalDescription(results.goal)}
                      </p>
                    </div>
                  </div>

                  {/* Recommended Products */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Recommended Products for You
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.recommendations.map((product) => (
                        <div key={product.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                          />
                          <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-emerald-600">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-2 rounded-lg font-medium hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200">
                    <button
                      onClick={resetQuiz}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Retake Quiz
                    </button>
                    <button
                      onClick={() => window.location.href = '/shop'}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                    >
                      Explore All Products
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;