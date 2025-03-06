'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCartStore } from '@/lib/store/cart-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export default function CartDropdown() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, getItemCount, getTotalPrice, clearCart } = useCartStore();
  
  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-9 h-9 bg-transparent hover:bg-transparent transition-colors relative"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="h-[1.2rem] w-[1.2rem] stroke-foreground" />
          {itemCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
              {itemCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Shopping Cart</span>
          {itemCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => clearCart()}
              className="h-6 text-xs"
            >
              Clear All
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {itemCount === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-[300px] overflow-auto">
              {items.map((item) => (
                <DropdownMenuItem key={item.id} className="flex gap-4 p-4 cursor-default">
                  <div className="flex-shrink-0 h-12 w-12 relative bg-muted rounded overflow-hidden">
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
                    <span className="font-medium text-sm truncate">{item.title}</span>
                    <span className="text-muted-foreground text-xs">${item.price.toFixed(2)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuItem>
              ))}
            </ScrollArea>
            
            <DropdownMenuSeparator />
            
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full" 
                onClick={() => {
                  router.push('/checkout');
                }}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 