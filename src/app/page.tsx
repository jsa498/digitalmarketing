import prisma from '@/lib/prisma';
import HomePageContent from '../components/homepage-content';

export default async function Home() {
  // Get all published courses for the homepage display
  const courses = await prisma.product.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log(`Fetched ${courses.length} courses for homepage display`);

  // Pass all courses to the HomePageContent component
  // We're using the same courses for both featuredProducts and courses props
  // since we're displaying all courses in the featured section now
  return <HomePageContent featuredProducts={courses} courses={courses} />;
}
