import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Design } from '../types';

interface WishlistStore {
  items: Design[];
  addToWishlist: (design: Design) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (design) => {
        const { items } = get();
        if (!items.find(i => i.id === design.id)) {
          set({ items: [...items, design] });
        }
      },
      removeFromWishlist: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },
      isInWishlist: (id) => {
        return get().items.some(i => i.id === id);
      },
    }),
    {
      name: 'atelier-wishlist',
    }
  )
);
