import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   PANEL DE CÓDIGO LIQUID
   Se escribe solo cuando entra en pantalla. Liquid es el lenguaje
   de plantillas de Shopify, así que refuerza la credibilidad
   técnica en la fase de desarrollo.
   ═══════════════════════════════════════════════════════════════ */

/* Cada línea se tokeniza para poder colorearla. */
type Token = { t: string; c: string }

const LINES: Token[][] = [
  [{ t: '{% comment %}', c: 'com' }],
  [{ t: '  Bundle nativo — sin apps de terceros', c: 'com' }],
  [{ t: '{% endcomment %}', c: 'com' }],
  [],
  [
    { t: '{% assign ', c: 'tag' },
    { t: 'bundle', c: 'key' },
    { t: ' = ', c: 'txt' },
    { t: 'product.metafields.cro.bundle', c: 'str' },
    { t: ' %}', c: 'tag' },
  ],
  [
    { t: '{% if ', c: 'tag' },
    { t: 'bundle', c: 'key' },
    { t: ' %}', c: 'tag' },
  ],
  [
    { t: '  <form ', c: 'tag' },
    { t: 'action', c: 'key' },
    { t: '=', c: 'txt' },
    { t: '"/cart/add"', c: 'str' },
    { t: '>', c: 'tag' },
  ],
  [
    { t: '    <button ', c: 'tag' },
    { t: 'class', c: 'key' },
    { t: '=', c: 'txt' },
    { t: '"btn--convert"', c: 'str' },
    { t: '>', c: 'tag' },
  ],
  [{ t: '      Añadir pack y ahorrar', c: 'txt' }],
  [{ t: '    </button>', c: 'tag' }],
  [{ t: '  </form>', c: 'tag' }],
  [{ t: '{% endif %}', c: 'tag' }],
]

const COLORS: Record<string, string> = {
  tag: 'text-magenta-soft',
  key: 'text-sky-300',
  str: 'text-gain',
  com: 'text-faint italic',
  txt: 'text-muted',
}

/* Total de caracteres, para cronometrar el tecleo. */
const TOTAL = LINES.reduce(
  (sum, line) => sum + line.reduce((s, tk) => s + tk.t.length, 0) + 1,
  0,
)

export function LiquidCodePanel() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setTyped(TOTAL)
      return
    }

    let raf = 0
    const start = performance.now()
    const DURATION = 2600 // ms para escribirlo entero

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION)
      setTyped(Math.floor(p * TOTAL))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce])

  /* Reparte los caracteres ya "tecleados" entre las líneas. */
  let budget = typed
  const rendered = LINES.map((line) => {
    const out: Token[] = []
    for (const tk of line) {
      if (budget <= 0) break
      const take = Math.min(tk.t.length, budget)
      out.push({ t: tk.t.slice(0, take), c: tk.c })
      budget -= take
    }
    budget -= 1 // el salto de línea también cuesta
    return out
  })

  const done = typed >= TOTAL

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-line bg-void/90"
    >
      {/* Barra del editor */}
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/50 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-danger/60" />
        <span className="h-2 w-2 rounded-full bg-amber-400/60" />
        <span className="h-2 w-2 rounded-full bg-gain/60" />
        <span className="ml-2 font-mono text-[10px] text-faint">
          product-bundle.liquid
        </span>
      </div>

      {/* Código */}
      <pre className="overflow-x-auto p-4 font-mono text-[10px] leading-relaxed sm:text-[11px]">
        <code>
          {rendered.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-4 shrink-0 text-right text-faint/40 select-none">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {line.map((tk, j) => (
                  <span key={j} className={COLORS[tk.c]}>
                    {tk.t}
                  </span>
                ))}
                {/* Cursor en la línea que se está escribiendo */}
                {!done && line.length > 0 && i === rendered.findLastIndex((l) => l.length > 0) && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.55, repeat: Infinity }}
                    className="ml-px inline-block h-3 w-1.5 translate-y-0.5 bg-magenta"
                  />
                )}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
