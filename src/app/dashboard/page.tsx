import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, ShoppingBasket, Download } from 'lucide-react';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/api/auth/signin');
  }
  
  // Get user's purchased products
  const purchases = await prisma.purchase.findMany({
    where: {
      userId: session.user.id,
      status: 'completed',
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative py-8 md:py-12 overflow-hidden mb-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-10 dark:opacity-5">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 to-primary blur-3xl" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground mb-4">
            My Digital Products
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary/80 to-primary/20 rounded-full mb-4"></div>
          <p className="text-muted-foreground">Manage and access your purchased digital marketing resources</p>
        </div>
      </div>
      
      {purchases.length === 0 ? (
        <Card className="border border-border/40 shadow-lg">
          <CardHeader>
            <CardTitle>You haven't purchased any products yet.</CardTitle>
            <CardDescription>
              Browse our selection of digital marketing products and courses to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Our products include guides, templates, and tools to help you accelerate your digital marketing efforts.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="w-full sm:w-auto hover:text-primary-foreground">
              <Link href="/products" className="inline-flex items-center gap-2">
                <ShoppingBasket className="h-4 w-4" />
                Browse Products
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto hover:text-accent-foreground">
              <Link href="/courses" className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Browse Courses
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map((purchase) => (
            <Card key={purchase.id} className="group overflow-hidden border border-border/40 hover:border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/5">
              {purchase.product.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={purchase.product.imageUrl} 
                    alt={purchase.product.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader className="p-5">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {purchase.product.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {purchase.product.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-5 pt-0 flex justify-between">
                <Button asChild size="sm" variant="outline" className="gap-2 hover:text-accent-foreground">
                  <a href={purchase.product.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
                
                <Button asChild size="sm" variant="ghost" className="gap-1 hover:text-accent-foreground">
                  <Link href={`/products/${purchase.product.id}`}>
                    View Details <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {purchases.length > 0 && (
        <div className="mt-12 flex justify-center space-x-4">
          <Button asChild variant="outline" className="hover:text-accent-foreground">
            <Link href="/products" className="inline-flex items-center gap-2">
              <ShoppingBasket className="h-4 w-4" />
              Browse More Products
            </Link>
          </Button>
          <Button asChild variant="outline" className="hover:text-accent-foreground">
            <Link href="/courses" className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Browse Courses
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
} 