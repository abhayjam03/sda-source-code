 'use client';

import ErrorBoundary from './ErrorBoundary';
import { ReactNode } from 'react';

export default function ErrorBoundaryClient({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
