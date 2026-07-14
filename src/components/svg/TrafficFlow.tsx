import { motion, useReducedMotion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   FLUJO: TRÁFICO → SHOPIFY → PEDIDOS
   La animación del hero. Cuenta la tesis de la agencia en un gráfico:
   los visitantes VIAJAN POR LA LÍNEA hasta tu tienda y, al atravesarla,
   salen convertidos en pedidos.

   La clave es que cada elemento recorre la curva de verdad (con offsetPath),
   no se desplaza en recto: si no, no se lee como un flujo.
   ═══════════════════════════════════════════════════════════════ */

const W = 1200
const H = 420
const CX = W / 2
const CY = H / 2
const R = 62 // radio del disco de la tienda

/* Cada carril es una curva continua: entra por la izquierda, toca el centro
   y sale por la derecha. La partimos en dos mitades para poder cambiar de
   "visitante" a "pedido" justo al pasar por el logo. */
const LANES = [
  {
    in: `M -20 60  C 240 70,  380 ${CY - 30}, ${CX - R} ${CY - 18}`,
    out: `M ${CX + R} ${CY - 18} C 850 ${CY - 40}, 980 70,  1240 55`,
  },
  {
    in: `M -20 150 C 260 150, 390 ${CY - 12}, ${CX - R} ${CY - 8}`,
    out: `M ${CX + R} ${CY - 8}  C 840 ${CY - 18}, 960 150, 1240 145`,
  },
  {
    in: `M -20 210 C 220 210, 360 ${CY}, ${CX - R} ${CY}`,
    out: `M ${CX + R} ${CY}      C 860 ${CY}, 1000 210, 1240 210`,
  },
  {
    in: `M -20 270 C 260 270, 390 ${CY + 12}, ${CX - R} ${CY + 8}`,
    out: `M ${CX + R} ${CY + 8}  C 840 ${CY + 18}, 960 270, 1240 275`,
  },
  {
    in: `M -20 360 C 240 350, 380 ${CY + 30}, ${CX - R} ${CY + 18}`,
    out: `M ${CX + R} ${CY + 18} C 850 ${CY + 40}, 980 350, 1240 365`,
  },
]

/* ⚠️ TODO: si tienes fotos reales de clientes, cámbialas por <img>. */
const FACES = ['🧑🏽', '👩🏻', '🧔🏾', '👩🏼‍🦰', '🧑🏿']

/* Duración de un viaje completo (entrada + salida), en segundos */
const TRIP = 7
const HALF = TRIP / 2

export function TrafficFlow() {
  const reduce = useReducedMotion()

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full overflow-visible"
        role="img"
        aria-label="El tráfico que ya tienes entra en tu tienda Shopify y sale convertido en pedidos"
      >
        <defs>
          {/* Los carriles de entrada: grises, tráfico frío */}
          <linearGradient id="laneIn" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2a3441" stopOpacity="0" />
            <stop offset="30%" stopColor="#2a3441" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#475569" stopOpacity="1" />
          </linearGradient>
          {/* Los de salida: magenta, ya son dinero */}
          <linearGradient id="laneOut" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff13cd" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#a4189f" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#740075" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#95bf47" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#5e8e3e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#5e8e3e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Carriles ── */}
        {LANES.map((lane, i) => (
          <g key={i}>
            <motion.path
              d={lane.in}
              fill="none"
              stroke="url(#laneIn)"
              strokeWidth="1.1"
              initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.3 + i * 0.07 }}
            />
            <motion.path
              d={lane.out}
              fill="none"
              stroke="url(#laneOut)"
              strokeWidth="1.3"
              initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.8 + i * 0.07 }}
            />
          </g>
        ))}

        {/* ── El núcleo: la tienda ── */}
        <motion.circle
          cx={CX}
          cy={CY}
          r="130"
          fill="url(#coreGlow)"
          animate={
            reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Onda que sale del centro cada vez que "convierte" */}
        {!reduce && (
          <motion.circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#ff13cd"
            strokeWidth="1.2"
            animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
            transition={{ duration: HALF, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
        )}

        {/* OJO: el disco NO se dibuja aquí. Va en la capa HTML, junto al logo,
            porque el SVG entero queda por debajo de los viajeros y las
            notificaciones le pasarían por encima. */}
      </svg>

      {/* ── Capa HTML: viajeros y logo, posicionados sobre el SVG ──
          Se colocan en % del contenedor y se mueven con offsetPath usando
          las MISMAS curvas del SVG, escaladas al tamaño real.

          ORDEN DE CAPAS: los viajeros van DEBAJO (z-10) y el logo ENCIMA de
          todo (z-30). Así las notificaciones pueden nacer pegadas al disco y
          simplemente pasan por detrás del logo, sin taparlo. Es más simple y
          más robusto que retrasar su aparición. */}
      <div className="pointer-events-none absolute inset-0">
        {/* Viajeros: por debajo del logo */}
        <div className="absolute inset-0 z-10">
          {!reduce &&
            LANES.map((lane, i) => (
              <Traveler
                key={i}
                lane={lane}
                face={FACES[i % FACES.length]}
                delay={i * (TRIP / LANES.length)}
              />
            ))}
        </div>

        {/* El disco + el logo: por encima de todo (z-30).
            El disco es OPACO y vive aquí, no en el SVG: es lo que oculta a las
            notificaciones que pasan por debajo. Si estuviera en el SVG (que va
            al fondo), le pasarían por encima. */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, type: 'spring', bounce: 0.4 }}
          className="absolute top-1/2 left-1/2 z-30 flex h-[clamp(96px,12.4vw,148px)] w-[clamp(96px,12.4vw,148px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-[#0b0f15]"
        >
          <motion.img
            src="/logos/shopify.avif"
            alt="Shopify"
            animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
            transition={{ duration: HALF, repeat: Infinity, ease: 'easeInOut' }}
            className="h-[clamp(40px,5.5vw,68px)] w-auto drop-shadow-[0_0_26px_rgba(149,191,71,0.5)]"
          />
        </motion.div>
      </div>
    </div>
  )
}

