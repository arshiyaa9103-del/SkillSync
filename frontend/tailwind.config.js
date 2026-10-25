/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          darkBlue: '#1D4ED8',
          cyan: '#06B6D4',
          accentGreen: '#84CC16',
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#EF4444',
          bg: '#F8FAFC',
          textPrimary: '#0F172A',
          textSecondary: '#475569',
          textMuted: '#64748B',
          border: '#E2E8F0',
          blueLight: '#EFF6FF',
          cyanLight: '#ECFEFF',
          greenLight: '#F0FDF4',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'hover': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        'premium': '0 20px 25px -5px rgb(37 99 235 / 0.08), 0 8px 10px -6px rgb(37 99 235 / 0.04)',
      }
    },
  },
  plugins: [],
}
