/* ═══════════════════════════════════════════════════════════════
   CONFIGURACIÓN CENTRAL — DIGITRAFFIC
   ───────────────────────────────────────────────────────────────
   Este es el ÚNICO archivo que necesitas tocar para cambiar
   contenido, enlaces y datos de la landing.
   Todo lo marcado con  ⚠️ TODO  es un placeholder a reemplazar.
   ═══════════════════════════════════════════════════════════════ */

/* ── 1. CALENDLY ──────────────────────────────────────────────
   ⚠️ TODO: pega aquí tu URL real de Calendly.
   Formato: https://calendly.com/tu-usuario/nombre-del-evento
   Se usa en TODOS los botones de la página. Cambiar aquí = cambiar en todos.
   ─────────────────────────────────────────────────────────── */
export const CALENDLY_URL = 'https://calendly.com/digitraffic/diagnostico-cro'

/* Personalización del popup de Calendly (colores de marca) */
export const CALENDLY_PAGE_SETTINGS = {
  backgroundColor: '0b0f15',
  primaryColor: 'ff13cd',
  textColor: 'f1f1f1',
  hideEventTypeDetails: false,
  hideLandingPageDetails: false,
} as const

/* ── 2. EMPRESA ───────────────────────────────────────────── */
export const COMPANY = {
  name: 'Digitraffic',
  /* ⚠️ TODO: ajusta estos datos si cambian */
  email: 'figmadigitraffic@gmail.com',
  yearsExperience: 7,
  /* Gancho de escasez del hero — la referencia usa "5 proyectos/mes" */
  scarcity: 'Solo trabajamos con 5 proyectos al mes',
} as const

/* ── 3. NAVEGACIÓN ────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Problemas', href: '#problemas' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Calculadora', href: '#calculadora' },
  { label: 'Método', href: '#metodologia' },
  { label: 'FAQ', href: '#faq' },
] as const

/* ── 4. HERO ──────────────────────────────────────────────── */
export const HERO = {
  /* El titular se parte en 3 para animar la palabra destacada */
  titleStart: 'Hacemos que tu Shopify',
  titleHighlight: 'venda más',
  titleEnd: 'con el tráfico que ya tienes.',
  subtitle:
    'Somos un equipo obsesionado con la conversión. Llevamos más de 7 años creando y optimizando tiendas Shopify para convertirlas en máquinas de vender.',
  cta: 'Quiero una web que venda más',
} as const

/* ── 5. CLIENTES ──────────────────────────────────────────────
   ⚠️ TODO: reemplaza con tus clientes reales.
   Pon los logos en /public/clients/ y apunta `logo` a la ruta.
   Si `logo` es null, se pinta el nombre como texto (placeholder).
   ─────────────────────────────────────────────────────────── */
export const CLIENTS_HEADLINE =
  'Marcas que ya venden más con nosotros'

export const CLIENTS: { name: string; logo: string | null }[] = [
  { name: 'Cliente Uno', logo: null }, // ⚠️ TODO
  { name: 'Cliente Dos', logo: null }, // ⚠️ TODO
  { name: 'Cliente Tres', logo: null }, // ⚠️ TODO
  { name: 'Cliente Cuatro', logo: null }, // ⚠️ TODO
  { name: 'Cliente Cinco', logo: null }, // ⚠️ TODO
  { name: 'Cliente Seis', logo: null }, // ⚠️ TODO
]

/* ── 6. PROBLEMAS (agitación del dolor) ───────────────────── */
export const PROBLEMS = {
  title: '¿Por qué tu tienda no vende lo que debería?',
  subtitle:
    'Estos son los problemas que hacen que tu Shopify pierda dinero cada día.',
  cta: 'Quiero solucionar estos problemas',
  items: [
    {
      id: 'plantilla',
      title: 'Una plantilla genérica',
      body: 'Usas el mismo tema que otras mil tiendas. No comunicas tu propuesta de valor y no te diferencias de tu competencia.',
    },
    {
      id: 'margen',
      title: 'Margen muy reducido',
      body: 'Sin una buena tasa de conversión tu margen se estrecha y no puedes crecer de forma sostenible.',
    },
    {
      id: 'intuicion',
      title: 'Cambios sin saber si funcionan',
      body: 'Modificas colores, botones y textos por intuición. Sin datos, no sabes dónde estás perdiendo el dinero.',
    },
    {
      id: 'cac',
      title: 'Inviertes más y no ganas más',
      body: 'Inviertes en ads y contenido pero el CAC sigue subiendo. Para crecer necesitas doblar presupuesto y tu ROAS baja. Insostenible.',
    },
    {
      id: 'aov',
      title: 'Ticket medio estancado',
      body: 'Tus clientes compran lo mínimo. Sin una estrategia de upsells y cross-sells inteligentes, estás dejando dinero sobre la mesa.',
    },
    {
      id: 'apps',
      title: 'Aplicaciones innecesarias',
      body: 'Apps de terceros cobrándote cada mes. Ralentizan tu web, no se integran entre sí y puedes prescindir del 90%.',
    },
    {
      id: 'velocidad',
      title: 'Una web que tarda en cargar',
      body: 'El cliente no espera, y menos desde el móvil. Pierdes la mitad del tráfico antes de que lleguen a ver tus productos.',
    },
  ],
} as const

