# SPEC — Landing Digitraffic

> **Fuente de verdad del proyecto.** Última actualización: 2026-07-14
> Estado general: ✅ Landing construida, verificada y compilando. Pendiente contenido real.

---

## 1. Objetivo

Landing page de captación de leads para **Digitraffic**, agencia de CRO y
desarrollo de tiendas Shopify.

**Métrica única de éxito:** llamadas agendadas en Calendly.

Todo lo demás (diseño, animaciones, copy) está subordinado a eso.

---

## 2. Stack y decisiones

| Decisión         | Elección                | Por qué                                                              |
| ---------------- | ----------------------- | -------------------------------------------------------------------- |
| Framework        | React 19 + Vite 8       | Landing de una sola página; no hace falta SSR ni rutas.               |
| Estilos          | Tailwind CSS 4          | Config en CSS (`@theme`), sin `tailwind.config.js`.                   |
| Animaciones      | Framer Motion 12        | La referencia está hecha en Framer; mismo motor → misma sensación.    |
| Agendamiento     | react-calendly (popup)  | Popup en vez de embed: no saca al usuario de la página.               |
| Despliegue       | Vercel                  | Detecta Vite solo. Build `npm run build`, output `dist`.              |

**Referencia:** `https://www.iuropagency.com/` — construida en Framer.
Se replica su arquitectura de conversión, **no** su marca, copy ni assets.

---

## 3. Arquitectura de conversión

El orden de las secciones **es** el argumento de venta:

| # | Sección      | Función psicológica                                             |
| - | ------------ | --------------------------------------------------------------- |
| 1 | Hero         | Promesa de eficiencia ("el tráfico que *ya tienes*") + escasez.  |
| 2 | Clientes     | Prueba social: carrusel de tarjetas con foto + logo.             |
| 3 | Problemas    | Agita el dolor: 7 fallos, en carrusel horizontal con escenas.    |
| 4 | Soluciones   | Espeja cada dolor con su remedio.                               |
| 5 | Calculadora  | **Pieza clave.** Modelo relacional: el visitante ve en vivo      |
|   |              | cómo al subir la conversión suben pedidos Y facturación.         |
| 6 | Metodología  | Pestañas sincronizadas con el scroll. Cada fase muestra su       |
|   |              | entregable (el de desarrollo teclea código Liquid).              |
| 7 | FAQ          | Derriba las últimas objeciones.                                 |
| 8 | CTA final    | El cierre.                                                      |

**Decisiones de mercado (Colombia):**
- Moneda: **peso colombiano (COP)**, formateado en `src/lib/money.ts`. Las cifras
  grandes se abrevian (`$ 12,7 M`) para que no desborden; las exactas usan
  separador de miles (`$ 180.000`).
- **No se menciona Shopify** en ninguna parte visible. Digitraffic no se presenta
  como agencia de una sola plataforma.
- **No hay sección de garantía contractual.** Se retiró: prometer "trabajamos
  gratis hasta que suba" es un compromiso que la agencia no quiere adquirir.

**Los CTA escalan con el estado mental del visitante:**
"Quiero obtener estos resultados" (soluciones) → "Quiero hablar de mis números"
(calculadora) → "Quiero empezar" (metodología) → "Agenda tu diagnóstico" (cierre).
La sección de Problemas **ya no lleva CTA**: solo agita el dolor, el primer botón
llega con la solución.

---

## 4. Estado de la implementación

### Hecho ✅

- [x] Análisis del sitio de referencia (estructura, copy, colores, tipografía, animaciones)
- [x] Scaffold Vite + React 19 + TypeScript + Tailwind 4
- [x] Design system con los tokens de marca reales de Digitraffic (`src/index.css`)
- [x] Config central: todo el contenido en un solo archivo (`src/lib/config.ts`)
- [x] Provider de Calendly con popup (`src/lib/calendly.tsx`)
- [x] Primitivos de animación que respetan `prefers-reduced-motion`
- [x] Navbar con scroll spy y menú móvil
- [x] Hero: titular animado palabra a palabra, subrayado SVG que se dibuja, badge de escasez
- [x] Clientes: marquesina infinita (con placeholders)
- [x] Problemas: 7 tarjetas con resplandor que sigue al cursor
- [x] Soluciones: 3 bloques alternos con visuales SVG animados
- [x] **Calculadora CRO interactiva** — sliders, cálculo en vivo, anillo de puntuación
- [x] Garantía con borde degradado
- [x] Metodología: línea temporal que se dibuja al hacer scroll
- [x] FAQ: acordeón accesible
- [x] CTA final + footer
- [x] Responsive (verificado a 1440 px y 390 px)
- [x] Build de producción limpio: 436 módulos, 120 KB gzip, 0 errores
- [x] Verificación funcional con Playwright: React monta, 9 secciones, calculadora
      recalcula en vivo (21.250 € → 212.500 € al mover el slider), 0 errores en consola
