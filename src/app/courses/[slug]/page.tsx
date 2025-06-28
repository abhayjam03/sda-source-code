'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCourses } from '@/services/mock';
import { Course } from '@/types/academy';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const courses = await getCourses();
        const foundCourse = courses.find(c => c.title.toLowerCase().replace(/\s+/g, '-') === slug);
        if (!foundCourse) {
          router.push('/404');
          return;
        }
        setCourse(foundCourse);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchData();
    setHasMounted(true);
  }, [slug, router]);

  if (!hasMounted || !course) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{course.title}</h1>
          <p className="mx-auto max-w-2xl text-lg">Learn about our comprehensive course structure and exam pattern.</p>
        </div>
      </div>

      {/* Course Details Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-lg text-gray-700">{course.description}</p>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Exam Pattern</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Mode:</strong> {course.examPattern.mode}</li>
              <li><strong>Duration:</strong> {course.examPattern.duration}</li>
              <li><strong>Total Questions:</strong> {course.examPattern.totalQuestions}</li>
              <li><strong>Total Marks:</strong> {course.examPattern.totalMarks}</li>
              <li><strong>Marking Scheme:</strong> {course.examPattern.markingScheme}</li>
              <li><strong>Passing Marks:</strong> {course.examPattern.passingMarks}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 