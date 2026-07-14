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

/* ── Lista de pedidos entrando (retención) ─────────────────── */
const ORDERS = [
  { id: '#16659', name: 'Laura G.', amount: '39,60 €', tag: 'Recurrente' },
  { id: '#16658', name: 'Javier M.', amount: '37,97 €', tag: null },
  { id: '#16657', name: 'Clara J.', amount: '41,80 €', tag: 'Recurrente' },
  { id: '#16656', name: 'Patricia R.', amount: '72,60 €', tag: null },
]

export function OrdersList() {
  return (
    <div className="w-full space-y-2">
      {ORDERS.map((o, i) => (
        <motion.div
          key={o.id}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
          className="flex items-center gap-3 rounded-xl border border-line bg-surface/70 px-3.5 py-2.5"
        >
          <span className="font-mono text-xs text-faint">{o.id}</span>
          <span className="min-w-0 flex-1 truncate text-xs text-bone">
            {o.name}
          </span>
          {o.tag && (
            <span className="hidden rounded-full bg-magenta/15 px-2 py-0.5 text-[10px] font-semibold text-magenta-soft sm:inline">
              {o.tag}
            </span>
          )}
          <span className="text-xs font-semibold text-bone">{o.amount}</span>
        </motion.div>
      ))}
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
