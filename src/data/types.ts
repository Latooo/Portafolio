export type Lang = 'es' | 'en';
export const languages: readonly Lang[] = ['es', 'en'] as const;
export const defaultLang: Lang = 'es';

/** Texto disponible en los dos idiomas. */
export type Localized = Record<Lang, string>;

export interface Fact {
  label: string;
  value: string;
}

export interface Achievement {
  /** Puede llevar <strong>; es contenido propio del repo. */
  text: string;
  /** Etiqueta corta de la columna "Resultado". */
  result: string;
}

export interface Job {
  period: string;
  role: string;
  company: string;
  context?: string;
  duties: string[];
  achievements?: Achievement[];
}

export interface Content {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
    ogLocale: string;
    htmlLang: string;
    jobTitle: string;
  };
  ui: {
    skip: string;
    navLabel: string;
    navAbout: string;
    navExperience: string;
    navContact: string;
    langCode: string;
    /** Nombre del otro idioma, solo para lectores de pantalla: "EN (English)". */
    langName: string;
    themeToDark: string;
    themeToLight: string;
    footerRights: string;
    footerTop: string;
  };
  hero: {
    role: string;
    tagline: string;
    ctaWrite: string;
    ctaCv: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    facts: Fact[];
    avatarAlt: string;
  };
  experience: {
    title: string;
    lead: string;
    dutiesTitle: string;
    achievementsTitle: string;
    columnAchievement: string;
    columnResult: string;
    totalLabel: string;
    totalValue: string;
    jobs: Job[];
  };
}
