import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
// import { Loader } from './Loader';

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-50 p-6 md:p-10 rounded-sm border border-neutral-100">
      <div>
        <h4 className="font-serif text-xl text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
          Shipping Details
        </h4>
        
        {/* Responsive Grid for Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="First Name" 
            placeholder="Jane" 
            required 
          />
          <Input 
            label="Last Name" 
            placeholder="Doe" 
            required 
          />
          
          {/* Spans full width on desktop */}
          <div className="md:col-span-2">
            <Input 
              label="Street Address" 
              placeholder="123 Luxury Ave, Suite 100" 
              required 
            />
          </div>
          
          <Input 
            label="City" 
            placeholder="Paris" 
            required 
          />
          <Input 
            label="Postal Code" 
            placeholder="75008" 
            required 
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button 
          type="submit" 
          size="lg" 
          loading={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? 'Processing...' : 'Continue to Payment'}
        </Button>
      </div>
    </form>
  );
}