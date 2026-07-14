import { Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import {
  AOVBars,
  OrdersList,
  RisingChart,
  SaleNotification,
} from '@/components/svg/Visuals'
import { SOLUTIONS } from '@/lib/config'

/* Cada solución trae su propio visual animado. */
const VISUALS = {
  notification: (
    <div className="flex flex-col items-center gap-6">
      <RisingChart />
      <SaleNotification />
    </div>
  ),
  aov: <AOVBars />,
  orders: <OrdersList />,
} as const

export function Solutions() {
  return (
    <Section id="soluciones" className="overflow-hidden">
      <SectionHeader
        eyebrow="La solución"
        title={
          <>
            Sabemos cómo hacer que tu web{' '}
            <span className="text-gradient">venda más</span> sin que gastes más
          </>
        }
        subtitle={SOLUTIONS.subtitle}
      />

      <div className="mt-20 flex flex-col gap-20 md:gap-28">
        {SOLUTIONS.items.map((item, i) => {
          const flipped = i % 2 === 1

          return (
            <div
              key={item.id}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              {/* Texto */}
              <Reveal className={flipped ? 'md:order-2' : ''}>
                <div className="flex flex-col items-start gap-5">
                  <span className="font-mono text-xs font-semibold text-magenta">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl leading-tight font-bold sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>

              {/* Visual */}
              <Reveal
                delay={0.15}
                className={flipped ? 'md:order-1' : ''}
              >
                <div className="relative flex min-h-[220px] items-center justify-center rounded-3xl border border-line bg-surface/40 p-7">
                  {/* Resplandor de fondo */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-magenta/[0.07] to-purple/[0.07]"
                    aria-hidden="true"
                  />
                  <div className="relative w-full">{VISUALS[item.visual]}</div>
                </div>
              </Reveal>
            </div>
          )
        })}
      </div>

      <Reveal className="mt-16 flex justify-center" delay={0.1}>
        <CTAButton>{SOLUTIONS.cta}</CTAButton>
      </Reveal>
    </Section>
  )
}
