import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Loader } from './Loader';
import { products, type Product } from '../data/products';

// Simulated API call with AbortSignal support
const fetchSearchResults = async (query: string, signal: AbortSignal): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      // Filter mock data based on name, brand, or description
      const results = products.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.brand.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery)
      );
      resolve(results);
    }, 800); // 800ms artificial delay to simulate network latency

    // Listen for the abort signal to cancel the timeout
    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
};

interface SearchProps {
  onSelectProduct: (product: Product) => void;
}

export function Search({ onSelectProduct }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Cache: Stores previous queries to prevent redundant API calls
  const cache = useRef<Map<string, Product[]>>(new Map());
  // Ref for the container to handle clicking outside to close
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle empty query
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      setIsSearching(false);
      return;
    }

    // Check Cache (Memoization)
    if (cache.current.has(query.trim())) {
      console.log(`[Cache Hit] Returning saved results for: "${query}"`);
      setResults(cache.current.get(query.trim()) || []);
      setIsOpen(true);
      setIsSearching(false);
      return;
    }

    // Setup AbortController for new request
    const controller = new AbortController();
    setIsSearching(true);
    setIsOpen(true);

    // Execute Simulated Fetch
    console.log(`[Fetching] Requesting data for: "${query}"`);
    fetchSearchResults(query, controller.signal)
      .then((data) => {
        cache.current.set(query.trim(), data); // Save to cache
        setResults(data);
        setIsSearching(false);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log(`[Aborted] Cancelled stale request for: "${query}"`);
        } else {
          setIsSearching(false);
        }
      });

    // Cleanup function: Aborts the request if query changes before it finishes
    return () => {
      controller.abort();
    };
  }, [query]);

  // Handle clicking outside the search component to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md z-30">
      {/* Search Input */}
      <div className="relative flex items-center border-b border-neutral-300 focus-within:border-neutral-900 transition-colors duration-300 pb-2 pt-2">
        <SearchIcon className="w-4 h-4 text-neutral-400 mr-3" strokeWidth={1.5} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query) setIsOpen(true); }}
          placeholder="Search DÉON collections..."
          className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="text-neutral-400 hover:text-neutral-900 ml-2"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-neutral-100 shadow-xl rounded-sm overflow-hidden">
          {isSearching ? (
            <div className="flex items-center justify-center p-8 text-neutral-500">
              <Loader size="sm" className="mr-3" />
              <span className="text-xs font-sans tracking-widest uppercase">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto">
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => {
                      onSelectProduct(product);
                      setIsOpen(false);
                      setQuery(''); // Optional: clear search on select
                    }}
                    className="w-full flex items-center text-left p-4 hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0"
                  >
                    <img src={product.image} alt={product.name} className="w-12 h-16 object-cover rounded-sm bg-neutral-100 mr-4 shrink-0" />
                    <div>
                      <p className="text-[10px] font-sans tracking-[0.2em] text-neutral-500 uppercase">
                        {product.brand}
                      </p>
                      <h4 className="font-serif text-neutral-900 text-sm mt-0.5">{product.name}</h4>
                      <p className="font-sans font-medium text-neutral-900 text-xs mt-1">
                        ${product.price}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <p className="text-xs font-sans tracking-widest uppercase text-neutral-500">
                No fragrances found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}