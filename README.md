# Portafolio de Daniel Latorre

Portafolio de un desarrollador backend (Java, Spring Boot, SQL Server) que también construye sitios web para clientes. Sitio estático hecho con [Astro](https://astro.build), bilingüe (español e inglés), con tema claro y oscuro.

El contenido sale completo en el HTML. No hay framework de interfaz ni librerías de animación: el JavaScript propio son unos pocos kilobytes y todo el movimiento es opcional.

> **Estado:** rediseño en la rama `redesign-astro`. `main` sigue sirviendo el sitio anterior en <https://latooo.github.io/Portafolio/>.

## Requisitos

- **Node 22.23.4 o superior** (lo exige Astro 7). La versión exacta está en `.nvmrc`.
- npm (viene con Node).

Si usas [nvm para Windows](https://github.com/coreybutler/nvm-windows) o nvm en Linux/macOS, no hace falta cambiar tu Node global; basta con activar la versión del proyecto en la terminal donde trabajes:

```bash
nvm install 22.23.4   # solo la primera vez
nvm use 22.23.4
node -v               # debe mostrar v22.23.4 o superior
```

## Correr en local

```bash
npm ci          # instala exactamente lo que dice package-lock.json
npm run dev     # desarrollo: http://localhost:4321/Portafolio/
npm run build   # genera dist/ (debe terminar sin avisos)
npm run preview # sirve dist/ igual que en producción, con la misma base
```

El sitio vive bajo `/Portafolio/` (es un sitio de proyecto en GitHub Pages), por eso las direcciones locales llevan ese prefijo: <http://localhost:4321/Portafolio/es/> y <http://localhost:4321/Portafolio/en/>.

## Estructura

```
src/
  components/   Hero, Nav, About, Marquee, Projects, ProjectCard, Experience, Certs, Contact, Footer, SectionTitle
  data/         Contenido y tipos: es.ts, en.ts, projects.ts, certs.ts, stack.ts, index.ts, types.ts
  layouts/      Base.astro: <head>, SEO, tema, JSON-LD
  lib/url.ts    Rutas que respetan la base (nunca rutas absolutas escritas a mano)
  pages/        index.astro (redirige a /es/), [lang]/index.astro, 404.astro
  scripts/      motion.ts: intro, revelados y contador
  styles/       fonts.css, tokens.css, global.css, sections.css, motion.css
  assets/       Imágenes que Astro optimiza (avatar, capturas, certificados)
public/         cv/, favicon, og.png, robots.txt
.github/workflows/deploy.yml   Despliegue con Actions (preparado, sin activar)
```

## Cómo se edita el contenido

Los textos no están en los componentes, están en `src/data/`:

- `es.ts` y `en.ts`: todos los textos de la interfaz, Sobre mí, Experiencia, Certificados y Contacto. Los dos archivos tienen la misma forma (`Content` en `types.ts`), así que TypeScript avisa si falta algo en un idioma.
- `stack.ts`: tecnologías de la franja en movimiento (no se traducen, por eso viven aparte).
- `certs.ts`: certificados (imagen, título y descripción en cada idioma).
- `projects.ts`: proyectos (ver abajo).

## Cómo pasar un proyecto de "próximamente" a publicado

Cada proyecto de `src/data/projects.ts` tiene un `status`: `'coming-soon'` o `'live'`. Las tarjetas "próximamente" llevan solo el tipo de proyecto (sin nombre de cliente). Para publicar una:

1. Guarda la captura en `src/assets/projects/` (por ejemplo `consultorio.png`) y impórtala arriba del archivo.
2. Cambia el objeto del proyecto a `status: 'live'` y completa estos campos:

```ts
{
  id: 'consultorio',
  status: 'live',
  name: 'Nombre del proyecto',
  type: { es: 'Sitio para consultorio médico', en: 'Website for a medical practice' },
  description: { es: '…', en: '…' },
  role: { es: '…', en: '…' },
  stack: { es: '…', en: '…' },
  url: 'https://…',
  repo: 'https://github.com/…', // opcional
  image: consultorioImage,
  imageAlt: { es: '…', en: '…' },
}
```

El diseño no cambia: la misma tarjeta muestra el estado nuevo. Si marcas `featured: true`, el proyecto pasa a ser la pieza grande de la sección (solo uno).

## Decisiones de diseño y accesibilidad

- **Rutas.** `site: https://latooo.github.io`, `base: /Portafolio`, `trailingSlash: 'always'`. Idiomas en `/es/` (por defecto) y `/en/`; la raíz redirige a `/es/` con una redirección estática (GitHub Pages no permite 301). El selector de idioma conserva la sección.
- **SEO.** Título, descripción, Open Graph y Twitter traducidos, `hreflang`, `canonical`, `sitemap-index.xml` con alternativas por idioma y datos estructurados sin teléfono.
- **Tema.** Claro y oscuro con script antes del primer pintado (sin destello). Sin JavaScript se respeta el tema del sistema.
- **Fuentes.** Autoalojadas con fontsource, solo subconjunto latino, con precarga y una fuente de respaldo de métricas equivalentes para evitar saltos de layout.
- **Imágenes.** `astro:assets` genera AVIF y WebP con `srcset` y dimensiones.
- **Movimiento.** Intro corta (menos de 1.5 s) solo en la primera visita de la sesión, entrada del hero, revelado de títulos, factura animada y franja del stack. Todo se activa solo con JavaScript y sin `prefers-reduced-motion`; sin eso, el contenido se ve completo desde el primer momento. La intro se puede saltar con un clic o una tecla y nunca bloquea el scroll. La franja tiene botón de pausa.
- **Certificados.** Cada imagen es un enlace enfocable; con JavaScript se abre en un `<dialog>` nativo (foco atrapado y devuelto, Escape cierra).
- **Contacto.** Sin formulario. Correo con botón de copiar (mejora progresiva), LinkedIn y GitHub.
- **Sin teléfono.** No aparece en ninguna parte del sitio.

### Contraste

Los pares de color de `src/styles/tokens.css` cumplen WCAG AA (texto normal, 4.5:1 o más):

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

Hoy GitHub Pages sirve la rama `main` directamente ("Deploy from a branch"), así que **nada de esta rama se publica por sí solo**.

El workflow `.github/workflows/deploy.yml` construye con Node de `.nvmrc` y publica `dist/` con GitHub Actions, pero solo se ejecuta a mano (`workflow_dispatch`). Para pasar al sitio nuevo:

1. Fusionar `redesign-astro` en `main`.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Descomentar el disparador `push` del workflow (o lanzarlo desde la pestaña Actions).

Cambiar la fuente de Pages antes de que `main` contenga el sitio nuevo dejaría el sitio vacío: el orden importa.

Nota: `robots.txt` y el sitemap viven bajo `/Portafolio/`. Los buscadores solo leen `robots.txt` en la raíz del dominio, así que conviene enviar el sitemap desde Search Console.
