import { useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { Button } from './Button'

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'Collection', href: '#collection' },
  { label: 'Components', href: '#components' },
  { label: 'About', href: '#about' },
]

export function Navbar({ cartItemCount, onOpenCart }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <a
          href="/"
          className="font-display text-3xl font-semibold tracking-wide"
        >
          DÉON
        </a>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-[0.16em] text-muted transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions: Cart + (Hamburger OR CTA Button) */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Cart Icon (Visible on Desktop and Mobile) */}
          <button 
            onClick={onOpenCart}
            aria-label="Shopping cart" 
            className="relative text-muted hover:opacity-50 transition-opacity duration-300"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] text-white">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Browse Button (Desktop Only) */}
          <div className="hidden md:block">
            <Button size="sm" onClick={() => document.getElementById('collection')?.scrollIntoView()}>
              Browse collection
            </Button>
          </div>

          {/* Hamburger Menu Toggle (Mobile Only) */}
          <button
            type="button"
            className="rounded-full p-1 text-muted transition hover:bg-surface-muted hover:text-foreground md:hidden"
            aria-label={
              isMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold transition hover:bg-surface-muted"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3">
              <Button className="w-full" onClick={() => {
                setIsMenuOpen(false);
                document.getElementById('collection')?.scrollIntoView();
              }}>
                Browse collection
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}