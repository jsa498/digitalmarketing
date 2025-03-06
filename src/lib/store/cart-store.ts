import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import { useSession } from 'next-auth/react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl?: string | null;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemCount: () => number;
  getTotalPrice: () => number;
  isItemInCart: (id: string) => boolean;
  syncWithSupabase: (userId: string) => Promise<() => void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: async (item) => {
        const { data: session } = useSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          set({ items: [...get().items, item] });
          return;
        }

        try {
          // Add to Supabase
          const { error } = await supabase
            .from('cart_items')
            .insert([{ 
              user_id: userId,
              product_id: item.id,
              title: item.title,
              price: item.price,
              image_url: item.imageUrl
            }]);

          if (error) throw error;
          
          // Update local state
          set({ items: [...get().items, item] });
        } catch (error) {
          console.error('Error adding item to cart:', error);
        }
      },
      
      removeItem: async (id) => {
        const { data: session } = useSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          set({ items: get().items.filter(item => item.id !== id) });
          return;
        }

        try {
          // Remove from Supabase
          const { error } = await supabase
            .from('cart_items')
            .delete()
            .match({ user_id: userId, product_id: id });

          if (error) throw error;
          
          // Update local state
          set({ items: get().items.filter(item => item.id !== id) });
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      },
      
      clearCart: async () => {
        const { data: session } = useSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          set({ items: [] });
          return;
        }

        try {
          // Clear from Supabase
          const { error } = await supabase
            .from('cart_items')
            .delete()
            .match({ user_id: userId });

          if (error) throw error;
          
          // Update local state
          set({ items: [] });
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      },
      
      getItemCount: () => {
        return get().items.length;
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
      },
      
      isItemInCart: (id) => {
        return get().items.some(item => item.id === id);
      },

      syncWithSupabase: async (userId) => {
        try {
          // Fetch cart items from Supabase
          const { data: cartItems, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId);

          if (error) throw error;

          // Transform and update local state
          const items = cartItems.map(item => ({
            id: item.product_id,
            title: item.title,
            price: item.price,
            imageUrl: item.image_url
          }));

          set({ items });

          // Set up real-time subscription
          const subscription = supabase
            .channel('cart_changes')
            .on(
              'postgres_changes',
              {
                event: '*',
                schema: 'public',
                table: 'cart_items',
                filter: `user_id=eq.${userId}`
              },
              async (payload) => {
                // Re-fetch all cart items to ensure consistency
                const { data: updatedCart, error: fetchError } = await supabase
                  .from('cart_items')
                  .select('*')
                  .eq('user_id', userId);

                if (fetchError) {
                  console.error('Error fetching updated cart:', fetchError);
                  return;
                }

                const updatedItems = updatedCart.map(item => ({
                  id: item.product_id,
                  title: item.title,
                  price: item.price,
                  imageUrl: item.image_url
                }));

                set({ items: updatedItems });
              }
            )
            .subscribe();

          // Always return a cleanup function
          return () => {
            subscription.unsubscribe();
          };
        } catch (error) {
          console.error('Error syncing with Supabase:', error);
          // Return a no-op cleanup function in case of error
          return () => {};
        }
      }
    }),
    {
      name: 'shopping-cart',
      skipHydration: true,
    }
  )
); 