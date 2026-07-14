import { motion, useReducedMotion } from 'framer-motion'
import { CLIENTS, CLIENTS_HEADLINE } from '@/lib/config'
import { Reveal } from '@/components/ui/Motion'

/* Marquesina infinita de logos de clientes.
   ⚠️ TODO: los logos son placeholders. Ver CLIENTS en src/lib/config.ts */

function LogoItem({ name, logo }: { name: string; logo: string | null }) {
  return (
    <li className="flex shrink-0 items-center justify-center px-8 sm:px-12">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="h-8 w-auto opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        /* Placeholder tipográfico mientras no haya logo real */
        <span className="text-lg font-bold whitespace-nowrap text-faint transition-colors duration-300 hover:text-muted">
          {name}
        </span>
      )}
    </li>
  )
}

export function Clients() {
  const reduce = useReducedMotion()

  return (
    <section className="relative border-y border-line/50 py-16">
      <Reveal className="mb-10 px-5 text-center">
        <p className="text-sm text-faint">{CLIENTS_HEADLINE}</p>
      </Reveal>

      <div className="relative overflow-hidden">
        {/* Difuminado en los bordes para que entren y salgan con suavidad */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent"
          aria-hidden="true"
        />

        {reduce ? (
          /* Sin movimiento: rejilla estática */
          <ul className="flex flex-wrap items-center justify-center gap-y-6">
            {CLIENTS.map((c) => (
              <LogoItem key={c.name} {...c} />
            ))}
          </ul>
        ) : (
          <motion.ul
            className="flex w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {/* Se duplica la lista para que el bucle sea continuo */}
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <LogoItem key={`${c.name}-${i}`} {...c} />
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  )
}
