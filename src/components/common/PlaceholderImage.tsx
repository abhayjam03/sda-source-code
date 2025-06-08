'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PlaceholderImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallbackSrc?: string
}

export default function PlaceholderImage({
  src,
  alt,
  width,
  height,
  className = '',
  fallbackSrc = 'https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found'
}: PlaceholderImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc)
          setIsLoading(false)
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-secondary-100 animate-pulse" />
      )}
    </div>
  )
} 