'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
    redirect('/api/auth/signin');
  }

  // Mock purchased courses data - in a real app, this would be fetched from the database
  const purchasedCourses = [
    {
      id: '1',
      title: 'Digital Marketing Fundamentals',
      description: 'Learn the basics of digital marketing, including SEO, social media, and content marketing.',
      progress: 35,
      imageUrl: '/images/course-1.jpg',
      lastAccessed: '2023-10-15T14:30:00Z',
    },
    {
      id: '2',
      title: 'Social Media Marketing Mastery',
      description: 'Master the art of social media marketing across all major platforms.',
      progress: 68,
      imageUrl: '/images/course-2.jpg',
      lastAccessed: '2023-10-18T09:15:00Z',
    },
  ];

  // Mock certificates data
  const certificates = [
    {
      id: 'cert1',
      courseTitle: 'Email Marketing Campaigns',
      issueDate: '2023-09-10T00:00:00Z',
      certificateUrl: '/certificates/email-marketing.pdf',
    },
  ];

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back, {session?.user?.name || 'Student'}!
          </p>
        </div>

        {/* My Courses Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
            <Link
              href="/courses"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Browse More Courses
            </Link>
          </div>

          {purchasedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchasedCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <div className="relative h-48 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      Course Image
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{course.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/courses/${course.id}/learn`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 mb-4">You haven't purchased any courses yet.</p>
              <Link
                href="/courses"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        {/* Certificates Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Certificates</h2>
          
          {certificates.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {certificates.map((certificate) => (
                  <li key={certificate.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{certificate.courseTitle}</h3>
                        <p className="text-sm text-gray-500">
                          Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <a
                          href={certificate.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View
                        </a>
                        <a
                          href={certificate.certificateUrl}
                          download
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600">
                Complete a course to earn your first certificate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 