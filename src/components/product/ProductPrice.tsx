import React from 'react';
import { formatPrice } from '../../utils/price';

interface ProductPriceProps {
  price: number;
  className?: string;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({ price, className = '' }) => {
  return (
    <span className={`font-bold text-lg ${className}`}>
      {formatPrice(price)}
    </span>
  );
};