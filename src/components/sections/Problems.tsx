import { motion, useMotionValue, useReducedMotion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Stagger, StaggerItem, Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { PROBLEM_MOCKUPS } from '@/components/svg/Mockups'
import { PROBLEMS } from '@/lib/config'

/* Icono por problema. Cada uno es un SVG original y simple. */
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
  cac: (
    <>
      <path d="M12 2v20M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </>
  ),
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

function ProblemCard({
  id,
  title,
  body,
  index,
}: {
  id: string
  title: string
  body: string
  index: number
}) {
  const reduce = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <StaggerItem className="h-full">
      <div
        onMouseMove={handleMouseMove}
        className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface/50 p-6 transition-colors duration-300 hover:border-danger/40"
      >
        {/* Resplandor que sigue al cursor */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(340px circle at var(--x) var(--y), rgb(255 77 109 / 0.10), transparent 70%)`,
              // @ts-expect-error — variables CSS custom para el gradiente
              '--x': mouseX,
              '--y': mouseY,
            }}
          />
        )}

        <div className="relative flex h-full flex-col gap-4">
          {/* Escena: muestra el problema en vez de describirlo */}
          <div className="min-h-[124px] rounded-2xl border border-line/60 bg-void/50 p-3">
            {PROBLEM_MOCKUPS[id]}
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

          {/* Número de fondo */}
          <span
            className="pointer-events-none absolute -right-1 -bottom-4 font-display text-6xl font-bold text-white/[0.03]"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </StaggerItem>
  )
}

export function Problems() {
  return (
    <Section id="problemas">
      <SectionHeader
        eyebrow="El diagnóstico"
        title={
          <>
            ¿Por qué tu tienda{' '}
            <span className="text-danger">no vende lo que debería</span>?
          </>
        }
        subtitle={PROBLEMS.subtitle}
      />

      {/* 2 columnas (no 3): los mockups necesitan sitio para respirar */}
      <Stagger className="mt-16 grid gap-5 md:grid-cols-2">
        {PROBLEMS.items.map((p, i) => (
          <ProblemCard key={p.id} {...p} index={i} />
        ))}
      </Stagger>

      <Reveal className="mt-14 flex justify-center" delay={0.15}>
        <CTAButton>{PROBLEMS.cta}</CTAButton>
      </Reveal>
    </Section>
  )
}