- [x] Repositorio git inicializado, rama `main`, commit inicial
- [x] Documentación: README.md, CLAUDE.md, SPEC.md
- [x] **Bug corregido:** el logo era ilegible sobre fondo oscuro. `logo-horizontal.svg`
      trae el texto en `#161F2A` (casi negro). Sustituido en navbar y footer por
      isotipo (que sí lleva el degradado) + nombre en texto blanco.
- [x] Encuadre del hero verificado a 1440×900, 1920×1080 y 390×844: el navbar nunca
      tapa el titular, el CTA se ve sin scroll y no hay scroll horizontal.
- [x] **Ronda de correcciones de copy (revisión cliente):**
      · Experiencia unificada a **10 años** (`yearsExperience`, hero, clientes, soluciones).
      · Hero: frase suavizada a "para que vendan más" (antes "máquinas de vender").
      · Problemas: **CTA eliminado** (imports muertos limpiados).
      · Soluciones y Calculadora: **eyebrows quitados** ("La solución", "La calculadora").
      · Metodología: CTA "Quiero trabajar juntos" → **"Quiero empezar"**.
      · CTA final: quitado el subtítulo "Sin doblar el presupuesto en ads." y la palabra
        "gratuito" del botón → **"Agenda tu diagnóstico"**.
- [x] **Rediseño de 3 visuales animados (según página de referencia):**
      · **Onboarding** — nuevo `OnboardingIntegrations`: "buscador" con typewriter en
        loop (escribe y borra frases) + abanico de cartas compactas agrupadas en su
        propio panel con Shopify al centro, y logos del stack flotando a los lados
        (GA4, Search Console, Meta). Reemplaza las barras de "análisis competitivo".
      · **Diseño** — nuevo `CroBeforeAfter`: mockup de tienda cuyo degradado transiciona
        de rojo (no convierte) a verde (optimizada), con cursor recorriendo y badge
        "Especialista en CRO". Reemplaza a `DesignVisual`.
      · **Soluciones/tráfico** — nuevo `TrafficToSales` (réplica de iurop): los
        visitantes (caras del hero) caen por un embudo de dos paredes hasta el icono
        de Shopify en la boca; cada llegada dispara una notificación de compra. En loop.
        Reemplaza el gráfico ascendente + notificación anteriores.
      · **Soluciones/retención** — nuevo `ShopifyOrdersPhone`: réplica de la app de
        Shopify (en inglés) en un teléfono cortado por abajo, con la lista de pedidos
        en scroll infinito.
      · Nuevos componentes: `src/components/svg/MethodologyVisuals.tsx` y
        `ShopifyOrdersPhone` en `Visuals.tsx`. Logos oficiales en `public/brand/logos/`
        (simple-icons, a color).
      · **Metodología** — las 4 fases ahora viven dentro de UN SOLO panel de fondo
        común (contenedor con borde/fondo que las envuelve, como iurop), y se quitaron
        los dobles marcos de los visuales internos para que se integren en el panel.
      · **Intercambio de visuales**: Auditoría CRO recibe el mockup "antes→después"
        (rojo→verde, es un hallazgo de auditoría) y Proceso de diseño recibe la nueva
        `DesigningSection`: el cursor maqueta la ficha —arrastra la imagen con handles,
        teclea el título, suelta el botón—. El antiguo embudo de barras se eliminó.
      · **Embudo tráfico→ventas** rehecho: ya no es un triángulo sino un embudo real
        (tolva + cuello vertical). Los visitantes siguen curvas `offsetPath` que rozan
        las paredes hasta el cuello. Ocupa toda la card y la notificación salta al
        llegar al Shopify.
      · Todo respeta `prefers-reduced-motion`. Verificado con Playwright + build limpio.
