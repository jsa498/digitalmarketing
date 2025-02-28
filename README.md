# Digital Marketing Courses Platform

A Next.js application for selling digital marketing courses online. This platform allows users to browse courses, make purchases using Stripe, and access course content after purchase.

## Features

- **User Authentication**: Sign up, sign in, and user profiles
- **Course Catalog**: Browse and search for digital marketing courses
- **Course Details**: View detailed information about each course
- **Secure Payments**: Purchase courses using Stripe
- **User Dashboard**: Access purchased courses and track progress
- **Admin Panel**: Manage courses, users, and sales
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account for payment processing

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/digitalmarketing.git
   cd digitalmarketing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/digitalmarketing?schema=public"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-key"

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Stripe
   STRIPE_PUBLIC_KEY="your-stripe-public-key"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting up Stripe Webhooks

To handle Stripe webhook events (payment confirmations, etc.), you need to set up a webhook endpoint:

1. Install the Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login to your Stripe account:
   ```bash
   stripe login
   ```
3. Forward webhook events to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
4. Copy the webhook signing secret and add it to your `.env` file as `STRIPE_WEBHOOK_SECRET`.

## Deployment

### Deploy to Vercel

The easiest way to deploy this application is using Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure the environment variables
4. Deploy

### Database Setup for Production

1. Set up a PostgreSQL database (e.g., using Supabase, Railway, or any other provider)
2. Update the `DATABASE_URL` in your environment variables
3. Run the migrations:
   ```bash
   npx prisma migrate deploy
   ```

## Project Structure

- `/src/app`: Next.js App Router pages and API routes
- `/src/components`: Reusable React components
- `/src/lib`: Utility functions and shared code
- `/src/hooks`: Custom React hooks
- `/prisma`: Prisma schema and migrations

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)
