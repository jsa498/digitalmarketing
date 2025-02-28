import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. You now have access to the product.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Product:</span>
              <span className="font-medium text-gray-900">Digital Marketing Resource</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">$99.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">ORD-{Math.floor(Math.random() * 1000000)}</span>
            </div>
          </div>
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/products"
              className="block w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded"
            >
              Browse More Products
            </Link>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <p>
              A confirmation email has been sent to your email address.
              If you have any questions, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 