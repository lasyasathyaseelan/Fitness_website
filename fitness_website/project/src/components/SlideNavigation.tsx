import React from 'react';
import { ChevronLeft, ChevronRight, Home, ShoppingBag, BookOpen } from 'lucide-react';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (slide: number) => void;
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({ 
  currentSlide, 
  totalSlides, 
  onSlideChange 
}) => {
  const slideIcons = [Home, ShoppingBag, BookOpen];
  const slideNames = ['Home', 'Shop', 'Learn'];

  const nextSlide = () => {
    onSlideChange((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    onSlideChange((currentSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
      {/* Navigation Dots */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {Array.from({ length: totalSlides }).map((_, index) => {
          const Icon = slideIcons[index];
          return (
            <button
              key={index}
              onClick={() => onSlideChange(index)}
              className={`group relative w-12 h-12 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-gradient-to-r from-emerald-600 to-blue-600 shadow-lg scale-110'
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
              }`}
            >
              <Icon className={`w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                currentSlide === index ? 'text-white' : 'text-gray-600'
              }`} />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  {slideNames[index]}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 group"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-emerald-600" />
      </button>

      <button
        onClick={nextSlide}
        className="fixed right-24 top-1/2 transform -translate-y-1/2 z-50 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 group"
      >
        <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-emerald-600" />
      </button>

      {/* Slide Counter */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-gray-700 font-medium">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>
    </>
  );
};

export default SlideNavigation;