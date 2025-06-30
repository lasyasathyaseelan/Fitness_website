import React from 'react';
import { Play, BookOpen, Clock, Users, ArrowRight, Headphones } from 'lucide-react';

const ContentSection: React.FC = () => {
  const contentItems = [
    {
      id: 1,
      type: 'video',
      title: 'Morning Yoga for Beginners',
      description: 'Start your day with this energizing 15-minute yoga routine',
      thumbnail: 'https://images.pexels.com/photos/3822912/pexels-photo-3822912.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '15 min',
      views: '12.5K',
      category: 'Yoga'
    },
    {
      id: 2,
      type: 'article',
      title: 'Building Your Home Gym on a Budget',
      description: 'Essential equipment and tips for creating an effective workout space',
      thumbnail: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=500',
      readTime: '8 min read',
      views: '8.2K',
      category: 'Equipment'
    },
    {
      id: 3,
      type: 'audio',
      title: 'Meditation for Stress Relief',
      description: 'Guided meditation session to help you unwind and relax',
      thumbnail: 'https://images.pexels.com/photos/6932079/pexels-photo-6932079.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '20 min',
      views: '5.8K',
      category: 'Wellness'
    },
    {
      id: 4,
      type: 'video',
      title: 'HIIT Workout for Fat Loss',
      description: 'High-intensity interval training to boost your metabolism',
      thumbnail: 'https://images.pexels.com/photos/6456217/pexels-photo-6456217.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '25 min',
      views: '18.3K',
      category: 'Cardio'
    },
    {
      id: 5,
      type: 'article',
      title: 'Nutrition Guide for Active Lifestyle',
      description: 'What to eat before and after workouts for optimal results',
      thumbnail: 'https://images.pexels.com/photos/4623432/pexels-photo-4623432.jpeg?auto=compress&cs=tinysrgb&w=500',
      readTime: '12 min read',
      views: '9.7K',
      category: 'Nutrition'
    },
    {
      id: 6,
      type: 'video',
      title: 'Strength Training Basics',
      description: 'Learn proper form and technique for compound movements',
      thumbnail: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=500',
      duration: '30 min',
      views: '14.1K',
      category: 'Strength'
    }
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'article':
        return <BookOpen className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  const getContentMeta = (item: any) => {
    if (item.type === 'article') {
      return (
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          {item.readTime}
        </div>
      );
    }
    return (
      <div className="flex items-center text-xs text-gray-500">
        <Clock className="w-3 h-3 mr-1" />
        {item.duration}
      </div>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Learn & Grow with Expert Content
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access our library of workout videos, wellness guides, and nutrition tips created by certified professionals
          </p>
        </div>

        {/* Content Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['All', 'Yoga', 'Cardio', 'Strength', 'Wellness', 'Nutrition', 'Equipment'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                category === 'All'
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    {getContentIcon(item.type)}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-gray-700">{item.category}</span>
                </div>

                {/* Content Type */}
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full flex items-center">
                  {getContentIcon(item.type)}
                  <span className="text-xs ml-1 capitalize">{item.type}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  {getContentMeta(item)}
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="w-3 h-3 mr-1" />
                    {item.views} views
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center">
                  {item.type === 'article' ? 'Read Article' : item.type === 'audio' ? 'Listen Now' : 'Watch Now'}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Want access to our premium content library with 500+ videos and guides?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
            Upgrade to Premium
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;