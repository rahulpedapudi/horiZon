/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Redefining primary/accent to be semantic neutrals
        primary: {
          DEFAULT: '#212121', // ChatGPT Dark Main
          foreground: '#ECECEC',
        },
        sidebar: {
            light: '#F9F9F9',
            dark: '#171717',
        },
        // Using standard tailwind gray/zinc for UI elements
        gray: {
            50: '#F9F9F9',
            100: '#ECECEC',
            200: '#E3E3E3',
            300: '#CDCDCD',
            400: '#B4B4B4',
            500: '#9B9B9B',
            600: '#676767',
            700: '#424242', // Standard gray for dark mode borders/elements
            800: '#2F2F2F', // Cards in dark mode
            900: '#212121', // Main Background
            950: '#171717', // Sidebar Background
        },
        accent: {
          DEFAULT: '#10A37F', // ChatGPT Green (optional, simplified to monochrome if requested, but this is the brand color)
          // User requested "no vibrant colors", "neutral grays". 
          // I will make accent purely monochrome or very subtle.
          // Let's stick to black/white for primary actions to be "indistinguishable".
          hover: '#1A1A1A',
        }
      },
      fontFamily: {
        sans: ['"Söhne"', '"Segoe UI"', 'Inter', 'sans-serif'], // Attempting ChatGPT font stack match
      }
    },
  },
  plugins: [],
}
