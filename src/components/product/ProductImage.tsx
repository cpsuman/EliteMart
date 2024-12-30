import React from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`relative aspect-square overflow-hidden rounded-lg ${className}`}>
      <img
        src={src}
        alt={alt}
        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};