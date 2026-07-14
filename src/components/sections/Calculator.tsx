import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { Counter } from '@/components/ui/Counter'
import { CALCULATOR } from '@/lib/config'
import { CURRENCY, formatCOP, formatPercent, splitCOPShort } from '@/lib/money'

const { defaults, ranges, benchmark } = CALCULATOR

/* ═══════════════════════════════════════════════════════════════
   LA LÓGICA, EN UNA FRASE

   facturación = sesiones × conversión × ticket

   De ahí sale la única pregunta que importa, y que casi ningún dueño de
   tienda se ha parado a calcular:

     ¿cuánto factura mi tienda por cada DÉCIMA de conversión?
       = sesiones × 0,1 % × ticket

   No prometemos nada. Solo le enseñamos lo que vale su propio punto.
   ═══════════════════════════════════════════════════════════════ */

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

/* El rango de PEDIDOS se deriva de las sesiones: sus extremos son los que
   producen la conversión mínima y máxima. Así el slider nunca puede pedir una
   conversión imposible. */
function ordersRange(sessions: number) {
  const min = Math.max(
    1,
    Math.round((sessions * ranges.conversionRate.min) / 100),
  )
  const max = Math.round((sessions * ranges.conversionRate.max) / 100)
  return { min, max, step: Math.max(1, Math.round(max / 500)) }
}

