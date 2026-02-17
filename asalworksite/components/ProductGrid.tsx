
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-2">
      {products.map((product) => (
        <div 
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
        >
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-[10px] text-center font-bold px-1">{product.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
