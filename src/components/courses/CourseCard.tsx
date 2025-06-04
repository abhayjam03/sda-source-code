'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PlaceholderImage from '@/components/common/PlaceholderImage'

interface CourseCardProps {
  id: string
  title: string
  description: string
  image: string
  href: string
  duration?: string
  level?: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function CourseCard({
  title,
  description,
  image,
  href,
  duration,
  level
}: CourseCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex-shrink-0 relative">
        <PlaceholderImage
          src={image}
          alt={title}
          width={500}
          height={300}
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-8">
        <div className="flex-1">
          <Link href={href} className="block">
            <h3 className="text-xl font-bold text-secondary-900 mb-4 hover:text-primary-600 transition-colors duration-200">
              {title}
            </h3>
            <p className="text-base text-secondary-800 leading-relaxed">
              {description}
            </p>
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-secondary-100 pt-6">
          <div className="flex items-center space-x-6 text-sm">
            {duration && (
              <span className="flex items-center text-secondary-800">
                <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {duration}
              </span>
            )}
            {level && (
              <span className="flex items-center text-secondary-800">
                <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {level}
              </span>
            )}
          </div>
          <Link
            href={href}
            className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            Learn more
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  )
} 