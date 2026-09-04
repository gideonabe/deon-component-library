import { Button } from './Button';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-white">
      {/* Image Container with hover zoom */}
      <div 
        className="relative aspect-4/5 overflow-hidden bg-neutral-100 cursor-pointer mb-6 rounded-sm"
        onClick={() => onViewDetails(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1">
        <p className="text-[10px] font-sans tracking-[0.2em] text-neutral-500 uppercase mb-2">
          {product.brand || 'DÉON Signature'}
        </p>
        <h3 className="text-xl font-serif text-neutral-900 mb-2 cursor-pointer" onClick={() => onViewDetails(product)}>
          {product.name}
        </h3>
        <p className="text-sm text-neutral-500 line-clamp-2 mb-6 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-auto">
          <span className="text-lg font-serif text-neutral-900">
            ${product.price}
          </span>
          <Button variant="ghost" size="sm" onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}