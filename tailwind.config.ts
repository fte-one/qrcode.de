import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f3efe6',
        card: '#fffdf8',
        ink: '#14130f',
        signal: { DEFAULT: '#ff5a2b', dark: '#e8431a' },
        sun: '#ffd447',
        muted: '#6b6658',
        ok: '#1c7c46',
        warn: '#9a5800',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        hard: '4px 4px 0 0 #14130f',
        'hard-sm': '2px 2px 0 0 #14130f',
        'hard-lg': '8px 8px 0 0 #14130f',
      },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        pop: { '0%': { transform: 'scale(.96)' }, '60%': { transform: 'scale(1.015)' }, '100%': { transform: 'scale(1)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.25' } },
        sweep: { '0%': { transform: 'translateY(-10%)' }, '100%': { transform: 'translateY(110%)' } },
      },
      animation: {
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both',
        pop: 'pop .28s ease-out',
        blink: 'blink 1.2s ease-in-out infinite',
        sweep: 'sweep 2.4s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}

export default config
