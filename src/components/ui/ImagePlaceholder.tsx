'use client'

import { motion } from 'framer-motion'

interface ImagePlaceholderProps {
  className?: string
}

export default function ImagePlaceholder({ className = '' }: ImagePlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-secondary-100 ${className}`}
    >
      <svg
        className="w-full h-full text-secondary-300"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="300" fill="currentColor" fillOpacity="0.1" />
        <path
          d="M200 120C211.046 120 220 111.046 220 100C220 88.9543 211.046 80 200 80C188.954 80 180 88.9543 180 100C180 111.046 188.954 120 200 120Z"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <path
          d="M240 180C240 180 220 160 200 160C180 160 160 180 160 180"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M120 140H280M120 200H280"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
} 