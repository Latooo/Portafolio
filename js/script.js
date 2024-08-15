// script.js
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

// Cambiar entre modo claro y oscuro
modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    modeToggle.textContent = body.classList.contains('dark-mode') ? 'Modo Día' : 'Modo Noche';
});

// Suavizar el desplazamiento al hacer clic en los enlaces del menú
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Añadir clase activa a la sección
        setActiveSection(this.getAttribute('href'));
    });
});

// Detectar la sección visible y añadir clase activa
function setActiveSection(id) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector(id).classList.add('active');
}

// Cambiar la sección activa cuando se desplaza la página
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    setActiveSection(`#${currentSection}`);
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none'; // Oculta el loader al cargar la página

    // Función para manejar la visibilidad de los elementos
    function handleScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-up');
        const windowHeight = window.innerHeight;

        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight * 0.8) { // Ajusta el valor según sea necesario
                // Añadir clase 'visible' con un retraso para animar
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 300); // Retraso basado en el índice para variabilidad
            }
        });
    }

    // Añadir evento de scroll
    document.addEventListener('scroll', handleScroll);

    // Ejecutar la función para mostrar los elementos visibles al cargar la página
    handleScroll();
});


