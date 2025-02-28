'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push(`/api/auth/signin?callbackUrl=/checkout?productId=${productId}`);
    }

    // Fetch product data
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          // Handle error - product not found
          router.push('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // For now, use mock data if API fails
        setProduct({
          id: productId || '1',
          title: 'Digital Marketing Guide',
          description: 'Comprehensive guide to digital marketing strategies and techniques.',
          price: 29.99,
        });
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, router, status]);

  const handleCheckout = async () => {
    if (!session?.user) {
      router.push(`/api/auth/signin?callbackUrl=/checkout?productId=${productId}`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setIsLoading(false);
    }
  };

  if (status === 'loading' || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
          <p className="mt-2 text-lg text-gray-600">Complete your purchase to access the product</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between">
              <span className="text-lg font-medium text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
            </div>
          </div>

          <div className="p-6">
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Processing...' : `Pay $${product.price}`}
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                By completing this purchase, you agree to our{' '}
                <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 