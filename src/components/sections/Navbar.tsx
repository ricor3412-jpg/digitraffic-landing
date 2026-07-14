import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { CTAButton } from '@/components/ui/Button'
import { NAV_LINKS } from '@/lib/config'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-5 py-3 transition-all duration-500 ${
          scrolled
            ? 'border-line bg-void/80 shadow-2xl backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        {/* Versión blanca del logo: la horizontal por defecto lleva el texto en
            #161F2A y sobre fondo oscuro es ilegible. */}
        <a href="#hero" className="shrink-0" aria-label="Digitraffic — inicio">
          <img
            src="/brand/logo-horizontal-blanco.svg"
            alt="Digitraffic"
            className="h-7 w-auto"
          />
        </a>

        {/* Enlaces (escritorio) */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-bone"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <CTAButton size="md">Trabajemos juntos</CTAButton>
          </div>

          {/* Botón hamburguesa (móvil) */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-bone lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
              <motion.path
                d={menuOpen ? 'M5 5l10 10' : 'M3 6h14'}
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <motion.path
                d={menuOpen ? 'M15 5L5 15' : 'M3 12h14'}
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú desplegable (móvil) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-line bg-void/95 p-3 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="p-2 pt-3 sm:hidden">
              <CTAButton size="md" className="w-full">
                Trabajemos juntos
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
