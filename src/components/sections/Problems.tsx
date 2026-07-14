import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Eyebrow } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { PROBLEM_MOCKUPS } from '@/components/svg/Mockups'
import { PROBLEMS } from '@/lib/config'

const EASE = [0.16, 1, 0.3, 1] as const

/* Icono por problema. */
const ICONS: Record<string, React.ReactNode> = {
  plantilla: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </>
  ),
  margen: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M21 13V7h-6" />
    </>
  ),
  intuicion: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  cac: <path d="M12 2v20M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  aov: (
    <>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <path d="M3 6h18M16 10a4 4 0 01-8 0" />
    </>
  ),
  apps: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  velocidad: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 13l4-3M9 3h6" />
    </>
  ),
}

type Problem = { id: string; title: string; body: string }

function ProblemCard({
  problem,
  index,
  visible,
}: {
  problem: Problem
  index: number
  visible: boolean
}) {
  const reduce = useReducedMotion()
  const { id, title, body } = problem

  return (
    <motion.li
      /* Cada tarjeta sube desde abajo cuando la sección entra en pantalla */
      initial={{ opacity: 0, y: reduce ? 0 : 70 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: Math.min(index, 5) * 0.09,
        ease: EASE,
      }}
      className="w-[300px] shrink-0 sm:w-[340px]"
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/50 p-6 transition-colors duration-300 hover:border-danger/40">
        <div className="relative flex h-full flex-col gap-4">
          {/* Escena: muestra el problema en vez de describirlo */}
          <div className="flex min-h-[132px] items-center rounded-2xl border border-line/60 bg-void/50 p-3">
            <div className="w-full">{PROBLEM_MOCKUPS[id]}</div>
          </div>

          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-danger"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {ICONS[id]}
            </svg>
            <h3 className="text-base font-bold text-bone">{title}</h3>
          </div>

          <p className="text-sm leading-relaxed text-muted">{body}</p>

          <span
            className="pointer-events-none absolute -right-1 -bottom-4 font-display text-6xl font-bold text-white/[0.03]"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.li>
  )
}

export function Problems() {
  const reduce = useReducedMotion()
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)

  const [visible, setVisible] = useState(false)
  const [distance, setDistance] = useState(0)

  /* ── El efecto: mientras la sección está PEGADA a la pantalla, el scroll
     vertical se traduce en desplazamiento horizontal de las tarjetas.
     Cuando se acaban, la página sigue bajando con normalidad.
     ───────────────────────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  })

  /* Suavizado, para que no se sienta pegado a la rueda */
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  const x = useTransform(progress, [0, 1], [0, -distance])

  /* Cuánto hay que desplazar: lo que sobresale de la pista. */
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const overflow = track.scrollWidth - window.innerWidth
      setDistance(Math.max(0, overflow + 48)) // +48 de aire al final
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  /* Dispara la animación de entrada de las tarjetas */
  useEffect(() => {
    const el = pinRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Barra de progreso del recorrido horizontal */
  const barWidth = useTransform(progress, [0, 1], ['0%', '100%'])

  /* Sin movimiento: rejilla normal, sin pin ni scroll secuestrado. */
  if (reduce) {
    return (
      <section id="problemas" className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Header />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.items.map((p, i) => (
              <ProblemCard key={p.id} problem={p} index={i} visible />
            ))}
          </ul>
          <div className="mt-12 flex justify-center">
            <CTAButton>{PROBLEMS.cta}</CTAButton>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="problemas" className="scroll-mt-24">
      {/* El contenedor alto es lo que da "recorrido" al pin: cuanto más alto,
          más scroll vertical hace falta para recorrer las tarjetas. */}
      <div ref={pinRef} style={{ height: `calc(100vh + ${distance}px)` }}>
        {/* Lo que se queda pegado */}
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Header />
          </div>

          {/* La pista que se desplaza */}
          <motion.ul
            ref={trackRef}
            style={{ x }}
            className="mt-10 flex w-max gap-5 px-5 sm:px-8"
          >
            {PROBLEMS.items.map((p, i) => (
              <ProblemCard key={p.id} problem={p} index={i} visible={visible} />
            ))}
          </motion.ul>

          {/* Progreso del recorrido */}
          <div className="mx-auto mt-10 w-full max-w-6xl px-5 sm:px-8">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
              <motion.div
                style={{ width: barWidth }}
                className="h-full rounded-full bg-gradient-to-r from-magenta to-purple"
              />
            </div>
          </div>

          {/* Difuminado lateral */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-void to-transparent sm:w-24"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* El CTA queda fuera del pin, ya con scroll normal */}
      <div className="px-5 pt-4 pb-4 sm:px-8">
        <Reveal className="flex justify-center">
          <CTAButton>{PROBLEMS.cta}</CTAButton>
        </Reveal>
      </div>
    </section>
  )
}

/* Cabecera compartida por las dos variantes (con y sin movimiento) */
function Header() {
  return (
    /* items-start: si no, el eyebrow se estira a todo el ancho de la columna */
    <div className="flex max-w-3xl flex-col items-start gap-4">
      <Eyebrow>El diagnóstico</Eyebrow>
      <h2 className="text-3xl leading-[1.1] font-bold sm:text-4xl md:text-5xl">
        ¿Por qué tu tienda{' '}
        <span className="text-danger">no vende lo que debería</span>?
      </h2>
      <p className="text-base text-muted">{PROBLEMS.subtitle}</p>
    </div>
  )
}
