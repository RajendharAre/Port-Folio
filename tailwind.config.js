/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./views/**/*.ejs",
    "./public/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode
        light: {
          primary: '#ffffff',
          secondary: '#f1f5f9',
          card: '#ffffff',
          text: '#1e293b',
          accent: '#2563eb',
          muted: '#64748b',
          border: '#e2e8f0',
          hover: '#1d4ed8'
        },
        // Dark Mode
        dark: {
          primary: '#0a0a0a',
          secondary: '#0f172a',
          card: '#1e293b',
          text: '#f8fafc',
          accent: '#3b82f6',
          muted: '#94a3b8',
          border: '#334155',
          hover: '#60a5fa'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'scale-x': 'scaleX 1s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleX: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
