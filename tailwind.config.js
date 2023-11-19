/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#212529',
        },
        blue: {
          50: '#F8F9FA',
          DEFAULT: '#2F58C2',
          200: '#E8EDF1',
          300: '#D5DEE5',
          400: '#2F58C2',
          500: '#0D6EFD',
        },
        grey: {
          DEFAULT: '#6C757D',
          50: '#f5f5f5',
          100: ' #CDD4D9',
          300: '#616567',
          400: '#6C747C',
          700: '#999EA3',
          800: '#4B4A4A',
          900: '#3A3939',
        },
        teal: {
          DEFAULT: '#20C997',
          100: '#e8f3ed',
        },
        danger: {
          DEFAULT: '#F86C6B',
          100: '#FFF1E0',
        },
        warning: {
          DEFAULT: '#DC3545',
          100: '#fbeaec',
        },
        success: '#51AF25',
      },
      boxShadow: {
        card: '0px 3px 20px rgba(0, 0, 0, 0.15)',
        global: '10px 0px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
};
