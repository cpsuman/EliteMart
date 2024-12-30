import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { ProductRating } from './ProductRating';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ProductImage src={product.image} alt={product.name} />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <ProductRating rating={product.rating} className="mt-1" />
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <ProductPrice price={product.price} />
          <Button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            className="flex items-center"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};