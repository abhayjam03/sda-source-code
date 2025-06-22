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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 py-16 text-white">
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
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features?.map((feature) => {
              if (!feature?.title) return null;
              return (
                <div key={feature.title} className="rounded-lg bg-gray-50 p-6 text-center">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              );
            })}
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