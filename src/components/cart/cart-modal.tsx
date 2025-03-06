'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCartStore } from '@/lib/store/cart-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export default function CartModal() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, getItemCount, getTotalPrice, clearCart } = useCartStore();
  
  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();
  
  return (
    <div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="w-9 h-9 bg-transparent hover:bg-transparent transition-colors relative"
        aria-label="Shopping cart"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-[1.2rem] w-[1.2rem] stroke-foreground" />
        {itemCount > 0 && (
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
            {itemCount}
          </Badge>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Shopping Cart</DialogTitle>
              {itemCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => clearCart()}
                  className="h-8 text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>
          </DialogHeader>
          
          {itemCount === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              Your cart is empty
            </div>
          ) : (
            <>
              <ScrollArea className="max-h-[400px] overflow-auto -mx-6 px-6">
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-4">
                      <div className="flex-shrink-0 h-16 w-16 relative bg-muted rounded overflow-hidden">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-grow min-w-0">
                        <span className="font-medium truncate">{item.title}</span>
                        <span className="text-muted-foreground text-sm">${item.price.toFixed(2)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/checkout');
                  }}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 