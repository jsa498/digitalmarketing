'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/lib/store/cart-store';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { syncWithSupabase, cleanup, initialized } = useCartStore();

  useEffect(() => {
    if (session?.user?.id && !initialized) {
      syncWithSupabase(session.user.id);
    }

    return () => {
      cleanup();
    };
  }, [session?.user?.id, syncWithSupabase, cleanup, initialized]);

  return <>{children}</>;
} 