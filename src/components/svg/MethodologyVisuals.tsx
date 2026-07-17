import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   VISUALES DE METODOLOGÍA (rediseño según referencia)
   ───────────────────────────────────────────────────────────────
   · OnboardingIntegrations → "Nos convertimos en tu mano derecha"
     con las herramientas del stack flotando alrededor.
   · CroBeforeAfter → mockup de tienda que pasa de rojo (no convierte)
     a verde (optimizada), con cursor y badge "Especialista en CRO".
   Todo respeta prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1] as const

/* ══════════════════════════════════════════════════════════════
   1. ONBOARDING — buscador con typewriter en loop + abanico de
      cartas con Shopify al centro y logos del stack flotando.
   ══════════════════════════════════════════════════════════════ */

/* Frases que el "buscador" escribe y borra en bucle. */
const PHRASES = [
  'Nos convertimos en tu mano derecha',
  'Gestionamos todo tu stack',
]

/* Hook typewriter: escribe una frase, pausa, la borra, y pasa a la
   siguiente. En bucle infinito. Devuelve el texto visible actual. */
function useTypewriter(phrases: string[], enabled: boolean) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!enabled) {
      setText(phrases[0])
      return
    }
    let phrase = 0
    let char = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = phrases[phrase]
      if (!deleting) {
        char++
        setText(current.slice(0, char))
        if (char === current.length) {
          deleting = true
          timer = setTimeout(tick, 1600) // pausa con la frase completa
          return
        }
        timer = setTimeout(tick, 55) // velocidad al escribir
      } else {
        char--
        setText(current.slice(0, char))
        if (char === 0) {
          deleting = false
          phrase = (phrase + 1) % phrases.length
          timer = setTimeout(tick, 400) // pausa antes de la siguiente
          return
        }
        timer = setTimeout(tick, 28) // velocidad al borrar (más rápida)
      }
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [phrases, enabled])

  return text
}

/* Logos del stack. Van POSADOS sobre el abanico y ligeramente inclinados,
   como pegatinas sobre los documentos (así lo hace la referencia). */
type Tool = {
  src: string
  name: string
  className: string
  rotate: number
  float: number
  delay: number
}

const TOOLS: Tool[] = [
  {
    src: '/brand/logos/ga4-color.svg',
    name: 'Google Analytics',
    className: 'left-[15%] top-[14%]',
    rotate: -9,
    float: 6,
    delay: 0.25,
  },
  {
    src: '/brand/logos/searchconsole-color.png',
    name: 'Search Console',
    className: 'left-[3%] bottom-[18%]',
    rotate: -6,
    float: 8,
    delay: 0.4,
  },
  {
    src: '/brand/logos/meta.svg',
    name: 'Meta',
    className: 'right-[5%] top-[18%]',
    rotate: 8,
    float: 7,
    delay: 0.55,
  },
]

