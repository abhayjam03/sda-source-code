'use client'

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/courses/CourseCard";

const courses = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development including HTML, CSS, and JavaScript. Build responsive websites and understand modern web development practices.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    href: '/courses/web-development',
    duration: '12 weeks',
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Master modern JavaScript concepts including ES6+, async programming, and advanced patterns. Build complex applications with confidence.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    href: '/courses/advanced-javascript',
    duration: '8 weeks',
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'React Development',
    description: 'Learn React from the ground up. Build modern, interactive user interfaces and understand React best practices and patterns.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    href: '/courses/react-development',
    duration: '10 weeks',
    level: 'Intermediate'
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    description: 'Master server-side JavaScript with Node.js. Build scalable backend applications and RESTful APIs.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    href: '/courses/nodejs-backend',
    duration: '8 weeks',
    level: 'Advanced'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-b from-primary-100/20 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div 
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
              Our Courses
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-800 max-w-2xl mx-auto">
              Comprehensive preparation programs designed to help you succeed in defence examinations.
              Choose the course that best fits your career goals.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-7xl"
          >
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
                Featured Programs
              </h2>
              <p className="mt-4 text-lg leading-8 text-secondary-800 max-w-xl mx-auto">
                Choose from our wide range of courses designed to help you succeed in your career.
              </p>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 