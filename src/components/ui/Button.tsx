import { motion, useReducedMotion } from 'framer-motion'
import { useCalendly } from '@/lib/calendly'

type Variant = 'primary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold ' +
  'whitespace-nowrap cursor-pointer transition-colors duration-300 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta'

const variants: Record<Variant, string> = {
  primary:
    'bg-magenta text-white hover:bg-magenta-deep shadow-[0_0_40px_-8px_rgb(255_19_205/0.6)]',
  ghost:
    'border border-line bg-white/5 text-bone backdrop-blur hover:border-magenta hover:bg-magenta/10',
}

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

/**
 * CTA principal. Al pulsarlo abre el popup de Calendly.
 * La URL se configura una sola vez en src/lib/config.ts
 */
export function CTAButton({
  children,
  variant = 'primary',
  size = 'lg',
  className = '',
}: {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  className?: string
}) {
  const { openCalendly } = useCalendly()
  const reduce = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={openCalendly}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      <svg
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 8h10m0 0-4-4m4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  )
}
