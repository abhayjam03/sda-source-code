'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import CourseCard from "@/components/courses/CourseCard";
import { getCourses, getFeatures, getTestimonials } from '@/services/academyService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CoursesPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [crs, feat, test] = await Promise.all([
          getCourses(),
          getFeatures(),
          getTestimonials()
        ]);
        setCourses(crs);
        setFeatures(feat);
        setTestimonials(test);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Courses</h1>
          <p className="mx-auto max-w-2xl text-lg">Explore our comprehensive courses designed to prepare you for a successful career in defence services.</p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {courses?.map((course) => {
            if (!course?.title) return null;
            return (
              <motion.div
                key={course.title}
                variants={itemVariants}
              >
                <CourseCard 
                  course={course} 
                  id={course.title.toLowerCase().replace(/\s+/g, '-')} 
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-background-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why Choose Our Courses</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-background p-6 text-center border border-border">
              <div className="mb-4 mx-auto h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Comprehensive Curriculum</h3>
              <p className="text-foreground-secondary">Well-structured courses covering all aspects of defence examinations.</p>
            </div>
            <div className="rounded-lg bg-background p-6 text-center border border-border">
              <div className="mb-4 mx-auto h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Proven Success</h3>
              <p className="text-foreground-secondary">High success rate with students placed in various defence services.</p>
            </div>
            <div className="rounded-lg bg-background p-6 text-center border border-border">
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

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">What Our Students Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials?.map((testimonial) => {
              if (!testimonial?.name) return null;
              return (
                <div key={testimonial.name} className="rounded-lg bg-white p-6 shadow-lg">
                  <p className="mb-4 text-gray-700">{testimonial.content}</p>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 