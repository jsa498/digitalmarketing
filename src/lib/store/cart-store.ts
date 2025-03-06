import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl?: string | null;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  isItemInCart: (id: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.id === item.id);
        
        if (!existingItem) {
          set({ items: [...items, item] });
        }
      },
      
      removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== id) });
      },
      
      clearCart: () => set({ items: [] }),
      
      getItemCount: () => {
        return get().items.length;
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
      },
      
      isItemInCart: (id) => {
        return get().items.some(item => item.id === id);
      }
    }),
    {
      name: 'shopping-cart',
      skipHydration: true,
    }
  )
); 