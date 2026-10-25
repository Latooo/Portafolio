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
  },
  about: {
    title: 'About',
    avatarAlt: 'Illustrated avatar of Daniel Latorre wearing a cap at his workstation',
    paragraphs: [
      'I am a developer at <strong>SOMIC Soluciones</strong>, working on <strong>Mantis</strong>, a multi-company ERP running in production. I cover the full commercial chain (quotations, delivery notes, invoices, credit and debit notes), plus inventory, contracts, price lists, commissions, accounting entries and regulatory reporting. My technical base is <strong>Java</strong> and <strong>SQL Server</strong>, on <strong>Apache Tomcat</strong>.',
      'A large part of my job is <strong>diagnosis</strong>: tracing an exception from the server log back to the query or business rule that caused it, and fixing it without breaking what already works. In an ERP that weighs more than anywhere else, because the bug is not cosmetic: it is an invoice issued wrong or stock that no longer reconciles. I have also worked on <strong>performance</strong> (cut 3 minutes off the invoice list load by removing N+1 queries and tuning indexes), <strong>concurrency</strong> and <strong>security</strong>.',
      'Something I did not expect to learn here is the <strong>functional domain</strong>: Colombian tax regulation, healthcare regulatory reporting, receivables and accounting entries. Understanding the business is what lets you decide whether an odd value is a bug or a legitimate rule. That is why I care more about how the data flows, and knowing where to look, than about the tool of the moment: I adapt quickly and I am now moving towards <strong>Spring Boot</strong> and <strong>React</strong>. Outside the ERP I also build websites for clients.',
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
      {
        period: 'Education',
        role: 'Software Programming Technician',
        company: 'Campuslands, Bucaramanga, Colombia',
        duties: [
          'Programming fundamentals, data structures and object-oriented programming with Java and Python.',
          'Relational database design and normalisation, with a documented final project for the Ministry of the Environment.',
          'Web development with HTML, CSS and JavaScript, including REST API consumption.',
        ],
      },
    ],
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
