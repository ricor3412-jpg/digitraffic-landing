import { motion, useReducedMotion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   VISUALES SVG ANIMADOS
   Todos originales, dibujados con Framer Motion. Se usan como
   ilustración dentro de las tarjetas de problema/solución.
   ═══════════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Notificación de venta de Shopify (aparece y flota) ────── */
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
            2 artículos · 70,49 €
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

/* ── Barras de ticket medio creciendo ──────────────────────── */
export function AOVBars() {
  const bars = [38, 52, 46, 68, 82, 96]

  return (
    <div className="flex h-32 items-end gap-2.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: `${h}%`, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.09, ease: EASE }}
          className={`flex-1 rounded-t-lg ${
            i === bars.length - 1
              ? 'bg-gradient-to-t from-magenta to-magenta-soft'
              : 'bg-surface-2'
          }`}
        />
      ))}
    </div>
  )
}

/* ── Panel de pedidos con pestañas (retención) ──────────────── */
const ORDERS = [
  {
    id: '#16659',
    name: 'Laura González',
    time: '18:20',
    items: 1,
    amount: '39,60 €',
    tag: 'Compra recurrente',
    paid: true,
  },
  {
    id: '#16658',
    name: 'Javier Martín',
    time: '17:58',
    items: 3,
    amount: '37,97 €',
    tag: null,
    paid: true,
  },
  {
    id: '#16657',
    name: 'Clara Jiménez',
    time: '17:25',
    items: 1,
    amount: '41,80 €',
    tag: 'Compra recurrente',
    paid: true,
  },
  {
    id: '#16656',
    name: 'Patricia Romero',
    time: '17:16',
    items: 2,
    amount: '72,60 €',
    tag: null,
    paid: false,
  },
  {
    id: '#16655',
    name: 'Roberto Sánchez',
    time: '16:52',
    items: 1,
    amount: '43,99 €',
    tag: 'Compra recurrente',
    paid: true,
  },
]

const TABS = ['Todos', 'Sin enviar', 'Pagados', 'Abiertos'] as const

export function OrdersList() {
  const reduce = useReducedMotion()

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line bg-void/70">
      {/* Cabecera con pestañas, como el admin de Shopify */}
      <div className="flex items-center gap-1 border-b border-line bg-surface-2/40 px-3 py-2">
        {TABS.map((tab, i) => (
          <span
            key={tab}
            className={`rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap ${
              i === 0
                ? 'bg-magenta/15 text-magenta-soft'
                : 'text-faint'
            }`}
          >
            {tab}
          </span>
        ))}
        <span className="ml-auto hidden font-mono text-[10px] text-faint sm:inline">
          Hoy
        </span>
      </div>

      {/* Filas */}
      <div className="divide-y divide-line/50">
        {ORDERS.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            className="flex items-center gap-2.5 px-3 py-2.5"
          >
            <span className="font-mono text-[10px] text-faint">{o.id}</span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-bone">
                {o.name}
              </p>
              <p className="truncate text-[9px] text-faint">
                {o.items} art. · {o.time}
              </p>
            </div>

            {o.tag && (
              <motion.span
                animate={
                  reduce ? undefined : { opacity: [0.75, 1, 0.75] }
                }
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3 }}
                className="hidden rounded-full bg-magenta/15 px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap text-magenta-soft lg:inline"
              >
                {o.tag}
              </motion.span>
            )}

            <span
              className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                o.paid
                  ? 'bg-gain/15 text-gain'
                  : 'bg-amber-400/15 text-amber-400'
              }`}
            >
              {o.paid ? 'Pagado' : 'Pendiente'}
            </span>

            <span className="w-14 shrink-0 text-right font-mono text-[11px] font-bold text-bone">
              {o.amount}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Pie: el dato que importa */}
      <div className="flex items-center justify-between border-t border-line bg-surface-2/30 px-3 py-2">
        <span className="text-[10px] text-faint">Clientes que repiten</span>
        <span className="font-mono text-[11px] font-bold text-gain">60 %</span>
      </div>
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
