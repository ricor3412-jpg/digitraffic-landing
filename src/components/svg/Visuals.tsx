import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   VISUALES SVG ANIMADOS
   Todos originales, dibujados con Framer Motion. Se usan como
   ilustración dentro de las tarjetas de problema/solución.
   ═══════════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Notificación de venta (aparece y flota) ────── */
export function SaleNotification() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE }}
      className="w-full max-w-sm"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-3 rounded-2xl border border-line bg-surface/90 p-3.5 shadow-2xl backdrop-blur"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gain/15">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-gain" fill="none">
            <path
              d="M6 12.5l3.5 3.5L18 7.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-bone">Nuevo pedido</p>
          <p className="truncate text-xs text-muted">
            2 artículos · $ 189.900
          </p>
        </div>
        {/* Punto que late */}
        <span className="relative flex h-2 w-2 shrink-0">
          {!reduce && (
            <motion.span
              animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inline-flex h-full w-full rounded-full bg-gain"
            />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gain" />
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ── Gráfico de línea ascendente (conversión que sube) ─────── */
export function RisingChart() {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 320 140" className="w-full" role="img" aria-label="Gráfico de conversión ascendente">
      <defs>
        <linearGradient id="riseFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff13cd" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff13cd" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="riseLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#740075" />
          <stop offset="100%" stopColor="#ff13cd" />
        </linearGradient>
      </defs>

      {/* Rejilla */}
      {[30, 60, 90, 120].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="320"
          y2={y}
          stroke="#2a3441"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      ))}

      {/* Área bajo la curva */}
      <motion.path
        d="M0 118 L60 104 L120 96 L180 62 L240 44 L320 14 L320 140 L0 140 Z"
        fill="url(#riseFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
      />

      {/* La línea se dibuja sola */}
      <motion.path
        d="M0 118 L60 104 L120 96 L180 62 L240 44 L320 14"
        fill="none"
        stroke="url(#riseLine)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      />

      {/* Punto final que pulsa */}
      <motion.circle
        cx="320"
        cy="14"
        r="4.5"
        fill="#ff13cd"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.5, type: 'spring' }}
      />
    </svg>
  )
}

/* ── Upsell: el carrito con un producto, y una recomendación que se acepta
      y sube el total. En loop. Ticket medio que crece de forma tangible. ── */
const UP_LOOP = 5 // segundos por ciclo

