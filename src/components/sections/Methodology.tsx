import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { LiquidCodePanel } from '@/components/svg/CodePanel'
import { METHODOLOGY } from '@/lib/config'

/* ── Visual de la fase 1: análisis de competencia ── */
function OnboardingVisual() {
  const rows = [
    { name: 'Tu tienda', v: 38, self: true },
    { name: 'Competidor A', v: 72, self: false },
    { name: 'Competidor B', v: 64, self: false },
  ]

  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-4">
      <p className="mb-3 font-mono text-[10px] tracking-wide text-faint uppercase">
        Análisis competitivo
      </p>
      <div className="flex flex-col gap-2.5">
        {rows.map((r, i) => (
          <div key={r.name} className="flex items-center gap-2">
            <span
              className={`w-20 shrink-0 text-[10px] ${r.self ? 'font-semibold text-danger' : 'text-muted'}`}
            >
              {r.name}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-void">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${r.v}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`h-full rounded-full ${r.self ? 'bg-danger' : 'bg-line'}`}
              />
            </div>
            <span className="w-7 shrink-0 text-right font-mono text-[10px] text-muted">
              {r.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Visual de la fase 2: auditoría, embudo con fugas ── */
function AuditVisual() {
  const steps = [
    { label: 'Visitas', w: 100 },
    { label: 'Producto', w: 62 },
    { label: 'Carrito', w: 24 },
    { label: 'Compra', w: 9 },
  ]

  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-4">
      <p className="mb-3 font-mono text-[10px] tracking-wide text-faint uppercase">
        Dónde se cae el embudo
      </p>
      <div className="flex flex-col gap-1.5">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ width: `${s.w}%` }}
            className="origin-left rounded bg-gradient-to-r from-magenta/70 to-purple/50 px-2 py-1"
          >
            <span className="text-[9px] font-semibold whitespace-nowrap text-white">
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
  const parts = [
    { label: 'Título de producto', h: 'h-2' },
    { label: 'Descripción', h: 'h-1.5' },
    { label: 'Botón de compra', h: 'h-6', cta: true },
  ]

  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-4">
      <p className="mb-3 font-mono text-[10px] tracking-wide text-faint uppercase">
        Cada bloque, un propósito
      </p>
      <div className="flex gap-3">
        <div className="h-20 w-16 shrink-0 rounded-lg bg-line/30" />
        <div className="flex flex-1 flex-col justify-center gap-2">
          {parts.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="flex items-center gap-2"
            >
              {p.cta ? (
                <div className="flex h-6 flex-1 items-center justify-center rounded-full bg-magenta">
                  <span className="text-[8px] font-bold text-white">
                    AÑADIR AL CARRITO
                  </span>
                </div>
              ) : (
                <div className={`${p.h} flex-1 rounded bg-line/50`} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* Cada fase enseña su entregable. */
const STEP_VISUALS: Record<string, React.ReactNode> = {
  onboarding: <OnboardingVisual />,
  auditoria: <AuditVisual />,
  diseno: <DesignVisual />,
  desarrollo: <LiquidCodePanel />,
}

export function Methodology() {
  const trackRef = useRef<HTMLDivElement>(null)

  /* La línea vertical se va rellenando conforme haces scroll. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 65%', 'end 55%'],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <Section id="metodologia">
      <SectionHeader
        eyebrow="Cómo trabajamos"
        title={
          <>
            Nuestra <span className="text-gradient">metodología</span>
          </>
        }
        subtitle={METHODOLOGY.subtitle}
      />

      <div ref={trackRef} className="relative mt-20 pl-10 sm:pl-16">
        {/* Raíl de fondo */}
        <div
          className="absolute top-2 bottom-2 left-[13px] w-px bg-line sm:left-[27px]"
          aria-hidden="true"
        />
        {/* Relleno que sigue al scroll */}
        <motion.div
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[13px] w-px origin-top bg-gradient-to-b from-magenta to-purple sm:left-[27px]"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-12 sm:gap-16">
          {METHODOLOGY.steps.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.05}>
              <div className="relative">
                {/* Nodo sobre la línea */}
                <div
                  className="absolute top-1 -left-10 flex h-7 w-7 items-center justify-center rounded-full border border-magenta/40 bg-void sm:-left-16"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-magenta" />
                </div>

                <div className="grid gap-6 md:grid-cols-[1fr_0.9fr] md:items-center">
                  <div className="flex flex-col gap-3">
                    <span className="inline-flex w-fit rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold text-magenta-soft">
                      {step.tag}
                    </span>
                    <h3 className="text-xl font-bold text-bone sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted sm:text-base">
                      {step.body}
                    </p>
                  </div>

                  {/* Cada fase enseña lo que produce */}
                  <div className="min-w-0">{STEP_VISUALS[step.id]}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-16 flex justify-center" delay={0.1}>
        <CTAButton>{METHODOLOGY.cta}</CTAButton>
      </Reveal>
    </Section>
  )
}
