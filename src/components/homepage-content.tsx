'use client';

import Link from 'next/link';
import { useTheme } from './theme-provider';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TrendingUp, ShoppingBag, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CourseCarousel from './course-carousel';

// Using local Product interface that matches the actual structure in the application
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
  pdfUrl: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function HomePageContent({ featuredProducts, courses }: { 
  featuredProducts: Product[];
  courses: Product[];
}) {
  const { theme } = useTheme(); // Use the theme from the theme provider
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 py-20 md:py-28 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground mb-8">
                DevFlow
                <br />
                Resources & Tools
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Helping you navigate the landscape with professional resources, tools, and guidance for your marketing journey.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <RainbowButton
                  href="/courses"
                  variant="dark"
                  className="text-lg px-8 py-6 rounded-xl transition-transform hover:scale-105"
                >
                  View Products
                </RainbowButton>
                <RainbowButton
                  href="/courses"
                  variant="light"
                  className="text-lg px-8 py-6 rounded-xl transition-transform hover:scale-105"
                >
                  Browse Resources
                </RainbowButton>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-20 dark:opacity-10">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 to-primary blur-3xl" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      {courses.length > 0 && (
        <div className="py-16 bg-gradient-to-b from-background to-background/95">
          <div className="container relative z-10">
            <div className="flex flex-col items-center mb-16 relative">
              <div className="absolute -top-10 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
              <span className="relative z-10 text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4">FEATURED</span>
              <h2 className="text-4xl md:text-5xl font-bold text-center max-w-3xl leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground">
                Top Marketing Resources
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary/80 to-primary/20 rounded-full mt-6"></div>
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl text-center mx-auto">
                Our most popular tools and resources to help you succeed in your marketing efforts.
              </p>
            </div>

            {/* Scrollable courses container instead of grid */}
            <div className="relative">
              <div className="overflow-x-auto pb-4 mb-8 -mx-4 px-4 hide-scrollbar scroll-smooth touch-pan-x">
                <div className="flex space-x-6">
                  {courses.map((product) => (
                    <div 
                      key={product.id}
                      className="group relative bg-card hover:bg-card/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 flex-shrink-0 w-80"
                    >
                      <div className="relative h-52 w-full overflow-hidden">
                        {product.imageUrl ? (
                          <img 
                            src={product.imageUrl} 
                            alt={product.title} 
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-muted group-hover:bg-muted/80 transition-colors">
                            <svg
                              className="h-16 w-16 text-muted-foreground/50"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col h-56">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          <Link href={`/courses/${product.id}`} className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                            {product.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow">
                          {product.description}
                        </p>
                        <div className="mt-auto">
                          <Link
                            href={`/courses/${product.id}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          >
                            View Details <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Benefits</h2>
            <p className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
              Why Choose Our Resources
            </p>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Our marketing tools and resources are designed to help you grow your online presence effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-background to-muted p-8 transition-all hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Proven Growth Strategies</h3>
                <p className="text-muted-foreground">
                  Resources backed by data and industry best practices to help you achieve measurable results.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-background to-muted p-8 transition-all hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Every resource is carefully crafted to the highest standards by industry experts.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-background to-muted p-8 transition-all hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Continuous Learning</h3>
                <p className="text-muted-foreground">
                  Stay ahead with regularly updated content and resources reflecting the latest trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-background py-24">
        <div className="container">
          <div className="relative z-10 bg-gradient-to-r from-background via-background/80 to-background rounded-3xl p-12 mx-auto max-w-5xl shadow-lg dark:shadow-[0_8px_30px_rgba(255,255,255,0.06)] dark:border dark:border-zinc-800/40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left max-w-xl">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground">
                  Ready to level up your marketing?
                </h2>
                <p className="mt-6 text-xl text-muted-foreground">
                  Explore our premium resources today and transform your online presence.
                </p>
              </div>
              <div className="flex-shrink-0">
                <RainbowButton
                  href="/courses"
                  variant={theme === 'light' ? 'dark' : 'light'} 
                  className="text-lg px-8 py-6 rounded-xl transition-transform hover:scale-105"
                >
                  Browse Products
                </RainbowButton>
              </div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-20 dark:opacity-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-primary/50 blur-3xl" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
          </div>
        </div>
      </div>
    </div>
  );
} 