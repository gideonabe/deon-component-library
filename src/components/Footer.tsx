import React from 'react';
import { Button } from './Button';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string;
  columns?: FooterColumn[];
  newsletterText?: string;
  onSubscribe?: (email: string) => void;
}

export function Footer({ 
  brandName = 'DÉON', 
  columns = [], 
  newsletterText = 'Subscribe to receive updates, access to exclusive deals, and more.',
  onSubscribe,
  className = '',
  ...props 
}: FooterProps) {
  return (
    <footer className={`bg-neutral-900 text-white pt-20 pb-10 ${className}`} {...props}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-neutral-800 pb-16">
          
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-5 lg:col-span-4">
            <h2 className="text-3xl font-serif tracking-widest mb-6">{brandName}</h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-sm">
              {newsletterText}
            </p>
            <form 
              className="flex items-end gap-3 max-w-sm"
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
                if (onSubscribe) onSubscribe(email);
              }}
            >
              <div className="flex-1">
                {/* 
                  Using a custom dark input specifically for the footer, 
                  but in a real scenario, your Input component could have a 'dark' variant 
                */}
                <input 
                  name="email"
                  type="email" 
                  placeholder="Email Address" 
                  required
                  className="w-full bg-transparent border-b border-neutral-700 pb-2 pt-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors rounded-none"
                />
              </div>
              <Button type="submit" variant="outline" size="sm" className="border-neutral-700 text-neutral-300 hover:text-neutral-900 hover:bg-white hover:border-white shrink-0">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Dynamic Link Columns */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col, index) => (
              <div key={index}>
                <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-6">
                  {col.title}
                </h3>
                <ul className="space-y-4">
                  {col.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href} 
                        className="text-sm text-neutral-300 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans tracking-widest uppercase text-neutral-600">
          <p>&copy; {new Date().getFullYear()} {brandName} UI. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}