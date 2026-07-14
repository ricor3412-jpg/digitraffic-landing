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
| 2 | Clientes     | Prueba social inmediata.                                        |
| 3 | Problemas    | Agita el dolor: 7 fallos concretos y caros.                     |
| 4 | Soluciones   | Espeja cada dolor con su remedio.                               |
| 5 | Calculadora  | **Pieza clave.** El visitante ve en vivo cuánto pierde.         |
| 6 | Garantía     | Elimina el riesgo percibido.                                    |
| 7 | Metodología  | Demuestra proceso, no improvisación.                            |
| 8 | FAQ          | Derriba las últimas objeciones.                                 |
| 9 | CTA final    | El cierre.                                                      |

**Los CTA escalan con el estado mental del visitante:**
"Quiero solucionar estos problemas" → "Quiero obtener estos resultados"
→ "Quiero mejorar mi tasa de conversión" → "Agenda tu diagnóstico".

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

### Pendiente ⏳

- [ ] **Repositorio git** — pendiente de `git init` + primer commit
- [ ] Conectar a GitHub y desplegar en Vercel

---

## 5. Contenido pendiente (bloquea el lanzamiento)

Todo marcado con `⚠️ TODO` en `src/lib/config.ts`:

| # | Qué falta                | Dónde                                    | Bloqueante |
| - | ------------------------ | ---------------------------------------- | ---------- |
| 1 | **URL real de Calendly** | `CALENDLY_URL` en `src/lib/config.ts`    | 🔴 Sí — sin esto no se agenda nada |
| 2 | Logos de clientes        | `CLIENTS` + archivos en `public/clients/` | 🟠 Alta — la prueba social es texto |
| 3 | Métricas reales del hero | `src/components/sections/Hero.tsx`       | 🟠 Alta — las cifras son inventadas |
| 4 | Imagen Open Graph        | `public/og-image.jpg` (1200×630)         | 🟡 Media |
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
