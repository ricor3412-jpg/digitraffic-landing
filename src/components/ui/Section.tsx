import type { ReactNode } from 'react'
import { Reveal } from './Motion'

/** Envoltorio de sección: ancho máximo, padding vertical y anclaje. */
export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

/** Etiqueta pequeña sobre el titular de sección. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-magenta/30 bg-magenta/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-magenta-soft uppercase">
      {children}
    </span>
  )
}

/** Cabecera estándar de sección: eyebrow + título + subtítulo. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
}) {
  const alignment =
    align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'

  return (
    <Reveal className={`flex max-w-3xl flex-col gap-5 ${alignment}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl leading-[1.1] font-bold sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
