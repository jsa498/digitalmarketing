import Link from 'next/link';

interface CoursePageProps {
  params: {
    id: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const { id } = params;

  // Mock course data - in a real app, this would come from the database
  const course = {
    id,
    title: 'Digital Marketing Fundamentals',
    description: 'Learn the basics of digital marketing, including SEO, social media, and content marketing.',
    longDescription: `
      This comprehensive course will teach you everything you need to know about digital marketing. 
      From search engine optimization (SEO) to social media marketing, content creation, and analytics, 
      you'll gain the skills needed to create and implement effective digital marketing strategies.
      
      Whether you're a business owner looking to promote your products or services online, 
      or aspiring to start a career in digital marketing, this course provides the foundation you need to succeed.
    `,
    price: 99.99,
    imageUrl: '/images/course-1.jpg',
    instructor: {
      name: 'Jane Smith',
      bio: 'Digital Marketing Expert with over 10 years of experience working with Fortune 500 companies.',
      imageUrl: '/images/instructor-1.jpg',
    },
    sections: [
      {
        id: 's1',
        title: 'Introduction to Digital Marketing',
        lessons: [
          { id: 'l1', title: 'What is Digital Marketing?', duration: '10:15' },
          { id: 'l2', title: 'The Digital Marketing Landscape', duration: '15:22' },
          { id: 'l3', title: 'Setting Your Digital Marketing Goals', duration: '12:45' },
        ],
      },
      {
        id: 's2',
        title: 'Search Engine Optimization (SEO)',
        lessons: [
          { id: 'l4', title: 'SEO Fundamentals', duration: '18:30' },
          { id: 'l5', title: 'Keyword Research', duration: '22:15' },
          { id: 'l6', title: 'On-Page SEO Techniques', duration: '25:10' },
          { id: 'l7', title: 'Off-Page SEO Strategies', duration: '20:45' },
        ],
      },
      {
        id: 's3',
        title: 'Social Media Marketing',
        lessons: [
          { id: 'l8', title: 'Social Media Strategy', duration: '15:20' },
          { id: 'l9', title: 'Facebook Marketing', duration: '28:15' },
          { id: 'l10', title: 'Instagram Marketing', duration: '26:30' },
          { id: 'l11', title: 'Twitter and LinkedIn Strategies', duration: '22:45' },
        ],
      },
    ],
    reviews: [
      {
        id: 'r1',
        user: 'John Doe',
        rating: 5,
        comment: 'Excellent course! I learned so much about digital marketing and was able to apply the strategies to my business immediately.',
        date: '2023-10-15',
      },
      {
        id: 'r2',
        user: 'Sarah Johnson',
        rating: 4,
        comment: 'Very informative and well-structured. The instructor explains concepts clearly and provides practical examples.',
        date: '2023-09-22',
      },
      {
        id: 'r3',
        user: 'Michael Brown',
        rating: 5,
        comment: 'This course exceeded my expectations. The content is up-to-date and relevant to today\'s digital marketing landscape.',
        date: '2023-08-30',
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
                {course.title}
              </h1>
              <p className="text-xl mb-6">
                {course.description}
              </p>
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < 4.5 ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.585l-7.07 3.707 1.35-7.87-5.72-5.573 7.91-1.149L10 0l3.53 7.7 7.91 1.149-5.72 5.573 1.35 7.87L10 15.585z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-white">4.8 (120 reviews)</span>
              </div>
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full mr-3"
                  src={course.instructor.imageUrl || 'https://via.placeholder.com/40'}
                  alt={course.instructor.name}
                />
                <span>Instructor: {course.instructor.name}</span>
              </div>
            </div>
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white rounded-lg shadow-lg p-6 text-gray-900">
                <div className="text-3xl font-bold mb-4 text-indigo-600">${course.price}</div>
                <Link 
                  href={`/checkout?courseId=${id}`}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded mb-4 block text-center"
                >
                  Enroll Now
                </Link>
                <div className="text-sm text-gray-600 mb-4">
                  <div className="mb-2">✓ Full lifetime access</div>
                  <div className="mb-2">✓ 30-day money-back guarantee</div>
                  <div className="mb-2">✓ Access on mobile and desktop</div>
                  <div>✓ Certificate of completion</div>
                </div>
                <Link
                  href={`/checkout?courseId=${id}`}
                  className="w-full border border-indigo-600 text-indigo-600 font-bold py-2 px-4 rounded block text-center"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            {/* About This Course */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{course.longDescription}</p>
              </div>
            </div>

            {/* Course Content */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
              <div className="border rounded-lg overflow-hidden">
                {course.sections.map((section, index) => (
                  <div key={section.id} className="border-b last:border-b-0">
                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer">
                      <h3 className="text-lg font-medium text-gray-900">
                        Section {index + 1}: {section.title}
                      </h3>
                      <span className="text-sm text-gray-500">{section.lessons.length} lessons</span>
                    </div>
                    <div className="px-4 py-2">
                      {section.lessons.map((lesson) => (
                        <div key={lesson.id} className="py-2 border-b last:border-b-0 flex justify-between">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Reviews</h2>
              <div className="space-y-6">
                {course.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 15.585l-7.07 3.707 1.35-7.87-5.72-5.573 7.91-1.149L10 0l3.53 7.7 7.91 1.149-5.72 5.573 1.35 7.87L10 15.585z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-900 font-medium">{review.user}</span>
                      <span className="ml-2 text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            {/* Instructor Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instructor</h3>
              <div className="flex items-center mb-4">
                <img
                  className="h-16 w-16 rounded-full mr-4"
                  src={course.instructor.imageUrl || 'https://via.placeholder.com/64'}
                  alt={course.instructor.name}
                />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{course.instructor.name}</h4>
                  <p className="text-sm text-gray-500">Digital Marketing Expert</p>
                </div>
              </div>
              <p className="text-gray-600">{course.instructor.bio}</p>
            </div>

            {/* Course Includes */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">This Course Includes</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>12 hours of video content</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>25 downloadable resources</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Lifetime access</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Direct instructor support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 