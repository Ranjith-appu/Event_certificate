/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#ffffff',
          900: '#f8fafc',
          850: '#f1f5f9',
          800: '#e2e8f0',
          700: '#cbd5e1',
          600: '#94a3b8',
        },
        ncore: {
          navy: '#0f172a',
          royal: '#0284c7',
          blue: '#0284c7',
          cyan: '#0284c7',
          electric: '#0ea5e9',
          ice: '#0284c7',
          gold: '#d97706',
          amber: '#d97706'
        }
      },
      fontFamily: {
        cyber: ['Rajdhani', 'sans-serif'],
        tech: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'glow-cyan': '0 10px 25px -5px rgba(2, 132, 199, 0.25)',
        'glow-cyan-sm': '0 4px 12px rgba(2, 132, 199, 0.15)',
        'glow-blue': '0 10px 25px -5px rgba(37, 99, 235, 0.25)',
        'glow-gold': '0 10px 25px -5px rgba(217, 119, 6, 0.25)',
        'glass': '0 8px 30px 0 rgba(15, 23, 42, 0.08)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3.5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'float': 'float 7s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.9', filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.7))' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.65', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