- [x] **SEO técnico base** (para indexar y pautar):
      · `public/robots.txt` (permite todo + bots de IA) y `public/sitemap.xml`.
      · **Schema JSON-LD** en `index.html`: Organization + WebSite + FAQPage. Las 6
        preguntas del FAQPage DEBEN coincidir con las de `config.ts` (verificado) o
        Google lo penaliza — si se edita una FAQ, actualizar también el JSON-LD.
      · `canonical`, `og:url`, `og:site_name`, `og:image:width/height`, twitter tags.
      · Corregido: el `og:description` prometía "garantía contractual", sección ya
        retirada. Eliminado.
      · **Google Tag Manager** instalado con guard: si el ID sigue siendo el
        placeholder `GTM-XXXXXXX`, no carga nada (evita peticiones muertas en dev).
        Desde GTM se gestionan GA4, Meta Pixel y Google Ads sin tocar código.
      · Dominio usado en todo: `https://digitraffic.co/`.

### Pendiente ⏳

- [x] **Repo en GitHub**: `ricor3412-jpg/digitraffic-landing` (privado). Rama `main`
      con tracking a `origin/main`. Material de referencia (mp4/pdf/zip/logos sueltos)
      excluido vía `.gitignore`.
- [ ] Importar el repo en Vercel y desplegar
- [ ] **Rellenar el ID de GTM** (`GTM-XXXXXXX` en `index.html`, 2 sitios) y desde GTM
      añadir GA4 (`G-…`), Meta Pixel y Google Ads (`AW-…`).
- [ ] **Prerenderizado / SSR**: es una SPA de Vite, el HTML llega vacío. Google renderiza
      JS pero tarda; y Meta/LinkedIn/X NO ejecutan JS (solo ven los meta del index, que
      ya están bien). Para SEO robusto, evaluar `vite-plugin-ssr`/prerender o migrar a
      un framework con SSR. No bloquea el lanzamiento pero conviene.

---

## 5. Contenido pendiente (bloquea el lanzamiento)

Todo marcado con `⚠️ TODO` en `src/lib/config.ts`:

| # | Qué falta                | Dónde                                    | Bloqueante |
| - | ------------------------ | ---------------------------------------- | ---------- |
| 1 | **URL real de Calendly** | `CALENDLY_URL` en `src/lib/config.ts`    | 🔴 Sí — sin esto no se agenda nada |
| 2 | Logos de clientes        | `CLIENTS` + archivos en `public/clients/` | 🟠 Alta — la prueba social es texto |
| 3 | Métricas reales del hero | `src/components/sections/Hero.tsx`       | 🟠 Alta — las cifras son inventadas |
| 4 | ~~Imagen Open Graph~~    | ✅ Hecha: `public/og-image.jpg` (1200×630), con la marca real | — |
| 5 | Tipografía Oceanwide     | `public/fonts/oceanwide-semibold.woff2`  | 🟢 Baja — cae a Albert Sans |
| 6 | Casos de estudio         | Sección nueva, aún no existe             | 🟡 Media — mejoraría mucho la conversión |

---

## 6. Trampas técnicas (documentadas para no repetirlas)

1. **Obscura no renderiza esta web.** No ejecuta módulos ES → `#root` vacío.
   Falló igual con iuropagency.com. **Usar Playwright + Chromium** para verificar.
2. **Las capturas `fullPage` mienten.** Playwright no hace scroll, así que
   `whileInView` no dispara y las secciones inferiores salen negras. Hay que
   hacer scroll a cada sección antes de fotografiarla.
3. **El alias `@/` se declara en dos sitios** y deben coincidir: `vite.config.ts`
   y `tsconfig.app.json` (`paths`). Si falta en el segundo, `tsc --noEmit` pasa
   pero `npm run build` falla.
4. **`baseUrl` está deprecado** en TypeScript 6 — usar solo `paths`.
5. **`as const` estrecha los tipos**: al pasar un default de config a `useState`
   hay que anotar (`useState<number>(...)`) o infiere el literal.
6. **`@import` de Google Fonts debe ir antes que `@import 'tailwindcss'`**,
   o el navegador lo ignora y se pierde la tipografía.
7. **En Windows `mv` falla** si el dev server sigue vivo. Parar node primero.

---

## 7. Próximos pasos

1. Recibir de Digitraffic: URL de Calendly, logos de clientes, métricas reales.
2. Sustituir los placeholders en `src/lib/config.ts`.
3. `git init` + commit + push a GitHub.
4. Conectar el repo a Vercel y desplegar.
5. **Después del lanzamiento:** instalar analítica (GA4 / Clarity) para medir la
   conversión real de la landing — sería irónico que una agencia de CRO no midiera la suya.
