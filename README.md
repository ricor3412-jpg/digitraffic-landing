# Digitraffic — Landing CRO

Landing page de captación de leads para **Digitraffic**, agencia especializada en
CRO y tiendas Shopify. Construida para convertir: cada sección empuja al visitante
hacia agendar una llamada en Calendly.

Referencia de estructura y ritmo: [iuropagency.com](https://www.iuropagency.com/)
(se replica la *arquitectura de persuasión*, no su contenido ni su marca).

---

## Stack

| Pieza        | Tecnología                     |
| ------------ | ------------------------------ |
| Framework    | React 19 + TypeScript          |
| Build        | Vite 8                         |
| Estilos      | Tailwind CSS 4 (config en CSS) |
| Animaciones  | Framer Motion 12               |
| Agendamiento | react-calendly (popup)         |
| Despliegue   | Vercel                         |

---

## Arranque rápido

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # sirve el build de producción
```

---

## ⚠️ Lo que tienes que personalizar

**Todo el contenido vive en un único archivo: `src/lib/config.ts`.**
No hace falta tocar ningún componente para cambiar textos, enlaces o datos.

Busca los comentarios `⚠️ TODO`. Pendiente:

1. **URL de Calendly** — `CALENDLY_URL`. Ahora apunta a una URL de ejemplo;
   sustitúyela por la real o los botones no agendarán nada.
2. **Logos de clientes** — `CLIENTS`. Ahora son nombres de texto ("Cliente Uno").
   Deja los SVG/PNG en `public/clients/` y apunta el campo `logo` a su ruta.
3. **Métricas del hero** — en `src/components/sections/Hero.tsx` hay 4 cifras de
   ejemplo (+68 % conversión, etc.). Cámbialas por resultados reales.
4. **Imagen Open Graph** — crea una de 1200×630 px y guárdala en `public/og-image.jpg`.
5. **Tipografía Oceanwide** *(opcional)* — es la primaria de marca, pero es comercial
   y no está en Google Fonts. Si tienes los archivos, déjalos en `public/fonts/`
   como `oceanwide-semibold.woff2`. Sin ellos la web usa Albert Sans (la secundaria
   de marca), que ya carga correctamente.

---

## Marca

Tokens definidos en `src/index.css` bajo `@theme`.

| Color   | Hex       | Uso                             |
| ------- | --------- | ------------------------------- |
| Magenta | `#FF13CD` | Color de acción — CTAs, acentos |
| Púrpura | `#740075` | Degradados, apoyo               |
| Ink     | `#161F2A` | Superficies, tarjetas           |
| Void    | `#0B0F15` | Fondo de la página              |
| Bone    | `#F1F1F1` | Texto principal                 |
| Danger  | `#FF4D6D` | Pérdidas, dolor (calculadora)   |
| Gain    | `#22D39A` | Ganancias, éxito                |

**Tipografía:** Oceanwide (titulares) · Albert Sans (cuerpo).

---

## Arquitectura de conversión

El orden de las secciones **es** el argumento de venta. No lo reordenes sin motivo:

1. **Hero** — promesa de eficiencia ("con el tráfico que *ya tienes*") + escasez.
2. **Clientes** — prueba social inmediata.
3. **Problemas** — agita el dolor con 7 fallos concretos y caros.
4. **Soluciones** — espeja esos dolores, uno a uno.
5. **Calculadora** — *la pieza clave*. El visitante mete sus números y ve en vivo
   cuánto dinero pierde cada mes. Se autoconvence solo.
6. **Garantía** — elimina el riesgo percibido.
7. **Metodología** — demuestra que hay un proceso, no improvisación.
8. **FAQ** — derriba las últimas objeciones.
9. **CTA final** — el cierre.

Los CTA escalan con el estado mental del visitante: "Quiero solucionar estos
problemas" → "Quiero obtener estos resultados" → "Quiero mejorar mi conversión".

---

## Estructura

```
src/
├── lib/
│   ├── config.ts        ← TODO el contenido y la config vive aquí
│   └── calendly.tsx     ← Provider del popup de Calendly
├── components/
│   ├── sections/        ← Una sección de la landing por archivo
│   ├── ui/              ← Button, Section, Counter, primitivos de animación
│   └── svg/             ← Visuales SVG animados (originales)
├── index.css            ← Design system: tokens y utilidades
└── App.tsx              ← Ensambla las secciones en orden
```

---

## Accesibilidad

- Respeta `prefers-reduced-motion`: si el usuario pide menos movimiento, las
  animaciones se desactivan y el contenido aparece estático.
- FAQ y menú móvil usan `aria-expanded`; los SVG decorativos van con `aria-hidden`.
- Foco visible en todos los elementos interactivos.

---

## Despliegue en Vercel

Vercel detecta Vite automáticamente. No necesita configuración extra:

- **Build command:** `npm run build`
- **Output directory:** `dist`

```bash
vercel
```
