import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { LiquidCodePanel } from '@/components/svg/CodePanel'
import {
  OnboardingIntegrations,
  CroBeforeAfter,
  DesigningSection,
} from '@/components/svg/MethodologyVisuals'
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

const STEP_VISUALS: Record<string, React.ReactNode> = {
  onboarding: <OnboardingIntegrations />,
  /* El mockup "antes→después" es un hallazgo de auditoría, no de diseño:
     enseña dónde está el problema. Por eso vive en Auditoría CRO. */
  auditoria: <CroBeforeAfter />,
  /* Y Diseño muestra cómo se monta la ficha, pieza a pieza. */
  diseno: <DesigningSection />,
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
            <h2 className="text-3xl leading-[1.1] font-bold sm:text-4xl">
              Nuestra metodología
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

        {/* ── Columna derecha: las 4 fases dentro de UN SOLO panel de fondo
            (como iurop) — un contenedor común envuelve todas las fases. ── */}
        <div
          ref={trackRef}
          className="flex flex-col gap-16 rounded-3xl border border-line bg-surface/30 p-6 sm:p-8 md:gap-24 md:p-10"
        >
          {STEPS.map((step) => (
            <div
              key={step.id}
              id={`fase-${step.id}`}
              className="scroll-mt-32 md:min-h-[50vh] md:justify-center md:flex md:flex-col"
            >
              <Reveal>
                <div className="flex flex-col gap-5">
                  <span className="inline-flex w-fit rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold text-muted">
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
