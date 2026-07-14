import { Reveal } from '@/components/ui/Motion'
import { CTAButton } from '@/components/ui/Button'
import { GlowOrb } from '@/components/svg/Visuals'
import { COMPANY, FINAL_CTA, NAV_LINKS } from '@/lib/config'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-36">
      <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <GlowOrb className="bottom-[-30%] left-1/2 h-[560px] w-[560px] -translate-x-1/2 bg-magenta/25" />

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
        <h2 className="text-3xl leading-[1.1] font-bold sm:text-5xl md:text-6xl">
          Hagamos que tu tienda{' '}
          <span className="text-gradient">facture el doble</span>.
        </h2>

        <p className="text-lg text-muted sm:text-xl">{FINAL_CTA.subtitle}</p>

        <div className="mt-2">
          <CTAButton size="lg">{FINAL_CTA.cta}</CTAButton>
        </div>

        <p className="text-xs text-faint">{COMPANY.scarcity}</p>
      </Reveal>
    </section>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    /* pb generoso: el dock flotante vive abajo y no debe tapar el footer */
    <footer className="border-t border-line px-5 pt-12 pb-28 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <a href="#hero">
          <img
            src="/brand/logo-horizontal-blanco.svg"
            alt="Digitraffic"
            className="h-7 w-auto"
          />
        </a>

        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-faint transition-colors hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-faint">
          © {year} {COMPANY.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
