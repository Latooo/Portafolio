/* ==========================================================================
   script.js — Lógica del portafolio
   --------------------------------------------------------------------------
   Cada bloque de funcionalidad vive en su propia función init*() y todas se
   arrancan al final. Así, si una falla, no arrastra a las demás.
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   CONFIGURACIÓN — edita esto
   -------------------------------------------------------------------------- */

/*
 * Endpoint del formulario de contacto.
 *
 * Déjalo vacío y el formulario abrirá el cliente de correo del visitante.
 * Para recibir los mensajes en tu bandeja sin montar un backend:
 *   1. Entra a https://formspree.io y crea una cuenta gratuita.
 *   2. Crea un formulario nuevo y copia la URL que te dan.
 *   3. Pégala aquí. Ejemplo: 'https://formspree.io/f/xyzabcde'
 */
const FORM_ENDPOINT = '';

/** Correo de respaldo cuando no hay endpoint configurado. */
const FALLBACK_EMAIL = 'daniellatorre600@gmail.com';


/* --------------------------------------------------------------------------
   IDIOMA
   -------------------------------------------------------------------------- */

/** Idioma activo. Se lee de localStorage o se deduce del navegador. */
let currentLang = 'es';

function detectInitialLang() {
    let saved = null;
    try {
        saved = localStorage.getItem('lang');
    } catch (e) { /* almacenamiento bloqueado */ }

    if (saved === 'es' || saved === 'en') return saved;
    return navigator.language && navigator.language.startsWith('en') ? 'en' : 'es';
}

/** Devuelve la traducción de `key`, o null si no existe en el idioma activo. */
function t(key) {
    const dict = TRANSLATIONS[currentLang];
    return dict && Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : null;
}

/**
 * Recorre el DOM y aplica las traducciones del idioma activo.
 *
 * - data-i18n           -> reemplaza el texto del elemento
 * - data-i18n-html      -> reemplaza el HTML (para textos con <strong>)
 * - data-i18n-attr      -> traduce atributos: "placeholder:clave, alt:otra"
 *
 * Si una clave no existe, se deja el contenido que ya tenía el HTML.
 */
function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const value = t(el.dataset.i18n);
        if (value !== null) el.textContent = value;
    });

    /*
     * Solo se usa en textos propios del diccionario (about.p1, etc.), nunca con
     * contenido que venga del visitante, así que no hay riesgo de inyección.
     */
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const value = t(el.dataset.i18nHtml);
        if (value !== null) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        el.dataset.i18nAttr.split(',').forEach(pair => {
            const idx = pair.indexOf(':');
            if (idx === -1) return;

            const attr = pair.slice(0, idx).trim();
            const value = t(pair.slice(idx + 1).trim());
            if (value !== null) el.setAttribute(attr, value);
        });
    });

    // El botón muestra el idioma AL QUE se cambiaría, no el actual.
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';

    // Avisa a los módulos que guardan texto propio (efecto de tecleo).
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
}

function initLanguage() {
    currentLang = detectInitialLang();
    applyTranslations();

    const btn = document.getElementById('lang-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        try {
            localStorage.setItem('lang', currentLang);
        } catch (e) { /* almacenamiento bloqueado */ }
        applyTranslations();
    });
}


/* --------------------------------------------------------------------------
   TEMA CLARO / OSCURO
   -------------------------------------------------------------------------- */

function initTheme() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    // El tema inicial ya lo aplicó el script inline del <head> para evitar
    // el destello blanco; aquí solo gestionamos el cambio.
    btn.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem('theme', next);
        } catch (e) { /* almacenamiento bloqueado */ }
    });
}


/* --------------------------------------------------------------------------
   NAVEGACIÓN: sombra al bajar, menú móvil y sección activa
   -------------------------------------------------------------------------- */

