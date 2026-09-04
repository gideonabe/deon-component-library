"use client";
import { useState } from 'react';
import { Alert } from '../components/Alert';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import { products, type Product } from '../data/products';
import { CartDrawer, type CartItemType } from '../components/CartDrawer';
import { Search } from '../components/Search';
import { CheckoutForm } from '../components/CheckoutForm';
import { Footer, type FooterColumn } from '../components/Footer';

export default function ComponentDemo() {
  // Store items as an array of { product, quantity }
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'info' | 'error' | 'warning', message: string } | null>(null);
  const [email, setEmail] = useState('');

  // FIXED: Now it only counts the number of distinct products in the cart, not the total quantity of bottles.
  const totalCartCount = cartItems.length;

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        // Increment quantity if it already exists
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item with quantity 1
      return [...prev, { product, quantity: 1 }];
    });
    
    setAlert({ type: 'success', message: `${product.name} added to your cart.` });
    setIsCartOpen(true);
    window.setTimeout(() => setAlert(null), 4000);
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      // Remove item entirely if quantity drops below 1
      setCartItems((prev) => prev.filter(item => item.product.id !== productId));
      return;
    }
    
    setCartItems((prev) => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const handleCheckoutSuccess = () => {
    setIsCartOpen(false);
    setCartItems([]); // Clear the cart
    setAlert({ type: 'success', message: 'Order processed successfully. Thank you for shopping with DÉON.' });
    window.setTimeout(() => setAlert(null), 5000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <Navbar 
        cartItemCount={totalCartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={handleCheckoutSuccess}
      />

      <main>
        {/* Sleek Hero Section */}
        <section className="bg-white border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:px-12 lg:py-32">
            <div className="max-w-3xl">
              <Badge variant="outline">DÉON Design System</Badge>
              <h1 className="mt-8 font-serif text-5xl md:text-7xl text-neutral-900 leading-tight">
                DÉON
                <span className="block text-neutral-400">Perfume UI.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-neutral-500 font-light leading-relaxed">
                A meticulously crafted, accessible, and highly reusable component library designed specifically for luxury e-commerce experiences.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore Library
                </Button>
                <Button size="lg" variant="outline" onClick={() => setSelectedProduct(products[0])}>
                  Preview Product
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Components Showcase */}
        <section id="components" className="mx-auto max-w-7xl px-6 py-24 sm:px-12">
          <div className="mb-16 max-w-2xl">
            <p className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Component Reference
            </p>
            <h2 className="mt-4 font-serif text-4xl text-neutral-900">
              The Building Blocks
            </h2>
          </div>

          <div className="space-y-24">
            {/* Buttons */}
            <ComponentSection title="Buttons" description="Interactive elements with strictly defined hierarchies and loading states.">
              <div className="flex flex-wrap gap-4 items-center">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Processing</Button>
              </div>
            </ComponentSection>

            {/* Badges */}
            <ComponentSection title="Badges" description="Subtle indicators for product statuses and metadata.">
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">New Arrival</Badge>
                <Badge variant="outline">Limited Edition</Badge>
                <Badge variant="dark">Bestseller</Badge>
              </div>
            </ComponentSection>

            {/* Inputs */}
            <ComponentSection title="Inputs" description="Minimalist form controls designed for high-conversion checkout flows.">
              <div className="grid max-w-2xl gap-8 md:grid-cols-2">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Search"
                  placeholder="Find a fragrance..."
                  helperText="Press Enter to search."
                />
                <Input
                  label="Discount Code"
                  value="INVALID-CODE"
                  error="This code has expired."
                  readOnly
                />
              </div>
            </ComponentSection>

            {/* Forms Showcase */}
            <ComponentSection 
              title="Forms" 
              description="Complex, responsive form compositions utilizing CSS Grid, standard spacing, and our atomic Input components."
            >
              <CheckoutForm />
            </ComponentSection>

            {/* Alerts Showcase */}
            <ComponentSection 
              title="Alerts" 
              description="Feedback messages for application states. Used for inline validation or global toast notifications."
            >
              <div className="grid gap-4">
                <Alert variant="success" title="Success">
                  Your fragrance was successfully added to your cart.
                </Alert>

                <Alert variant="info" title="Information">
                  Complimentary express shipping is available on all orders over $150.
                </Alert>

                <Alert variant="warning" title="Low Inventory">
                  Only 3 bottles of Midnight Rose remain in stock.
                </Alert>

                <Alert variant="error" title="Payment Failed">
                  We could not process your request. Please verify your card details.
                </Alert>
              </div>
            </ComponentSection>

            {/* Advanced Search */}
            <ComponentSection 
              title="Smart Search" 
              description="A production-ready search interface featuring request cancellation (AbortController) to prevent race conditions, and query memoization to minimize network load. Open your browser console to see the caching in action!"
            >
              <div className="w-full flex justify-center py-6">
                {/* Wiring it up to open the product modal on click */}
                <Search onSelectProduct={(product) => setSelectedProduct(product)} />
              </div>
            </ComponentSection>

            {/* Loaders */}
            <ComponentSection title="Loaders" description="Loading indicators for asynchronous application states. (Try checking out in the cart to see this in action!)">
              <div className="flex items-center gap-8">
                <Loader size="sm" />
                <Loader size="md" />
                <Loader size="lg" />
              </div>
            </ComponentSection>

            {/* Product Cards */}
            <ComponentSection title="Product Cards" description="Editorial-style cards for displaying inventory.">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.slice(0, 3).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                    onViewDetails={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </ComponentSection>
          </div>
        </section>
      </main>

      {/* The Footer Component */}
      <Footer 
        columns={footerData} 
        onSubscribe={(email) => setAlert({ type: 'success', message: `Thank you! ${email} has been subscribed to our newsletter.` })} 
      />

      {/* Global Toast Alert */}
      {alert && (
        <div className="fixed bottom-8 right-8 z-50 w-full max-w-sm">
          <Alert variant={alert.type} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        </div>
      )}

      {/* Reusable Modal */}
      <Modal isOpen={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <div className="p-2">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="mb-6 h-64 w-full object-cover rounded-sm"
            />
            <p className="text-xs font-sans tracking-[0.2em] uppercase text-neutral-500 mb-2">
              {selectedProduct.brand || "DÉON Signature"}
            </p>
            <h3 className="text-2xl font-serif text-neutral-900 mb-4">{selectedProduct.name}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-8">
              {selectedProduct.description}
            </p>
            <div className="flex items-center justify-between border-t border-neutral-100 pt-6">
              <span className="text-xl font-serif text-neutral-900">${selectedProduct.price}</span>
              <Button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                Add to Cart
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}


const footerData: FooterColumn[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All Fragrances', href: '#' },
      { label: 'Best Sellers', href: '#' },
      { label: 'Discovery Sets', href: '#' },
      { label: 'Gift Cards', href: '#' },
    ]
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Ingredients', href: '#' },
      { label: 'Journal', href: '#' },
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '#' },
      { label: 'Shipping & Returns', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Track Order', href: '#' },
    ]
  }
];

// Internal wrapper for documenting components
function ComponentSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-16">
      <div className="w-full md:w-1/3 shrink-0">
        <h3 className="font-serif text-2xl text-neutral-900">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">{description}</p>
      </div>
      <div className="w-full md:w-2/3 rounded-sm border border-neutral-200 bg-white p-8 md:p-12 shadow-sm">
        {children}
      </div>
    </section>
  );
}