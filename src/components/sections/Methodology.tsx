import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { LiquidCodePanel } from '@/components/svg/CodePanel'
import { METHODOLOGY } from '@/lib/config'

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Iconos de cada fase ─────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  onboarding: (
    <>
      <path d="M21 15V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1" />
      <path d="M3 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
    </>
  ),
  auditoria: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
  diseno: (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
    </>
  ),
  desarrollo: (
    <>
      <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
    </>
  ),
}

/* ── Visual de la fase 1: análisis competitivo ── */
function OnboardingVisual() {
  const rows = [
    { name: 'Tu tienda', v: 38, self: true },
    { name: 'Competidor A', v: 72, self: false },
    { name: 'Competidor B', v: 64, self: false },
  ]

  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-5">
      <p className="mb-4 font-mono text-[10px] tracking-wide text-faint uppercase">
        Análisis competitivo
      </p>
      <div className="flex flex-col gap-3">
        {rows.map((r, i) => (
          <div key={r.name} className="flex items-center gap-2.5">
            <span
              className={`w-24 shrink-0 text-[11px] ${r.self ? 'font-semibold text-danger' : 'text-muted'}`}
            >
              {r.name}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-void">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${r.v}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                className={`h-full rounded-full ${r.self ? 'bg-danger' : 'bg-line'}`}
              />
            </div>
            <span className="w-8 shrink-0 text-right font-mono text-[11px] text-muted">
              {r.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Visual de la fase 2: embudo con fugas ── */
function AuditVisual() {
  const steps = [
    { label: 'Visitas', w: 100 },
    { label: 'Ficha de producto', w: 62 },
    { label: 'Carrito', w: 24 },
    { label: 'Compra', w: 9 },
  ]

  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-5">
      <p className="mb-4 font-mono text-[10px] tracking-wide text-faint uppercase">
        Dónde se cae el embudo
      </p>
      <div className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ width: `${s.w}%` }}
            className="origin-left rounded-lg bg-gradient-to-r from-magenta/70 to-purple/50 px-3 py-1.5"
          >
            <span className="text-[10px] font-semibold whitespace-nowrap text-white">
              {s.label} · {s.w}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Visual de la fase 3: diseño con intención ── */
function DesignVisual() {
  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-5">
      <p className="mb-4 font-mono text-[10px] tracking-wide text-faint uppercase">
        Cada bloque, un propósito
      </p>
      <div className="flex gap-4">
        <div className="h-28 w-24 shrink-0 rounded-xl bg-line/30" />
        <div className="flex flex-1 flex-col justify-center gap-3">
          {[
            { label: 'Título de producto', h: 'h-2.5' },
            { label: 'Descripción', h: 'h-2' },
          ].map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className={`${p.h} rounded bg-line/50`}
              style={{ width: i === 0 ? '80%' : '100%' }}
            />
          ))}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-1 flex h-9 items-center justify-center rounded-full bg-magenta"
          >
            <span className="text-[10px] font-bold text-white">
              AÑADIR AL CARRITO
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const STEP_VISUALS: Record<string, React.ReactNode> = {
  onboarding: <OnboardingVisual />,
  auditoria: <AuditVisual />,
  diseno: <DesignVisual />,
  desarrollo: <LiquidCodePanel />,
}

const STEPS = METHODOLOGY.steps

export function Methodology() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  /* Las pestañas de la izquierda se sincronizan con el scroll de la derecha.
     El track es alto y la columna izquierda va pegada (sticky), así que al
     rodar el contenido se va iluminando la fase correspondiente. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start center', 'end center'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length))
    setActive(Math.max(0, i))
  })

  function goTo(i: number) {
    document
      .getElementById(`fase-${STEPS[i].id}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <Section id="metodologia">
      <div className="grid gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
        {/* ── Columna izquierda: pestañas pegadas ── */}
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>Cómo trabajamos</Eyebrow>
            <h2 className="text-3xl leading-[1.1] font-bold sm:text-4xl">
              Nuestra <span className="text-gradient">metodología</span>
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {METHODOLOGY.subtitle}
            </p>

            {/* Pestañas: se iluminan solas con el scroll */}
            <ul className="mt-2 flex flex-col gap-2">
              {STEPS.map((step, i) => {
                const isActive = i === active

                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors duration-300 ${
                        isActive
                          ? 'border-magenta/40 bg-magenta/10'
                          : 'border-line/60 bg-surface/30 hover:border-line'
                      }`}
                    >
                      {/* Barra de progreso de la fase activa */}
                      {isActive && (
                        <motion.span
                          layoutId="fase-activa"
                          className="absolute inset-y-0 left-0 w-[3px] bg-magenta"
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      )}

                      <svg
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isActive ? 'text-magenta' : 'text-faint'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {ICONS[step.id]}
                      </svg>

                      <span
                        className={`flex-1 text-sm font-medium transition-colors ${
                          isActive ? 'text-bone' : 'text-faint'
                        }`}
                      >
                        {step.title}
                      </span>

                      <span
                        className={`font-mono text-[10px] transition-colors ${
                          isActive ? 'text-magenta-soft' : 'text-faint/60'
                        }`}
                      >
                        {step.tag}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-4 hidden md:block">
              <CTAButton size="md">{METHODOLOGY.cta}</CTAButton>
            </div>
          </Reveal>
        </div>

        {/* ── Columna derecha: el contenido que rueda ── */}
        <div ref={trackRef} className="flex flex-col gap-16 md:gap-28">
          {STEPS.map((step) => (
            <div
              key={step.id}
              id={`fase-${step.id}`}
              className="scroll-mt-32 md:min-h-[60vh] md:justify-center md:flex md:flex-col"
            >
              <Reveal>
                <div className="flex flex-col gap-5">
                  <span className="inline-flex w-fit rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold text-magenta-soft">
                    {step.tag}
                  </span>
                  <h3 className="text-xl font-bold text-bone sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                    {step.body}
                  </p>
                  <div className="mt-2">{STEP_VISUALS[step.id]}</div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* El CTA vuelve abajo en móvil, donde no hay columna pegada */}
      <Reveal className="mt-14 flex justify-center md:hidden">
        <CTAButton>{METHODOLOGY.cta}</CTAButton>
      </Reveal>
    </Section>
  )
}
