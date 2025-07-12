/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // light gray
        input: 'var(--color-input)', // light neutral
        ring: 'var(--color-ring)', // deep forest green
        background: 'var(--color-background)', // pure white with subtle warmth
        foreground: 'var(--color-foreground)', // dark blue-gray
        primary: {
          DEFAULT: 'var(--color-primary)', // deep forest green
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // warm saddle brown
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // confident red
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // light neutral
          foreground: 'var(--color-muted-foreground)', // medium gray
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // energetic terracotta
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // dark blue-gray
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // dark blue-gray
        },
        success: {
          DEFAULT: 'var(--color-success)', // natural green
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // warm amber
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // confident red
          foreground: 'var(--color-error-foreground)', // white
        },
        surface: {
          DEFAULT: 'var(--color-surface)', // light neutral
          foreground: 'var(--color-surface-foreground)', // dark blue-gray
        },
        'text-primary': 'var(--color-text-primary)', // dark blue-gray
        'text-secondary': 'var(--color-text-secondary)', // medium gray
      },
      borderRadius: {
        lg: 'var(--radius)', // 8px
        md: 'calc(var(--radius) - 2px)', // 6px
        sm: 'calc(var(--radius) - 4px)', // 4px
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'soft-hover': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'scale-hover': 'scaleHover 200ms ease-out',
        'slide-in': 'slideIn 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        scaleHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '500': '500',
        '1000': '1000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}