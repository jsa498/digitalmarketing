import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log({ admin });

  // Create regular user
  const userPassword = await hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Test User',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log({ user });

  // Create courses
  const digitalMarketingFundamentals = await prisma.course.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      title: 'Digital Marketing Fundamentals',
      description: 'Learn the basics of digital marketing, including SEO, social media, and content marketing.',
      price: 99.99,
      imageUrl: '/images/course-1.jpg',
      featured: true,
      published: true,
      sections: {
        create: [
          {
            title: 'Introduction to Digital Marketing',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'What is Digital Marketing?',
                  content: 'Digital marketing encompasses all marketing efforts that use an electronic device or the internet...',
                  order: 1,
                },
                {
                  title: 'The Digital Marketing Landscape',
                  content: 'The digital marketing landscape is constantly evolving...',
                  order: 2,
                },
              ],
            },
          },
          {
            title: 'Search Engine Optimization',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'SEO Fundamentals',
                  content: 'Search Engine Optimization (SEO) is the practice of increasing the quantity and quality of traffic to your website...',
                  order: 1,
                },
                {
                  title: 'On-Page SEO Techniques',
                  content: 'On-page SEO involves optimizing elements on your website...',
                  order: 2,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const socialMediaMarketing = await prisma.course.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      title: 'Social Media Marketing Mastery',
      description: 'Master the art of social media marketing across all major platforms.',
      price: 129.99,
      imageUrl: '/images/course-2.jpg',
      featured: true,
      published: true,
      sections: {
        create: [
          {
            title: 'Social Media Strategy',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Developing a Social Media Strategy',
                  content: 'A successful social media strategy starts with clear goals...',
                  order: 1,
                },
                {
                  title: 'Identifying Your Target Audience',
                  content: 'Understanding your target audience is crucial for social media success...',
                  order: 2,
                },
              ],
            },
          },
          {
            title: 'Platform-Specific Strategies',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'Facebook Marketing',
                  content: 'Facebook remains the largest social media platform...',
                  order: 1,
                },
                {
                  title: 'Instagram Marketing',
                  content: 'Instagram is a visual platform perfect for brands with strong visual content...',
                  order: 2,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const seoOptimization = await prisma.course.upsert({
    where: { id: '3' },
    update: {},
    create: {
      id: '3',
      title: 'SEO Optimization Strategies',
      description: 'Learn advanced SEO techniques to rank higher in search engines.',
      price: 149.99,
      imageUrl: '/images/course-3.jpg',
      featured: true,
      published: true,
      sections: {
        create: [
          {
            title: 'Technical SEO',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Site Architecture and Crawlability',
                  content: 'Technical SEO focuses on improving the technical aspects of your website...',
                  order: 1,
                },
                {
                  title: 'Mobile Optimization',
                  content: 'With mobile-first indexing, Google predominantly uses the mobile version of the content...',
                  order: 2,
                },
              ],
            },
          },
          {
            title: 'Link Building',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'Link Building Fundamentals',
                  content: 'Link building is the process of acquiring hyperlinks from other websites to your own...',
                  order: 1,
                },
                {
                  title: 'Advanced Link Building Strategies',
                  content: 'Beyond the basics, advanced link building involves...',
                  order: 2,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log({ digitalMarketingFundamentals, socialMediaMarketing, seoOptimization });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 