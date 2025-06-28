'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getCourses, getHeroSection, getFeatures, getFeaturedCourses, getTestimonials} from '../services/academyServices'
import Hero from '../components/Hero'
import CourseCard from '../components/CourseCard'

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
  const [heroData, setHeroData] = useState<any>(null);
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.allSettled([
          getHeroSection(),
          getFeatures(),
          getCourses(),
          getFeaturedCourses(),
          getTestimonials(),
        ]);
        
        // Extract data from successful promises
        const [hero, feat, courses, featuredCourses, test] = results.map(result => 
          result.status === 'fulfilled' ? result.value : null
        );
        
        setHeroData(hero);
        setFeatures(feat);
        console.log(courses);
        courses?.length > 0 && setAllCourses(courses);
        setFeaturedCourses(featuredCourses);
        setTestimonials(test);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {heroData && <Hero data={heroData} />}

      {/* Featured Courses */}
      <div className="bg-background py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Featured Courses
            </h2>
            <p className="mt-2 text-lg leading-8 text-foreground-secondary">
              Comprehensive preparation programs designed to help you succeed in defence examinations.
            </p>
          </motion.div>
          {featuredCourses?.length > 0 && <motion.div 
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
                  <CourseCard course={course} />
                </motion.div>
              );
            })}
          </motion.div>}
        </div>
      </div>

      {/* Courses Section */}
      {allCourses?.length > 0 && <section className="bg-background-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-foreground">
            All Courses
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allCourses?.map((course) => {
              if (!course?.name) return null;
              return (
                <CourseCard 
                  key={course.name} 
                  course={course} 
                />
              );
            })}
          </div>
        </div>
      </section>}
      {/* Features Section */}
      {features?.length > 0 && <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why Choose Us</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features?.map((feature) => {
              if (!feature?.title) return null;
              return (
                <div key={feature.title} className="rounded-lg bg-background-tertiary p-6 text-center border border-border">
                  <h3 className="mb-2 text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-foreground-secondary">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>}

      {/* Testimonials Section */}
      {testimonials?.length > 0 && <div className="bg-background-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">What Our Students Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials?.map((testimonial) => {
              if (!testimonial?.name) return null;
              return (
                <div key={testimonial.name} className="rounded-lg bg-background p-6 shadow-brand border border-border">
                  <p className="mb-4 text-foreground-secondary">{testimonial.content}</p>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-foreground-tertiary">{testimonial.role}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>}

      {/* Contact Section */}
      <section className="bg-gradient-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-4xl font-bold">Contact Us</h2>
          <p className="mb-8 text-xl">
            Ready to start your journey? Get in touch with us today!
          </p>
          <a
            href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
            className="inline-block rounded-full bg-accent-500 px-8 py-3 text-lg font-semibold text-gray-900 transition-colors hover:bg-accent-600 shadow-accent"
          >
            Call Now
          </a>
        </div>
      </section>
    </main>
  );
}