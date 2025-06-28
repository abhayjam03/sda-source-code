import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          purple: '#2d1875',
          gold: '#f5c405',
          red: '#d72724',
          white: '#fefefe',
          yellow: '#feef16',
        },
        // Primary Color Palette (Purple)
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#2d1875',
          950: '#1e1b4b',
        },
        // Secondary Color Palette (Gold-based)
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Accent Color Palette (Gold)
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f5c405',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Yellow Color Palette
        yellow: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#feef16',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        // Warning/Error Color Palette (Red)
        warning: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Error Color Palette (Red)
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Success Color Palette (Green)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Neutral Colors for Light/Dark Mode
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        'background-tertiary': 'var(--background-tertiary)',
        foreground: 'var(--foreground)',
        'foreground-secondary': 'var(--foreground-secondary)',
        'foreground-tertiary': 'var(--foreground-tertiary)',
        'foreground-muted': 'var(--foreground-muted)',
        border: 'var(--border)',
        'border-secondary': 'var(--border-secondary)',
        'border-accent': 'var(--border-accent)',
        'border-primary': 'var(--border-primary)',
        'border-yellow': 'var(--border-yellow)',
        input: 'var(--input)',
        'input-focus': 'var(--input-focus)',
        'input-error': 'var(--input-error)',
        ring: 'var(--ring)',
        'ring-secondary': 'var(--ring-secondary)',
        'ring-yellow': 'var(--ring-yellow)',
        'ring-error': 'var(--ring-error)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      // Custom gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-800) 50%, var(--primary-700) 100%)',
        'gradient-accent': 'linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%)',
        'gradient-yellow': 'linear-gradient(135deg, var(--yellow-500) 0%, var(--yellow-600) 100%)',
      },
      // Custom shadows
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(45, 24, 117, 0.1), 0 2px 4px -1px rgba(45, 24, 117, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(45, 24, 117, 0.1), 0 4px 6px -2px rgba(45, 24, 117, 0.05)',
        'accent': '0 4px 6px -1px rgba(245, 196, 5, 0.1), 0 2px 4px -1px rgba(245, 196, 5, 0.06)',
        'accent-lg': '0 10px 15px -3px rgba(245, 196, 5, 0.1), 0 4px 6px -2px rgba(245, 196, 5, 0.05)',
        'yellow': '0 4px 6px -1px rgba(254, 239, 22, 0.1), 0 2px 4px -1px rgba(254, 239, 22, 0.06)',
        'yellow-lg': '0 10px 15px -3px rgba(254, 239, 22, 0.1), 0 4px 6px -2px rgba(254, 239, 22, 0.05)',
      },
      // Custom animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
    },
  },
  plugins: [],
}

export default config 