/* ═══════════════════════════════════════════════════════════════
   CONFIGURACIÓN CENTRAL — DIGITRAFFIC
   ───────────────────────────────────────────────────────────────
   Este es el ÚNICO archivo que necesitas tocar para cambiar
   contenido, enlaces y datos de la landing.
   Todo lo marcado con  ⚠️ TODO  es un placeholder a reemplazar.
   ═══════════════════════════════════════════════════════════════ */

/* ── 1. CALENDLY ──────────────────────────────────────────────
   URL real del evento. Se usa en TODOS los botones de la página:
   cambiarla aquí la cambia en todos.

   Nota: aquí va la URL PÚBLICA del evento, nunca un token de API.
   El popup no necesita autenticación, y cualquier clave que se
   pusiera en el frontend sería visible para todo el mundo.
   ─────────────────────────────────────────────────────────── */
export const CALENDLY_URL = 'https://calendly.com/digitraffic/valoracion'

/* Duración real del evento en Calendly. Se muestra junto al CTA del hero,
   así que TIENE que coincidir con lo que está configurado allí: prometer
   30 min y que el calendario pida una hora es la forma más tonta de perder
   una cita ya ganada. */
export const CALENDLY_DURATION = '1 hora'

/* Personalización del popup de Calendly (colores de marca).
   Sin el `hideGdprBanner`, el aviso de cookies de Calendly tapa el
   calendario justo cuando el usuario va a elegir día. */
export const CALENDLY_PAGE_SETTINGS = {
  backgroundColor: '0b0f15',
  primaryColor: 'ff13cd',
  textColor: 'f1f1f1',
  hideEventTypeDetails: false,
  hideLandingPageDetails: false,
  hideGdprBanner: true,
} as const

/* ── 2. EMPRESA ───────────────────────────────────────────── */
export const COMPANY = {
  name: 'Digitraffic',
  /* ⚠️ TODO: ajusta estos datos si cambian */
  email: 'figmadigitraffic@gmail.com',
  yearsExperience: 10,
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
  /* El titular se parte para poder insertar el LOGO de Shopify en medio
     (donde iría la palabra) y animar la parte destacada. */
  titleStart: 'Hacemos que tu',
  /* aquí va el logo de Shopify */
  titleHighlight: 'venda más',
  titleEnd: 'con el tráfico que ya tienes.',
  subtitle:
    'Somos un equipo obsesionado con la conversión. Llevamos más de 10 años creando y optimizando tiendas Shopify para que vendan más.',
  cta: 'Quiero una web que venda más',
} as const

/* ── 5. CLIENTES ──────────────────────────────────────────────
   Tarjetas rectangulares: la foto YA trae el logo incrustado (vienen así
   exportadas de Figma), por eso `logo` es null en todas — pintar otro encima
   sería duplicarlo. El campo se conserva por si algún cliente futuro aporta
   solo foto y hay que superponerle su logo.

   · image → foto en /public/clients/ (vertical 3:4, WebP ~720px).
             Si es null se pinta un degradado de marca como placeholder.
   · logo  → SVG/PNG blanco. Si es null, no se superpone nada.
   · url   → web del cliente. Si es null la tarjeta NO es clicable, así que
             una URL que falte nunca produce un enlace roto.
   ─────────────────────────────────────────────────────────── */
export const CLIENTS_HEADLINE =
  'Algunas de las marcas con las que hemos trabajado estos últimos 10 años'

export type Client = {
  name: string
  image: string | null
  logo: string | null
  url: string | null
}

export const CLIENTS: Client[] = [
  {
    name: 'Evobike',
    image: '/clients/evobike.webp',
    logo: null,
    url: 'https://evobike.com.co/',
  },
  {
    name: 'Lami',
    image: '/clients/lami.webp',
    logo: null,
    url: 'https://lami.com.co/',
  },
  {
    name: 'Casa Marqueza',
    image: '/clients/casa-marqueza.webp',
    logo: null,
    url: 'https://casamarqueza.com/',
  },
  {
    name: 'Pultime',
    image: '/clients/pultime.webp',
    logo: null,
    url: 'https://pultime.com/',
  },
  {
    name: 'La Squadra',
    image: '/clients/la-squadra.webp',
    logo: null,
    url: 'https://www.lasquadra.com.co/',
  },
  {
    name: 'Petit Bowtique',
    image: '/clients/petit-bowtique.webp',
    logo: null,
    url: 'https://petitbowtique.com/',
  },
  {
    name: 'Elite.Living',
    image: '/clients/elite-living.webp',
    logo: null,
    url: 'https://eliteliving.com.co/',
  },
  {
    name: 'The MindPixels',
    image: '/clients/the-mindpixels.webp',
    logo: null,
    url: 'https://themindpixels.com/',
  },
  {
    name: 'Okey Sportwear',
    image: '/clients/okey-sportwear.webp',
    logo: null,
    url: 'https://okeysport.com/',
  },
  {
    name: 'Audiocolor',
    image: '/clients/audiocolor.webp',
    logo: null,
    url: 'https://audiocolor.co/',
  },
]

