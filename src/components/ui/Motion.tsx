import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/* Primitivos de animación reutilizables.
   Todos respetan prefers-reduced-motion: si el usuario pide menos
   movimiento, el contenido aparece sin desplazamiento. */

const EASE = [0.16, 1, 0.3, 1] as const

/** Aparece desde abajo cuando entra en el viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Contenedor que escalona la entrada de sus hijos <Stagger.Item>. */
export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode
  className?: string
  gap?: number
}) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap } },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

/** Flota en bucle. Da vida a la página aunque no haya scroll. */
export function Float({
  children,
  className,
  amplitude = 8,
  duration = 5,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -amplitude, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

/** Punto que late (estado "en vivo"). */
export function Pulse({
  className = 'bg-magenta',
  size = 'h-2 w-2',
}: {
  className?: string
  size?: string
}) {
  const reduce = useReducedMotion()

  return (
    <span className={`relative flex shrink-0 ${size}`}>
      {!reduce && (
        <motion.span
          animate={{ scale: [1, 2.3, 1], opacity: [0.75, 0, 0.75] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inline-flex h-full w-full rounded-full ${className}`}
        />
      )}
      <span
        className={`relative inline-flex h-full w-full rounded-full ${className}`}
      />
    </span>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
