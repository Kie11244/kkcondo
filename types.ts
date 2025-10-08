
export type Language = 'th' | 'en';

export interface Property {
  id: number;
  type: 'rent' | 'sale';
  title: string;
  description: string;
  location: string;
  walkTime: number;
  bedrooms: string;
  bathrooms: number;
  size: number;
  price: string;
  imageUrl: string;
  tags: string[];
  imageCount: number;
}

export interface Project {
  id: number;
  name: string;
  developer: string;
  year: number;
  station: string;
  walkTime: number;
  floors: number;
  units: string;
  priceRangeRent: string;
  priceRangeSale: string;
  imageUrl: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    imageUrl: string;
}

export interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

export interface Area {
    id: number;
    name: string;
    type: 'BTS' | 'MRT';
    startPrice: string;
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    imageUrl: string;
    date: string;
}