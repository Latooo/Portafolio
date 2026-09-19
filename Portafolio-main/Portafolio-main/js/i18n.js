/* ==========================================================================
   i18n.js — Diccionario de traducciones ES / EN
   --------------------------------------------------------------------------
   Cómo funciona:
     - En el HTML marcas un elemento con  data-i18n="clave"  y su texto se
       reemplaza por el valor del idioma activo.
     - Para traducir un atributo (placeholder, aria-label, content...) usas
       data-i18n-attr="placeholder:clave, aria-label:otraClave".
     - Si una clave falta, el texto que ya está en el HTML se queda como está.

   Para añadir texto nuevo: agrega la clave en LOS DOS idiomas.
   ========================================================================== */

const TRANSLATIONS = {
    es: {
        /* --- Navegación --- */
        "nav.about": "Sobre mí",
        "nav.stack": "Stack",
        "nav.experience": "Experiencia",
        "nav.projects": "Proyectos",
        "nav.certs": "Certificaciones",
        "nav.contact": "Contacto",
        "nav.menu": "Abrir menú de navegación",
        "nav.theme": "Cambiar entre tema claro y oscuro",
        "nav.lang": "Switch to English",
        "a11y.skip": "Saltar al contenido principal",

        /* --- Hero --- */
        "hero.status": "Abierto a nuevas oportunidades",
        "hero.greeting": "Hola, soy",
        "hero.desc": "Desarrollo y mantengo Mantis, un ERP multiempresa en producción, con Java y SQL Server. Facturación, inventario, contabilidad y reportes regulatorios para clientes del sector salud y farmacéutico: código donde un error no es un botón torcido, es una factura mal emitida. Me adapto rápido a la herramienta que haga falta y estoy siempre abierto a aprender tecnologías nuevas.",
        "hero.cta.projects": "Ver proyectos",
        "hero.cta.cv": "Descargar CV",
        "hero.photoAlt": "Avatar ilustrado de Daniel Latorre con gorra",

        /* --- Métricas --- */
        "metric.clients.label": "Clientes en producción con soporte directo",
        "metric.stack.value": "Java · SQL Server",
        "metric.stack.label": "Stack principal",
        "metric.perf.label": "Menos en la carga del listado de facturas",
        "metric.domain.value": "Facturación · Inventario · Contabilidad",
        "metric.domain.label": "Dominio funcional",

        /* --- Sobre mí --- */
        "about.eyebrow": "Sobre mí",
        "about.title": "Perfil profesional",
        "about.p1": "Soy desarrollador en <strong>SOMIC Soluciones</strong>, donde trabajo sobre <strong>Mantis</strong>, un ERP multiempresa en producción. Cubro la cadena comercial completa — cotización, remisión, factura, notas crédito y débito — además de inventario, contratos, listas de precios, comisiones, contabilización y reportes regulatorios. Mi base técnica es <strong>Java</strong> y <strong>SQL Server</strong>, sobre <strong>Apache Tomcat</strong>.",
        "about.p2": "Buena parte de mi trabajo es <strong>diagnóstico</strong>: rastrear una excepción desde el log del servidor hasta la consulta o la regla de negocio que la origina, y dejarla resuelta sin romper lo que ya funciona. En un ERP eso pesa más que en cualquier otro sitio, porque el error no es cosmético: es una factura mal emitida o un inventario descuadrado. También he atacado <strong>rendimiento</strong> (bajé 3 minutos la carga del listado de facturas eliminando consultas N+1 y ajustando índices), <strong>concurrencia</strong> y <strong>seguridad</strong>.",
        "about.p3": "Algo que no esperaba aprender en este trabajo es el <strong>dominio funcional</strong>: normativa tributaria colombiana, reportes regulatorios del sector salud, cartera y contabilización. Entender el negocio es lo que permite decidir si un dato raro es un bug o una regla legítima. La plataforma es <strong>GeneXus</strong>, que genera Java, y esa mezcla me dejó claro que la herramienta importa menos que entender el flujo de los datos y saber dónde mirar. Por eso me adapto rápido y estoy <strong>abierto a aprender tecnologías nuevas</strong> — ahora avanzo hacia Spring Boot y React. Este portafolio está hecho a mano, sin plantillas.",
        "about.fact.location": "Ubicación",
        "about.fact.locationV": "Colombia · Remoto o híbrido",
        "about.fact.role": "Rol",
        "about.fact.roleV": "Desarrollador de Software",
        "about.fact.focus": "Enfoque",
        "about.fact.focusV": "Backend y datos",
        "about.fact.langs": "Idiomas",
        "about.fact.langsV": "Español (nativo) · Inglés B2",
        "about.fact.status": "Disponibilidad",
        "about.fact.statusV": "Abierto a propuestas",

        /* --- Stack --- */
        "stack.eyebrow": "Stack técnico",
        "stack.title": "Con qué trabajo",
        "stack.lead": "Las herramientas que uso a diario en producción, agrupadas por área. Soy honesto sobre el nivel de cada una.",

        "stack.backend.title": "Backend y lógica",
        "stack.backend.level": "Uso diario en producción",
        "stack.backend.desc": "Java como base: reglas de negocio, procedimientos y servicios sobre un ERP en producción. Manejo estructurado de excepciones, lectura de trazas, depuración en caliente y corrección de problemas de concurrencia. La plataforma es GeneXus 18, que genera Java.",

        "stack.data.title": "Bases de datos",
        "stack.data.level": "Uso diario en producción",
        "stack.data.desc": "SQL Server a diario: consultas, procedimientos almacenados, joins complejos y revisión de modelos. Optimización real de rendimiento — eliminación de consultas N+1 y ajuste de índices — y saneamiento de datos contables directamente en SQL.",

        "stack.domain.title": "Dominio funcional",
        "stack.domain.level": "Donde más me diferencio",
        "stack.domain.desc": "Facturación, inventario, cartera y contabilización. Normativa tributaria colombiana y reportes regulatorios del sector salud. Entender el negocio es lo que permite distinguir un bug de una regla legítima.",

        "stack.deploy.title": "Despliegue y entorno",
        "stack.deploy.level": "Uso frecuente",
        "stack.deploy.desc": "Publicación de aplicaciones en Apache Tomcat, gestión de artefactos WAR, configuración de entornos y revisión de logs del servidor.",

        "stack.web.title": "Desarrollo web",
        "stack.web.level": "Base sólida",
        "stack.web.desc": "Maquetación semántica y accesible, CSS moderno (Grid, Flexbox, custom properties) y JavaScript sin dependencias. Base desde la que estoy avanzando hacia React.",

        "stack.learning.title": "Aprendiendo ahora",
        "stack.learning.level": "En formación activa",
        "stack.learning.desc": "Ampliando hacia el ecosistema Java empresarial y el frontend moderno. Aprender una herramienta nueva es parte del trabajo, no un obstáculo: me interesa más resolver bien el problema que defender un stack concreto.",

        /* --- Experiencia --- */
        "exp.eyebrow": "Trayectoria",
        "exp.title": "Experiencia",
        "exp.lead": "Dónde he trabajado y qué problemas resolví, no solo qué tecnologías toqué.",

        "exp.job1.period": "Abril 2025 — Actualidad",
        "exp.job1.role": "Desarrollador de Software — ERP Mantis",
        "exp.job1.company": "SOMIC Soluciones · Colombia",
        "exp.job1.context": "Mantis es un <strong>ERP multiempresa</strong> construido en GeneXus 18 con generador Java sobre SQL Server. Trabajo de punta a punta sobre el producto, desde la regla de negocio hasta la consulta y el despliegue.",
        "exp.job1.p1": "Cadena comercial completa: cotización, remisión, factura y notas crédito y débito.",
        "exp.job1.p2": "Módulos de inventario, contratos y listas de precios, comisiones, contabilización y reportes regulatorios.",
        "exp.job1.p3": "Diagnóstico y resolución de errores en producción: análisis de logs de Tomcat, trazado de excepciones y corrección sobre la regla de negocio o la consulta que las origina.",
        "exp.job1.p4": "Corrección de problemas de concurrencia y seguridad, y saneamiento de datos contables directamente en SQL.",
        "exp.job1.p5": "Soporte directo a clientes de los sectores salud, farmacéutico y comercial.",
        "exp.job1.winsTitle": "Aportes destacados",
        "exp.job1.w1": "Reduje en <strong>3 minutos</strong> el tiempo de carga del listado de facturas, eliminando consultas <strong>N+1</strong> y ajustando índices.",
        "exp.job1.w2": "Implementé la <strong>autorretención</strong> para clientes del Régimen Simple de Tributación.",
        "exp.job1.w3": "Construí el reporte <strong>SISMED/SISDIS</strong> para cumplir la Circular 021 de 2026.",
        "exp.job1.w4": "Añadí controles de negocio en remisiones: validación de venta bajo costo, bloqueo por cupo y mora con flujo de aprobación de solicitudes, y bonificados.",
        "exp.job1.w5": "Migré los formatos de impresión desde versiones antiguas del producto a <strong>GX6</strong>.",
        "exp.job1.clients": "Clientes atendidos: Discolmets, Ramedicas, Medic Colombia y Diagnostimax.",

        "exp.job2.period": "Formación",
        "exp.job2.role": "Técnico en Programación de Software",
        "exp.job2.company": "[Institución] · Colombia",
        "exp.job2.p1": "Fundamentos de programación, estructuras de datos y programación orientada a objetos con Java y Python.",
        "exp.job2.p2": "Diseño y normalización de bases de datos relacionales, con proyecto final documentado para el Ministerio del Medio Ambiente.",
        "exp.job2.p3": "Desarrollo web con HTML, CSS y JavaScript, incluyendo consumo de APIs REST.",

        /* --- Proyectos --- */
        "projects.eyebrow": "Trabajo",
        "projects.title": "Proyectos",
        "projects.lead": "Una selección de proyectos con el problema que resolvían y lo que aprendí haciéndolos.",
        "projects.role": "Mi rol",
        "projects.learned": "Qué aprendí",
        "projects.code": "Ver código",
        "projects.demo": "Ver demo",
        "projects.docs": "Ver documentación",

        "proj.spacex.label": "Consumo de API",
        "proj.spacex.title": "SpaceX — Cliente de API",
        "proj.spacex.desc": "Réplica funcional del sitio de SpaceX que consume la API pública de la compañía. Cuatro módulos independientes muestran cohetes, misiones, cápsulas e historia de la empresa, con los datos renderizados de forma dinámica.",
        "proj.spacex.role": "Desarrollo completo del frontend y de la capa de consumo de datos, sin librerías externas.",
        "proj.spacex.learned": "Peticiones asíncronas con fetch, manejo de promesas y estados de error, y renderizado dinámico del DOM a partir de respuestas JSON.",

        "proj.kario.label": "Cliente real",
        "proj.kario.title": "Kario Media — Panel administrativo",
        "proj.kario.desc": "Aplicación web para una empresa dedicada a licitaciones públicas y privadas. Implementé el flujo administrativo completo, desde el inicio de sesión hasta el panel de gestión de proyectos, partiendo de la propuesta de diseño del equipo de UI/UX.",
        "proj.kario.role": "Traducción de los diseños de UI/UX a una interfaz funcional y responsiva.",
        "proj.kario.learned": "Trabajar contra una especificación de diseño ajena y mantener la fidelidad visual en distintos tamaños de pantalla.",

        "proj.db.label": "Modelado de datos",
        "proj.db.title": "Base de datos — Parques Naturales",
        "proj.db.desc": "Diseño y desarrollo de una base de datos relacional para el Ministerio del Medio Ambiente, orientada a gestionar la información de los parques naturales administrados por cada departamento: especies, visitantes, personal y áreas protegidas.",
        "proj.db.role": "Diseño del modelo entidad-relación, normalización del esquema y documentación técnica completa.",
        "proj.db.learned": "Normalización hasta tercera forma normal, diseño de relaciones complejas y la importancia de documentar un modelo para que otros lo entiendan.",

        /* --- Certificaciones --- */
        "certs.eyebrow": "Formación",
        "certs.title": "Certificaciones",
        "certs.lead": "Certificados obtenidos en plataformas de formación técnica e idiomas.",
        "certs.prev": "Certificado anterior",
        "certs.next": "Certificado siguiente",
        "certs.hint": "Haz clic en un certificado para ampliarlo.",
        "cert.english": "Inglés nivel B2 — UIS Language Institute, Universidad Industrial de Santander (2023)",
        "cert.git1": "Introducción a Git — Microsoft Learn (2024)",
        "cert.git2": "Procedimientos para crear y modificar un proyecto de Git — Microsoft Learn (2024)",
        "cert.git3": "Colaboración con Git — Microsoft Learn (2024)",

        /* --- Contacto --- */
        "contact.eyebrow": "Contacto",
        "contact.title": "Hablemos",
        "contact.lead": "¿Tienes una vacante o un proyecto en mente? Escríbeme y te respondo lo antes posible.",
        "contact.name": "Nombre",
        "contact.namePh": "Tu nombre",
        "contact.email": "Correo electrónico",
        "contact.emailPh": "tucorreo@empresa.com",
        "contact.message": "Mensaje",
        "contact.messagePh": "Cuéntame en qué puedo ayudarte...",
        "contact.send": "Enviar mensaje",
        "contact.sending": "Enviando...",
        "contact.ok": "¡Mensaje enviado! Te responderé pronto.",
        "contact.error": "No se pudo enviar. Escríbeme directamente a daniellatorre600@gmail.com",
        "contact.err.name": "Escribe tu nombre.",
        "contact.err.email": "Escribe un correo electrónico válido.",
        "contact.err.message": "El mensaje debe tener al menos 10 caracteres.",
        "contact.direct": "O directamente por aquí",
        "contact.label.email": "Correo",
        "contact.label.linkedin": "LinkedIn",
        "contact.label.github": "GitHub",
        "contact.label.phone": "Teléfono",

        /* --- Pie --- */
        "footer.rights": "Todos los derechos reservados.",
        "footer.built": "Hecho a mano con HTML, CSS y JavaScript. Sin plantillas ni frameworks.",
        "footer.top": "Volver arriba"
    },

    en: {
        /* --- Navigation --- */
        "nav.about": "About",
        "nav.stack": "Stack",
        "nav.experience": "Experience",
        "nav.projects": "Projects",
        "nav.certs": "Certifications",
        "nav.contact": "Contact",
        "nav.menu": "Open navigation menu",
        "nav.theme": "Toggle light and dark theme",
        "nav.lang": "Cambiar a español",
        "a11y.skip": "Skip to main content",

        /* --- Hero --- */
        "hero.status": "Open to new opportunities",
        "hero.greeting": "Hi, I'm",
        "hero.desc": "I build and maintain Mantis, a multi-company ERP running in production, with Java and SQL Server. Invoicing, inventory, accounting and regulatory reporting for healthcare and pharmaceutical clients: code where a bug isn't a misaligned button, it's an invoice issued wrong. I pick up whatever tool the job needs and I'm always open to learning new technologies.",
        "hero.cta.projects": "View projects",
        "hero.cta.cv": "Download CV",
        "hero.photoAlt": "Illustrated avatar of Daniel Latorre wearing a cap",

        /* --- Metrics --- */
        "metric.clients.label": "Clients in production I support directly",
        "metric.stack.value": "Java · SQL Server",
        "metric.stack.label": "Core stack",
        "metric.perf.label": "Off the invoice list load time",
        "metric.domain.value": "Invoicing · Inventory · Accounting",
        "metric.domain.label": "Functional domain",

        /* --- About --- */
        "about.eyebrow": "About me",
        "about.title": "Professional profile",
        "about.p1": "I'm a developer at <strong>SOMIC Soluciones</strong>, working on <strong>Mantis</strong>, a multi-company ERP running in production. I cover the full sales chain — quotations, delivery notes, invoices, credit and debit notes — plus inventory, contracts, price lists, commissions, accounting entries and regulatory reporting. My technical base is <strong>Java</strong> and <strong>SQL Server</strong>, on <strong>Apache Tomcat</strong>.",
        "about.p2": "A large part of my job is <strong>diagnosis</strong>: tracing an exception from the server log back to the query or business rule that caused it, and fixing it without breaking what already works. In an ERP that weighs more than anywhere else, because the bug isn't cosmetic: it's an invoice issued wrong or stock that no longer reconciles. I've also worked on <strong>performance</strong> (cut 3 minutes off the invoice list load by removing N+1 queries and tuning indexes), <strong>concurrency</strong> and <strong>security</strong>.",
        "about.p3": "Something I didn't expect to learn here is the <strong>functional domain</strong>: Colombian tax regulation, healthcare regulatory reporting, receivables and accounting entries. Understanding the business is what lets you decide whether an odd value is a bug or a legitimate rule. The platform is <strong>GeneXus</strong>, which generates Java, and that mix made one thing clear: the tool matters less than understanding how the data flows and knowing where to look. That's why I adapt quickly and stay <strong>open to learning new technologies</strong> — right now I'm moving towards Spring Boot and React. This portfolio is hand-built, no templates.",
        "about.fact.location": "Location",
        "about.fact.locationV": "Colombia · Remote or hybrid",
        "about.fact.role": "Role",
        "about.fact.roleV": "Software Developer",
        "about.fact.focus": "Focus",
        "about.fact.focusV": "Backend and data",
        "about.fact.langs": "Languages",
        "about.fact.langsV": "Spanish (native) · English B2",
        "about.fact.status": "Availability",
        "about.fact.statusV": "Open to offers",

        /* --- Stack --- */
        "stack.eyebrow": "Tech stack",
        "stack.title": "What I work with",
        "stack.lead": "The tools I use in production every day, grouped by area. I'm honest about my level with each one.",

        "stack.backend.title": "Backend and logic",
        "stack.backend.level": "Daily use in production",
        "stack.backend.desc": "Java at the core: business rules, procedures and services on an ERP in production. Structured exception handling, reading stack traces, live debugging and fixing concurrency issues. The platform is GeneXus 18, which generates Java.",

        "stack.data.title": "Databases",
        "stack.data.level": "Daily use in production",
        "stack.data.desc": "SQL Server every day: queries, stored procedures, complex joins and model reviews. Real performance work — removing N+1 queries and tuning indexes — and cleaning up accounting data directly in SQL.",

        "stack.domain.title": "Functional domain",
        "stack.domain.level": "Where I stand out most",
        "stack.domain.desc": "Invoicing, inventory, receivables and accounting entries. Colombian tax regulation and healthcare regulatory reporting. Understanding the business is what lets you tell a bug from a legitimate rule.",

        "stack.deploy.title": "Deployment and environment",
        "stack.deploy.level": "Frequent use",
        "stack.deploy.desc": "Publishing applications to Apache Tomcat, managing WAR artifacts, configuring environments and reviewing server logs.",

        "stack.web.title": "Web development",
        "stack.web.level": "Solid foundation",
        "stack.web.desc": "Semantic, accessible markup, modern CSS (Grid, Flexbox, custom properties) and dependency-free JavaScript. The base I'm building on towards React.",

        "stack.learning.title": "Currently learning",
        "stack.learning.level": "Actively studying",
        "stack.learning.desc": "Expanding into the enterprise Java ecosystem and modern frontend. Learning a new tool is part of the job, not an obstacle: I care more about solving the problem well than defending any particular stack.",

        /* --- Experience --- */
        "exp.eyebrow": "Career",
        "exp.title": "Experience",
        "exp.lead": "Where I've worked and what problems I solved — not just which technologies I touched.",

        "exp.job1.period": "April 2025 — Present",
        "exp.job1.role": "Software Developer — Mantis ERP",
        "exp.job1.company": "SOMIC Soluciones · Colombia",
        "exp.job1.context": "Mantis is a <strong>multi-company ERP</strong> built in GeneXus 18 with the Java generator on SQL Server. I work end to end on the product, from the business rule down to the query and the deployment.",
        "exp.job1.p1": "Full sales chain: quotations, delivery notes, invoices, and credit and debit notes.",
        "exp.job1.p2": "Inventory, contracts and price lists, commissions, accounting entries and regulatory reporting modules.",
        "exp.job1.p3": "Diagnosing and resolving production errors: analysing Tomcat logs, tracing exceptions and fixing the business rule or query behind them.",
        "exp.job1.p4": "Fixing concurrency and security issues, and cleaning up accounting data directly in SQL.",
        "exp.job1.p5": "Direct support for clients in the healthcare, pharmaceutical and retail sectors.",
        "exp.job1.winsTitle": "Selected achievements",
        "exp.job1.w1": "Cut <strong>3 minutes</strong> off the invoice list load time by removing <strong>N+1</strong> queries and tuning indexes.",
        "exp.job1.w2": "Implemented <strong>self-withholding tax</strong> for clients under Colombia's Simple Tax Regime.",
        "exp.job1.w3": "Built the <strong>SISMED/SISDIS</strong> report to comply with Circular 021 of 2026.",
        "exp.job1.w4": "Added business controls to delivery notes: below-cost sale validation, credit-limit and overdue-payment blocking with an approval workflow, and bonus items.",
        "exp.job1.w5": "Migrated print layouts from legacy versions of the product to <strong>GX6</strong>.",
        "exp.job1.clients": "Clients supported: Discolmets, Ramedicas, Medic Colombia and Diagnostimax.",

        "exp.job2.period": "Education",
        "exp.job2.role": "Software Programming Technician",
        "exp.job2.company": "[Institution] · Colombia",
        "exp.job2.p1": "Programming fundamentals, data structures and object-oriented programming with Java and Python.",
        "exp.job2.p2": "Relational database design and normalisation, with a documented final project for the Ministry of the Environment.",
        "exp.job2.p3": "Web development with HTML, CSS and JavaScript, including REST API consumption.",

        /* --- Projects --- */
        "projects.eyebrow": "Work",
        "projects.title": "Projects",
        "projects.lead": "A selection of projects, with the problem each one solved and what I learned building it.",
        "projects.role": "My role",
        "projects.learned": "What I learned",
        "projects.code": "View code",
        "projects.demo": "View demo",
        "projects.docs": "View documentation",

        "proj.spacex.label": "API consumption",
        "proj.spacex.title": "SpaceX — API client",
        "proj.spacex.desc": "A working replica of the SpaceX site that consumes the company's public API. Four independent modules show rockets, missions, capsules and company history, with all data rendered dynamically.",
        "proj.spacex.role": "Full frontend development and the data-fetching layer, with no external libraries.",
        "proj.spacex.learned": "Asynchronous requests with fetch, handling promises and error states, and rendering the DOM dynamically from JSON responses.",

        "proj.kario.label": "Real client",
        "proj.kario.title": "Kario Media — Admin panel",
        "proj.kario.desc": "A web application for a company working in public and private tenders. I implemented the full administrative flow, from login through to the project management panel, working from the UI/UX team's design proposal.",
        "proj.kario.role": "Translating UI/UX designs into a functional, responsive interface.",
        "proj.kario.learned": "Working against someone else's design spec and keeping visual fidelity across screen sizes.",

        "proj.db.label": "Data modelling",
        "proj.db.title": "Database — National Parks",
        "proj.db.desc": "Design and development of a relational database for the Ministry of the Environment, built to manage information on the national parks administered by each department: species, visitors, staff and protected areas.",
        "proj.db.role": "Entity-relationship model design, schema normalisation and full technical documentation.",
        "proj.db.learned": "Normalisation to third normal form, designing complex relationships, and why documenting a model matters so others can understand it.",

        /* --- Certifications --- */
        "certs.eyebrow": "Training",
        "certs.title": "Certifications",
        "certs.lead": "Certificates earned on technical training and language platforms.",
        "certs.prev": "Previous certificate",
        "certs.next": "Next certificate",
        "certs.hint": "Click a certificate to enlarge it.",
        "cert.english": "English level B2 — UIS Language Institute, Universidad Industrial de Santander (2023)",
        "cert.git1": "Introduction to Git — Microsoft Learn (2024)",
        "cert.git2": "Creating and modifying a Git project — Microsoft Learn (2024)",
        "cert.git3": "Collaborating with Git — Microsoft Learn (2024)",

        /* --- Contact --- */
        "contact.eyebrow": "Contact",
        "contact.title": "Let's talk",
        "contact.lead": "Got a role or a project in mind? Send me a message and I'll get back to you as soon as I can.",
        "contact.name": "Name",
        "contact.namePh": "Your name",
        "contact.email": "Email address",
        "contact.emailPh": "you@company.com",
        "contact.message": "Message",
        "contact.messagePh": "Tell me how I can help...",
        "contact.send": "Send message",
        "contact.sending": "Sending...",
        "contact.ok": "Message sent! I'll get back to you soon.",
        "contact.error": "Couldn't send. Email me directly at daniellatorre600@gmail.com",
        "contact.err.name": "Please enter your name.",
        "contact.err.email": "Please enter a valid email address.",
        "contact.err.message": "The message must be at least 10 characters.",
        "contact.direct": "Or reach me directly",
        "contact.label.email": "Email",
        "contact.label.linkedin": "LinkedIn",
        "contact.label.github": "GitHub",
        "contact.label.phone": "Phone",

        /* --- Footer --- */
        "footer.rights": "All rights reserved.",
        "footer.built": "Hand-built with HTML, CSS and JavaScript. No templates, no frameworks.",
        "footer.top": "Back to top"
    }
};

/* Palabras que rotan en el efecto de tecleo del hero, por idioma. */
const TYPED_ROLES = {
    es: [
        "Desarrollador de Software",
        "Java · SQL Server",
        "Despliegues en Tomcat",
        "Siempre aprendiendo algo nuevo"
    ],
    en: [
        "Software Developer",
        "Java · SQL Server",
        "Tomcat Deployments",
        "Always learning something new"
    ]
};
