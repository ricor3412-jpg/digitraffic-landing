import { motion, useReducedMotion } from 'framer-motion'
import { CTAButton } from '@/components/ui/Button'
import { GlowOrb, SaleNotification } from '@/components/svg/Visuals'
import { COMPANY, HERO } from '@/lib/config'

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
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-32 pb-20 sm:px-8"
    >
      {/* Fondo: retícula + orbes de color */}
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void"
        aria-hidden="true"
      />
      <GlowOrb className="top-[-10%] left-[10%] h-[420px] w-[420px] bg-magenta/25" />
      <GlowOrb className="right-[5%] bottom-[5%] h-[380px] w-[380px] bg-purple/30" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* ── Columna de texto ── */}
        <div className="flex flex-col items-start gap-8">
          {/* Badge de escasez */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-magenta/30 bg-magenta/10 px-4 py-2 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <motion.span
                  animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inline-flex h-full w-full rounded-full bg-magenta"
                />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-magenta" />
            </span>
            <span className="text-xs font-semibold text-magenta-soft">
              {COMPANY.scarcity}
            </span>
          </motion.div>

          {/* Titular */}
          <h1 className="text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl xl:text-7xl">
            <AnimatedWords text={HERO.titleStart} delay={0.2} />{' '}
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
            className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {HERO.subtitle}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
          >
            <CTAButton size="lg">{HERO.cta}</CTAButton>
          </motion.div>
        </div>

        {/* ── Columna visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md">
            {/* Panel principal: métricas en vivo */}
            <div className="relative rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide text-faint uppercase">
                  Tu tienda, optimizada
                </span>
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-magenta" />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Conversión', value: '+68%' },
                  { label: 'Ticket medio', value: '+31%' },
                  { label: 'Velocidad', value: '0,9s' },
                  { label: 'Recurrencia', value: '+44%' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 + i * 0.1 }}
                    className="rounded-2xl border border-line/60 bg-void/50 p-4"
                  >
                    <p className="text-xs text-faint">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-bone">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* ⚠️ TODO: estas métricas son de ejemplo. Sustitúyelas por
                  resultados reales de tus clientes cuando los tengas. */}
            </div>

            {/* Notificación flotante superpuesta */}
            <div className="absolute -bottom-8 -left-4 sm:-left-10">
              <SaleNotification />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
