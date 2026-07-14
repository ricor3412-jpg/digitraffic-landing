import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/**
 * Efecto imán: el contenido se desplaza hacia el cursor cuando este entra en
 * una zona sensible alrededor. Al salir, vuelve a su sitio con un rebote.
 *
 * El hitbox es un margen invisible alrededor del hijo — deliberadamente
 * pequeño, para que el efecto se sienta como un imán y no como que el botón
 * persigue al ratón por toda la pantalla.
 */
export function Magnetic({
  children,
  /** Cuántos píxeles alrededor del elemento reaccionan al cursor */
  radius = 90,
  /** Cuánto se deja arrastrar (0–1). Más alto = más pegajoso */
  pull = 0.38,
  className = '',
}: {
  children: ReactNode
  radius?: number
  pull?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  /* Muelle suave: el retorno tiene que sentirse elástico, no mecánico */
  const spring = { stiffness: 260, damping: 18, mass: 0.6 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return

    const r = ref.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2

    const dx = e.clientX - cx
    const dy = e.clientY - cy

    /* Fuera del radio no hay imán. El hitbox es el elemento MÁS el radio. */
    const dist = Math.hypot(dx, dy)
    const max = Math.hypot(r.width / 2, r.height / 2) + radius
    if (dist > max) {
      x.set(0)
      y.set(0)
      return
    }

    /* La atracción se atenúa con la distancia: más fuerte cerca del centro */
    const strength = 1 - Math.min(1, dist / max)
    x.set(dx * pull * strength)
    y.set(dy * pull * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    /* El contenedor se estira `radius` px por cada lado: ese es el hitbox.
       Va con pointer-events-none y solo el hijo los recupera, para no robarle
       clics a lo que haya alrededor. */
    <div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`pointer-events-none relative inline-flex ${className}`}
      style={{ padding: radius, margin: -radius }}
    >
      <motion.div
        ref={ref}
        style={{ x: sx, y: sy }}
        className="pointer-events-auto"
      >
        {children}
      </motion.div>
    </div>
  )
}
