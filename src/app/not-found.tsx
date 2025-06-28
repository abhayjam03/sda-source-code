'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Suspense } from 'react'

function NotFoundContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background-secondary to-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-background rounded-2xl shadow-brand-lg p-8 border border-border">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-foreground-secondary mb-8">
            The page you're looking for seems to have gone on a secret mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-background-tertiary hover:bg-background-secondary text-foreground rounded-lg transition-colors border border-border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-background-secondary to-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-background rounded-2xl shadow-brand-lg p-8 border border-border">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              404 - Page Not Found
            </h1>
            <p className="text-foreground-secondary mb-8">
              The page you're looking for seems to have gone on a secret mission.
            </p>
          </div>
        </div>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  )
} 