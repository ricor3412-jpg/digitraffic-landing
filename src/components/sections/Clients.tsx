import { motion, useReducedMotion } from 'framer-motion'
import { CLIENTS, CLIENTS_HEADLINE, type Client } from '@/lib/config'
import { Reveal } from '@/components/ui/Motion'

/* Marquesina de tarjetas rectangulares: cada foto ya trae el logo del cliente
   incrustado. La tarjeta enlaza a la web real cuando CLIENTS[i].url existe. */

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
  const { name, image, url } = client

  /* La foto ya trae el logo del cliente incrustado, así que no se superpone
     ni texto ni logo: solo un velo sutil para dar profundidad y unificar
     las tarjetas. Si hay url, toda la tarjeta es un enlace a la web real. */
  const card = (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-line/60">
      {image ? (
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        /* Placeholder: degradado de marca + retícula + nombre */
        <>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}
          />
          <div className="bg-grid absolute inset-0 opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <span className="text-center text-lg font-bold tracking-tight text-white/85">
              {name}
            </span>
          </div>
        </>
      )}

      {/* Velo sutil en reposo; al pasar el mouse se desvanece y la foto se ilumina */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
    </div>
  )

  return (
    <li className="w-[240px] shrink-0 px-3 sm:w-[280px]">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver el sitio de ${name}`}
          className="block outline-none focus-visible:ring-2 focus-visible:ring-magenta/70 rounded-2xl"
        >
          {card}
        </a>
      ) : (
        card
      )}
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
