import type { Content } from './types';

export const en: Content = {
  meta: {
    title: 'Daniel Latorre | Backend developer in Java and SQL Server',
    description:
      'Backend developer in Colombia. Multi-company ERP in production with Java and SQL Server, plus websites for clients. Available for remote roles.',
    ogAlt: 'Daniel Latorre, backend developer, in large letters on a light background',
    ogLocale: 'en_US',
    htmlLang: 'en',
    jobTitle: 'Backend developer',
  },
  ui: {
    skip: 'Skip to Content',
    navLabel: 'Main',
    navAbout: 'About',
    navProjects: 'Projects',
    navExperience: 'Experience',
    navEducation: 'Education',
    navCerts: 'Certificates',
    navContact: 'Contact',
    langCode: 'ES',
    langName: 'Español',
    themeToDark: 'Dark',
    themeToLight: 'Light',
    footerRights: 'All rights reserved.',
    footerTop: 'Back to Top',
  },
  hero: {
    role: 'Backend developer',
    tagline:
      'I develop a multi-company ERP in production with Java and SQL Server: invoicing, inventory and the full commercial chain. I also build websites for clients. I am looking for a remote team.',
    ctaProjects: 'See Projects',
    ctaCv: 'Download CV',
    available: 'Available for work',
  },
  welcome: {
    line1: 'Welcome to my',
    line2: 'portfolio',
  },
  about: {
    title: 'About',
    avatarAlt: 'Illustrated avatar of Daniel Latorre wearing a cap at his workstation',
    paragraphs: [
      'I am a backend developer at <strong>SOMIC Soluciones</strong>, working on <strong>Mantis</strong>, a multi-company ERP in production. I cover the full commercial chain (quotations, delivery notes, invoices and credit/debit notes), plus inventory, contracts, price lists, commissions and regulatory reporting. My technical base is <strong>Java</strong> and <strong>SQL Server</strong>, on <strong>Apache Tomcat</strong>.',
      'A large part of my job is <strong>diagnosis</strong>: following an exception from the server log to the query or business rule behind it, and fixing it without breaking what already works. In an ERP a bug is never cosmetic: it is an invoice issued wrong or stock that no longer reconciles. I have also worked on <strong>performance</strong> (cut 3 minutes off the invoice list load by removing N+1 queries and tuning indexes), <strong>concurrency</strong> and <strong>security</strong>.',
      'Understanding the business (tax rules, healthcare reporting, receivables and accounting) is what lets me tell whether an odd value is a bug or a legitimate rule. I pick up new tools quickly; I am now moving towards <strong>Spring Boot</strong> and <strong>React</strong>, and outside the ERP I build websites for clients.',
    ],
    facts: [
      { label: 'Location', value: 'Colombia, remote or hybrid' },
      { label: 'Focus', value: 'Backend and data' },
      { label: 'Languages', value: 'Native Spanish, English B2' },
      { label: 'Availability', value: 'Open to remote roles' },
    ],
  },
  stack: {
    title: 'Technologies I work with',
    pause: 'Pause Motion',
  },
  projects: {
    title: 'Projects',
    lead: 'Websites I build for clients. They show up here as they are published.',
    soon: 'Coming soon',
    soonNote: 'Under construction. The full case study is coming soon.',
    roleLabel: 'My role',
    stackLabel: 'Stack',
    visitSite: 'Visit the Site',
    viewCode: 'See Code',
  },
  experience: {
    title: 'Experience',
    lead: 'Where I have worked and which problems I solved, not just which technologies I touched.',
    dutiesTitle: 'Responsibilities',
    achievementsTitle: 'Selected achievements',
    columnAchievement: 'Achievement',
    columnResult: 'Result',
    totalLabel: 'Total',
    totalValue: 'Available for remote roles',
    jobs: [
      {
        period: 'April 2025 – Present',
        role: 'Software developer, Mantis ERP',
        company: 'SOMIC Soluciones, Colombia',
        context:
          'Mantis is a <strong>multi-company ERP</strong> with invoicing, inventory and the commercial chain, on Java and SQL Server. I work end to end on the product, from the business rule down to the query and the deployment.',
        duties: [
          'Full commercial chain: quotations, delivery notes, invoices, and credit and debit notes.',
          'Inventory, contracts and price lists, commissions, accounting entries and regulatory reporting modules.',
          'Diagnosing and resolving production errors: analysing Tomcat logs, tracing exceptions and fixing the business rule or query behind them.',
          'Fixing concurrency and security issues, and cleaning up accounting data directly in SQL.',
          'Direct support for clients in the healthcare, pharmaceutical and retail sectors.',
        ],
        achievements: [
          {
            text: 'Cut <strong>3 minutes</strong> off the invoice list load time by removing <strong>N+1</strong> queries and tuning indexes.',
            result: '−3 min',
            count: { value: 3, prefix: '−', suffix: ' min' },
          },
          {
            text: 'Implemented <strong>self-withholding tax</strong> for clients under Colombia’s Simple Tax Regime.',
            result: 'Tax',
          },
          {
            text: 'Built the <strong>SISMED/SISDIS</strong> report to comply with Circular 021 of 2026.',
            result: 'Regulatory',
          },
          {
            text: 'Added business controls to delivery notes: below-cost sale validation, credit-limit and overdue-payment blocking with an approval workflow, and bonus items.',
            result: 'Commercial',
          },
          {
            text: 'Migrated print layouts from legacy versions of the product.',
            result: 'Printing',
          },
        ],
      },
    ],
  },
  education: {
    title: 'Education',
    degree: 'Software Programming Technician',
    institution: 'Campuslands, Bucaramanga',
    date: 'November 2024',
    learnedTitle: 'What I learned',
    learned: [
      'Programming fundamentals, data structures and object-oriented programming with Java and Python.',
      'Relational database design and normalization, with a documented final project for the Ministry of Environment.',
      'Web development with HTML, CSS and JavaScript, including REST API consumption.',
    ],
    imageAlt: 'Software Programming Technician certificate awarded by Campuslands in November 2024',
    open: 'Enlarge the certificate',
  },
  certs: {
    title: 'Certificates',
    lead: 'Verifiable training. Select a certificate to see it enlarged.',
    openPrefix: 'Enlarge certificate:',
    dialogLabel: 'Enlarged certificate',
    close: 'Close',
  },
  contact: {
    title: 'Contact',
    lead: 'I am looking for a remote team. If you have a role or a project, write to me.',
    emailLabel: 'Email',
    copy: 'Copy Email',
    copied: 'Email copied to clipboard',
    copyFailed: 'Could not copy. Select the email and copy it by hand.',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
};
