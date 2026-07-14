import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { Counter } from '@/components/ui/Counter'
import { CALCULATOR } from '@/lib/config'

const { defaults, upliftPoints, currency } = CALCULATOR

/* ── Slider con etiqueta y valor en vivo ─────────────────────── */
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format: (v: number) => string
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={`slider-${label}`}
          className="text-sm font-medium text-muted"
        >
          {label}
        </label>
        <span className="font-mono text-base font-bold text-bone tabular-nums">
          {format(value)}
        </span>
      </div>

      <input
        id={`slider-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:bg-magenta [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-magenta"
        style={{
          background: `linear-gradient(to right, #ff13cd 0%, #ff13cd ${pct}%, #2a3441 ${pct}%, #2a3441 100%)`,
        }}
      />
    </div>
  )
}

export function Calculator() {
  /* El tipo explícito es necesario: config.ts usa `as const`, así que
     defaults.sessions se infiere como el literal 50000 y no como number. */
  const [sessions, setSessions] = useState<number>(defaults.sessions)
  const [cvr, setCvr] = useState<number>(defaults.conversionRate)
  const [aov, setAov] = useState<number>(defaults.averageOrderValue)

  /* Cálculo: facturación actual vs. facturación con la mejora de CRO.
     La diferencia es el dinero que el visitante está dejando de ganar. */
  const { currentRevenue, upliftRevenue, monthlyLoss, yearlyLoss, orders, score } =
    useMemo(() => {
      const orders = (sessions * cvr) / 100
      const currentRevenue = orders * aov

      const improvedCvr = cvr + upliftPoints
      const improvedOrders = (sessions * improvedCvr) / 100
      const upliftRevenue = improvedOrders * aov

      const monthlyLoss = upliftRevenue - currentRevenue

      /* Puntuación CRO 0–100: penaliza tasas de conversión bajas.
         Referencia del sector: ~3% es bueno en ecommerce. */
      const score = Math.max(4, Math.min(100, Math.round((cvr / 3) * 100)))

      return {
        currentRevenue,
        upliftRevenue,
        monthlyLoss,
        yearlyLoss: monthlyLoss * 12,
        orders,
        score,
      }
    }, [sessions, cvr, aov])

  const verdict =
    score >= 75
      ? { label: 'Vas bien, pero hay margen', tone: 'text-gain' }
      : score >= 40
        ? { label: 'Estás dejando dinero sobre la mesa', tone: 'text-amber-400' }
        : { label: 'Estás perdiendo dinero', tone: 'text-danger' }

  const fmtMoney = (v: number) =>
    `${Math.round(v).toLocaleString('es-ES')} ${currency}`

  return (
    <Section id="calculadora">
      <SectionHeader
        eyebrow="La calculadora"
        title={
          <>
            Calcula cuánto{' '}
            <span className="text-danger">dejas de ganar</span> cada mes
          </>
        }
        subtitle={CALCULATOR.subtitle}
      />

      <Reveal className="mt-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* ── Panel de entradas ── */}
          <div className="rounded-3xl border border-line bg-surface/50 p-7 sm:p-8">
            <p className="mb-8 text-xs font-semibold tracking-wide text-faint uppercase">
              Tus números actuales
            </p>

            <div className="flex flex-col gap-8">
              <Slider
                label="Sesiones / mes"
                value={sessions}
                min={1000}
                max={500_000}
                step={1000}
                onChange={setSessions}
                format={(v) => v.toLocaleString('es-ES')}
              />
              <Slider
                label="Tasa de conversión"
                value={cvr}
                min={0.2}
                max={6}
                step={0.1}
                onChange={setCvr}
                format={(v) => `${v.toFixed(1)} %`}
              />
              <Slider
                label="Ticket medio"
                value={aov}
                min={10}
                max={400}
                step={5}
                onChange={setAov}
                format={(v) => `${v} ${currency}`}
              />
            </div>

            {/* Resumen de pedidos y facturación actual */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6">
              <div>
                <p className="text-xs text-faint">Pedidos / mes</p>
                <Counter
                  value={orders}
                  className="mt-1 block text-xl font-bold text-bone tabular-nums"
                />
              </div>
              <div>
                <p className="text-xs text-faint">Facturación actual</p>
                <Counter
                  value={currentRevenue}
                  suffix={` ${currency}`}
                  className="mt-1 block text-xl font-bold text-bone tabular-nums"
                />
              </div>
            </div>
          </div>

          {/* ── Panel de resultados ── */}
          <div className="relative overflow-hidden rounded-3xl border border-magenta/30 bg-gradient-to-br from-surface to-void p-7 sm:p-8">
            {/* Resplandor de fondo */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-magenta/20 blur-[80px]"
              aria-hidden="true"
            />

            <div className="relative flex h-full flex-col gap-7">
              {/* Puntuación CRO */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-faint uppercase">
                    Puntuación CRO
                  </p>
                  <p className={`mt-1 text-sm font-semibold ${verdict.tone}`}>
                    {verdict.label}
                  </p>
                </div>

                {/* Anillo de puntuación */}
                <div className="relative h-20 w-20 shrink-0">
                  <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="none"
                      stroke="#2a3441"
                      strokeWidth="7"
                    />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="none"
                      stroke="#ff13cd"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 34}
                      animate={{
                        strokeDashoffset:
                          2 * Math.PI * 34 * (1 - score / 100),
                      }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Counter
                      value={score}
                      className="text-xl font-bold text-bone tabular-nums"
                    />
                  </div>
                </div>
              </div>

              {/* El número que duele */}
              <div className="rounded-2xl border border-danger/25 bg-danger/[0.07] p-6">
                <p className="text-xs font-semibold tracking-wide text-danger uppercase">
                  Dejas de ganar cada mes
                </p>
                <Counter
                  value={monthlyLoss}
                  suffix={` ${currency}`}
                  className="mt-2 block text-4xl font-bold text-danger tabular-nums sm:text-5xl"
                />
                <p className="mt-3 text-sm text-muted">
                  Es decir,{' '}
                  <span className="font-semibold text-bone">
                    {fmtMoney(yearlyLoss)}
                  </span>{' '}
                  al año que se te escapan.
                </p>
              </div>

              {/* Comparativa */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-line bg-void/60 p-4">
                  <p className="text-xs text-faint">Hoy</p>
                  <Counter
                    value={currentRevenue}
                    suffix={` ${currency}`}
                    className="mt-1 block text-lg font-bold text-muted tabular-nums"
                  />
                </div>
                <div className="rounded-2xl border border-gain/30 bg-gain/[0.07] p-4">
                  <p className="text-xs text-gain">
                    Con +{upliftPoints}% conversión
                  </p>
                  <Counter
                    value={upliftRevenue}
                    suffix={` ${currency}`}
                    className="mt-1 block text-lg font-bold text-gain tabular-nums"
                  />
                </div>
              </div>

              <p className="text-xs leading-relaxed text-faint">
                Subir tu conversión solo {upliftPoints} puntos porcentuales —sin
                gastar un euro más en publicidad— cambia por completo tu cuenta de
                resultados.
              </p>

              <div className="mt-auto pt-2">
                <CTAButton className="w-full">{CALCULATOR.cta}</CTAButton>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
