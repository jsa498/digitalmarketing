import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Mock data for featured courses
  const featuredCourses = [
    {
      id: '1',
      title: 'Digital Marketing Fundamentals',
      description: 'Learn the basics of digital marketing, including SEO, social media, and content marketing.',
      price: 99.99,
      imageUrl: '/images/course-1.jpg',
    },
    {
      id: '2',
      title: 'Social Media Marketing Mastery',
      description: 'Master the art of social media marketing across all major platforms.',
      price: 129.99,
      imageUrl: '/images/course-2.jpg',
    },
    {
      id: '3',
      title: 'SEO Optimization Strategies',
      description: 'Learn advanced SEO techniques to rank higher in search engines.',
      price: 149.99,
      imageUrl: '/images/course-3.jpg',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Master Digital Marketing Skills
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Learn from industry experts and transform your career with our comprehensive digital marketing courses.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-8"
                >
                  Browse Courses
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-8"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96">
              <div className="absolute inset-0 bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                {/* Replace with actual image when available */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Digital Marketing Course Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Courses
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most popular digital marketing courses designed to help you succeed in today's digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="relative h-48 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Course Image
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-indigo-600">${course.price}</span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our students who have transformed their careers with our digital marketing courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                  JD
                </div>
                <div>
                  <h4 className="text-lg font-semibold">John Doe</h4>
                  <p className="text-gray-600">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The digital marketing fundamentals course completely transformed my approach to online marketing. I've seen a 40% increase in our company's online engagement since applying these strategies."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                  JS
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Jane Smith</h4>
                  <p className="text-gray-600">Freelance Marketer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a freelancer, the social media marketing course gave me the skills to offer comprehensive services to my clients. I've been able to double my rates and still have a waiting list of clients."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                  RJ
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Robert Johnson</h4>
                  <p className="text-gray-600">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The SEO course helped me understand how to rank my small business website. We're now on the first page for our main keywords, and our organic traffic has increased by 200%."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
            Ready to Start Your Digital Marketing Journey?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of students who have transformed their careers with our comprehensive digital marketing courses.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:text-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