/* ── 6. PROBLEMAS (agitación del dolor) ───────────────────── */
export const PROBLEMS = {
  title: '¿Por qué tu tienda no vende lo que debería?',
  subtitle:
    'Estos son los problemas que hacen que tu tienda Shopify pierda dinero cada día.',
  cta: 'Quiero solucionar estos problemas',
  items: [
    {
      id: 'plantilla',
      title: 'Una plantilla genérica',
      body: 'Usas el mismo tema de Shopify que otras mil tiendas. No comunicas tu propuesta de valor y no te diferencias de tu competencia.',
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
      body: 'Apps del App Store de Shopify cobrándote cada mes. Ralentizan tu web, no se integran entre sí y puedes prescindir del 90%.',
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
  subtitle: 'Llevamos 10 años arreglando exactamente estos problemas.',
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
   ES UNA HERRAMIENTA PARA ELLOS, NO UN ARGUMENTO NUESTRO.

   No promete nada ("te subimos X puntos") — eso es vendernos, y además
   cualquier promesa fija produce disparates: prometer +0,5 pts a quien
   convierte al 0,1 % es prometerle sextuplicar las ventas.

   Lo único que hace es responder, con SUS números, a una pregunta que el
   dueño de una tienda nunca se ha parado a calcular:

        ¿cuánto vale, en pesos, cada punto de conversión?

   El visitante mueve sus sliders, ve lo que vale su propia mejora, y saca su
   conclusión. Nadie le está diciendo lo que va a pasar.
   ─────────────────────────────────────────────────────────── */
export const CALCULATOR = {
  title: '¿Cuánto vale un punto de conversión en tu tienda?',
  subtitle:
    'Mueve tus números reales y descubre cuánto factura tu tienda por cada décima de conversión. Es tu dinero, y probablemente nunca lo has calculado.',
  cta: 'Quiero hablar de mis números',

  /* Valores de arranque (mercado colombiano, COP).
     Los 4 están vinculados: pedidos = sesiones × conversión / 100. */
  defaults: {
    sessions: 50_000,
    orders: 750,
    conversionRate: 1.5, // 50.000 × 1,5% = 750 ✓
    averageOrderValue: 180_000,
  },

  /* Rangos de los sliders.
     El de PEDIDOS no está aquí: se deriva de las sesiones y de los límites de
     conversión (ver Calculator.tsx). Si fuera fijo se podrían pedir
     combinaciones imposibles —20.000 pedidos con 50.000 sesiones serían un
     40 % de conversión— y el slider de conversión mentiría al topar. */
  ranges: {
    sessions: { min: 1_000, max: 100_000, step: 1_000 },
    conversionRate: { min: 0.1, max: 10, step: 0.1 },
    averageOrderValue: { min: 20_000, max: 600_000, step: 10_000 },
  },

  /* Referencia del sector para situarle, NO para prometerle nada.
     La media real del e-commerce ronda el 2–3 %. */
  benchmark: {
    average: 2.5, // media del sector
    good: 4, // a partir de aquí lo está haciendo bien
    /* Tope de la escala de puntuación. Un 6 % es el percentil ~90 del
       e-commerce: casi nadie lo alcanza, así que puntuar sobre él no insulta
       a quien va bien. */
    ceiling: 6,
  },
} as const

/* ── 9. METODOLOGÍA ──────────────────────────────────────── */
export const METHODOLOGY = {
  title: 'Nuestra metodología',
  subtitle:
    'Así trabajamos para darte el mejor servicio con los mejores resultados.',
  cta: 'Quiero empezar',
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

/* ── 10. FAQ ──────────────────────────────────────────────── */
export const FAQ = {
  title: 'Preguntas frecuentes',
  items: [
    {
      q: '¿Solo hacen tiendas online?',
      a: 'Nos especializamos en ecommerce sobre Shopify, porque es donde generamos más impacto. También trabajamos landing pages de alta conversión y optimización CRO sobre tiendas ya existentes.',
    },
    {
      q: '¿Qué es la auditoría CRO?',
      a: 'Es un análisis con datos de tu tienda: dónde abandonan los usuarios, qué fricciones hay en el checkout, qué puntos de decisión están mal resueltos. De ahí sale un plan priorizado por impacto sobre tu facturación.',
    },
    {
      q: '¿Cuánto tardan en diseñar y desarrollar la tienda?',
      a: 'El proceso completo lleva entre 5 y 8 semanas, dividido en cuatro fases: onboarding, auditoría CRO, diseño y desarrollo.',
    },
    {
      q: '¿Cómo funciona la comunicación?',
      a: 'Tienes un canal directo con el equipo y reuniones de seguimiento periódicas. Nada de esperar días por una respuesta.',
    },
    {
      q: '¿Recibo asesoramiento para mejorar mi estrategia?',
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
  cta: 'Agenda tu diagnóstico',
} as const
