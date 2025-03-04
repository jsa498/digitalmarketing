'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Text animation variants for staggered animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Pulse animation for the dot
  const pulse = {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <main className="bg-background min-h-screen pb-16">
      {/* Hero section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-10 dark:opacity-5">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 to-primary blur-3xl" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
        </div>
        
        <div className="container relative z-10">
          <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Digital Marketing Products
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-primary/80 to-primary/20 rounded-full mb-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </div>
        </div>
      </div>
      
      {/* Coming Soon Content */}
      <div className="container mx-auto px-4 mt-8">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-card rounded-2xl overflow-hidden shadow-xl border border-border/50 p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary/5"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              <div className="relative z-10 text-center">
                <motion.div
                  className="flex items-center justify-center mb-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
                >
                  <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <motion.span 
                      className="absolute w-full h-full rounded-full bg-primary/20"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.7, 0, 0.7]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    ></motion.span>
                    <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6v6l4 2M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-4"
                    variants={item}
                  >
                    Coming Soon
                  </motion.h2>
                  
                  <motion.div className="flex items-center justify-center mb-4 gap-1" variants={item}>
                    <motion.span 
                      className="inline-block w-2 h-2 rounded-full bg-primary"
                      animate={pulse}
                    ></motion.span>
                    <span className="text-sm font-medium text-muted-foreground">In development</span>
                  </motion.div>
                  
                  <motion.p 
                    className="text-muted-foreground mb-8 max-w-xl mx-auto"
                    variants={item}
                  >
                    We're currently working on exciting new digital marketing products to help you grow your business. 
                    Check back soon or sign up to be notified when they're available.
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    variants={item}
                  >
                    <Link 
                      href="/courses"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Explore Our Courses <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link 
                      href="/"
                      className="inline-flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-full transition-colors"
                    >
                      Back to Home
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 