import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Target, Award, Sparkles } from 'lucide-react';
import { QuizQuestion, QuizResult, Product } from '../types';
import { quizQuestions, products } from '../data/products';

interface FitnessQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: QuizResult) => void;
}

const FitnessQuiz: React.FC<FitnessQuizProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);

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
    const preferences = [answers['3']] || ['mixed'];

    // Simple recommendation logic
    let recommendedProducts: Product[] = [];
    
    if (goal === 'weight-loss') {
      recommendedProducts = products.filter(p => 
        p.tags.includes('cardio') || p.category === 'nutrition' || p.tags.includes('resistance')
      ).slice(0, 4);
    } else if (goal === 'muscle-building') {
      recommendedProducts = products.filter(p => 
        p.tags.includes('strength') || p.tags.includes('muscle-building') || p.category === 'nutrition'
      ).slice(0, 4);
    } else if (goal === 'wellness') {
      recommendedProducts = products.filter(p => 
        p.category === 'wellness-accessories' || p.tags.includes('yoga') || p.tags.includes('meditation')
      ).slice(0, 4);
    } else {
      recommendedProducts = products.filter(p => p.isBestSeller).slice(0, 4);
    }

    const result: QuizResult = {
      goal,
      experience,
      preferences,
      recommendations: recommendedProducts
    };

    setResults(result);
    setShowResults(true);
    onComplete(result);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Fitness Quiz</h2>
              <p className="text-sm text-gray-600">Get personalized recommendations</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!showResults ? (
          <>
            {/* Progress Bar */}
            <div className="px-6 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm font-medium text-emerald-600">
                  {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {quizQuestions[currentQuestion].question}
              </h3>
              
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.value)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      answers[quizQuestions[currentQuestion].id] === option.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        answers[quizQuestions[currentQuestion].id] === option.value
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[quizQuestions[currentQuestion].id] === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className="font-medium">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              
              <button
                onClick={nextQuestion}
                disabled={!answers[quizQuestions[currentQuestion].id]}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Get Results' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </>
        ) : (
          /* Results */
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Your Personalized Plan is Ready!
              </h3>
              <p className="text-gray-600">
                Based on your answers, here are our top recommendations
              </p>
            </div>

            {results && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-emerald-600" />
                    Your Profile
                  </h4>
                  <div className="text-sm text-gray-600">
                    <p><strong>Goal:</strong> {results.goal.replace('-', ' ').toUpperCase()}</p>
                    <p><strong>Level:</strong> {results.experience.toUpperCase()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Recommended Products</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.recommendations.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <h5 className="font-medium text-gray-900 mb-1">{product.name}</h5>
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-600">₹{product.price.toLocaleString()}</span>
                          <button className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                            View Product
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 pt-4">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessQuiz;