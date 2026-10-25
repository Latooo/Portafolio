/**
 * Proyectos. Cada uno es "live" o "coming-soon".
 *
 * Un proyecto pasa de próximamente a real SOLO cambiando datos aquí:
 *   status → 'live', y completar name, description, role, stack, url, repo, image, imageAlt.
 * Los componentes (Fase 3b) no cambian.
 *
 * Las tarjetas "coming-soon" llevan solo el tipo de proyecto: sin cliente ni logo.
 */
import flickImage from '../assets/projects/flick.png';
import type { Localized } from './types';

interface ProjectBase {
  id: string;
  /** Tipo de proyecto, visible en ambos estados. */
  type: Localized;
  /** El proyecto destacado se muestra grande. */
  featured?: boolean;
}

export interface ComingSoonProject extends ProjectBase {
  status: 'coming-soon';
}

export interface LiveProject extends ProjectBase {
  status: 'live';
  name: string;
  description: Localized;
  role: Localized;
  stack: Localized;
  url: string;
  repo?: string;
  image: ImageMetadata;
  imageAlt: Localized;
}

export type Project = ComingSoonProject | LiveProject;

export const projects: Project[] = [
  {
    id: 'flick',
    status: 'live',
    featured: true,
    name: 'Flick',
    type: { es: 'Catálogo de tienda de periféricos', en: 'Peripherals shop catalogue' },
    description: {
      es: 'Catálogo web de una tienda de periféricos gaming en Bucaramanga. Sitio estático con el contenido en JSON y pedidos por WhatsApp.',
      en: 'Web catalogue for a gaming-peripherals shop in Bucaramanga. A static site with its content in JSON and orders by WhatsApp.',
    },
    role: { es: 'Socio y desarrollador del catálogo', en: 'Co-owner and catalogue developer' },
    stack: {
      es: 'HTML, CSS y JavaScript, publicado en Netlify',
      en: 'HTML, CSS and JavaScript, hosted on Netlify',
    },
    url: 'https://flickcol.netlify.app',
    repo: 'https://github.com/Latooo/Flick',
    image: flickImage,
    imageAlt: {
      es: 'Captura del sitio de Flick: catálogo de periféricos gaming',
      en: 'Screenshot of the Flick site: gaming peripherals catalogue',
    },
  },
  {
    id: 'consultorio',
    status: 'coming-soon',
    type: { es: 'Sitio para consultorio médico', en: 'Website for a medical practice' },
  },
  {
    id: 'joyeria',
    status: 'coming-soon',
    type: { es: 'Catálogo de joyería', en: 'Jewelry catalogue' },
  },
  {
    id: 'mobiliario',
    status: 'coming-soon',
    type: {
      es: 'Catálogo de mobiliario con panel de administración',
      en: 'Furniture catalogue with an admin panel',
    },
  },
];
