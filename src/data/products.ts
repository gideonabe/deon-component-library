export interface Product {
  id: number
  name: string
  brand: string
  price: number
  rating: number
  image: string
  badge?: 'new' | 'sale' | 'bestseller'
  description: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Noir Essence',
    brand: 'Maison Noir',
    price: 120,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
    badge: 'bestseller',
    description:
      'A sophisticated fragrance with warm woods, amber and subtle spice.',
  },
  {
    id: 2,
    name: 'Velvet Bloom',
    brand: 'Élan Parfums',
    price: 95,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
    badge: 'new',
    description:
      'A soft floral composition built around rose, vanilla and musk.',
  },
  {
    id: 3,
    name: 'Amber Night',
    brand: 'Atelier Élégance',
    price: 145,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    badge: 'sale',
    description:
      'An intense evening fragrance with amber, leather and sandalwood.',
  },
]
