'use client'

import Image from 'next/image';
import { HeroSection } from '../types/academy';

interface HeroProps {
  data: HeroSection;
}

export default function Hero({ data }: HeroProps) {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full bg-gradient-to-r from-red-600/20 to-blue-600/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="mb-4 text-5xl font-bold md:text-6xl">
            {data.title}
          </h1>
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
            {data.subtitle}
          </h2>
          <p className="mx-auto max-w-2xl text-lg md:text-xl">
            {data.description}
          </p>
          <button className="mt-8 rounded-full bg-red-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-red-700">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
} 