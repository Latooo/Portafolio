import english from '../assets/certs/english-b2.jpg';
import gitIntro from '../assets/certs/git-intro.jpg';
import gitProcedures from '../assets/certs/git-procedures.jpg';
import gitCollab from '../assets/certs/git-collab.jpg';
import type { Localized } from './types';

export interface Cert {
  id: string;
  image: ImageMetadata;
  /** Título visible y nombre del enlace. */
  title: Localized;
  /** Descripción de la imagen para lectores de pantalla. */
  alt: Localized;
}

export const certs: Cert[] = [
  {
    id: 'english-b2',
    image: english,
    title: {
      es: 'Inglés nivel B2, UIS Language Institute, Universidad Industrial de Santander (2023)',
      en: 'English level B2, UIS Language Institute, Universidad Industrial de Santander (2023)',
    },
    alt: {
      es: 'Certificado de inglés nivel B2 del UIS Language Institute',
      en: 'English B2 certificate from the UIS Language Institute',
    },
  },
  {
    id: 'git-intro',
    image: gitIntro,
    title: { es: 'Introducción a Git, Microsoft Learn (2024)', en: 'Introduction to Git, Microsoft Learn (2024)' },
    alt: {
      es: 'Certificado de Microsoft Learn: Introducción a Git',
      en: 'Microsoft Learn certificate: Introduction to Git',
    },
  },
  {
    id: 'git-procedures',
    image: gitProcedures,
    title: {
      es: 'Procedimientos para crear y modificar un proyecto de Git, Microsoft Learn (2024)',
      en: 'Procedures to create and modify a Git project, Microsoft Learn (2024)',
    },
    alt: {
      es: 'Certificado de Microsoft Learn: procedimientos para crear y modificar un proyecto de Git',
      en: 'Microsoft Learn certificate: procedures to create and modify a Git project',
    },
  },
  {
    id: 'git-collab',
    image: gitCollab,
    title: { es: 'Colaboración con Git, Microsoft Learn (2024)', en: 'Collaboration with Git, Microsoft Learn (2024)' },
    alt: {
      es: 'Certificado de Microsoft Learn: colaboración con Git',
      en: 'Microsoft Learn certificate: collaboration with Git',
    },
  },
];
