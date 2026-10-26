import type { Content } from './types';

export const es: Content = {
  meta: {
    title: 'Daniel Latorre | Desarrollador backend en Java y SQL Server',
    description:
      'Desarrollador backend en Colombia. ERP multiempresa en producción con Java y SQL Server, y sitios web para clientes. Disponible para roles remotos.',
    ogAlt: 'Daniel Latorre, desarrollador backend, en letras grandes sobre fondo claro',
    ogLocale: 'es_CO',
    htmlLang: 'es',
    jobTitle: 'Desarrollador backend',
  },
  ui: {
    skip: 'Saltar al contenido',
    navLabel: 'Principal',
    navAbout: 'Sobre mí',
    navProjects: 'Proyectos',
    navExperience: 'Experiencia',
    navEducation: 'Formación',
    navCerts: 'Certificados',
    navContact: 'Contacto',
    langCode: 'EN',
    langName: 'English',
    themeToDark: 'Oscuro',
    themeToLight: 'Claro',
    footerRights: 'Todos los derechos reservados.',
    footerTop: 'Volver arriba',
  },
  hero: {
    role: 'Desarrollador backend',
    tagline:
      'Desarrollo un ERP multiempresa en producción con Java y SQL Server: facturación, inventario y cadena comercial. También construyo sitios web para clientes. Busco un equipo remoto.',
    ctaProjects: 'Ver proyectos',
    ctaCv: 'Descargar CV',
    available: 'Disponible para trabajar',
  },
  welcome: {
    line1: 'Bienvenido a mi',
    line2: 'portafolio',
  },
  about: {
    title: 'Sobre mí',
    avatarAlt: 'Avatar ilustrado de Daniel Latorre con gorra, frente a su puesto de trabajo',
    paragraphs: [
      'Soy desarrollador backend en <strong>SOMIC Soluciones</strong>, donde trabajo sobre <strong>Mantis</strong>, un ERP multiempresa en producción. Cubro la cadena comercial completa (cotización, remisión, factura y notas), además de inventario, contratos, listas de precios, comisiones y reportes regulatorios. Mi base técnica es <strong>Java</strong> y <strong>SQL Server</strong>, sobre <strong>Apache Tomcat</strong>.',
      'Buena parte de mi trabajo es <strong>diagnóstico</strong>: seguir una excepción desde el log del servidor hasta la consulta o la regla de negocio que la origina, y resolverla sin romper lo que ya funciona. En un ERP el error no es cosmético: es una factura mal emitida o un inventario descuadrado. También he trabajado <strong>rendimiento</strong> (bajé 3 minutos la carga del listado de facturas eliminando consultas N+1 y ajustando índices), <strong>concurrencia</strong> y <strong>seguridad</strong>.',
      'Entender el negocio (normativa tributaria, reportes del sector salud, cartera y contabilidad) es lo que me permite decidir si un dato raro es un bug o una regla legítima. Me adapto rápido a la herramienta de turno; ahora avanzo hacia <strong>Spring Boot</strong> y <strong>React</strong>, y fuera del ERP construyo sitios web para clientes.',
    ],
    facts: [
      { label: 'Ubicación', value: 'Colombia, remoto o híbrido' },
      { label: 'Enfoque', value: 'Backend y datos' },
      { label: 'Idiomas', value: 'Español nativo, inglés B2' },
      { label: 'Disponibilidad', value: 'Abierto a roles remotos' },
    ],
  },
  stack: {
    title: 'Tecnologías con las que trabajo',
    pause: 'Pausar movimiento',
  },
  projects: {
    title: 'Proyectos',
    lead: 'Webs que construyo para clientes. Aquí van apareciendo a medida que se publican.',
    soon: 'Próximamente',
    soonNote: 'En construcción. El caso completo llega pronto.',
    roleLabel: 'Mi rol',
    stackLabel: 'Stack',
    visitSite: 'Ver el sitio',
    viewCode: 'Ver código',
  },
  experience: {
    title: 'Experiencia',
    lead: 'Dónde he trabajado y qué problemas resolví, no solo qué tecnologías toqué.',
    dutiesTitle: 'Responsabilidades',
    achievementsTitle: 'Aportes destacados',
    columnAchievement: 'Aporte',
    columnResult: 'Resultado',
    totalLabel: 'Total',
    totalValue: 'Disponible para roles remotos',
    jobs: [
      {
        period: 'Abril 2025 – Actualidad',
        role: 'Desarrollador de software, ERP Mantis',
        company: 'SOMIC Soluciones, Colombia',
        context:
          'Mantis es un <strong>ERP multiempresa</strong> con facturación, inventario y cadena comercial, sobre Java y SQL Server. Trabajo de punta a punta sobre el producto, desde la regla de negocio hasta la consulta y el despliegue.',
        duties: [
          'Cadena comercial completa: cotización, remisión, factura y notas crédito y débito.',
          'Módulos de inventario, contratos y listas de precios, comisiones, contabilización y reportes regulatorios.',
          'Diagnóstico y resolución de errores en producción: análisis de logs de Tomcat, trazado de excepciones y corrección sobre la regla de negocio o la consulta que las origina.',
          'Corrección de problemas de concurrencia y seguridad, y saneamiento de datos contables directamente en SQL.',
          'Soporte directo a clientes de los sectores salud, farmacéutico y comercial.',
        ],
        achievements: [
          {
            text: 'Reduje en <strong>3 minutos</strong> el tiempo de carga del listado de facturas, eliminando consultas <strong>N+1</strong> y ajustando índices.',
            result: '−3 min',
            count: { value: 3, prefix: '−', suffix: ' min' },
          },
          {
            text: 'Implementé la <strong>autorretención</strong> para clientes del Régimen Simple de Tributación.',
            result: 'Tributario',
          },
          {
            text: 'Construí el reporte <strong>SISMED/SISDIS</strong> para cumplir la Circular 021 de 2026.',
            result: 'Regulatorio',
          },
          {
            text: 'Añadí controles de negocio en remisiones: validación de venta bajo costo, bloqueo por cupo y mora con flujo de aprobación de solicitudes, y bonificados.',
            result: 'Comercial',
          },
          {
            text: 'Migré los formatos de impresión desde versiones antiguas del producto.',
            result: 'Impresión',
          },
        ],
      },
    ],
  },
  education: {
    title: 'Formación',
    degree: 'Técnico laboral en Programación de Software',
    institution: 'Campuslands, Bucaramanga',
    date: 'Noviembre de 2024',
    learnedTitle: 'Qué aprendí',
    learned: [
      'Fundamentos de programación, estructuras de datos y programación orientada a objetos con Java y Python.',
      'Diseño y normalización de bases de datos relacionales, con proyecto final documentado para el Ministerio del Medio Ambiente.',
      'Desarrollo web con HTML, CSS y JavaScript, incluyendo consumo de APIs REST.',
    ],
    imageAlt: 'Certificado de Técnico laboral en Programación de Software otorgado por Campuslands en noviembre de 2024',
    open: 'Ampliar el título',
  },
  certs: {
    title: 'Certificados',
    lead: 'Formación verificable. Pulsa un certificado para verlo ampliado.',
    openPrefix: 'Ampliar certificado:',
    dialogLabel: 'Certificado ampliado',
    close: 'Cerrar',
  },
  contact: {
    title: 'Contacto',
    lead: 'Busco un equipo remoto. Si tienes un rol o un proyecto, escríbeme.',
    emailLabel: 'Correo',
    copy: 'Copiar correo',
    copied: 'Correo copiado al portapapeles',
    copyFailed: 'No se pudo copiar. Selecciona el correo y cópialo a mano.',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
};
