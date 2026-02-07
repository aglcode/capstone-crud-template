import type { icons } from 'lucide-react';
export type UserRole = 'Super Admin' | 'Admin' | 'Customer';
export type UserStatus = 'Active' | 'Offline' | 'Suspended' | 'Pending';

export interface Feature {
  title: string;
  description: string;
  icon: keyof typeof icons;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
}

export interface Product {
  id: string;
  name: string;
  model: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: keyof Product;
  direction: SortDirection;
}