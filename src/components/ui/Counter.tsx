import { animate, useMotionValue, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Número que se anima suavemente hacia su nuevo valor.
 * Se usa en la calculadora CRO para que las cifras "cuenten" al cambiar.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const motionValue = useMotionValue(value)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }

    const controls = animate(motionValue, value, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })

    return () => controls.stop()
  }, [value, motionValue, reduce])

  const formatted = display.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
