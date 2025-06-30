import { Product, Bundle, QuizQuestion } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Yoga Mat',
    description: 'Non-slip, eco-friendly yoga mat perfect for all types of workouts',
    price: 1299,
    originalPrice: 1699,
    image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fitness-equipment',
    rating: 4.8,
    reviews: 324,
    inStock: true,
    tags: ['yoga', 'pilates', 'stretching'],
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Adjustable Dumbbells Set',
    description: 'Space-saving adjustable dumbbells from 2kg to 20kg each',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fitness-equipment',
    rating: 4.9,
    reviews: 186,
    inStock: true,
    tags: ['strength', 'muscle-building', 'home-gym']
  },
  {
    id: '3',
    name: 'Resistance Bands Set',
    description: 'Complete set of 5 resistance bands with door anchor and handles',
    price: 799,
    originalPrice: 1299,
    image: 'https://images.pexels.com/photos/4327024/pexels-photo-4327024.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fitness-equipment',
    rating: 4.7,
    reviews: 412,
    inStock: true,
    tags: ['resistance', 'strength', 'portable']
  },
  {
    id: '4',
    name: 'Essential Oils Starter Kit',
    description: 'Aromatherapy essential oils set with diffuser for relaxation',
    price: 2499,
    originalPrice: 3499,
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'wellness-accessories',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    tags: ['aromatherapy', 'relaxation', 'wellness']
  },
  {
    id: '5',
    name: 'Premium Workout Plans',
    description: 'Personalized 12-week workout and nutrition plan by certified trainers',
    price: 1999,
    image: 'https://images.pexels.com/photos/6456306/pexels-photo-6456306.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'digital-products',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    tags: ['workout-plan', 'nutrition', 'digital'],
    isDigital: true
  },
  {
    id: '6',
    name: 'Performance Athletic Wear',
    description: 'Moisture-wicking, breathable workout clothing set',
    price: 2799,
    originalPrice: 3999,
    image: 'https://images.pexels.com/photos/6456217/pexels-photo-6456217.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'apparel',
    rating: 4.5,
    reviews: 156,
    inStock: true,
    tags: ['activewear', 'breathable', 'comfortable']
  },
  {
    id: '7',
    name: 'Plant-Based Protein Powder',
    description: 'Premium whey protein powder for muscle building and recovery',
    price: 3499,
    originalPrice: 4299,
    image: 'https://images.pexels.com/photos/4623432/pexels-photo-4623432.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'nutrition',
    rating: 4.7,
    reviews: 298,
    inStock: true,
    tags: ['protein', 'muscle-building', 'recovery']
  },
  {
    id: '8',
    name: 'Meditation Cushion Set',
    description: 'Comfortable meditation cushions with premium filling',
    price: 1899,
    originalPrice: 2499,
    image: 'https://images.pexels.com/photos/6932079/pexels-photo-6932079.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'wellness-accessories',
    rating: 4.8,
    reviews: 127,
    inStock: true,
    tags: ['meditation', 'mindfulness', 'comfort']
  }
];

export const bundles: Bundle[] = [
  {
    id: 'bundle-1',
    name: 'Beginner Yoga Kit',
    description: 'Everything you need to start your yoga journey at home',
    products: [products[0], products[3], products[7]],
    bundlePrice: 4999,
    originalPrice: 5697,
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500',
    savings: 698
  },
  {
    id: 'bundle-2',
    name: 'Home Gym Starter Pack',
    description: 'Complete strength training setup for your home',
    products: [products[1], products[2], products[6]],
    bundlePrice: 11999,
    originalPrice: 13097,
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=500',
    savings: 1098
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is your primary fitness goal?',
    options: [
      { id: '1a', text: 'Weight Loss', value: 'weight-loss' },
      { id: '1b', text: 'Muscle Building', value: 'muscle-building' },
      { id: '1c', text: 'General Fitness', value: 'general-fitness' },
      { id: '1d', text: 'Stress Relief & Wellness', value: 'wellness' }
    ]
  },
  {
    id: '2',
    question: 'What is your experience level?',
    options: [
      { id: '2a', text: 'Complete Beginner', value: 'beginner' },
      { id: '2b', text: 'Some Experience', value: 'intermediate' },
      { id: '2c', text: 'Advanced', value: 'advanced' }
    ]
  },
  {
    id: '3',
    question: 'What type of workouts do you prefer?',
    options: [
      { id: '3a', text: 'Cardio & HIIT', value: 'cardio' },
      { id: '3b', text: 'Strength Training', value: 'strength' },
      { id: '3c', text: 'Yoga & Flexibility', value: 'yoga' },
      { id: '3d', text: 'Mixed Workouts', value: 'mixed' }
    ]
  }
];