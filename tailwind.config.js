/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        'primary': {
          DEFAULT: '#F99600',
          50: '#FFF4E6',
          100: '#FFE8CC',
          200: '#FFD199',
          300: '#FFBA66',
          400: '#F6B154',
          500: '#F99600',
          600: '#e5a54e',
          700: '#CC7A00',
          800: '#B36800',
          900: '#995700'
        },
        'secondary': {
          DEFAULT: '#1C3661',
          50: '#E6ECF4',
          100: '#CCD9E9',
          200: '#99B3D3',
          300: '#668DBC',
          400: '#3367A6',
          500: '#1C3661',
          600: '#162A4D',
          700: '#111F3A',
          800: '#0B1426',
          900: '#060A13'
        },
        'pst-blue': {
          DEFAULT: '#1C3661',
          light: '#2A4F8C',
          dark: '#162A4D',
          darker: '#111F3A'
        },
        'orange': {
          DEFAULT: '#F99600',
          50: '#FFF4E6',
          100: '#FFE8CC',
          200: '#FFD199',
          300: '#FFBA66',
          400: '#F6B154',
          500: '#F99600',
          600: '#e5a54e',
          700: '#CC7A00',
          800: '#B36800',
          900: '#995700',
          950: '#664400'
        },
        'black': {
          DEFAULT: '#030712',
          light: '#111827',
          lighter: '#1f2937'
        },
        'white': {
          DEFAULT: '#FFFFFF',
          dark: '#E2E2E2'
        }
      },
      spacing: {
        '1.5': '0.375rem', // 6px
        '2.5': '0.625rem', // 10px
        '3.5': '0.875rem', // 14px
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#9CA3AF',
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#6B7280',
          },
        },
      })
    }
  ],
}
