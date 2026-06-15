# IMPACTO LÁSER — Landing Page Premium

> Limpieza y restauración sin dañar superficies.

Landing page de nivel AAA para **IMPACTO LÁSER**: una experiencia visual
cinematográfica con intro de láser, fondo 3D de partículas, scroll suave,
cursor personalizado y micro-interacciones premium. Inspirada en el lenguaje
visual de Apple, Tesla, SpaceX, Stripe, Linear y Vercel.

---

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | **Next.js 14** (App Router) + **React 18** |
| Estilos | **TailwindCSS** + sistema de diseño propio |
| UI | **Shadcn UI** (Radix) |
| Animación | **Framer Motion** · **GSAP** + **ScrollTrigger** |
| Scroll | **Lenis** (smooth scroll, sincronizado con GSAP) |
| 3D | **Three.js** vía **@react-three/fiber** |
| Tipografía | Space Grotesk · Inter · JetBrains Mono |

---

## Cómo correr el proyecto

```bash
npm install      # instalar dependencias
npm run dev      # entorno de desarrollo → http://localhost:3000
npm run build    # build de producción
npm run start    # servir el build
```

---

## ⚠️ Logo oficial

El sitio incluye una **recreación SVG fiel** del logo como placeholder para
que el proyecto se vea completo desde el primer momento. Para usar el archivo
oficial entregado (sin modificarlo):

1. Colocá el archivo en `public/` (por ejemplo `public/logo.png`).
2. Editá `src/components/brand/logo.tsx` y actualizá:
   ```ts
   export const LOGO_FULL = "/logo.png"; // lockup completo (con slogan)
   export const LOGO_MARK = "/logo.png"; // versión compacta (navbar)
   ```

No hace falta tocar nada más: el componente `<Logo />` se usa en todo el sitio.

---

## Editar contenido

Todo el contenido está centralizado para facilitar su edición:

- **`src/lib/site.ts`** — marca, slogan, **WhatsApp**, email, ubicación y
  navegación. ➜ Reemplazá `whatsapp` y `email` por los datos reales.
- **`src/lib/data.ts`** — beneficios, qué removemos, superficies, aplicaciones,
  comparativa, estadísticas, proceso, testimonios y FAQ.

---

## Arquitectura

```
src/
├── app/                 # App Router: layout, page, SEO (robots, sitemap), icon
├── components/
│   ├── brand/           # Logo
│   ├── effects/         # Cursor, magnetic, reveal, text-reveal, tilt-card
│   ├── layout/          # Navbar, Footer
│   ├── providers/       # Lenis smooth scroll + montaje del fondo 3D y cursor
│   ├── sections/        # Intro, Hero y cada sección de la landing
│   ├── shared/          # Section, SectionHeading, CtaButton
│   ├── three/           # Campo de partículas y escena WebGL
│   └── ui/              # Primitivas Shadcn (button, card, accordion)
├── hooks/               # media-query, reduced-motion, layout-effect
└── lib/                 # site config, data, utils
```

---

## Características destacadas

- **Intro cinematográfica** — haz láser, partículas y aparición progresiva del logo.
- **Fondo 3D reactivo al mouse** — partículas + constelación de líneas conectadas.
- **Cursor personalizado** con glow y comportamiento magnético.
- **Text reveal** con máscaras (estilo Apple / SpaceX).
- **Tilt cards 3D**, glassmorphism, glow dinámico y barridos láser.
- **Demo interactiva** de limpieza láser por ablación.
- **Contadores animados**, timeline de proceso y FAQ con acordeón.

## Rendimiento y accesibilidad

- Respeta `prefers-reduced-motion` (desactiva intro, smooth scroll y WebGL).
- Presupuesto de partículas reducido en mobile.
- SSR + metadata completa, Open Graph, JSON-LD, `robots` y `sitemap`.
- Navegación por teclado, `skip link` y etiquetas ARIA.
