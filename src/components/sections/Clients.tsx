import { motion, useReducedMotion } from 'framer-motion'
import { CLIENTS, CLIENTS_HEADLINE, type Client } from '@/lib/config'
import { Reveal } from '@/components/ui/Motion'

/* Marquesina de tarjetas rectangulares: foto de fondo con el logo encima.
   ⚠️ TODO: imágenes y logos son placeholders. Ver CLIENTS en src/lib/config.ts */

/* Degradados de marca, para que un placeholder no se vea igual que el siguiente. */
const GRADIENTS = [
  'from-magenta/35 via-purple/25 to-void',
  'from-purple/40 via-magenta/20 to-void',
  'from-magenta-deep/35 via-ink to-void',
  'from-purple-soft/30 via-purple/25 to-void',
  'from-magenta/25 via-magenta-deep/30 to-void',
  'from-purple/35 via-ink to-void',
  'from-magenta-soft/25 via-purple/30 to-void',
]

function ClientCard({ client, index }: { client: Client; index: number }) {
  const { name, image, logo } = client

  return (
    <li className="w-[240px] shrink-0 px-3 sm:w-[280px]">
      <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-line/60">
        {image ? (
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* Placeholder: degradado de marca + retícula */
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}
            />
            <div className="bg-grid absolute inset-0 opacity-30" />
          </>
        )}

        {/* Velo, para que el logo siempre se lea sobre cualquier foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        {/* Logo (o el nombre, si aún no hay logo) */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {logo ? (
            <img
              src={logo}
              alt={name}
              className="max-h-10 w-auto max-w-[70%] object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          ) : (
            <span className="text-center text-lg font-bold tracking-tight text-white/85 transition-colors duration-300 group-hover:text-white">
              {name}
            </span>
          )}
        </div>
      </div>
    </li>
  )
}

export function Clients() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-y border-line/50 py-16">
      <Reveal className="mb-10 px-5 text-center">
        <p className="text-sm text-faint">{CLIENTS_HEADLINE}</p>
      </Reveal>

      <div className="relative">
        {/* Difuminado en los bordes: las tarjetas entran y salen con suavidad */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-void to-transparent sm:w-32"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-void to-transparent sm:w-32"
          aria-hidden="true"
        />

        {reduce ? (
          /* Sin movimiento: scroll manual */
          <ul className="flex snap-x snap-mandatory overflow-x-auto pb-2">
            {CLIENTS.map((c, i) => (
              <ClientCard key={c.name} client={c} index={i} />
            ))}
          </ul>
        ) : (
          <motion.ul
            className="flex w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {/* Lista duplicada para que el bucle sea continuo */}
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <ClientCard key={`${c.name}-${i}`} client={c} index={i} />
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  )
}
