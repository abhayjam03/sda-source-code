/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'chanakya': {
          primary: '#1a237e',    // Main brand color
          secondary: '#283593',  // Hover state
          light: '#e8eaf6',      // Light background
          dark: '#0d1642',       // Dark variant
        },
        'whatsapp': {
          DEFAULT: '#25D366',    // WhatsApp green
          hover: '#128C7E',      // WhatsApp hover
        }
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
} 