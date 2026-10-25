import { en } from './en';
import { es } from './es';
import type { Content, Lang } from './types';

export { defaultLang, languages } from './types';
export type { Content, Lang } from './types';

const content: Record<Lang, Content> = { es, en };

export const getContent = (lang: Lang): Content => content[lang];

export const isLang = (value: string | undefined): value is Lang => value === 'es' || value === 'en';

/** Datos del sitio que no dependen del idioma. Sin teléfono, a propósito. */
export const site = {
  name: 'Daniel Latorre',
  email: 'daniellatorre600@gmail.com',
  github: 'https://github.com/Latooo',
  linkedin: 'https://www.linkedin.com/in/daniellatorre9',
  cv: 'cv/Daniel-Latorre-CV.pdf',
  year: new Date().getFullYear(),
} as const;
