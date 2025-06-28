'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ error, errorInfo })
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
          className="min-h-screen bg-gradient-to-b from-background-secondary to-background flex items-center justify-center p-4"
        >
          <div className="max-w-2xl w-full bg-background rounded-2xl shadow-brand-lg p-8 border border-border">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-foreground-secondary mb-8">
                We apologize for the inconvenience. Our team has been notified and is working on fixing the issue.
              </p>
              
              {this.state.error && (
                <div className="bg-primary-50 rounded-lg p-4 mb-8 text-left border border-primary-200">
                  <h2 className="text-lg font-semibold text-primary-900 mb-2">
                    Error Details:
                  </h2>
                  <pre className="text-sm text-foreground overflow-x-auto">
                    {this.state.error.toString()}
                  </pre>
                  {this.state.errorInfo && (
                    <pre className="text-sm text-foreground mt-2 overflow-x-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Reload Page
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
        </motion.div>
      )
    }

    return this.props.children
  }
} 