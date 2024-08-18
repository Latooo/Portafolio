// script.js
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Cambiar entre modo claro y oscuro
modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        localStorage.setItem('theme', 'light');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
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

// Ejecutar la función al cargar el contenido
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

    // Inicialización del slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slidesContainer = document.querySelector('.slides');
    let currentIndex = 0;

    function showSlide(index) {
        const totalSlides = slides.length;
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }

        slidesContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    // Inicializar el primer slide
    showSlide(currentIndex);

    // Modo de tema inicial basado en localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        body.classList.remove('dark-mode');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
});