/* ── Un visitante que recorre su carril y sale convertido en pedido ──
   Dos fases encadenadas sobre la MISMA línea:
     1. Viaja como persona por la curva de entrada.
     2. Al llegar al logo, se transforma y sale como pedido por la de salida.
   ────────────────────────────────────────────────────────────────── */
function Traveler({
  lane,
  face,
  delay,
}: {
  lane: { in: string; out: string }
  face: string
  delay: number
}) {
  /* offsetPath usa el sistema de coordenadas del viewBox, así que el
     contenedor debe medir 1 unidad de ese sistema para viajar como un punto.

     OJO: ese contenedor mide ~1px, y si el contenido es hijo directo se
     aplasta a ese ancho (la tarjeta salía de 19px y el texto se desbordaba
     sin caja). Por eso el hijo va con `w-max` y posición absoluta: se sale
     del flujo y toma su ancho natural. */
  const common = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: `${(1 / W) * 100}%`,
    height: `${(1 / H) * 100}%`,
    offsetRotate: '0deg' as const,
  }

  return (
    <>
      {/* Fase 1 — la persona entra */}
      <motion.div
        style={{ ...common, offsetPath: `path("${lane.in}")` }}
        initial={{ offsetDistance: '0%', opacity: 0, scale: 0.5 }}
        animate={{
          offsetDistance: ['0%', '100%'],
          opacity: [0, 1, 1, 1, 0],
          scale: [0.5, 1, 1, 1, 0.7],
        }}
        transition={{
          duration: HALF,
          repeat: Infinity,
          repeatDelay: HALF,
          delay,
          ease: 'easeIn',
          times: [0, 0.12, 0.5, 0.85, 1],
        }}
      >
        <div className="absolute top-0 left-0 flex h-[clamp(26px,2.8vw,36px)] w-[clamp(26px,2.8vw,36px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-[#161f2a] text-[clamp(12px,1.4vw,17px)] shadow-lg">
          {face}
        </div>
      </motion.div>

      {/* Fase 2 — sale convertido en pedido, medio ciclo después.
          No hace falta esconderla al principio: el logo va en una capa por
          encima (z-20), así que la notificación puede nacer pegada al disco
          y simplemente pasa por debajo. */}
      <motion.div
        style={{ ...common, offsetPath: `path("${lane.out}")` }}
        initial={{ offsetDistance: '0%', opacity: 0, scale: 0.5 }}
        animate={{
          offsetDistance: ['0%', '100%'],
          opacity: [0, 1, 1, 1, 0],
          scale: [0.5, 1.1, 1, 1, 0.85],
        }}
        transition={{
          duration: HALF,
          repeat: Infinity,
          repeatDelay: HALF,
          delay: delay + HALF, // arranca justo cuando la persona llega al logo
          ease: 'easeOut',
          times: [0, 0.14, 0.4, 0.85, 1],
        }}
      >
        {/* Notificación al estilo de las de Shopify: icono de la app a la
            izquierda, remitente en negrita, el aviso debajo y la hora en la
            esquina. Igual que una notificación del móvil.

            absolute + w-max: se escapa del contenedor de 1px que lleva el
            offsetPath y toma su ancho natural. Sin esto se aplastaba a 19px. */}
        <div className="absolute top-0 left-0 flex w-[clamp(122px,12vw,158px)] -translate-x-1/2 -translate-y-1/2 items-start gap-1.5 rounded-lg border border-white/[0.08] bg-[#1c2530] px-2 py-1.5 shadow-[0_6px_22px_-6px_rgba(0,0,0,0.9)]">
          {/* Icono de la app */}
          <img
            src="/logos/shopify.avif"
            alt=""
            aria-hidden="true"
            className="mt-px h-[clamp(15px,1.5vw,20px)] w-auto shrink-0 rounded"
          />

          <div className="min-w-0 flex-1">
            <p className="text-[clamp(7px,0.7vw,9px)] leading-tight font-bold text-white">
              Shopify
            </p>
            <p className="mt-px text-[clamp(6px,0.6vw,8px)] leading-snug text-slate-400">
              Tienes un nuevo pedido de 2 artículos por un total de $ 189.900
            </p>
          </div>

          <span className="shrink-0 text-[clamp(5px,0.5vw,7px)] leading-tight text-slate-500">
            ahora
          </span>
        </div>
      </motion.div>
    </>
  )
}
