import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sans-jp)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        space: ['var(--font-space-grotesk)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        noto: ['var(--font-noto-sans-jp)', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#E0F2FE',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0EA5E9',
          600: '#0284c7',
          700: '#0284C7',
          800: '#075985',
          900: '#075985',
        },
        primary: {
          50: '#f0f9ff',
          100: '#E0F2FE',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0EA5E9',
          600: '#0284c7',
          700: '#0284C7',
          800: '#075985',
          900: '#075985',
        },
        pearl: '#F6F7F9',
        text: '#0F172A',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          500: '#6b7280',
          600: '#4b5563',
          900: '#111827',
        }
      }
    }
  },
  plugins: [],
}
export default config