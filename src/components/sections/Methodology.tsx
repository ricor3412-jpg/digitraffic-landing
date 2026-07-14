import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { METHODOLOGY } from '@/lib/config'

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

                <div className="flex flex-col gap-3">
                  <span className="inline-flex w-fit rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold text-magenta-soft">
                    {step.tag}
                  </span>
                  <h3 className="text-xl font-bold text-bone sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {step.body}
                  </p>
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
