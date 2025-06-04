'use client'

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-900 via-secondary-800 to-secondary-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-primary-200 mb-8">
              While our team fixes this issue, why not play a quick space shooter game?
            </p>
          </motion.div>

          <div className="mb-8">
            <SpaceShooter onGameOver={(score) => console.log('Game Over! Score:', score)} />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 text-left border border-white/20">
            <h2 className="text-lg font-semibold text-white mb-2">
              Error Details:
            </h2>
            <pre className="text-sm text-primary-200 overflow-x-auto bg-secondary-900/50 p-4 rounded-lg">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-sm text-primary-300 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="btn btn-primary px-6 py-3 bg-primary-500 hover:bg-primary-600"
            >
              Try Again
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="btn btn-secondary px-6 py-3 bg-white/10 hover:bg-white/20 text-white"
              >
                Return Home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 