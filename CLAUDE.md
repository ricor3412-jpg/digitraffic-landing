# CLAUDE.md — Landing Digitraffic

> Contexto rápido del proyecto. La fuente de verdad es `SPEC.md`.

## Qué es

Landing de captación de leads para **Digitraffic** (agencia de CRO + Shopify).
Objetivo único: que el visitante agende una llamada en **Calendly**.

Referencia de estructura: `https://www.iuropagency.com/` (hecha en Framer).
Se replica su **arquitectura de persuasión**, no su marca ni su copy.

## Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Framer Motion 12 · react-calendly
Despliegue: **Vercel** (detección automática de Vite; build `npm run build`, output `dist`).

## Reglas de este proyecto

1. **Todo el contenido va en `src/lib/config.ts`.** Nunca hardcodees textos, URLs
   ni datos dentro de un componente. Si hay que cambiar una palabra, se cambia ahí.
2. **La URL de Calendly se define una sola vez** (`CALENDLY_URL` en config.ts).
   Todos los CTA usan el hook `useCalendly()`.
3. **Toda animación respeta `prefers-reduced-motion`.** Usa `useReducedMotion()` de
   Framer Motion antes de animar. Los wrappers de `components/ui/Motion.tsx` ya lo hacen.
4. **Tailwind 4 se configura en CSS**, no en `tailwind.config.js` (no existe).
   Los tokens están en el bloque `@theme` de `src/index.css`.
5. **El alias `@/` apunta a `src/`.** Está declarado en dos sitios y deben coincidir:
   `vite.config.ts` (resolve.alias) y `tsconfig.app.json` (paths).
6. **No reordenar las secciones** sin entender la arquitectura de conversión
   (ver SPEC.md §3). El orden es el argumento de venta.

## Marca

- Magenta `#FF13CD` — color de acción (CTAs). Es el 60 % de la identidad.
- Púrpura `#740075` · Ink `#161F2A` · Void `#0B0F15` (fondo) · Bone `#F1F1F1` (texto)
- Semánticos: Danger `#FF4D6D` (pérdidas) · Gain `#22D39A` (ganancias)
- Tipografía: **Oceanwide** (titulares, comercial — no está en Google Fonts) y
  **Albert Sans** (cuerpo, sí está en Google Fonts).
- Assets originales en `Brand/`; los SVG usables en `public/brand/`.

## Trampas conocidas

- **Obscura no puede renderizar esta web.** No ejecuta módulos ES, así que `#root`
  sale vacío. Para verificar visualmente hay que usar **Playwright + Chromium**.
- **Capturas `fullPage` mienten.** Playwright fotografía sin hacer scroll, así que las
  animaciones `whileInView` no disparan y las secciones de abajo salen en negro.
  Hay que hacer scroll a cada sección antes de capturar.
- **`as const` en config.ts estrecha los tipos.** Al pasar un default a `useState` hay
  que anotar el tipo (`useState<number>(...)`) o TS infiere el literal.
- En Windows, `mv` falla con "Permission denied" si el dev server sigue vivo.
  Hay que parar node antes de mover archivos.

## Estado

Landing completa y funcional. **Pendiente de contenido real** (ver SPEC.md §5):
URL de Calendly, logos de clientes, métricas reales, imagen OG.
