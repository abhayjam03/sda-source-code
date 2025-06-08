import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const features = [
  {
    name: 'Comprehensive Syllabus Coverage',
    description: 'Complete coverage of NDA syllabus including Mathematics, General Ability Test, and English.',
  },
  {
    name: 'Expert Faculty',
    description: 'Learn from experienced defence personnel and subject matter experts.',
  },
  {
    name: 'Regular Mock Tests',
    description: 'Weekly mock tests to evaluate your progress and identify areas for improvement.',
  },
  {
    name: 'Study Material',
    description: 'Comprehensive study material and practice questions designed by experts.',
  },
  {
    name: 'Doubt Clearing Sessions',
    description: 'Regular doubt clearing sessions to ensure complete understanding of concepts.',
  },
  {
    name: 'Personality Development',
    description: 'Focus on overall personality development through group discussions and activities.',
  },
]

const curriculum = [
  {
    title: 'Mathematics',
    topics: [
      'Algebra',
      'Matrices and Determinants',
      'Trigonometry',
      'Analytical Geometry',
      'Differential Calculus',
      'Integral Calculus',
      'Vector Algebra',
      'Statistics and Probability',
    ],
  },
  {
    title: 'General Ability Test',
    topics: [
      'English',
      'General Knowledge',
      'Physics',
      'Chemistry',
      'Biology',
      'History',
      'Geography',
      'Current Affairs',
    ],
  },
  {
    title: 'Physical Training',
    topics: [
      'Running',
      'Push-ups',
      'Sit-ups',
      'Pull-ups',
      'Swimming',
      'Obstacle Course',
    ],
  },
]

export default function NDAFoundationPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="bg-white">
        {/* Header */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20 pt-14">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
                NDA Foundation Course
              </h1>
              <p className="mt-6 text-lg leading-8 text-secondary-600">
                Comprehensive preparation program for NDA entrance examination with expert guidance and proven success rate.
              </p>
            </div>
          </div>
        </div>

        {/* Course Overview */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">Course Overview</h2>
              <p className="mt-6 text-lg leading-8 text-secondary-600">
                Our NDA Foundation Course is designed to provide comprehensive preparation for the National Defence Academy entrance examination. The course covers all aspects of the examination, including written test preparation, physical training, and personality development.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-secondary-900">
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-secondary-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="bg-secondary-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">Course Curriculum</h2>
              <p className="mt-6 text-lg leading-8 text-secondary-600">
                Our curriculum is designed to cover all aspects of the NDA examination, ensuring comprehensive preparation for success.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-3">
              {curriculum.map((section) => (
                <div key={section.title} className="flex flex-col">
                  <h3 className="text-xl font-semibold leading-7 text-secondary-900">{section.title}</h3>
                  <ul role="list" className="mt-6 space-y-3">
                    {section.topics.map((topic) => (
                      <li key={topic} className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-primary-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm leading-6 text-secondary-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">Ready to Start Your Journey?</h2>
              <p className="mt-6 text-lg leading-8 text-secondary-600">
                Join our NDA Foundation Course and take the first step towards your dream of serving the nation.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/contact"
                  className="btn btn-primary px-6 py-3"
                >
                  Enroll Now
                </Link>
                <Link
                  href="/courses"
                  className="text-sm font-semibold leading-6 text-secondary-900"
                >
                  View Other Courses <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 