'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center p-4"
        >
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-indigo-900 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-800 mb-8">
                We apologize for the inconvenience. Our team has been notified and is working on fixing the issue.
              </p>
              
              {this.state.error && (
                <div className="bg-indigo-50 rounded-lg p-4 mb-8 text-left">
                  <h2 className="text-lg font-semibold text-indigo-900 mb-2">
                    Error Details:
                  </h2>
                  <pre className="text-sm text-gray-900 overflow-x-auto">
                    {this.state.error.toString()}
                  </pre>
                  {this.state.errorInfo && (
                    <pre className="text-sm text-gray-900 mt-2 overflow-x-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Return Home
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="btn bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )
    }

    return this.props.children
  }
} 