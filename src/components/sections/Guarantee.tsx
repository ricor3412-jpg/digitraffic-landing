import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { GUARANTEE } from '@/lib/config'

export function Guarantee() {
  return (
    <Section>
      <Reveal>
        <div className="border-gradient relative overflow-hidden rounded-[2rem] p-10 sm:p-14">
          {/* Resplandor */}
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-magenta/20 blur-[90px]"
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center gap-6 text-center">
            {/* Escudo */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-magenta/30 bg-magenta/10">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-magenta"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2l8 3.5v6c0 4.6-3.4 8.4-8 9.5-4.6-1.1-8-4.9-8-9.5v-6L12 2z" />
                <path d="M8.5 12l2.5 2.5 4.5-5" />
              </svg>
            </div>

            <h2 className="max-w-2xl text-2xl leading-tight font-bold sm:text-4xl">
              {GUARANTEE.title}
            </h2>

            <p className="max-w-2xl text-base leading-relaxed text-muted">
              {GUARANTEE.body}
            </p>

            <div className="mt-2">
              <CTAButton>{GUARANTEE.cta}</CTAButton>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
