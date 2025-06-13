/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        // Light Mode (White)
        light: {
          primary: '#ffffff',
          secondary: '#f8fafc',
          text: '#1e293b',
          accent: '#2563eb',
          muted: '#64748b',
          border: '#e2e8f0'
        },
        // Dark Mode (Black)
        dark: {
          primary: '#000000',
          secondary: '#0f172a',
          text: '#f8fafc',
          accent: '#3b82f6',
          muted: '#94a3b8',
          border: '#1e293b'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
