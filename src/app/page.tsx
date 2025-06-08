'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/courses/CourseCard";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { featuredCourses } from "@/data/courses";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <motion.div 
            className="px-6 lg:px-0 lg:pt-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
                  Shape Your Future in Defence Forces
                </h1>
                <p className="mt-6 text-lg leading-8 text-secondary-600">
                  Join Pathankot's premier defence coaching institute for NDA, CDS, SSB, AFCAT, and more. Expert guidance, comprehensive study material, and proven success rate.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/courses"
                    className="btn btn-primary px-6 py-3"
                  >
                    Explore Courses
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-semibold leading-6 text-secondary-900 hover:text-primary-600 transition-colors duration-200"
                  >
                    Contact Us <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-primary-600/10 ring-1 ring-primary-50 md:-mr-20 lg:-mr-36" />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-primary-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-primary-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-secondary-900">
                      <div className="flex bg-secondary-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-secondary-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            Our Campus
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pt-6 pb-14">
                        <ImagePlaceholder className="h-[600px] w-full rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredCourses.map((course) => (
              <CourseCard key={course.id.toString()} {...course} id={course.id.toString()} />
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


