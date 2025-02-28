import Link from 'next/link';

export default function CoursesPage() {
  // Mock data for courses
  const courses = [
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
    {
      id: '4',
      title: 'Content Marketing Excellence',
      description: 'Create compelling content that drives engagement and conversions.',
      price: 119.99,
      imageUrl: '/images/course-4.jpg',
    },
    {
      id: '5',
      title: 'Email Marketing Campaigns',
      description: 'Build effective email marketing campaigns that convert subscribers into customers.',
      price: 89.99,
      imageUrl: '/images/course-5.jpg',
    },
    {
      id: '6',
      title: 'Google Ads Mastery',
      description: 'Learn how to create and optimize Google Ads campaigns for maximum ROI.',
      price: 159.99,
      imageUrl: '/images/course-6.jpg',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Digital Marketing Courses
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive selection of digital marketing courses designed to help you succeed in today's digital landscape.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
              <select
                id="sort"
                name="sort"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
              <select
                id="category"
                name="category"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>All Categories</option>
                <option>SEO</option>
                <option>Social Media</option>
                <option>Content Marketing</option>
                <option>Email Marketing</option>
                <option>Paid Advertising</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
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
      </div>
    </div>
  );
} 