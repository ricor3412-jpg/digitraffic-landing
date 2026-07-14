import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Pulse, Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { Counter } from '@/components/ui/Counter'
import { CALCULATOR } from '@/lib/config'
import { CURRENCY, formatCOP, splitCOPShort } from '@/lib/money'

const { defaults, ranges, upliftPoints } = CALCULATOR

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

/** Cifra grande en COP abreviado, con el número animado. */
function BigMoney({ value, className }: { value: number; className?: string }) {
  const { amount, decimals, unit } = splitCOPShort(value)

  return (
    <span className={className}>
      <span className="mr-1 text-[0.6em] align-top">{CURRENCY}</span>
      <Counter value={amount} decimals={decimals} suffix={unit} />
    </span>
  )
}

export function Calculator() {
  const reduce = useReducedMotion()

  /* El tipo explícito es necesario: config.ts usa `as const`, así que
     defaults.sessions se infiere como el literal 50000 y no como number. */
  const [sessions, setSessions] = useState<number>(defaults.sessions)
  const [cvr, setCvr] = useState<number>(defaults.conversionRate)
  const [aov, setAov] = useState<number>(defaults.averageOrderValue)

  /* El modelo es RELACIONAL: los pedidos no son un dato suelto, salen de
     sesiones × conversión. Por eso, al subir la conversión suben también los
     pedidos, y con ellos la facturación. Eso es justo lo que vendemos. */
  const m = useMemo(() => {
    const orders = (sessions * cvr) / 100
    const revenue = orders * aov

    const cvrUp = cvr + upliftPoints
    const ordersUp = (sessions * cvrUp) / 100
    const revenueUp = ordersUp * aov

    const extraOrders = ordersUp - orders
    const monthlyLoss = revenueUp - revenue

    /* Puntuación CRO 0–100. Referencia del sector: ~3 % es bueno en ecommerce. */
    const score = Math.max(4, Math.min(100, Math.round((cvr / 3) * 100)))

    return {
      orders,
      revenue,
      cvrUp,
      ordersUp,
      revenueUp,
      extraOrders,
      monthlyLoss,
      yearlyLoss: monthlyLoss * 12,
      score,
    }
  }, [sessions, cvr, aov])

  const verdict =
    m.score >= 75
      ? { label: 'Vas bien, pero hay margen', tone: 'text-gain' }
      : m.score >= 40
        ? { label: 'Estás dejando dinero sobre la mesa', tone: 'text-amber-400' }
        : { label: 'Estás perdiendo dinero', tone: 'text-danger' }

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
            <div className="mb-8 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold tracking-wide text-faint uppercase">
                Tus números actuales
              </p>
              <span className="font-hand text-lg leading-none whitespace-nowrap text-magenta-soft">
                ¡muévelos! 👆
              </span>
            </div>

            <div className="flex flex-col gap-8">
              <Slider
                label="Sesiones / mes"
                value={sessions}
                min={ranges.sessions.min}
                max={ranges.sessions.max}
                step={ranges.sessions.step}
                onChange={setSessions}
                format={(v) => v.toLocaleString('es-CO')}
              />
              <Slider
                label="Tasa de conversión"
                value={cvr}
                min={ranges.conversionRate.min}
                max={ranges.conversionRate.max}
                step={ranges.conversionRate.step}
                onChange={setCvr}
                format={(v) => `${v.toFixed(1)} %`}
              />
              <Slider
                label="Ticket promedio"
                value={aov}
                min={ranges.averageOrderValue.min}
                max={ranges.averageOrderValue.max}
                step={ranges.averageOrderValue.step}
                onChange={setAov}
                format={formatCOP}
              />
            </div>

            {/* Resultado derivado: se ve que los pedidos SALEN de los sliders */}
            <div className="mt-8 border-t border-line pt-6">
              <p className="mb-4 font-mono text-[10px] tracking-wide text-faint uppercase">
                sesiones × conversión = pedidos
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-faint">Pedidos / mes</p>
                  <Counter
                    value={m.orders}
                    className="mt-1 block text-xl font-bold text-bone tabular-nums"
                  />
                </div>
                <div>
                  <p className="text-xs text-faint">Facturación actual</p>
                  <BigMoney
                    value={m.revenue}
                    className="mt-1 block text-xl font-bold text-bone tabular-nums"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Panel de resultados ── */}
          <div className="relative overflow-hidden rounded-3xl border border-magenta/30 bg-gradient-to-br from-surface to-void p-7 sm:p-8">
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-magenta/20 blur-[80px]"
              aria-hidden="true"
            />

            <div className="relative flex h-full flex-col gap-6">
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
                        strokeDashoffset: 2 * Math.PI * 34 * (1 - m.score / 100),
                      }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Counter
                      value={m.score}
                      className="text-xl font-bold text-bone tabular-nums"
                    />
                  </div>
                </div>
              </div>

              {/* El número que duele */}
              <motion.div
                animate={
                  reduce
                    ? undefined
                    : {
                        borderColor: [
                          'rgb(255 77 109 / 0.25)',
                          'rgb(255 77 109 / 0.6)',
                          'rgb(255 77 109 / 0.25)',
                        ],
                      }
                }
                transition={{ duration: 2.6, repeat: Infinity }}
                className="rounded-2xl border border-danger/25 bg-danger/[0.07] p-6"
              >
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-danger uppercase">
                  <Pulse className="bg-danger" size="h-1.5 w-1.5" />
                  Dejas de ganar cada mes
                </p>
                <BigMoney
                  value={m.monthlyLoss}
                  className="mt-2 block text-4xl font-bold text-danger tabular-nums sm:text-5xl"
                />
                <p className="mt-3 text-sm text-muted">
                  Es decir,{' '}
                  <span className="font-semibold text-bone">
                    {formatCOP(m.yearlyLoss)}
                  </span>{' '}
                  al año que se te escapan.
                </p>
              </motion.div>

              {/* Comparativa: aquí se ve que TODO sube en cadena */}
              <div className="overflow-hidden rounded-2xl border border-line">
                <div className="grid grid-cols-3 gap-px bg-line">
                  <div className="bg-void/70 p-3">
                    <p className="text-[10px] text-faint">&nbsp;</p>
                  </div>
                  <div className="bg-void/70 p-3">
                    <p className="text-[10px] font-semibold text-muted">Hoy</p>
                  </div>
                  <div className="bg-gain/[0.08] p-3">
                    <p className="text-[10px] font-semibold whitespace-nowrap text-gain">
                      +{upliftPoints} pts
                    </p>
                  </div>

                  {/* Conversión */}
                  <div className="bg-void/70 px-3 py-2.5">
                    <p className="text-[11px] text-faint">Conversión</p>
                  </div>
                  <div className="bg-void/70 px-3 py-2.5">
                    <span className="font-mono text-[13px] font-semibold text-muted tabular-nums">
                      {cvr.toFixed(1)} %
                    </span>
                  </div>
                  <div className="bg-gain/[0.08] px-3 py-2.5">
                    <span className="font-mono text-[13px] font-bold text-gain tabular-nums">
                      {m.cvrUp.toFixed(1)} %
                    </span>
                  </div>

                  {/* Pedidos — el eslabón que faltaba */}
                  <div className="bg-void/70 px-3 py-2.5">
                    <p className="text-[11px] text-faint">Pedidos</p>
                  </div>
                  <div className="bg-void/70 px-3 py-2.5">
                    <Counter
                      value={m.orders}
                      className="font-mono text-[13px] font-semibold text-muted tabular-nums"
                    />
                  </div>
                  <div className="bg-gain/[0.08] px-3 py-2.5">
                    <Counter
                      value={m.ordersUp}
                      className="font-mono text-[13px] font-bold text-gain tabular-nums"
                    />
                  </div>

                  {/* Facturación */}
                  <div className="bg-void/70 px-3 py-2.5">
                    <p className="text-[11px] text-faint">Facturación</p>
                  </div>
                  <div className="bg-void/70 px-3 py-2.5">
                    <BigMoney
                      value={m.revenue}
                      className="font-mono text-[13px] font-semibold text-muted tabular-nums"
                    />
                  </div>
                  <div className="bg-gain/[0.08] px-3 py-2.5">
                    <BigMoney
                      value={m.revenueUp}
                      className="font-mono text-[13px] font-bold text-gain tabular-nums"
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-faint">
                Subir la conversión {upliftPoints} puntos son{' '}
                <span className="font-semibold text-bone">
                  <Counter value={m.extraOrders} decimals={0} /> pedidos más
                </span>{' '}
                cada mes con el mismo tráfico. Sin gastar un peso más en
                publicidad.
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
