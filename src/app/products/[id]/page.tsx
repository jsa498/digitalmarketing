'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { ArrowLeft, Bookmark, Check, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

async function getProduct(id: string) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

async function checkPurchaseStatus(id: string) {
  const res = await fetch(`/api/products/${id}/check-purchase`);
  if (!res.ok) {
    return { purchased: false };
  }
  return res.json();
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchased, setPurchased] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const productData = await getProduct(params.id);
        setProduct(productData);
        
        if (status === 'authenticated') {
          const { purchased } = await checkPurchaseStatus(params.id);
          setPurchased(purchased);
        }
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.id, status]);

  const handleCheckout = async () => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    setCheckoutLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: params.id,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          console.error('Stripe checkout error:', error);
          setError('Payment failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Payment failed. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto py-16 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="h-80 rounded-2xl bg-muted"></div>
            <div>
              <div className="h-12 bg-muted rounded w-3/4 mb-6"></div>
              <div className="h-4 bg-muted rounded w-full mb-3"></div>
              <div className="h-4 bg-muted rounded w-full mb-3"></div>
              <div className="h-4 bg-muted rounded w-2/3 mb-10"></div>
              <div className="h-12 bg-muted rounded w-full mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto py-16 px-4">
        <div className="bg-destructive/10 text-destructive p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Error Loading Product</h2>
          <p>{error}</p>
          <Link href="/products" className="inline-flex items-center gap-2 text-primary mt-4 hover:underline">
            <ArrowLeft size={16} /> Return to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container max-w-6xl mx-auto py-16 px-4">
        <div className="bg-card p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={16} /> Browse all products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-background min-h-screen pb-16">
      {/* Navigation */}
      <div className="container max-w-6xl mx-auto pt-8 px-4">
        <Link href="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
      
      {/* Product Content */}
      <div className="container max-w-6xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative rounded-2xl overflow-hidden bg-muted h-full min-h-[320px]">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-20 h-20 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.title}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                <Bookmark size={14} /> Digital Product
              </span>
            </div>
            
            <p className="text-muted-foreground text-lg mb-8">{product.description}</p>
            
            <div className="mt-auto">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold">${(product.price / 100).toFixed(2)}</span>
                {purchased && (
                  <span className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                    <Check size={14} /> Purchased
                  </span>
                )}
              </div>
              
              {purchased ? (
                <div className="space-y-4">
                  <RainbowButton
                    variant="dark"
                    className="w-full flex items-center justify-center gap-2 py-6 text-lg"
                    onClick={() => window.open(product.pdfUrl, '_blank')}
                  >
                    <Bookmark size={20} /> Access Resource
                  </RainbowButton>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    You already own this product. Click above to access your resource.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <RainbowButton
                    variant="dark"
                    className="w-full flex items-center justify-center gap-2 py-6 text-lg"
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <ShoppingCart size={20} /> Purchase Now
                      </>
                    )}
                  </RainbowButton>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    Secure checkout powered by Stripe. You'll get immediate access after purchase.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-24 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">What You'll Get</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary/80 to-primary/20 rounded-full mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card hover:bg-card/90 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Comprehensive Guide</h3>
              <p className="text-muted-foreground">Detailed PDF resource with clear explanations and practical examples.</p>
            </div>
            
            <div className="bg-card hover:bg-card/90 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Access</h3>
              <p className="text-muted-foreground">Download immediately after purchase. No waiting period or delays.</p>
            </div>
            
            <div className="bg-card hover:bg-card/90 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Free Updates</h3>
              <p className="text-muted-foreground">Receive all future updates at no additional cost.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 