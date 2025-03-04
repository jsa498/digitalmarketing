'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ui/theme-toggle';
import { useSession, signOut } from 'next-auth/react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Extend the Session type to include role
interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="flex justify-center sticky top-4 z-50 pointer-events-none">
      <div className="bg-muted backdrop-blur-lg rounded-full px-4 py-2 shadow-lg pointer-events-auto inline-flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity">
            Digital Marketing
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/" 
              className={`px-4 py-2 transition-colors hover:text-primary ${
                pathname === '/' ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`px-4 py-2 transition-colors hover:text-primary ${
                pathname === '/products' ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              Products
            </Link>
            <Link 
              href="/courses" 
              className={`px-4 py-2 transition-colors hover:text-primary ${
                pathname === '/courses' ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              Courses
            </Link>
          </div>
        </div>
        
        {/* Right side: theme toggle and auth */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Desktop auth */}
          <div className="hidden md:flex items-center">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ''} alt={session.user?.name || 'User'} />
                      <AvatarFallback>{getInitials(session.user?.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="secondary" className="rounded-full">
                <Link href="/signin">Sign in</Link>
              </Button>
            )}
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 py-4">
                  <Link 
                    href="/"
                    className={`px-4 py-2 text-sm font-medium rounded-full ${
                      pathname === '/' ? 'bg-background' : ''
                    }`}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/products"
                    className={`px-4 py-2 text-sm font-medium rounded-full ${
                      pathname === '/products' ? 'bg-background' : ''
                    }`}
                  >
                    Products
                  </Link>
                  <Link 
                    href="/courses"
                    className={`px-4 py-2 text-sm font-medium rounded-full ${
                      pathname === '/courses' ? 'bg-background' : ''
                    }`}
                  >
                    Courses
                  </Link>
                  
                  <div className="px-4 py-2 mt-4 border-t">
                    {session ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={session.user?.image || ''} alt={session.user?.name || 'User'} />
                            <AvatarFallback>{getInitials(session.user?.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{session.user?.name}</p>
                            <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" asChild className="w-full rounded-full">
                            <Link href="/dashboard">Dashboard</Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => signOut()}
                            className="w-full rounded-full"
                          >
                            Sign out
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button asChild className="w-full rounded-full">
                        <Link href="/signin">Sign in</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}; 