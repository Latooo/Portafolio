# Portafolio de Daniel Latorre

Sitio estático con [Astro](https://astro.build), sin framework de islas: todo el contenido sale en el HTML y no se envía JavaScript de aplicación (solo dos scripts en línea de pocas líneas: tema e idioma).

> Estado: **rediseño en curso** (rama `redesign-astro`). `main` sigue sirviendo el sitio anterior en <https://latooo.github.io/Portafolio/>.

## Requisitos

Node **≥ 22.23.4** (lo exige Astro 7; ver `.nvmrc`).

```bash
npm ci          # instala dependencias
npm run dev     # servidor de desarrollo: http://localhost:4321/Portafolio/
npm run build   # genera dist/
npm run preview # sirve dist/ con la misma base que producción
```

## Estructura

```
src/
  components/    Nav, Hero, About, Experience, Footer
  data/          Contenido y tipos: es.ts, en.ts, projects.ts, index.ts
  layouts/       Base.astro (head, SEO, tema, JSON-LD)
  lib/url.ts     Rutas que respetan `base` (nunca rutas absolutas a mano)
  pages/         index.astro (redirige a /es/), [lang]/index.astro, 404.astro
  styles/        fonts.css, tokens.css, global.css
  assets/        Imágenes procesadas por Astro (avatar, capturas de proyectos)
public/          cv/, favicon, og.png, robots.txt
.github/workflows/deploy.yml   Despliegue con Actions (preparado, NO activado)
```

## Decisiones

- **Base y URLs.** `site: https://latooo.github.io`, `base: /Portafolio`, `trailingSlash: 'always'`. Todo enlace o recurso pasa por `src/lib/url.ts` (`asset()` y `pagePath()`), que usa `import.meta.env.BASE_URL`.
- **Idiomas.** Rutas reales `/es/` (por defecto) y `/en/`. La raíz redirige a `/es/` (meta refresh: GitHub Pages no permite 301). El selector conserva la sección (`#experience`) al cambiar de idioma. Cada página lleva `title`, `description`, Open Graph y Twitter traducidos, `hreflang`, `canonical`, y hay `sitemap-index.xml` con alternates.
- **Contenido en datos.** Los textos viven en `src/data/es.ts` y `en.ts`, tipados por `Content`. Los componentes no llevan texto.
- **Proyectos.** `src/data/projects.ts` define `status: 'live' | 'coming-soon'`. Una tarjeta "próximamente" pasa a real solo cambiando sus datos (nombre, URL, captura); no se toca el diseño. Se usará en la Fase 3b.
- **Tema.** Claro/oscuro con script en línea antes del primer pintado (sin destello), `color-scheme` y `theme-color` por tema. Sin JavaScript se respeta el tema del sistema.
- **Fuentes.** Autoalojadas con fontsource, solo subconjunto latino: Bricolage Grotesque (variable en peso y ancho, preload) e Instrument Sans (variable en peso).
- **Sin teléfono.** El teléfono no aparece en ninguna parte del sitio (tampoco en JSON-LD).

## Contraste

Los pares de color de `src/styles/tokens.css` cumplen WCAG AA (texto normal ≥ 4.5:1):

| Par | Razón |
|---|---|
| ink sobre paper | 17.9 |
| muted-paper sobre paper | 7.1 |
| paper sobre ink | 17.9 |
| muted-ink sobre ink | 9.5 |
| on-cobalt sobre cobalt | 7.3 |
| muted-cobalt sobre cobalt | 5.9 |
| cobalt sobre paper | 6.7 |

El cobalto no se usa como texto sobre ink (2.7:1).

## Despliegue

Hoy GitHub Pages sirve la rama `main` ("Deploy from a branch"). El workflow `deploy.yml` está listo pero solo se ejecuta a mano. Para activarlo: Settings → Pages → Source: **GitHub Actions**, y descomentar el disparador `push`. No cambiar la fuente antes de que `main` contenga el sitio nuevo.

## Pendiente (Fase 3b)

Proyectos, Certificaciones y Contacto. Las imágenes de certificados y de los proyectos anteriores siguen en `Storage/` hasta entonces.
