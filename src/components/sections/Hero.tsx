import { motion, useReducedMotion } from 'framer-motion'
import { CTAButton } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { HeroBar } from '@/components/sections/HeroBar'
import { GlowOrb } from '@/components/svg/Visuals'
import { TrafficFlow } from '@/components/svg/TrafficFlow'
import { CALENDLY_DURATION, HERO } from '@/lib/config'

const EASE = [0.16, 1, 0.3, 1] as const

/* Anima el titular palabra por palabra. */
function AnimatedWords({
  text,
  delay = 0,
  className = '',
}: {
  text: string
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: reduce ? 0 : '0.5em' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.06,
            ease: EASE,
          }}
          className={`inline-block ${className}`}
        >
          {word}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </>
  )
}

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-32 pb-24 max-md:pt-24 max-md:pb-8 sm:px-8"
    >
      {/* Fondo: retícula + orbes de color */}
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void"
        aria-hidden="true"
      />
      <GlowOrb className="top-[-10%] left-[10%] h-[420px] w-[420px] bg-magenta/25" />
      <GlowOrb className="right-[5%] bottom-[10%] h-[380px] w-[380px] bg-purple/30" />

      {/* Barra del hero: se queda aquí, NO sigue al scroll */}
      <div className="absolute inset-x-0 top-0 z-30 px-5 pt-5 sm:px-8">
        <HeroBar />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* ── Texto, centrado sobre el flujo ──
            Titular contenido: tiene que convivir con la animación en la misma
            pantalla, sin empujarla fuera del viewport. */}
        <div className="flex flex-col items-center gap-5 text-center">
          {/* Titular */}
          <h1 className="text-[clamp(1.9rem,4.6vw,3.5rem)] leading-[1.08] font-bold">
            <AnimatedWords text={HERO.titleStart} delay={0.2} />{' '}
            {/* El logo de Shopify ocupa el lugar de la palabra en el titular */}
            <motion.img
              src="/logos/shopify-logo.svg"
              alt="Shopify"
              initial={{ opacity: 0, y: reduce ? 0 : '0.4em' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="inline-block h-[0.95em] w-auto translate-y-[0.12em] align-baseline"
            />{' '}
            {/* Palabra destacada con subrayado que se dibuja solo */}
            <span className="relative inline-block whitespace-nowrap">
              <span className="text-gradient">
                <AnimatedWords text={HERO.titleHighlight} delay={0.45} />
              </span>
              <svg
                viewBox="0 0 240 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full"
                aria-hidden="true"
              >
                <motion.path
                  d="M3 9C48 4 105 2 158 5c30 1.7 58 4 79 6"
                  fill="none"
                  stroke="#ff13cd"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9, ease: EASE }}
                />
              </svg>
            </span>{' '}
            <AnimatedWords text={HERO.titleEnd} delay={0.6} />
          </h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
            className="max-w-lg text-sm leading-relaxed text-muted sm:text-base"
          >
            {HERO.subtitle}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
          >
            {/* Imán: el botón se acerca al cursor cuando entra en su zona */}
            <Magnetic radius={80} pull={0.4}>
              <CTAButton size="lg">{HERO.cta}</CTAButton>
            </Magnetic>
          </motion.div>

          {/* Nota manuscrita, DEBAJO del botón: la flecha se curva hacia
              ARRIBA para apuntarlo. Antes el CTA estaba a su izquierda y la
              flecha señalaba de lado; al centrar el hero, la nota quedó debajo
              y la flecha apuntaba al vacío. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="-mt-2 flex items-start gap-1"
          >
            <svg
              viewBox="0 0 44 30"
              className="h-7 w-11 shrink-0"
              aria-hidden="true"
            >
              {/* Sube desde la palabra y se curva hacia el botón */}
              <motion.path
                d="M40 26 C 30 26, 12 24, 7 6"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.4"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 1.7 }}
              />
              {/* Punta de flecha, apuntando hacia arriba */}
              <motion.path
                d="M7 6 l0.5 7 M7 6 l6 3"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.4"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3 }}
              />
            </svg>

            <span className="mt-2.5 font-hand text-xl leading-none text-muted">
              gratis, {CALENDLY_DURATION}
            </span>
          </motion.div>

        </div>

      </div>

      {/* ── El flujo: tu tráfico entra, tus pedidos salen ──
          Va DEBAJO del bloque de texto, a todo el ancho del viewport, para que
          las líneas se pierdan por los bordes de la pantalla. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        /* En móvil el lienzo es vertical y alto: hay que recortar espacio o el
           hero desborda la pantalla y el dock tapa las notificaciones. */
        className="pointer-events-none relative z-0 -mt-4 w-full max-w-[1400px] max-md:-mt-10 max-md:-mb-16"
      >
        <TrafficFlow />
      </motion.div>
    </section>
  )
}
