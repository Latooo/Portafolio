export type Lang = 'es' | 'en';
export const languages: readonly Lang[] = ['es', 'en'] as const;
export const defaultLang: Lang = 'es';

/** Texto disponible en los dos idiomas. */
export type Localized = Record<Lang, string>;

export interface Fact {
  label: string;
  value: string;
}

/** Número que se anima al entrar en pantalla. El HTML siempre trae el valor final en `result`. */
export interface CountUp {
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface Achievement {
  /** Puede llevar <strong>; es contenido propio del repo. */
  text: string;
  /** Etiqueta corta de la columna "Resultado". */
  result: string;
  count?: CountUp;
}

export interface Stage {
  id: 'diagnose' | 'build' | 'optimize' | 'ship';
  name: string;
  lead: string;
  points: { b: string; t: string }[];
  tags: string[];
  /** Descripción del panel de ejemplo para lectores de pantalla. */
  panelAlt: string;
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
    navProjects: string;
    navExperience: string;
    navProcess: string;
    navCta: string;
    navEducation: string;
    navCerts: string;
    navContact: string;
    /** Código visible del otro idioma ("EN") y su nombre, solo para lectores de pantalla. */
    langCode: string;
    langName: string;
    themeToDark: string;
    themeToLight: string;
    footerRights: string;
    footerTop: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    facts: Fact[];
    avatarAlt: string;
  };
  stack: {
    /** Nombre accesible de la franja (región). */
    title: string;
    /** Etiqueta constante del botón; el estado lo da aria-pressed. */
    pause: string;
  };
  projects: {
    title: string;
    lead: string;
    soon: string;
    soonNote: string;
    roleLabel: string;
    stackLabel: string;
    visitSite: string;
    viewCode: string;
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
  diagram: {
    browser: string;
    rules: string;
    tx: string;
    resp: string;
    core: string;
    logs: string;
    alt: string;
  };
  welcome: {
    /** Texto de la pantalla de bienvenida (decorativa, solo primera visita). */
    line1: string;
    line2: string;
  };
  hero: {
    role: string;
    /** Titular en dos líneas (h1): nombre y línea en azul cielo. */
    title1: string;
    title2: string;
    tagline: string;
    ctaProjects: string;
    ctaContact: string;
    ctaCv: string;
    available: string;
  };
  lifecycle: {
    title1: string;
    title2: string;
    lead: string;
    stages: Stage[];
    /** Textos cortos de los paneles de ejemplo. */
    panel: Record<string, string>;
  };
  education: {
    title: string;
    degree: string;
    institution: string;
    date: string;
    learnedTitle: string;
    learned: string[];
    imageAlt: string;
    open: string;
  };
  certs: {
    title: string;
    lead: string;
    /** Prefijo del nombre accesible de cada enlace: "Ampliar certificado: …". */
    openPrefix: string;
    dialogLabel: string;
    close: string;
  };
  contact: {
    title: string;
    lead: string;
    emailLabel: string;
    copy: string;
    copied: string;
    copyFailed: string;
    linkedin: string;
    github: string;
  };
}
