import { motion, useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '@/lib/useMediaQuery'

/* ═══════════════════════════════════════════════════════════════
   FLUJO: TRÁFICO → SHOPIFY → PEDIDOS
   Los visitantes VIAJAN POR LA LÍNEA hasta la tienda y, al atravesarla,
   salen convertidos en pedidos.

   Hay DOS composiciones, no una escalada:
     · Escritorio → flujo horizontal (entra por la izquierda, sale por la
       derecha). Lienzo apaisado.
     · Móvil      → flujo VERTICAL (baja desde arriba, sale por abajo).
       Un lienzo apaisado en una pantalla estrecha se comprime a una franja
       de ~120px y la animación se rompe: las notificaciones (129px de ancho)
       no caben, las líneas se amontonan y el logo queda diminuto.
       No se arregla escalando; hay que replantear la composición.
   ═══════════════════════════════════════════════════════════════ */

/* ⚠️ TODO: si tienes fotos reales de clientes, cámbialas por <img>. */
const FACES = ['🧑🏽', '👩🏻', '🧔🏾', '👩🏼‍🦰', '🧑🏿']

/* Duración de un viaje completo (entrada + salida), en segundos */
const TRIP = 7
const HALF = TRIP / 2

type Lane = { in: string; out: string }
type Layout = {
  W: number
  H: number
  CX: number
  CY: number
  R: number
  lanes: Lane[]
  /** Cuántos carriles llevan notificación (en móvil no caben todas) */
  notifs: number
  /** Qué carriles concretos la llevan. Si se omite, los `notifs` primeros. */
  notifLanes?: number[]
}

/* ── Escritorio: apaisado, flujo de izquierda a derecha ── */
const DESKTOP: Layout = (() => {
  const W = 1200
  const H = 420
  const CX = W / 2
  const CY = H / 2
  const R = 62
  return {
    W,
    H,
    CX,
    CY,
    R,
    notifs: 5,
    lanes: [
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
    ],
  }
})()

/* ── Móvil: vertical, el tráfico BAJA y los pedidos salen abajo ── */
const MOBILE: Layout = (() => {
  const W = 420
  /* Más cuadrado que alto: el hero móvil tiene que caber en una pantalla
     junto al titular, el CTA y el dock. Con H=620 el hero se iba a 1053px,
     por encima de los 844 de un móvil típico. */
  const H = 470
  const CX = W / 2
  const CY = H / 2
  const R = 58
  return {
    W,
    H,
    CX,
    CY,
    R,
    /* Solo 2 notificaciones: 3 se solaparían en una pantalla estrecha */
    notifs: 2,
    /* Y van en los carriles LATERALES (0 y 2), que se abren en abanico: el
       carril central baja recto y su notificación acabaría bajo el dock. */
    notifLanes: [0, 2],
    lanes: [
      /* Las salidas se abren en abanico hacia los lados y no bajan hasta el
         borde: el dock flotante vive abajo y taparía las notificaciones. */
      {
        in: `M 40 -20  C 55 110,  ${CX - 26} ${CY - 95}, ${CX - 16} ${CY - R}`,
        /* Salen muy abiertas hacia los lados y suben, en vez de bajar: así la
           notificación se aleja del dock en lugar de meterse debajo. */
        out: `M ${CX - 16} ${CY + R} C ${CX - 60} ${CY + 70}, -10 330, -70 300`,
      },
      {
        in: `M ${CX} -20 C ${CX} 110, ${CX} ${CY - 95}, ${CX} ${CY - R}`,
        out: `M ${CX} ${CY + R} C ${CX} ${CY + 100}, ${CX} 380, ${CX} 470`,
      },
      {
        in: `M 380 -20 C 365 110, ${CX + 26} ${CY - 95}, ${CX + 16} ${CY - R}`,
        out: `M ${CX + 16} ${CY + R} C ${CX + 60} ${CY + 70}, 430 330, 490 300`,
      },
    ],
  }
})()

export function TrafficFlow() {
  const reduce = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const L = isMobile ? MOBILE : DESKTOP

  /* Los degradados van en el eje del flujo: horizontal o vertical */
  const grad = isMobile
    ? { x1: '0', y1: '0', x2: '0', y2: '1' }
    : { x1: '0', y1: '0', x2: '1', y2: '0' }

  return (
    <div className="relative w-full">
      <svg
        key={isMobile ? 'm' : 'd'}
        viewBox={`0 0 ${L.W} ${L.H}`}
        className="w-full overflow-visible"
        role="img"
        aria-label="El tráfico que ya tienes entra en tu tienda Shopify y sale convertido en pedidos"
      >
        <defs>
          <linearGradient id="laneIn" {...grad}>
            <stop offset="0%" stopColor="#2a3441" stopOpacity="0" />
            <stop offset="30%" stopColor="#2a3441" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#475569" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="laneOut" {...grad}>
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
        {L.lanes.map((lane, i) => (
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

        {/* ── El núcleo ── */}
        <motion.circle
          cx={L.CX}
          cy={L.CY}
          r={isMobile ? 100 : 130}
          fill="url(#coreGlow)"
          animate={
            reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${L.CX}px ${L.CY}px` }}
        />

        {!reduce && (
          <motion.circle
            cx={L.CX}
            cy={L.CY}
            r={L.R}
            fill="none"
            stroke="#ff13cd"
            strokeWidth="1.2"
            animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
            transition={{ duration: HALF, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: `${L.CX}px ${L.CY}px` }}
          />
        )}
      </svg>

      {/* ── Capa HTML ──
          Viajeros en z-10, disco + logo en z-30: así las notificaciones pasan
          POR DETRÁS del logo en vez de taparlo. El disco vive aquí (y no en el
          SVG) porque el SVG entero queda al fondo y no podría ocultarlas. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 z-10">
          {!reduce &&
            L.lanes.map((lane, i) => (
              <Traveler
                key={`${isMobile ? 'm' : 'd'}-${i}`}
                lane={lane}
                layout={L}
                face={FACES[i % FACES.length]}
                delay={i * (TRIP / L.lanes.length)}
                withNotif={
                  L.notifLanes ? L.notifLanes.includes(i) : i < L.notifs
                }
              />
            ))}
        </div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, type: 'spring', bounce: 0.4 }}
          className="absolute top-1/2 left-1/2 z-30 flex h-[clamp(88px,12.4vw,148px)] w-[clamp(88px,12.4vw,148px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-[#0b0f15] max-md:h-[104px] max-md:w-[104px]"
        >
          <motion.img
            src="/logos/shopify.avif"
            alt="Shopify"
            animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
            transition={{ duration: HALF, repeat: Infinity, ease: 'easeInOut' }}
            className="h-[clamp(38px,5.5vw,68px)] w-auto drop-shadow-[0_0_26px_rgba(149,191,71,0.5)] max-md:h-[46px]"
          />
        </motion.div>
      </div>
    </div>
  )
}

/* ── Un visitante que recorre su carril y sale convertido en pedido ── */
function Traveler({
  lane,
  layout,
  face,
  delay,
  withNotif,
}: {
  lane: Lane
  layout: Layout
  face: string
  delay: number
  withNotif: boolean
}) {
  /* offsetPath usa las coordenadas del viewBox, así que el contenedor mide
     1 unidad de ese sistema y viaja como un punto sobre la curva.

     OJO: ese contenedor mide ~1px. Si el contenido fuera hijo directo se
     aplastaría a ese ancho (la tarjeta salía de 19px y el texto se
     desbordaba). Por eso el hijo va absolute + w-max: se sale del flujo y
     toma su ancho natural. */
  const common = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: `${(1 / layout.W) * 100}%`,
    height: `${(1 / layout.H) * 100}%`,
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
        <div className="absolute top-0 left-0 flex h-[clamp(26px,2.8vw,36px)] w-[clamp(26px,2.8vw,36px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-[#161f2a] text-[clamp(12px,1.4vw,17px)] shadow-lg max-md:h-[30px] max-md:w-[30px] max-md:text-[14px]">
          {face}
        </div>
      </motion.div>

      {/* Fase 2 — sale convertido en pedido, medio ciclo después */}
      {withNotif && (
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
            delay: delay + HALF, // arranca cuando la persona llega al logo
            ease: 'easeOut',
            times: [0, 0.14, 0.4, 0.85, 1],
          }}
        >
          {/* Notificación al estilo de las de la app de Shopify */}
          <div className="absolute top-0 left-0 flex w-[clamp(122px,12vw,158px)] -translate-x-1/2 -translate-y-1/2 items-start gap-1.5 rounded-lg border border-white/[0.08] bg-[#1c2530] px-2 py-1.5 shadow-[0_6px_22px_-6px_rgba(0,0,0,0.9)] max-md:w-[138px]">
            <img
              src="/logos/shopify.avif"
              alt=""
              aria-hidden="true"
              className="mt-px h-[clamp(15px,1.5vw,20px)] w-auto shrink-0 rounded max-md:h-[17px]"
            />

            <div className="min-w-0 flex-1">
              <p className="text-[clamp(7px,0.7vw,9px)] leading-tight font-bold text-white max-md:text-[8px]">
                Shopify
              </p>
              <p className="mt-px text-[clamp(6px,0.6vw,8px)] leading-snug text-slate-400 max-md:text-[7px]">
                Nuevo pedido de 2 artículos · $ 189.900
              </p>
            </div>

            <span className="shrink-0 text-[clamp(5px,0.5vw,7px)] leading-tight text-slate-500 max-md:text-[6px]">
              ahora
            </span>
          </div>
        </motion.div>
      )}
    </>
  )
}