function initNav() {
    const nav = document.getElementById('nav');
    const links = document.getElementById('nav-links');
    const burger = document.getElementById('nav-burger');

    /* --- Sombra cuando la página deja de estar arriba del todo --- */
    if (nav) {
        const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* --- Menú hamburguesa --- */
    if (burger && links) {
        const closeMenu = () => {
            links.dataset.open = 'false';
            burger.setAttribute('aria-expanded', 'false');
        };

        burger.addEventListener('click', () => {
            const isOpen = links.dataset.open === 'true';
            links.dataset.open = String(!isOpen);
            burger.setAttribute('aria-expanded', String(!isOpen));
        });

        // Al elegir una sección, el menú debe cerrarse solo.
        links.addEventListener('click', e => {
            if (e.target.closest('a')) closeMenu();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    /*
     * Sección activa en el menú.
     * Usamos IntersectionObserver en lugar de calcular posiciones en cada
     * scroll: el navegador lo resuelve sin bloquear el hilo principal.
     */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    if (!sections.length || !navLinks.length) return;

    const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
            });
        });
    }, {
        // Considera "activa" la sección que cruza la franja central de la ventana.
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(section => spy.observe(section));
}


/* --------------------------------------------------------------------------
   ANIMACIÓN DE ENTRADA AL HACER SCROLL
   -------------------------------------------------------------------------- */

function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    // Si el usuario pidió menos movimiento, se muestra todo de una vez.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target); // una sola vez por elemento
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach(el => observer.observe(el));
}


/* --------------------------------------------------------------------------
   CONTADORES DE LAS MÉTRICAS
   -------------------------------------------------------------------------- */

