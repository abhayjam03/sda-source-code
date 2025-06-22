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
  { id: 1, name: 'Students Trained', value: '10,000+' },
  { id: 2, name: 'Success Rate', value: '60%+' },
  { id: 3, name: 'Years of Experience', value: '15+' },
  { id: 4, name: 'Expert Faculty', value: '25+' },
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mx-auto max-w-2xl text-lg">Learn more about our academy and our commitment to excellence in defence coaching.</p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-lg text-gray-700">{academyInfo.overview}</p>
          <p className="text-lg text-gray-700">
            Contact us at: <a href={`tel:${academyInfo.contact}`} className="text-red-600 hover:underline">{academyInfo.contact}</a>
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="text-3xl font-bold text-red-600">{stat.value}</p>
                <p className="mt-2 text-gray-600">{stat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Our Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.name}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 