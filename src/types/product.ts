
export interface Product {
  id: number;
  name: string;
  brand: string;
  category: 'smartphone' | 'laptop' | 'tablet' | 'smartwatch';
  price: number;
  image: string;
  specs: {
    display?: string;
    ram?: string;
    storage?: string;
    battery?: string;
    processor?: string;
    camera?: string;
    os?: string;
    weight?: string;
    color?: string;
    connectivity?: string[];
  };
  rating: number;
  description: string;
}

export interface Comparison {
  id: string;
  product1: Product;
  product2: Product;
  createdAt: string;
  recommendation: {
    winner: Product;
    reasons: string[];
  };
}