function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const animate = el => {
        const target = Number(el.dataset.count);
        if (!Number.isFinite(target)) return;

        const duration = 1100;
        const start = performance.now();

        const step = now => {
            const progress = Math.min((now - start) / duration, 1);
            // easeOutCubic: rápido al principio, suave al final
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = String(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animate(entry.target);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}


/* --------------------------------------------------------------------------
   EFECTO DE TECLEO DEL HERO
   -------------------------------------------------------------------------- */

function initTyped() {
    const el = document.getElementById('typed-role');
    if (!el) return;

    const getRoles = () => TYPED_ROLES[currentLang] || TYPED_ROLES.es;

    // Sin animación si el usuario pidió menos movimiento: texto fijo.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = getRoles()[0];
        document.addEventListener('langchange', () => { el.textContent = getRoles()[0]; });
        return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = null;

    const tick = () => {
        const roles = getRoles();
        const word = roles[roleIndex % roles.length];

        charIndex += deleting ? -1 : 1;
        el.textContent = word.slice(0, charIndex);

        let delay = deleting ? 45 : 85;

        if (!deleting && charIndex === word.length) {
            delay = 1900;            // pausa leyendo la palabra completa
            deleting = true;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex++;
            delay = 320;
        }

        timer = setTimeout(tick, delay);
    };

    tick();

    // Al cambiar de idioma, reinicia desde la primera palabra del nuevo set.
    document.addEventListener('langchange', () => {
        clearTimeout(timer);
        roleIndex = 0;
        charIndex = 0;
        deleting = false;
        el.textContent = '';
        tick();
    });
}


/* --------------------------------------------------------------------------
   SLIDER DE CERTIFICACIONES
   -------------------------------------------------------------------------- */

function initSlider() {
    const track = document.getElementById('cert-track');
    const slider = document.getElementById('cert-slider');
    const dotsBox = document.getElementById('cert-dots');
    if (!track || !slider) return;

    const slides = Array.from(track.children);
    if (!slides.length) return;

    let index = 0;

    const goTo = i => {
        // Recorrido circular: del último pasa al primero y viceversa.
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(${-index * 100}%)`;

        if (dotsBox) {
            Array.from(dotsBox.children).forEach((dot, d) => {
                dot.setAttribute('aria-selected', String(d === index));
            });
        }
    };

    /* --- Puntos de navegación, generados según el número de slides --- */
    if (dotsBox) {
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'slider__dot';
            dot.type = 'button';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `${i + 1} / ${slides.length}`);
            dot.addEventListener('click', () => goTo(i));
            dotsBox.appendChild(dot);
        });
    }

    slider.querySelectorAll('[data-slide]').forEach(btn => {
        btn.addEventListener('click', () => {
            goTo(index + (btn.dataset.slide === 'next' ? 1 : -1));
        });
    });

    /* --- Flechas del teclado cuando el slider está en pantalla --- */
    document.addEventListener('keydown', e => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

        const rect = slider.getBoundingClientRect();
        const onScreen = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (!onScreen) return;

        goTo(index + (e.key === 'ArrowRight' ? 1 : -1));
    });

    /* --- Deslizar con el dedo en móvil --- */
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        const delta = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(delta) > 50) goTo(index + (delta < 0 ? 1 : -1));
    }, { passive: true });

    goTo(0);
}


/* --------------------------------------------------------------------------
   VISOR DE IMÁGENES AMPLIADAS (LIGHTBOX)
   -------------------------------------------------------------------------- */

function initLightbox() {
    const box = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    if (!box || !img) return;

    // Recuerda qué elemento tenía el foco para devolvérselo al cerrar.
    let lastFocused = null;

    const open = source => {
        lastFocused = document.activeElement;
        img.src = source.src;
        img.alt = source.alt || '';
        box.dataset.open = 'true';
        document.body.style.overflow = 'hidden'; // bloquea el scroll de fondo
        if (closeBtn) closeBtn.focus();
    };

    const close = () => {
        box.dataset.open = 'false';
        document.body.style.overflow = '';
        img.src = '';
        if (lastFocused) lastFocused.focus();
    };

    /*
     * Un único listener delegado en el documento cubre todas las imágenes
     * ampliables, incluidas las que se añadan más adelante.
     */
    document.addEventListener('click', e => {
        const target = e.target.closest('.project__media img, .slider__slide img');
        if (target) open(target);
    });

    if (closeBtn) closeBtn.addEventListener('click', close);

    // Clic fuera de la imagen cierra el visor.
    box.addEventListener('click', e => {
        if (e.target === box) close();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && box.dataset.open === 'true') close();
    });
}


/* --------------------------------------------------------------------------
   FORMULARIO DE CONTACTO
   -------------------------------------------------------------------------- */

function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    if (!form) return;

    const setError = (field, key) => {
        const box = form.querySelector(`[data-error-for="${field}"]`);
        if (box) box.textContent = key ? (t(key) || '') : '';
    };

    const setStatus = (key, state) => {
        if (!status) return;
        status.textContent = key ? (t(key) || '') : '';
        if (state) {
            status.dataset.state = state;
        } else {
            delete status.dataset.state;
        }
    };

    /** Valida los tres campos y devuelve si el formulario puede enviarse. */
    const validate = () => {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        let ok = true;

        if (name.length < 2) {
            setError('name', 'contact.err.name');
            ok = false;
        } else {
            setError('name', null);
        }

        // Comprobación básica: algo, arroba, algo, punto, algo.
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
            setError('email', 'contact.err.email');
            ok = false;
        } else {
            setError('email', null);
        }

        if (message.length < 10) {
            setError('message', 'contact.err.message');
            ok = false;
        } else {
            setError('message', null);
        }

        return ok;
    };

    form.addEventListener('submit', async e => {
        e.preventDefault();
        setStatus(null, null);

        if (!validate()) return;

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        /*
         * Sin endpoint configurado, abrimos el cliente de correo del visitante
         * con el mensaje ya redactado. No es lo ideal, pero nunca se pierde.
         */
        if (!FORM_ENDPOINT) {
            const subject = encodeURIComponent(`Contacto desde el portafolio — ${name}`);
            const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
            window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
            return;
        }

        const originalLabel = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = t('contact.sending') || '...';
        }

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(form)
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            form.reset();
            setStatus('contact.ok', 'ok');
        } catch (err) {
            console.error('Error al enviar el formulario:', err);
            setStatus('contact.error', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalLabel;
            }
        }
    });

    // Limpia el error de un campo en cuanto el usuario lo corrige.
    ['name', 'email', 'message'].forEach(field => {
        const input = form.elements[field];
        if (input) input.addEventListener('input', () => setError(field, null));
    });
}


/* --------------------------------------------------------------------------
   AÑO DEL PIE DE PÁGINA
   -------------------------------------------------------------------------- */

function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
}


/* --------------------------------------------------------------------------
   ARRANQUE
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const modules = [
        initLanguage,
        initTheme,
        initNav,
        initReveal,
        initCounters,
        initTyped,
        initSlider,
        initLightbox,
        initContactForm,
        initYear
    ];

    // Si un módulo falla, el resto de la página sigue funcionando.
    modules.forEach(init => {
        try {
            init();
        } catch (err) {
            console.error(`Fallo al iniciar ${init.name}:`, err);
        }
    });
});
