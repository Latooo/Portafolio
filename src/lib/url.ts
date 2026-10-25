import type { Lang } from '../data/types';

/** BASE_URL sin barra final: '/Portafolio' (o '' si algún día el sitio vive en la raíz). */
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Ruta a un archivo de public/ (CV, favicon, og.png…). Respeta `base`. */
export const asset = (path: string): string => `${base}/${path.replace(/^\/+/, '')}`;

/** Ruta a una página localizada, con la barra final que exige `trailingSlash: 'always'`. */
export const pagePath = (lang: Lang, hash = ''): string => `${base}/${lang}/${hash ? `#${hash.replace(/^#/, '')}` : ''}`;

/** URL absoluta (canonical, hreflang, Open Graph). */
export const absolute = (path: string, site: URL | undefined): string => new URL(path, site).href;
