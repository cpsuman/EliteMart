import React from 'react';
import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  className?: string;
}

export const ProductRating: React.FC<ProductRatingProps> = ({ rating, className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Star className="w-4 h-4 text-yellow-400 fill-current" />
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};