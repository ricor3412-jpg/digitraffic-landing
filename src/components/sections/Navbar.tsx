import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CTAButton } from '@/components/ui/Button'
import { NAV_LINKS } from '@/lib/config'

/* Iconos del dock, uno por sección. */
const ICONS: Record<string, React.ReactNode> = {
  '#hero': (
    <>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </>
  ),
  '#problemas': (
    <>
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
    </>
  ),
  '#soluciones': (
    <>
      <path d="M9 18h6M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
    </>
  ),
  '#calculadora': (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v3" />
    </>
  ),
  '#metodologia': (
    <>
      <path d="M4 6h16M4 12h16M4 18h10" />
    </>
  ),
  '#faq': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7v.2M12 17h.01" />
    </>
  ),
}

export function Navbar() {
  const [active, setActive] = useState<string>('#hero')
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  /* El dock se esconde al llegar al final, para no tapar el CTA de cierre. */
  useMotionValueEvent(scrollY, 'change', (y) => {
    const nearBottom =
      y + window.innerHeight > document.body.scrollHeight - 220
    setHidden(nearBottom)
  })

  /* Scroll spy: ilumina la sección que estás mirando. */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href),
    ).filter(Boolean) as Element[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: hidden ? 120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:pb-6"
      >
      <nav
        aria-label="Navegación principal"
        className="flex items-center gap-1 rounded-2xl border border-line bg-void/85 p-1.5 shadow-2xl backdrop-blur-xl"
      >
        {NAV_LINKS.map((link) => {
          const isActive = active === link.href

          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-colors duration-300 sm:px-4 ${
                isActive ? 'text-bone' : 'text-faint hover:text-muted'
              }`}
            >
              {/* Píldora que se desliza a la sección activa */}
              {isActive && (
                <motion.span
                  layoutId="dock-activo"
                  className="absolute inset-0 rounded-xl bg-white/[0.07]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}

              <svg
                viewBox="0 0 24 24"
                className="relative h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[link.href]}
              </svg>

              <span className="relative hidden text-[10px] font-medium sm:block">
                {link.label}
              </span>
            </a>
          )
        })}

          {/* CTA pegado al dock. También en móvil: la barra del hero se va con
              el scroll, así que sin esto el visitante se queda SIN ningún botón
              visible en cuanto baja — en una landing de conversión, fatal. */}
          <div className="ml-1">
            <CTAButton
              size="md"
              className="!rounded-xl !px-3 !py-2.5 !text-[11px] sm:!px-4 sm:!text-xs"
            >
              <span className="sm:hidden">Agendar</span>
              <span className="hidden sm:inline">Trabajemos juntos</span>
            </CTAButton>
          </div>
        </nav>
      </motion.header>
    </>
  )
}
