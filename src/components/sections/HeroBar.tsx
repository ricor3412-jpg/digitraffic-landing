import { motion } from 'framer-motion'
import { CTAButton } from '@/components/ui/Button'

/**
 * Barra del hero: logo a la izquierda, CTA a la derecha.
 *
 * NO es fija: vive dentro del hero y se va con el scroll. La navegación
 * persistente es el dock de abajo, así que una barra pegada arriba sería
 * redundante y le robaría aire al titular.
 */
export function HeroBar() {
  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-6xl"
    >
      <div className="flex items-center justify-between gap-4 rounded-full border border-line bg-surface/50 py-2.5 pr-2.5 pl-5 backdrop-blur-xl sm:pl-7">
        <a href="#hero" aria-label="Digitraffic — inicio" className="shrink-0">
          <img
            src="/brand/logo-horizontal-blanco.svg"
            alt="Digitraffic"
            className="h-6 w-auto sm:h-7"
          />
        </a>

        <CTAButton size="md" className="shrink-0">
          Trabajemos juntos
        </CTAButton>
      </div>
    </motion.div>
  )
}