/* ── 7. SOLUCIONES ────────────────────────────────────────── */
export const SOLUTIONS = {
  title: 'Sabemos cómo hacer que tu web venda más sin que gastes más',
  subtitle: 'Llevamos 7 años arreglando exactamente estos problemas.',
  cta: 'Quiero obtener estos resultados',
  items: [
    {
      id: 'conversion',
      title: 'Más ventas con el mismo tráfico',
      body: 'Eliminamos fricciones, mejoramos el user journey y optimizamos cada punto de decisión de compra.',
      visual: 'notification' as const,
    },
    {
      id: 'aov',
      title: 'Clientes que compran más por pedido',
      body: 'Cross-sells estratégicos, presentación de producto que invita a añadir más, bundles nativos y estrategias de envío.',
      visual: 'aov' as const,
    },
    {
      id: 'retencion',
      title: 'Estrategia diseñada para que vuelvan a comprar',
      body: 'Una web que hace fácil volver a comprar genera más pedidos sin que el cliente se lo piense dos veces.',
      visual: 'orders' as const,
    },
  ],
} as const

/* ── 8. CALCULADORA CRO ───────────────────────────────────────
   La pieza central de conversión. El visitante mete sus números
   y ve en vivo cuánto dinero está dejando escapar.
   ─────────────────────────────────────────────────────────── */
export const CALCULATOR = {
  title: 'Calcula cuánto dejas de ganar cada mes',
  subtitle:
    'Pequeñas mejoras en las métricas clave transforman tu cuenta de resultados sin aumentar un euro de inversión publicitaria.',
  cta: 'Quiero mejorar mi tasa de conversión',
  /* Valores de arranque de los sliders */
  defaults: {
    sessions: 50_000,
    conversionRate: 1.5, // %
    averageOrderValue: 85, // €
  },
  /* Mejora de conversión que prometemos (en puntos porcentuales) */
  upliftPoints: 0.5,
  currency: '€',
} as const

/* ── 9. GARANTÍA ──────────────────────────────────────────── */
export const GUARANTEE = {
  title: 'Garantía contractual de resultados',
  body: 'Si tu conversión no sube tras rehacer tu web, seguimos trabajando gratis hasta conseguirlo. No cobramos por horas. Cobramos por resultados.',
  cta: 'Quiero más conversión asegurada',
} as const

/* ── 10. METODOLOGÍA ──────────────────────────────────────── */
export const METHODOLOGY = {
  title: 'Nuestra metodología',
  subtitle:
    'Así trabajamos para darte el mejor servicio con los mejores resultados.',
  cta: 'Quiero trabajar juntos',
  steps: [
    {
      id: 'onboarding',
      tag: 'Semana 1–2',
      title: 'Proceso de onboarding',
      body: 'Analizamos tu competencia, tu cliente ideal y tu propuesta de valor. Identificamos los cuellos de botella de conversión.',
    },
    {
      id: 'auditoria',
      tag: 'Semana 2–3',
      title: 'Auditoría CRO',
      body: 'Diseñamos el customer journey optimizado. Definimos upsells, bundles y puntos de conversión con datos, no con intuición.',
    },
    {
      id: 'diseno',
      tag: 'Semana 3–5',
      title: 'Proceso de diseño',
      body: 'Creamos un diseño que guía hacia la compra. Cada elemento de la página tiene un propósito de conversión.',
    },
    {
      id: 'desarrollo',
      tag: 'Semana 5–8',
      title: 'Proceso de desarrollo',
      body: 'Desarrollo nativo de alto rendimiento, pensado para que no necesites depender de desarrolladores en tu día a día.',
    },
  ],
} as const

/* ── 11. FAQ ──────────────────────────────────────────────── */
export const FAQ = {
  title: 'Preguntas frecuentes',
  items: [
    {
      q: '¿Solo hacéis tiendas online?',
      a: 'Nos especializamos en ecommerce sobre Shopify, porque es donde generamos más impacto. También trabajamos landing pages de alta conversión y optimización CRO sobre tiendas ya existentes.',
    },
    {
      q: '¿Qué es la auditoría CRO?',
      a: 'Es un análisis con datos de tu tienda: dónde abandonan los usuarios, qué fricciones hay en el checkout, qué puntos de decisión están mal resueltos. De ahí sale un plan priorizado por impacto sobre tu facturación.',
    },
    {
      q: '¿Cuánto tardáis en diseñar y desarrollar la tienda?',
      a: 'El proceso completo lleva entre 5 y 8 semanas, dividido en cuatro fases: onboarding, auditoría CRO, diseño y desarrollo.',
    },
    {
      q: '¿Cómo funciona la comunicación?',
      a: 'Tienes un canal directo con el equipo y reuniones de seguimiento periódicas. Nada de esperar días por una respuesta.',
    },
    {
      q: '¿Recibiré asesoramiento para mejorar mi estrategia?',
      a: 'Sí. No solo entregamos una web: te acompañamos con recomendaciones de estrategia de conversión, retención y ticket medio.',
    },
    {
      q: '¿Cuándo se efectúa el pago?',
      a: 'El pago se fracciona por fases del proyecto. Lo concretamos en la llamada de diagnóstico, sin sorpresas ni letra pequeña.',
    },
  ],
} as const

/* ── 12. CTA FINAL ────────────────────────────────────────── */
export const FINAL_CTA = {
  title: 'Hagamos que tu Shopify facture el doble.',
  subtitle: 'Sin doblar el presupuesto en ads.',
  cta: 'Agenda tu diagnóstico gratuito',
} as const