export function AOVBars() {
  const reduce = useReducedMotion()

  return (
    <div className="mx-auto w-full max-w-[300px] rounded-2xl border border-line bg-void/60 p-4">
      {/* Cabecera del carrito */}
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#5E8E3E]" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinejoin="round" />
            <path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
          </svg>
          Tu carrito
        </span>
        {/* Total que salta cuando se acepta el upsell */}
        <motion.span
          className="font-mono text-xs font-bold text-bone tabular-nums"
          animate={reduce ? undefined : { color: ['#f1f1f1', '#f1f1f1', '#22d39a', '#f1f1f1'] }}
          transition={{ duration: UP_LOOP, repeat: Infinity, times: [0, 0.55, 0.65, 0.8] }}
        >
          <UpsellTotal reduce={!!reduce} />
        </motion.span>
      </div>

      {/* Producto base */}
      <div className="flex items-center gap-2.5 rounded-lg bg-surface-2/50 p-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-line/40">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-faint" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium text-bone">Zapatilla Runner</p>
          <p className="text-[9px] text-faint">$ 120.000</p>
        </div>
      </div>

      {/* Tarjeta de upsell: aparece, se acepta (check), y se integra */}
      <div className="relative mt-2 h-[52px]">
        {/* estado "sugerencia" */}
        <motion.div
          className="absolute inset-0 flex items-center gap-2.5 rounded-lg border border-magenta/25 bg-magenta/[0.06] p-2"
          initial={{ opacity: 0, y: 8 }}
          animate={
            reduce
              ? { opacity: 1, y: 0 }
              : { opacity: [0, 1, 1, 0, 0], y: [8, 0, 0, 0, 8] }
          }
          transition={
            reduce
              ? { duration: 0.3 }
              : { duration: UP_LOOP, repeat: Infinity, times: [0.05, 0.2, 0.55, 0.62, 1] }
          }
        >
          <span className="text-sm">✨</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold text-magenta-soft">
              ¿Añadir calcetines técnicos?
            </p>
            <p className="text-[9px] text-faint">+ $ 25.000</p>
          </div>
          <div className="flex h-6 items-center rounded-md bg-magenta px-2.5">
            <span className="text-[9px] font-bold text-white">Añadir</span>
          </div>
        </motion.div>

        {/* estado "añadido" (check verde) */}
        <motion.div
          className="absolute inset-0 flex items-center gap-2.5 rounded-lg border border-gain/25 bg-gain/[0.06] p-2"
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0 } : { opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: UP_LOOP, repeat: Infinity, times: [0, 0.58, 0.65, 0.85, 0.95] }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded bg-gain/15">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-gain" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M6 12.5l3.5 3.5L18 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-medium text-bone">Calcetines técnicos</p>
            <p className="text-[9px] text-faint">$ 25.000</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* Total del carrito: 120k solo, 145k cuando se añade el upsell. */
function UpsellTotal({ reduce }: { reduce: boolean }) {
  const [val, setVal] = useState(120_000)

  useEffect(() => {
    if (reduce) {
      setVal(145_000)
      return
    }
    const tick = () => {
      setVal(120_000)
      const up = setTimeout(() => setVal(145_000), UP_LOOP * 0.62 * 1000)
      const down = setTimeout(() => setVal(120_000), UP_LOOP * 0.95 * 1000)
      return () => {
        clearTimeout(up)
        clearTimeout(down)
      }
    }
    const cleanup = tick()
    const loop = setInterval(tick, UP_LOOP * 1000)
    return () => {
      cleanup()
      clearInterval(loop)
    }
  }, [reduce])

  return <>$ {val.toLocaleString('es-CO')}</>
}

/* ── App de pedidos tipo Shopify (retención) ─────────────────
   Teléfono cortado por abajo (solo se asoma la parte superior) con
   la lista de pedidos desplazándose en bucle infinito hacia arriba,
   como si entraran ventas sin parar. Réplica de la app de Shopify.
   ─────────────────────────────────────────────────────────── */
const ORDERS = [
  { id: '#16659', name: 'CLARA JIMÉNEZ SÁUBER', time: '05:25 PM', items: 1, amount: '€41,60', frequent: true, paid: true },
  { id: '#16658', name: 'ROBERTO SÁNCHEZ VIDAL', time: '05:18 PM', items: 3, amount: '€43,99', frequent: true, paid: true },
  { id: '#16657', name: 'LUCÍA FERNÁNDEZ GIL', time: '05:02 PM', items: 2, amount: '€39,60', frequent: false, paid: true },
  { id: '#16656', name: 'MARCOS DÍAZ ROMERO', time: '04:47 PM', items: 1, amount: '€28,50', frequent: true, paid: true },
  { id: '#16655', name: 'ELENA TORRES BLANCO', time: '04:31 PM', items: 4, amount: '€72,10', frequent: false, paid: true },
  { id: '#16654', name: 'DAVID MORENO PRIETO', time: '04:15 PM', items: 2, amount: '€55,90', frequent: true, paid: true },
]

const APP_TABS = ['All', 'Unfulfilled', 'Unpaid', 'Open', 'Archived', 'Per'] as const

/* Una fila de pedido con el estilo de la app de Shopify. */
function OrderRow({ o }: { o: (typeof ORDERS)[number] }) {
  return (
    <div className="border-b border-line/40 px-4 py-3">
      <p className="mb-1.5 text-[9px] text-faint">
        Envío Estándar Gratis de 3 a 5 días laborables
      </p>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-bone">
            {o.id}{' '}
            <span className="font-semibold">{o.name}</span>
          </p>
          <p className="mt-0.5 text-[9px] text-faint">
            {o.items} item{o.items > 1 ? 's' : ''} · {o.time}
          </p>
        </div>
        <span className="shrink-0 text-[11px] font-bold text-bone">
          {o.amount}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        {o.frequent && (
          <span className="rounded bg-[#4a5d1f] px-1.5 py-0.5 text-[8px] font-semibold text-[#d4f56a]">
            Comprador frecuente
          </span>
        )}
        {o.paid && (
          <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[8px] font-semibold text-muted">
            Paid
          </span>
        )}
      </div>
    </div>
  )
}

export function ShopifyOrdersPhone() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      /* Márgenes negativos cancelan el p-7 de la card contenedora: así el
         teléfono llena la tarjeta y se asoma pegado a su borde inferior en
         lugar de flotar centrado con aire alrededor. */
      className="relative -mx-7 -mb-7 flex justify-center overflow-hidden rounded-b-3xl"
    >
      {/* Marco del teléfono, anclado abajo (self-end) y recortado por el
          borde inferior de la card: el móvil "se asoma" desde abajo. */}
      <div className="relative mt-6 h-[300px] w-[280px] self-end overflow-hidden">
        <div className="relative rounded-t-[2.6rem] border-[7px] border-b-0 border-[#0d1117] bg-[#0d1117] pb-0 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-2.5 left-1/2 z-30 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />

          <div className="overflow-hidden rounded-t-[2.1rem] bg-[#0a0a0a]">
            {/* Barra de estado */}
            <div className="flex items-center justify-between px-6 pt-4 pb-1 text-[11px] font-semibold text-white">
              <span>18:02</span>
              <span className="flex items-center gap-1.5 text-white">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                  <path d="M2 16h3v5H2zm5-4h3v9H7zm5-4h3v13h-3zm5-4h3v17h-3z" />
                </svg>
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                  <path d="M12 4C7 4 2.7 6 0 9l12 15L24 9c-2.7-3-7-5-12-5z" />
                </svg>
                <span className="h-3 w-5 rounded-[3px] border border-white/70 p-px">
                  <span className="block h-full w-3/4 rounded-[1px] bg-white" />
                </span>
              </span>
            </div>

            {/* Header: Orders ⌄ + Select */}
            <div className="flex items-center justify-between px-4 pt-2 pb-3">
              <h4 className="flex items-center gap-1 text-lg font-bold text-white">
                Orders
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </h4>
              <span className="flex items-center gap-1 text-[11px] text-muted">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Select
              </span>
            </div>

            {/* Barra de búsqueda + iconos de orden/filtro */}
            <div className="flex items-center gap-2 px-4 pb-3">
              <div className="flex flex-1 items-center gap-2 rounded-lg bg-surface-2/70 px-3 py-2">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-faint" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4-4" strokeLinecap="round" />
                </svg>
                <span className="text-[11px] text-faint">Filter orders</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2/70">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h13M3 16h9M17 5v8m0 0l-3-3m3 3l3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2/70">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5h18M6 12h12M10 19h4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-3 overflow-hidden border-b border-line/40 px-4 pb-2">
              {APP_TABS.map((tab, i) => (
                <span
                  key={tab}
                  className={`whitespace-nowrap pb-1 text-[11px] ${
                    i === 0
                      ? 'border-b-2 border-white font-semibold text-white'
                      : 'text-faint'
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            {/* Separador "Today" */}
            <div className="bg-[#0a0a0a] px-4 py-2">
              <span className="text-[10px] font-medium text-faint">Today</span>
            </div>

            {/* Lista con scroll infinito. Se duplica el array y se anima y:
                de 0 a -50%, de modo que al llegar a la copia empalma sin salto. */}
            <div className="relative h-[160px] overflow-hidden">
              <motion.div
                animate={reduce ? undefined : { y: ['0%', '-50%'] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              >
                {[...ORDERS, ...ORDERS].map((o, i) => (
                  <OrderRow key={i} o={o} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

/* ── Tráfico → ventas: clientes que caen por un embudo a Shopify ──
   Réplica de la sección de iurop. Los visitantes descienden guiados
   por las dos paredes de un embudo hasta el icono de Shopify en la
   boca; cada llegada dispara una notificación de compra. En loop.
   ─────────────────────────────────────────────────────────── */

/* Caras de clientes (mismas del hero). */
const FACES = ['🧑🏽', '👩🏻', '🧔🏾', '👩🏼‍🦰', '🧑🏿', '👨🏻']

/* ── Geometría del embudo (sistema de coordenadas del SVG) ────
   Un embudo de verdad: tolva que baja en diagonal + CUELLO vertical
   estrecho por el que las personas salen de una en una al Shopify. */
const F = {
  W: 400,
  H: 300,
  topY: 6, // boca de la tolva
  neckY: 140, // donde la tolva se convierte en cuello
  exitY: 180, // final del cuello (entra al Shopify)
  leftX: 46, // esquina superior izquierda de la tolva
  rightX: 354, // esquina superior derecha
  neckL: 182, // pared izquierda del cuello
  neckR: 218, // pared derecha del cuello
  cx: 200,
}

/* Radio del avatar en unidades del viewBox: hay que mantenerlo DENTRO de las
   paredes, no basta con que el centro caiga dentro. */
const R = 11

/** X de la pared a una altura dada (interpola la diagonal de la tolva). */
function wallX(y: number, side: 'l' | 'r') {
  const t = Math.min(1, Math.max(0, (y - F.topY) / (F.neckY - F.topY)))
  return side === 'l'
    ? F.leftX + (F.neckL - F.leftX) * t
    : F.rightX + (F.neckR - F.rightX) * t
}

/** Construye el carril de un visitante que entra a `startFrac` del ancho de la
    boca (0 = pared izquierda, 1 = derecha) y se desliza hasta el cuello.
    Cada punto se recorta contra la pared, así nunca se sale del embudo. */
function makeLane(startFrac: number, drift: number) {
  const pts: string[] = []
  const STEPS = 7
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS
    const y = F.topY + (F.neckY - F.topY) * t
    const l = wallX(y, 'l') + R
    const r = wallX(y, 'r') - R
    /* Va de su posición de entrada hacia el centro; `drift` decide cuánto se
       arrima a la pared por el camino. */
    const target = l + (r - l) * startFrac
    const centered = l + (r - l) * 0.5
    const k = Math.pow(t, 1 + drift) // cuanto más avanza, más al centro
    let x = target + (centered - target) * k
    x = Math.min(r, Math.max(l, x)) // recorte duro contra las paredes
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  /* Tramo final: baja por el cuello hasta la salida. */
  const path =
    `M ${pts[0]} ` +
    pts
      .slice(1)
      .map((p) => `L ${p}`)
      .join(' ') +
    ` L ${F.cx} ${F.exitY}`
  return path
}

/* Seis carriles: entradas repartidas por la boca, con derivas distintas para
   que no vayan calcados. Todos quedan dentro de las paredes por construcción. */
const LANES = [
  makeLane(0.08, 0.9),
  makeLane(0.92, 0.7),
  makeLane(0.5, 1.4),
  makeLane(0.26, 1.1),
  makeLane(0.74, 0.9),
  makeLane(0.14, 0.5),
]

/* Un visitante entra cada CYCLE s; su viaje dura TRIP s. */
const TRIP = 3.2
const CYCLE = 1.15

function Avatar({ face }: { face: string }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-[#161f2a] text-[17px] shadow-lg">
      {face}
    </div>
  )
}

/* Un visitante recorriendo su carril DENTRO del SVG.
   Va como <g> del propio SVG (no como div encima) para que comparta el
   viewBox con el embudo: si se posicionara en % sobre el contenedor, el
   dibujo y la trayectoria no coincidirían y se saldría de las paredes. */
function Faller({
  path,
  face,
  delay,
}: {
  path: string
  face: string
  delay: number
}) {
  return (
    <motion.g
      style={{ offsetPath: `path("${path}")`, offsetRotate: '0deg' }}
      initial={{ offsetDistance: '0%', opacity: 0, scale: 0.5 }}
      animate={{
        offsetDistance: ['0%', '100%'],
        opacity: [0, 1, 1, 1, 0],
        scale: [0.5, 1, 1, 0.86, 0.3],
      }}
      transition={{
        duration: TRIP,
        delay,
        repeat: Infinity,
        repeatDelay: LANES.length * CYCLE - TRIP,
        ease: 'easeIn',
        times: [0, 0.12, 0.62, 0.9, 1],
      }}
    >
      {/* Centrado en el punto de la trayectoria. El svg se estira en X
          (preserveAspectRatio="none"), así que se contra-escala para que el
          círculo no salga como una elipse. */}
      <g transform="scale(0.82, 1)">
        <circle
          r={R + 3}
          cx={0}
          cy={0}
          fill="#161f2a"
          stroke="#2a3441"
          strokeWidth="1.2"
        />
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="15"
        >
          {face}
        </text>
      </g>
    </motion.g>
  )
}

export function TrafficToSales() {
  const reduce = useReducedMotion()

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl">
      {/* El embudo Y los visitantes viven en el MISMO svg: comparten viewBox,
          así el dibujo y las trayectorias no pueden desalinearse. (Antes los
          visitantes eran divs en % sobre el contenedor y se salían de las
          paredes, porque el svg se centraba con otro aspect ratio.)
          preserveAspectRatio="none" hace que el embudo llene la card. */}
      <svg
        viewBox={`0 0 ${F.W} ${F.H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="funnelBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.035)" />
            <stop offset="100%" stopColor="rgba(94,142,62,0.10)" />
          </linearGradient>
          <linearGradient id="funnelWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="65%" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="100%" stopColor="rgba(94,142,62,0.55)" />
          </linearGradient>
        </defs>

        {/* Cuerpo del embudo: tolva que baja y sigue en cuello vertical */}
        <path
          d={`M ${F.leftX} ${F.topY}
              L ${F.neckL} ${F.neckY}
              L ${F.neckL} ${F.exitY}
              L ${F.neckR} ${F.exitY}
              L ${F.neckR} ${F.neckY}
              L ${F.rightX} ${F.topY} Z`}
          fill="url(#funnelBody)"
        />

        {/* Pared izquierda: diagonal + tramo recto del cuello */}
        <path
          d={`M ${F.leftX} ${F.topY} L ${F.neckL} ${F.neckY} L ${F.neckL} ${F.exitY}`}
          fill="none"
          stroke="url(#funnelWall)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Pared derecha */}
        <path
          d={`M ${F.rightX} ${F.topY} L ${F.neckR} ${F.neckY} L ${F.neckR} ${F.exitY}`}
          fill="none"
          stroke="url(#funnelWall)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Visitantes cayendo por sus carriles, dentro del mismo viewBox */}
        {!reduce &&
          LANES.map((path, i) => (
            <Faller
              key={i}
              path={path}
              face={FACES[i % FACES.length]}
              delay={i * CYCLE}
            />
          ))}
      </svg>

      {/* Resplandor verde en la salida del cuello */}
      <div
        className="pointer-events-none absolute top-[52%] left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#5E8E3E]/20 blur-[46px]"
        aria-hidden="true"
      />

      {/* Reduced-motion: visitantes quietos en la boca */}
      {reduce && (
        <div className="absolute top-6 left-1/2 flex -translate-x-1/2 gap-2">
          {FACES.slice(0, 4).map((f, i) => (
            <div key={i} className="translate-x-1/2 translate-y-1/2">
              <Avatar face={f} />
            </div>
          ))}
        </div>
      )}

      {/* Shopify justo bajo la salida del cuello */}
      <div
        className="absolute left-1/2 z-10 -translate-x-1/2"
        style={{ top: `${(F.exitY / F.H) * 100}%` }}
      >
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5E8E3E] shadow-[0_0_44px_rgba(94,142,62,0.65)]"
        >
          <img src="/brand/logos/shopify.svg" alt="Shopify" className="h-9 w-9 brightness-0 invert" />
        </motion.div>
      </div>

      {/* Notificación: salta justo cuando un visitante entra al Shopify.
          El primer carril llega en TRIP; a partir de ahí, uno cada CYCLE.
          Va pegada al fondo para no tapar la salida del embudo. */}
      <motion.div
        className="absolute right-3 bottom-2 left-3"
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={
          reduce
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: [0, 1, 1, 0], y: [10, 0, 0, 6], scale: [0.96, 1, 1, 0.98] }
        }
        transition={
          reduce
            ? { duration: 0.4 }
            : {
                duration: CYCLE,
                delay: TRIP, // el primero aterriza al final de su viaje
                repeat: Infinity,
                ease: 'easeOut',
                times: [0, 0.14, 0.72, 1],
              }
        }
      >
        <div className="mx-auto flex max-w-[300px] items-start gap-2.5 rounded-xl border border-line bg-surface/95 p-2.5 shadow-2xl backdrop-blur">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5E8E3E]">
            <img src="/brand/logos/shopify.svg" alt="" className="h-5 w-5 brightness-0 invert" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-bone">Shopify</span>
              <span className="text-[9px] text-faint">ahora</span>
            </div>
            <p className="mt-0.5 text-[10px] leading-snug text-muted">
              Nuevo pedido de 2 artículos · $ 189.900
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Orbe de fondo (resplandor decorativo) ─────────────────── */
export function GlowOrb({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      animate={
        reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }
      }
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className={`pointer-events-none absolute rounded-full blur-[100px] ${className}`}
    />
  )
}
