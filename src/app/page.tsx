'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import CourseCard from '@/components/courses/CourseCard';
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { featuredCourses, allCourses } from "@/data/courses";
import Hero from '@/components/Hero';
import { getHeroSection, getFeatures, getTestimonials } from '@/services/academyService';

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

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [heroData, setHeroData] = useState<any>(null);
  const [features, setFeatures] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hero, feat, test] = await Promise.all([
          getHeroSection(),
          getFeatures(),
          getTestimonials()
        ]);
        setHeroData(hero);
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
    <main className="min-h-screen bg-gray-50">
      {heroData && <Hero data={heroData} />}
      
      {/* Featured Courses */}
      <div className="bg-white py-24 sm:py-32">
        <div className="container">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
              Our Featured Courses
            </h2>
            <p className="mt-2 text-lg leading-8 text-secondary-600">
              Comprehensive preparation programs designed to help you succeed in defence examinations.
            </p>
          </motion.div>
          <motion.div 
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredCourses?.map((course) => {
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
      </div>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            All Courses
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allCourses?.map((course) => {
              if (!course?.title) return null;
              return (
                <CourseCard 
                  key={course.title} 
                  course={course} 
                  id={course.title.toLowerCase().replace(/\s+/g, '-')} 
                />
              );
            })}
          </div>
        </div>
      </section>

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

      {/* Contact Section */}
      <section className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-4xl font-bold">Contact Us</h2>
          <p className="mb-8 text-xl">
            Ready to start your journey? Get in touch with us today!
          </p>
          <a
            href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
            className="inline-block rounded-full bg-red-600 px-8 py-3 text-lg font-semibold transition-colors hover:bg-red-700"
          >
            Call Now
          </a>
        </div>
      </section>
    </main>
  );
}