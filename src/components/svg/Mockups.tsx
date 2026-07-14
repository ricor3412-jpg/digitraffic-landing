import { motion, useReducedMotion } from 'framer-motion'
import { Counter } from '@/components/ui/Counter'

/* ═══════════════════════════════════════════════════════════════
   MOCKUPS DE PROBLEMAS
   Cada tarjeta de problema lleva una escena que *muestra* el dolor
   en vez de describirlo. Todas originales, hechas con divs + SVG.
   ═══════════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1] as const

/* Marco de navegador reutilizable, para que las escenas parezcan una web real. */
function Browser({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-line/80 bg-void/80 ${className}`}
    >
      {/* Barra del navegador */}
      <div className="flex items-center gap-1 border-b border-line/60 bg-surface-2/60 px-2 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <div className="ml-1.5 h-2 flex-1 rounded-full bg-line/40" />
      </div>
      {children}
    </div>
  )
}

/* ── 1. PLANTILLA GENÉRICA ───────────────────────────────────────
   Una tienda fea y sosa, con el cartel de error encima. */
export function MockGenericTemplate() {
  const reduce = useReducedMotion()

  return (
    <div className="relative">
      <Browser className="opacity-60 grayscale">
        <div className="p-2">
          {/* Cabecera sosa */}
          <div className="mb-2 flex items-center justify-between">
            <div className="h-1.5 w-8 rounded bg-line" />
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-1 w-4 rounded bg-line/70" />
              ))}
            </div>
          </div>
          {/* Banner "Lorem ipsum" */}
          <div className="mb-2 flex h-8 items-center justify-center rounded bg-line/30">
            <span className="text-[5px] tracking-wider text-faint">
              LOREM IPSUM DOLOR SIT
            </span>
          </div>
          {/* Product cards clónicas */}
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded bg-line/25 p-1">
                <div className="mb-1 h-6 rounded bg-line/40" />
                <div className="h-0.5 w-full rounded bg-line/60" />
                <div className="mt-0.5 h-0.5 w-2/3 rounded bg-line/40" />
              </div>
            ))}
          </div>
        </div>
      </Browser>

      {/* Cartel de error, atravesado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4, type: 'spring', bounce: 0.5 }}
        className="absolute inset-x-2 top-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={reduce ? undefined : { opacity: [1, 0.75, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="rounded border border-danger/60 bg-danger/20 px-2 py-1 text-center backdrop-blur-sm"
        >
          <span className="font-mono text-[7px] font-bold tracking-wider text-danger">
            ERROR — PLANTILLA GENÉRICA
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ── 2. MARGEN REDUCIDO ──────────────────────────────────────────
   Una barra de margen que se va estrujando. */
export function MockMargin() {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col gap-2 py-1">
      {[
        { label: 'Ingresos', w: '100%', color: 'bg-line/50' },
        { label: 'Costes', w: '72%', color: 'bg-danger/40' },
        { label: 'Ads', w: '20%', color: 'bg-danger/60' },
      ].map((row, i) => (
        <div key={row.label} className="flex items-center gap-2">
          <span className="w-12 shrink-0 text-[8px] text-faint">{row.label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-void">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: row.w }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: EASE }}
              className={`h-full rounded-full ${row.color}`}
            />
          </div>
        </div>
      ))}

      {/* El margen que queda: mínimo y parpadeando */}
      <div className="flex items-center gap-2 border-t border-line/60 pt-2">
        <span className="w-12 shrink-0 text-[8px] font-bold text-danger">
          Margen
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-void">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '8%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="h-full rounded-full bg-danger"
          />
        </div>
        <motion.span
          animate={reduce ? undefined : { opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="font-mono text-[9px] font-bold text-danger"
        >
          8%
        </motion.span>
      </div>
    </div>
  )
}

/* ── 3. CAMBIOS A CIEGAS ─────────────────────────────────────────
   Un cursor moviéndose al azar entre swatches de color. */
export function MockBlindChanges() {
  const reduce = useReducedMotion()
  const swatches = ['#ff4d6d', '#7dd3fc', '#22d39a', '#facc15', '#a4189f']

  return (
    <div className="relative flex flex-col gap-2 py-1">
      <div className="flex gap-1.5">
        {swatches.map((c, i) => (
          <motion.div
            key={c}
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.18, 1], opacity: [0.35, 1, 0.35] }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.45,
            }}
            className="h-5 flex-1 rounded"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      {/* Botón que cambia de forma sin criterio */}
      <motion.div
        animate={reduce ? undefined : { borderRadius: ['4px', '999px', '4px'] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="flex h-6 items-center justify-center bg-line/40"
      >
        <span className="text-[7px] font-semibold text-muted">COMPRAR</span>
      </motion.div>

      {/* "¿funciona?" escrito a mano */}
      <div className="flex items-center gap-1.5">
        <span className="font-hand text-base leading-none text-danger">
          ¿y esto funciona?
        </span>
        <svg viewBox="0 0 24 12" className="h-3 w-6" aria-hidden="true">
          <motion.path
            d="M1 6 Q 10 1, 22 6"
            fill="none"
            stroke="#ff4d6d"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </svg>
      </div>
    </div>
  )
}

/* ── 4. CAC QUE SUBE ─────────────────────────────────────────────
   Contador de coste de adquisición trepando, con la curva al alza. */
export function MockRisingCAC() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3 py-1">
      <div className="shrink-0">
        <p className="text-[8px] tracking-wide text-faint uppercase">CAC</p>
        <div className="flex items-baseline gap-0.5">
          <motion.span
            animate={reduce ? undefined : { color: ['#ff4d6d', '#ff8fa3', '#ff4d6d'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-mono text-xl font-bold text-danger"
          >
            <Counter value={38} suffix=" €" />
          </motion.span>
        </div>
        <div className="mt-0.5 flex items-center gap-0.5">
          <svg viewBox="0 0 8 8" className="h-2 w-2 text-danger" aria-hidden="true">
            <path d="M4 1l3 5H1z" fill="currentColor" />
          </svg>
          <span className="font-mono text-[8px] font-bold text-danger">+153%</span>
        </div>
      </div>

      {/* Curva de coste subiendo */}
      <svg viewBox="0 0 100 44" className="h-11 flex-1" aria-hidden="true">
        <defs>
          <linearGradient id="cacFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff4d6d" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 38 L20 34 L40 30 L60 20 L80 12 L100 3 L100 44 L0 44 Z"
          fill="url(#cacFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.path
          d="M0 38 L20 34 L40 30 L60 20 L80 12 L100 3"
          fill="none"
          stroke="#ff4d6d"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </svg>
    </div>
  )
}

/* ── 5. TICKET MEDIO ESTANCADO ───────────────────────────────────
   Carrito con un solo artículo. Las sugerencias de upsell, vacías. */
export function MockFlatAOV() {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col gap-1.5 py-1">
      {/* El único producto del carrito */}
      <div className="flex items-center gap-2 rounded border border-line/70 bg-void/60 p-1.5">
        <div className="h-6 w-6 shrink-0 rounded bg-line/40" />
        <div className="flex-1">
          <div className="h-1 w-12 rounded bg-line/70" />
          <div className="mt-1 h-1 w-8 rounded bg-line/40" />
        </div>
        <span className="font-mono text-[9px] font-semibold text-muted">1×</span>
      </div>

      {/* Huecos de upsell vacíos */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          animate={reduce ? undefined : { opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
          className="flex items-center justify-center rounded border border-dashed border-line py-1.5"
        >
          <span className="text-[7px] text-faint">sin cross-sell</span>
        </motion.div>
      ))}

      <div className="flex items-center justify-between border-t border-line/60 pt-1.5">
        <span className="text-[8px] text-faint">Total</span>
        <span className="font-mono text-xs font-bold text-danger">
          <Counter value={24} suffix=" €" />
        </span>
      </div>
    </div>
  )
}

/* ── 6. APPS INNECESARIAS ────────────────────────────────────────
   Pila de apps, cada una con su cuota mensual. */
const APPS = [
  { name: 'Reviews Pro', price: 29 },
  { name: 'Upsell King', price: 49 },
  { name: 'Popup Master', price: 19 },
  { name: 'Mega Search', price: 39 },
]

export function MockApps() {
  const reduce = useReducedMotion()
  const total = APPS.reduce((s, a) => s + a.price, 0)

  return (
    <div className="flex flex-col gap-1 py-1">
      {APPS.map((app, i) => (
        <motion.div
          key={app.name}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.1 }}
          className="flex items-center gap-1.5 rounded border border-line/60 bg-void/50 px-1.5 py-1"
        >
          <div className="h-3 w-3 shrink-0 rounded bg-line/50" />
          <span className="flex-1 truncate text-[8px] text-muted">{app.name}</span>
          <span className="font-mono text-[8px] font-semibold text-danger">
            -{app.price} €
          </span>
        </motion.div>
      ))}

      <motion.div
        animate={reduce ? undefined : { opacity: [1, 0.55, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-0.5 flex items-center justify-between rounded bg-danger/15 px-1.5 py-1"
      >
        <span className="text-[8px] font-semibold text-danger">Cada mes</span>
        <span className="font-mono text-[10px] font-bold text-danger">
          -{total} €
        </span>
      </motion.div>
    </div>
  )
}

/* ── 7. WEB LENTA ────────────────────────────────────────────────
   Barra de carga que se atasca y el usuario se va. */
export function MockSlowSite() {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col gap-2.5 py-1">
      <div className="flex items-center justify-between">
        <span className="text-[8px] text-faint">Cargando…</span>
        <motion.span
          animate={reduce ? undefined : { opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="font-mono text-sm font-bold text-danger"
        >
          6,4s
        </motion.span>
      </div>

      {/* Barra que se atasca al 30 % */}
      <div className="h-1.5 overflow-hidden rounded-full bg-void">
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: ['0%', '28%', '30%', '31%'] }}
          viewport={{ once: true }}
          transition={{ duration: 3, times: [0, 0.3, 0.6, 1], ease: 'easeOut' }}
          className="h-full rounded-full bg-danger"
        />
      </div>

      {/* El usuario se cansa y se va */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6 }}
        className="flex items-center gap-1.5"
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-danger"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          animate={reduce ? undefined : { x: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          aria-hidden="true"
        >
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        <span className="font-hand text-sm leading-none text-danger">
          se fue sin comprar
        </span>
      </motion.div>
    </div>
  )
}

/* Mapa id-de-problema → mockup, para que Problems.tsx lo consuma. */
export const PROBLEM_MOCKUPS: Record<string, React.ReactNode> = {
  plantilla: <MockGenericTemplate />,
  margen: <MockMargin />,
  intuicion: <MockBlindChanges />,
  cac: <MockRisingCAC />,
  aov: <MockFlatAOV />,
  apps: <MockApps />,
  velocidad: <MockSlowSite />,
}
