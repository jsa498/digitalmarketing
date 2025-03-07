'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/lib/store/cart-store';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { syncWithSupabase, cleanup, initialized } = useCartStore();
  const initializingRef = useRef(false);

  useEffect(() => {
    // Only sync if we have a session and haven't initialized yet
    if (session?.user?.id && !initialized && !initializingRef.current) {
      initializingRef.current = true;
      syncWithSupabase(session.user.id).finally(() => {
        initializingRef.current = false;
      });
    }

    // Cleanup subscription only when component unmounts or session changes
    return () => {
      if (session?.user?.id) {
        cleanup();
      }
    };
  }, [session?.user?.id, syncWithSupabase, cleanup, initialized]);

  return <>{children}</>;
} 