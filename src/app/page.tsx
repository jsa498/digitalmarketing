import prisma from '@/lib/prisma';
import HomePageContent from '../components/homepage-content';

export default async function Home() {
  // Get featured products
  const featuredProducts = await prisma.product.findMany({
    where: {
      featured: true,
      published: true,
    },
    take: 3,
  });

  return <HomePageContent featuredProducts={featuredProducts} />;
}
