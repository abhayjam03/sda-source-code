'use client'

import { useEffect, useState } from 'react';
import { getAcademyInfo } from '@/services/academyService';

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
];

const stats = [
  { id: 1, name: 'Students Enrolled', value: '500+' },
  { id: 2, name: 'Success Rate', value: '85%' },
  { id: 3, name: 'Years of Experience', value: '10+' },
  { id: 4, name: 'Expert Faculty', value: '15+' },
];

export default function AboutPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [academyInfo, setAcademyInfo] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await getAcademyInfo();
        setAcademyInfo(info);
      } catch (error) {
        console.error('Error fetching academy info:', error);
      }
    };
    fetchData();
    setHasMounted(true);
  }, []);

  if (!hasMounted || !academyInfo) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mx-auto max-w-2xl text-lg">Learn more about our academy and our commitment to excellence in defence coaching.</p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-lg text-foreground-secondary">{academyInfo.overview}</p>
          <p className="text-lg text-foreground-secondary">
            Contact us at: <a href={`tel:${academyInfo.contact}`} className="text-accent-500 hover:text-accent-600 transition-colors">{academyInfo.contact}</a>
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-background-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="text-3xl font-bold text-accent-500">{stat.value}</p>
                <p className="mt-2 text-foreground-secondary">{stat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why Choose Surya Defence Academy</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-background-tertiary p-6 text-center border border-border">
              <div className="mb-4 mx-auto h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Expert Faculty</h3>
              <p className="text-foreground-secondary">Learn from experienced defence personnel and subject matter experts.</p>
            </div>
            <div className="rounded-lg bg-background-tertiary p-6 text-center border border-border">
              <div className="mb-4 mx-auto h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Proven Success</h3>
              <p className="text-foreground-secondary">High success rate with students placed in various defence services.</p>
            </div>
            <div className="rounded-lg bg-background-tertiary p-6 text-center border border-border">
              <div className="mb-4 mx-auto h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Personal Attention</h3>
              <p className="text-foreground-secondary">Small batch sizes ensuring individual attention and guidance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 