/* Documento del abanico: hoja alta con líneas de texto simuladas. */
function FanCard({
  rotate,
  x,
  y = 0,
}: {
  rotate: number
  x: number
  y?: number
}) {
  return (
    <div
      className="absolute top-1/2 left-1/2 h-[150px] w-[104px] rounded-lg border border-line/80 bg-surface-2/60 p-3 shadow-2xl"
      style={{
        transform: `translate(-50%,-50%) translate(${x}px, ${y}px) rotate(${rotate}deg)`,
      }}
    >
      <div className="space-y-2">
        {[80, 100, 92, 70, 100, 86].map((w, i) => (
          <div
            key={i}
            className="h-1.5 rounded bg-line/60"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function OnboardingIntegrations() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const text = useTypewriter(PHRASES, inView && !reduce)

  return (
    <div
      ref={ref}
      className="relative min-h-[320px] overflow-hidden rounded-2xl bg-void/40 p-5"
    >
      {/* Resplandor de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(255,19,205,0.07),transparent_70%)]" />

      {/* Buscador con texto que se escribe y borra */}
      <div className="relative z-30 mx-auto flex max-w-[330px] items-center rounded-xl border border-line bg-surface/90 px-4 py-3 shadow-2xl backdrop-blur">
        <p className="text-[13px] font-semibold text-bone sm:text-sm">
          {text || ' '}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.55, repeat: Infinity }}
            className="ml-px inline-block h-4 w-[2px] translate-y-0.5 bg-magenta align-middle"
          />
        </p>
      </div>

      {/* Escena: abanico de documentos con Shopify al frente. Sin panel que
          los encierre — las hojas flotan sobre el fondo de la sección. */}
      <div className="relative mt-4 h-[210px]">
        {/* Hojas traseras, muy inclinadas y asomando por detrás */}
        <FanCard rotate={-22} x={-84} y={10} />
        <FanCard rotate={22} x={84} y={10} />
        <FanCard rotate={-11} x={-42} y={4} />
        <FanCard rotate={11} x={42} y={4} />

        {/* Documento central: más grande y con la esquina doblada */}
        <div
          className="absolute top-1/2 left-1/2 h-[168px] w-[128px] -translate-x-1/2 -translate-y-1/2 border border-line bg-surface-2/90 shadow-2xl"
          style={{
            borderRadius: '8px',
            clipPath:
              'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)',
          }}
        >
          <div className="space-y-2 p-3.5">
            <div className="h-1.5 w-1/2 rounded bg-line/70" />
            <div className="h-1.5 w-3/4 rounded bg-line/50" />
          </div>
        </div>
        {/* triangulito del doblez de la esquina */}
        <div
          className="absolute top-1/2 left-1/2 h-[26px] w-[26px] bg-line/40"
          style={{
            transform: 'translate(-50%,-50%) translate(38px, -71px)',
            clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
          }}
        />

        {/* Shopify grande, en pill blanco, sobre el documento central */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex items-center gap-2 rounded-lg bg-bone px-4 py-2.5 shadow-2xl">
            <img
              src="/brand/logos/shopify.svg"
              alt="Shopify"
              className="h-6 w-6"
            />
            <span className="text-lg font-bold text-[#0a0a0a]">shopify</span>
          </div>
        </motion.div>

        {/* Logos posados sobre las hojas, inclinados */}
        {TOOLS.map((tool) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: tool.delay, ease: EASE }}
            className={`absolute z-20 ${tool.className}`}
            style={{ rotate: `${tool.rotate}deg` }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -tool.float, 0] }}
              transition={{
                duration: 4 + tool.delay * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex items-center gap-1.5 rounded-lg border border-line bg-surface/95 px-2.5 py-2 shadow-2xl backdrop-blur"
            >
              <img src={tool.src} alt={tool.name} className="h-5 w-5" />
              <span className="text-[10px] font-semibold whitespace-nowrap text-bone">
                {tool.name}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   2. DISEÑO/CRO — tienda que pasa de rojo (no convierte) a verde
      (optimizada). Cursor recorre y aparece el badge.
   ══════════════════════════════════════════════════════════════ */

export function CroBeforeAfter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  /* Fases del cursor: recorre 3 puntos del mockup y en el último
     "hace clic", momento en que la tienda vira a verde. */
  const cursorPath = reduce
    ? { left: '62%', top: '58%' }
    : {
        left: ['20%', '70%', '45%', '62%'],
        top: ['30%', '35%', '68%', '58%'],
      }

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl bg-void/40 p-5"
    >
      {/* Mockup de tienda */}
      <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-surface-2/40">
        {/* Degradado de estado: rojo → verde.
            Con reduced-motion se queda ya en verde (resultado). */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.85 }}
          animate={
            reduce
              ? { background: 'linear-gradient(160deg, rgba(34,211,154,0.32), rgba(34,211,154,0.06))' }
              : inView
                ? {
                    background: [
                      'linear-gradient(160deg, rgba(255,77,109,0.32), rgba(255,77,109,0.06))',
                      'linear-gradient(160deg, rgba(255,77,109,0.32), rgba(255,77,109,0.06))',
                      'linear-gradient(160deg, rgba(34,211,154,0.32), rgba(34,211,154,0.06))',
                    ],
                  }
                : {}
          }
          transition={reduce ? { duration: 0.4 } : { duration: 3, times: [0, 0.6, 1], ease: 'easeInOut' }}
        />

        {/* Barra superior del navegador */}
        <div className="relative flex items-center gap-1.5 border-b border-line/60 bg-void/50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-2 h-2 w-24 rounded-full bg-line/60" />
        </div>

        {/* Esqueleto de la tienda */}
        <div className="relative flex gap-3 p-4">
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/3 rounded bg-bone/20" />
            <div className="h-2 w-full rounded bg-line/50" />
            <div className="h-2 w-4/5 rounded bg-line/50" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-line/40" />
              ))}
            </div>
          </div>
          <div className="hidden w-24 shrink-0 space-y-2 sm:block">
            <div className="aspect-square rounded-lg bg-line/40" />
            <div className="h-6 rounded-full bg-magenta/70" />
          </div>
        </div>

        {/* Cursor */}
        <motion.div
          className="pointer-events-none absolute z-20"
          initial={{ left: '20%', top: '30%', opacity: 0 }}
          animate={
            inView
              ? { ...cursorPath, opacity: 1 }
              : { opacity: 0 }
          }
          transition={reduce ? { duration: 0.4 } : { duration: 3, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 drop-shadow-lg" fill="white">
            <path d="M5 3l14 8-6 1.5L9.5 19 5 3z" />
          </svg>
        </motion.div>

        {/* Badge "Especialista en CRO" — aparece al final del recorrido,
            anclado a la esquina inferior derecha del mockup. */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: reduce ? 0.2 : 2.6,
            ease: EASE,
          }}
          className="absolute right-3 bottom-3 z-30 rounded-full border border-gain/30 bg-surface/90 px-3.5 py-1.5 shadow-xl backdrop-blur"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gain">
            <span className="h-1.5 w-1.5 rounded-full bg-gain" />
            Especialista en CRO
          </span>
        </motion.div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   3. DISEÑO — el cursor maqueta la sección: arrastra la imagen a su
      hueco, selecciona el título y lo teclea, y suelta el botón.
      Cada pieza se marca con handles cuando el cursor la trabaja.
   ══════════════════════════════════════════════════════════════ */

/* Duración de un montaje completo, en segundos. */
const D_LOOP = 9

/* Paradas del cursor (%, dentro del lienzo). Cada una coincide con el paso
   que ejecuta: coger imagen → soltarla → título → teclear → botón. */
const CURSOR_X = ['16%', '16%', '26%', '60%', '62%', '62%', '54%', '54%', '24%']
const CURSOR_Y = ['80%', '80%', '52%', '30%', '30%', '34%', '74%', '74%', '86%']
const CURSOR_T = [0, 0.06, 0.19, 0.3, 0.44, 0.58, 0.68, 0.8, 1]

/** Marco de selección con los cuadraditos de las esquinas. */
function Handles() {
  return (
    <div className="pointer-events-none absolute -inset-1 rounded border border-magenta">
      {[
        '-top-1 -left-1',
        '-top-1 -right-1',
        '-bottom-1 -left-1',
        '-bottom-1 -right-1',
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute h-1.5 w-1.5 rounded-[1px] border border-magenta bg-void ${pos}`}
        />
      ))}
    </div>
  )
}

const TITLE = 'Zapatilla Runner'

export function DesigningSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [typed, setTyped] = useState(0)

  /* El título se teclea en su tramo del ciclo (≈44 %) y se repite en cada
     vuelta, para que el cursor y el texto vayan sincronizados. */
  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setTyped(TITLE.length)
      return
    }
    let iv: ReturnType<typeof setInterval>
    let t0: ReturnType<typeof setTimeout>

    const run = () => {
      setTyped(0)
      t0 = setTimeout(() => {
        let n = 0
        iv = setInterval(() => {
          n++
          setTyped(n)
          if (n >= TITLE.length) clearInterval(iv)
        }, 55)
      }, D_LOOP * 0.44 * 1000)
    }

    run()
    const loop = setInterval(run, D_LOOP * 1000)
    return () => {
      clearTimeout(t0)
      clearInterval(iv)
      clearInterval(loop)
    }
  }, [inView, reduce])

  /* Aparición de un bloque en su instante `at` del ciclo. */
  const appear = reduce
    ? { opacity: 1, scale: 1 }
    : { opacity: [0, 0, 1, 1, 1], scale: [0.92, 0.92, 1, 1, 1] }
  const appearT = (at: number) =>
    reduce
      ? { duration: 0.3 }
      : {
          duration: D_LOOP,
          repeat: Infinity,
          ease: 'easeOut' as const,
          times: [0, at, Math.min(at + 0.06, 0.99), 0.95, 1],
        }

  /* Parpadeo del marco de selección durante el tramo [from, to]. */
  const selT = (from: number, to: number) => ({
    duration: D_LOOP,
    repeat: Infinity,
    times: [0, from, Math.min(from + 0.02, 0.99), to, 1],
  })

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl bg-void/40 p-5">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-surface-2/30">
        {/* Rejilla de maquetación */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* Barra del editor */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 border-b border-line/50 bg-void/60 px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="ml-1 font-mono text-[8px] text-faint">
            seccion-producto
          </span>
          <span className="ml-auto rounded bg-magenta/20 px-1.5 py-0.5 font-mono text-[8px] text-magenta-soft">
            editando
          </span>
        </div>

        <div className="absolute inset-0 flex items-center gap-3 px-4 pt-7 pb-4">
          {/* Imagen: el cursor la arrastra desde abajo hasta su hueco */}
          <motion.div
            className="relative flex aspect-square h-[74%] shrink-0 items-center justify-center rounded-lg border border-line/60 bg-surface-2/70"
            initial={{ opacity: 0, x: -30, y: 30, scale: 0.9 }}
            animate={
              reduce
                ? { opacity: 1, x: 0, y: 0, scale: 1 }
                : {
                    opacity: [0, 1, 1, 1, 1],
                    x: [-30, -30, 0, 0, 0],
                    y: [30, 30, 0, 0, 0],
                    scale: [0.9, 0.95, 1, 1, 1],
                  }
            }
            transition={
              reduce
                ? { duration: 0.3 }
                : {
                    duration: D_LOOP,
                    repeat: Infinity,
                    ease: 'easeOut',
                    times: [0, 0.06, 0.19, 0.95, 1],
                  }
            }
          >
            {/* Marcador de imagen, como el placeholder de un editor */}
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 text-faint"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            {!reduce && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0, 0] }}
                transition={selT(0.05, 0.24)}
              >
                <Handles />
              </motion.div>
            )}
          </motion.div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* Título: caja que aparece y se teclea dentro */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? appear : {}}
              transition={appearT(0.3)}
            >
              <p className="min-h-[16px] text-[13px] font-bold text-bone">
                {TITLE.slice(0, typed)}
                {!reduce && typed > 0 && typed < TITLE.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="ml-px inline-block h-3 w-[1.5px] translate-y-0.5 bg-magenta align-middle"
                  />
                )}
              </p>
              {!reduce && (
                <motion.div
                  className="pointer-events-none absolute -inset-x-1.5 -inset-y-1 rounded border border-dashed border-magenta/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0, 0] }}
                  transition={selT(0.4, 0.62)}
                />
              )}
            </motion.div>

            {/* Descripción */}
            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? appear : {}}
              transition={appearT(0.56)}
            >
              <div className="h-1.5 w-full rounded bg-line/60" />
              <div className="h-1.5 w-4/5 rounded bg-line/60" />
            </motion.div>

            {/* Botón: el cursor lo suelta al final */}
            <motion.div
              className="relative mt-1 w-fit"
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={
                reduce
                  ? { opacity: 1, y: 0, scale: 1 }
                  : {
                      opacity: [0, 0, 1, 1, 1],
                      y: [12, 12, 0, 0, 0],
                      scale: [0.9, 0.9, 1.08, 1, 1],
                    }
              }
              transition={
                reduce
                  ? { duration: 0.3 }
                  : {
                      duration: D_LOOP,
                      repeat: Infinity,
                      ease: 'backOut',
                      times: [0, 0.66, 0.74, 0.95, 1],
                    }
              }
            >
              <div className="flex h-7 items-center rounded-lg bg-magenta px-3.5">
                <span className="text-[10px] font-bold text-white">
                  Añadir al carrito
                </span>
              </div>
              {!reduce && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0, 0] }}
                  transition={selT(0.7, 0.86)}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Cursor del diseñador */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute z-20"
            initial={{ left: CURSOR_X[0], top: CURSOR_Y[0], opacity: 0 }}
            animate={
              inView
                ? {
                    left: CURSOR_X,
                    top: CURSOR_Y,
                    opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1],
                  }
                : {}
            }
            transition={{
              duration: D_LOOP,
              repeat: Infinity,
              ease: 'easeInOut',
              times: CURSOR_T,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 drop-shadow-lg"
              fill="white"
            >
              <path d="M5 3l14 8-6 1.5L9.5 19 5 3z" />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  )
}

