export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  isDigital?: boolean;
  isBestSeller?: boolean;
}

export type ProductCategory = 
  | "yoga"
  | "strength" 
  | "wellness"
  | "digital"
  | "apparel"
  | "nutrition";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  value: string;
}

export interface QuizResult {
  goal: string;
  experience: string;
  preferences: string[];
  recommendations: Product[];
}