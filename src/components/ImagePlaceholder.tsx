'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function ImagePlaceholder({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
}: ImagePlaceholderProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  );
} 