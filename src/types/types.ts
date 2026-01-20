import type { icons } from 'lucide-react';

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
