'use client'

import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const features = [
  {
    name: 'Expert Faculty',
    description: 'Our team comprises experienced defence personnel and subject matter experts who provide comprehensive guidance.',
  },
  {
    name: 'Comprehensive Study Material',
    description: 'Meticulously curated study material that covers all aspects of defence examinations.',
  },
  {
    name: 'Personality Development',
    description: 'Regular sessions focusing on enhancing interpersonal skills through group discussions and activities.',
  },
  {
    name: 'Personal Mentorship',
    description: 'One-on-one mentoring by experienced defence officers to help you achieve your goals.',
  },
  {
    name: 'Weekly Mock Tests',
    description: 'Regular assessments and practice tests to evaluate your progress and identify areas for improvement.',
  },
  {
    name: 'Library Facility',
    description: 'Well-equipped library with extensive collection of books and resources for self-study.',
  },
]

const stats = [
  { id: 1, name: 'Students Trained', value: '10,000+' },
  { id: 2, name: 'Success Rate', value: '60%+' },
  { id: 3, name: 'Years of Experience', value: '15+' },
  { id: 4, name: 'Expert Faculty', value: '25+' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="bg-white">
        {/* Header */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20 pt-14">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
                About Us
              </h1>
              <p className="mt-6 text-lg leading-8 text-secondary-600">
                Premier Defence Coaching Institute committed to shaping the future of defence aspirants through quality education and training.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-secondary-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-secondary-900 sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">Why Choose Us</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
                Everything you need to succeed
              </p>
              <p className="mt-6 text-lg leading-8 text-secondary-600">
                We provide comprehensive training and support to help you achieve your dream of joining the defence forces.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
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
              </dl>
            </div>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="bg-secondary-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">Our Mission & Vision</h2>
              <p className="mt-6 text-lg leading-8 text-secondary-600">
                We are dedicated to empowering aspiring candidates to achieve their dreams of joining the armed forces. Our state-of-the-art facilities and nurturing learning environment ensure accessibility and success for all.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-secondary-900">Our Mission</h3>
                <p className="mt-6 text-lg leading-8 text-secondary-600">
                  To provide quality education and training to defence aspirants, preparing them for successful careers in the armed forces through comprehensive coaching and personal development.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-secondary-900">Our Vision</h3>
                <p className="mt-6 text-lg leading-8 text-secondary-600">
                  To be the leading defence coaching institute in India, known for excellence in training and producing successful defence officers who serve the nation with pride and honor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 