/* ── Iconos ─────────────────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  sessions: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  orders: (
    <>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  cvr: (
    <>
      <path d="M19 5L5 19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </>
  ),
  aov: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
}

/* ── Slider ─────────────────────────────────────────────────── */
function Slider({
  icon,
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  icon: React.ReactNode
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
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={`slider-${label}`}
          className="flex items-center gap-2.5 text-sm font-medium text-muted"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-void/60">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 text-magenta-soft"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {icon}
            </svg>
          </span>
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

/** Cifra en COP abreviado, con el número animado. */
function Money({ value, className }: { value: number; className?: string }) {
  const { amount, decimals, unit } = splitCOPShort(value)
  return (
    <span className={className}>
      <span className="mr-1 align-top text-[0.55em]">{CURRENCY}</span>
      <Counter value={amount} decimals={decimals} suffix={unit} />
    </span>
  )
}

export function Calculator() {
  const reduce = useReducedMotion()

  const [sessions, setSessions] = useState<number>(defaults.sessions)
  const [orders, setOrders] = useState<number>(defaults.orders)
  const [cvr, setCvr] = useState<number>(defaults.conversionRate)
  const [aov, setAov] = useState<number>(defaults.averageOrderValue)

  const oRange = useMemo(() => ordersRange(sessions), [sessions])

  /* ── Los 4 sliders están ligados por pedidos = sesiones × conversión ──
     Al mover uno, se ajusta el que corresponde. El ticket es independiente. */
  function changeSessions(next: number) {
    setSessions(next)
    setOrders(Math.max(1, Math.round((next * cvr) / 100)))
  }
  function changeOrders(next: number) {
    setOrders(next)
    setCvr(
      clamp(
        +((next / sessions) * 100).toFixed(2),
        ranges.conversionRate.min,
        ranges.conversionRate.max,
      ),
    )
  }
  function changeCvr(next: number) {
    setCvr(next)
    setOrders(Math.max(1, Math.round((sessions * next) / 100)))
  }

  const m = useMemo(() => {
    const revenue = orders * aov

    /* LA CIFRA CLAVE: lo que factura una décima de punto de conversión.
       No es una promesa, es una propiedad de SU tienda. */
    const perTenth = sessions * 0.001 * aov
    const perPoint = perTenth * 10

    /* Dónde está respecto al sector (para situarle, no para venderle) */
    const vsAverage = cvr / benchmark.average

    return {
      revenue,
      yearly: revenue * 12,
      perTenth,
      perPoint,
      perPointYearly: perPoint * 12,
      vsAverage,
      isAbove: cvr >= benchmark.good,
      isBelow: cvr < benchmark.average,
    }
  }, [sessions, orders, cvr, aov])

  return (
    <Section id="calculadora">
      <SectionHeader
        eyebrow="La calculadora"
        title={
          <>
            ¿Cuánto vale{' '}
            <span className="text-gradient">un punto de conversión</span> en tu
            tienda?
          </>
        }
        subtitle={CALCULATOR.subtitle}
      />

      <Reveal className="mt-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          {/* ── Entradas ── */}
          <div className="rounded-3xl border border-line bg-surface/50 p-7 sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold tracking-wide text-faint uppercase">
                Tus números
              </p>
              <span className="font-hand text-lg leading-none whitespace-nowrap text-magenta-soft">
                ¡muévelos! 👆
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <Slider
                icon={ICONS.sessions}
                label="Sesiones / mes"
                value={sessions}
                min={ranges.sessions.min}
                max={ranges.sessions.max}
                step={ranges.sessions.step}
                onChange={changeSessions}
                format={(v) => v.toLocaleString('es-CO')}
              />
              <Slider
                icon={ICONS.orders}
                label="Pedidos / mes"
                value={orders}
                min={oRange.min}
                max={oRange.max}
                step={oRange.step}
                onChange={changeOrders}
                format={(v) => v.toLocaleString('es-CO')}
              />
              <Slider
                icon={ICONS.cvr}
                label="Tasa de conversión"
                value={cvr}
                min={ranges.conversionRate.min}
                max={ranges.conversionRate.max}
                step={ranges.conversionRate.step}
                onChange={changeCvr}
                format={(v) => formatPercent(v, 2)}
              />
              <Slider
                icon={ICONS.aov}
                label="Ticket promedio"
                value={aov}
                min={ranges.averageOrderValue.min}
                max={ranges.averageOrderValue.max}
                step={ranges.averageOrderValue.step}
                onChange={setAov}
                format={formatCOP}
              />
            </div>

            <p className="mt-7 border-t border-line pt-5 font-mono text-[10px] leading-relaxed text-faint">
              pedidos = sesiones × conversión —{' '}
              <span className="text-muted">
                mueve cualquiera y los demás se ajustan
              </span>
            </p>
          </div>

          {/* ── Resultado ── */}
          <div className="relative overflow-hidden rounded-3xl border border-magenta/30 bg-gradient-to-br from-surface to-void p-7 sm:p-8">
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-magenta/20 blur-[80px]"
              aria-hidden="true"
            />

            <div className="relative flex h-full flex-col gap-6">
              {/* Facturación actual: el punto de partida, sin dramas */}
              <div>
                <p className="text-xs font-semibold tracking-wide text-faint uppercase">
                  Facturas al mes
                </p>
                <Money
                  value={m.revenue}
                  className="mt-1 block text-2xl font-bold text-bone tabular-nums"
                />
                <p className="mt-1 text-xs text-faint">
                  {formatCOP(m.yearly)} al año
                </p>
              </div>

              {/* LA CIFRA: cuánto vale su punto de conversión */}
              <motion.div
                animate={
                  reduce
                    ? undefined
                    : {
                        borderColor: [
                          'rgb(255 19 205 / 0.3)',
                          'rgb(255 19 205 / 0.65)',
                          'rgb(255 19 205 / 0.3)',
                        ],
                      }
                }
                transition={{ duration: 2.8, repeat: Infinity }}
                className="rounded-2xl border border-magenta/30 bg-magenta/[0.07] p-6"
              >
                <p className="text-xs font-semibold tracking-wide text-magenta-soft uppercase">
                  Cada punto de conversión te vale
                </p>
                <Money
                  value={m.perPoint}
                  className="mt-2 block text-4xl font-bold text-magenta-soft tabular-nums sm:text-5xl"
                />
                <p className="mt-2 text-sm text-muted">
                  al mes. Son{' '}
                  <span className="font-semibold text-bone">
                    {formatCOP(m.perPointYearly)}
                  </span>{' '}
                  al año.
                </p>
              </motion.div>

              {/* La escala: qué compra cada décima */}
              <div className="rounded-2xl border border-line bg-void/60 p-5">
                <p className="text-[11px] text-faint">
                  Incluso una sola décima —de {formatPercent(cvr, 1)} a{' '}
                  {formatPercent(cvr + 0.1, 1)}— son{' '}
                  <span className="font-semibold text-gain">
                    <Money value={m.perTenth} />
                  </span>{' '}
                  más cada mes, con el mismo tráfico y sin gastar un peso más en
                  publicidad.
                </p>
              </div>

              {/* Dónde está respecto al sector — informativo, no acusatorio */}
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-void/40 px-5 py-4">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    m.isAbove
                      ? 'bg-gain'
                      : m.isBelow
                        ? 'bg-amber-400'
                        : 'bg-muted'
                  }`}
                />
                <p className="text-[11px] leading-relaxed text-muted">
                  La media del e-commerce ronda el{' '}
                  {formatPercent(benchmark.average, 1)}.{' '}
                  {m.isAbove ? (
                    <span className="font-semibold text-bone">
                      Tú estás por encima.
                    </span>
                  ) : m.isBelow ? (
                    <span className="font-semibold text-bone">
                      Tú estás por debajo.
                    </span>
                  ) : (
                    <span className="font-semibold text-bone">
                      Estás en la media.
                    </span>
                  )}
                </p>
              </div>

              <div className="mt-auto pt-1">
                <CTAButton className="w-full">{CALCULATOR.cta}</CTAButton>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
