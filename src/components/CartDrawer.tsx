import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Minus, Plus } from 'lucide-react';
// import { Product } from '../data/products';
import { Button } from './Button';
import type { Product } from '../data/products';

// Updated interface to handle product quantities
export interface CartItemType {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onCheckout }: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate true subtotal based on quantity
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      onCheckout();
    }, 2000); // 2 second fake delay to show the loader
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-[80%] md:w-full max-w-md bg-white shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100">
              <h2 className="font-serif text-2xl text-neutral-900">Your Cart</h2>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-900 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
                  <p className="font-sans text-sm tracking-widest uppercase">Your cart is empty</p>
                  <Button variant="ghost" onClick={onClose}>Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-32 shrink-0 bg-neutral-100 rounded-sm overflow-hidden">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex flex-col flex-1 justify-between py-1">
                        <div>
                          <p className="text-[10px] font-sans tracking-[0.2em] text-neutral-500 uppercase mb-1">
                            {item.product.brand}
                          </p>
                          <h4 className="font-serif text-neutral-900 text-lg flex justify-between">
                            {item.product.name}
                            <button 
                              onClick={() => onUpdateQuantity(item.product.id, 0)}
                              className="text-neutral-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </h4>
                          <span className="font-sans font-medium text-neutral-900 text-sm mt-1 block">
                            ${item.product.price}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-neutral-200 w-24 rounded-sm mt-4">
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-neutral-900">
                            {item.quantity}
                          </span>
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-8 border-t border-neutral-100 bg-neutral-50">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-sans text-xs tracking-widest uppercase text-neutral-500">Subtotal</span>
                  <span className="font-serif text-xl text-neutral-900">${subtotal}</span>
                </div>
                <p className="text-xs text-neutral-500 mb-6">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleCheckout}
                  loading={isCheckingOut}
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}