'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SpaceShooter from '@/components/games/SpaceShooter'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

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
              className="mx-auto h-24 w-24 text-error-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Something went wrong!
          </h1>
          <p className="text-foreground-secondary mb-8">
            We apologize for the inconvenience. Please try again or contact support if the problem persists.
          </p>
          
          <div className="bg-error-50 rounded-lg p-4 mb-8 text-left border border-error-200">
            <h2 className="text-lg font-semibold text-error-900 mb-2">
              Error Details:
            </h2>
            <pre className="text-sm text-foreground overflow-x-auto">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-sm text-error-700 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-background-tertiary hover:bg-background-secondary text-foreground rounded-lg transition-colors border border-border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 