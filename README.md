# Portafolio — Daniel Latorre

Portafolio personal de un desarrollador de software enfocado en aplicaciones
empresariales: **GeneXus**, **Java**, **SQL Server** y despliegues en **Apache Tomcat**.

Construido a mano con HTML, CSS y JavaScript. Sin frameworks, sin plantillas y
sin paso de compilación: se abre el `index.html` y funciona.

## Características

- **Bilingüe ES/EN** con un diccionario propio y traducción vía atributos `data-i18n`.
- **Tema claro y oscuro** que respeta la preferencia del sistema y se guarda entre visitas,
  aplicado antes del primer pintado para evitar el destello blanco.
- **Diseño responsivo** desde 320 px, con menú lateral en móvil.
- **Accesibilidad**: navegación por teclado, enlace de salto al contenido,
  foco visible, etiquetas ARIA y soporte de `prefers-reduced-motion`.
- **SEO**: metadatos Open Graph para las vistas previas al compartir y datos
  estructurados JSON-LD (`schema.org/Person`).
- Animaciones de entrada y contadores con `IntersectionObserver`, sin listeners
  de scroll costosos.

## Estructura

```
index.html              Documento único con todas las secciones
css/
  tokens.css            Variables de diseño: colores, tipografía, espaciado
  base.css              Reset, tipografía base y utilidades
  components.css        Nav, botones, tarjetas, timeline, slider, lightbox
  sections.css          Layout de cada sección
js/
  i18n.js               Diccionario de traducciones ES/EN
  script.js             Lógica: idioma, tema, navegación, slider, formulario
Storage/
  img/                  Fotografías, certificados y capturas de proyectos
  cv/                   Currículum en PDF
```

## Ejecutar en local

Cualquier servidor estático sirve. Por ejemplo, con Python:

```bash
python -m http.server 8000
```

Después abre <http://localhost:8000>.

## Stack

`HTML5` · `CSS3 (Grid, Flexbox, Custom Properties)` · `JavaScript ES6+`

## Contacto

- Correo: daniellatorre600@gmail.com
- LinkedIn: [/in/daniellatorre9](https://www.linkedin.com/in/daniellatorre9)
- GitHub: [@Latooo](https://github.com/Latooo)
