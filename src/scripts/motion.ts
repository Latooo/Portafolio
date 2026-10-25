/**
 * Movimiento: intro (primera visita), revelado al entrar en pantalla y contador.
 *
 * Todo es decorativo y depende de la clase `motion` que pone el script de <head>
 * (JS activo y sin prefers-reduced-motion). Sin ella este archivo no hace nada y el
 * contenido se ve completo desde el principio.
 */
const root = document.documentElement;

if (root.classList.contains('motion')) {
  /* ---------- Intro: termina sola o al saltarla. No bloquea el scroll. ---------- */
  if (root.classList.contains('intro-on')) {
    const end = () => root.classList.remove('intro-on');
    const timer = window.setTimeout(end, 1200);
    const skip = () => {
      window.clearTimeout(timer);
      end();
    };
    window.addEventListener('pointerdown', skip, { once: true, passive: true });
    window.addEventListener('keydown', skip, { once: true, passive: true });
  }

  /* ---------- Revelado ---------- */
  const reveal = (el: HTMLElement, instant: boolean) => {
    if (el.classList.contains('is-in')) return;
    if (instant) el.classList.add('rv-instant');
    el.classList.add('is-in');
    if (!instant && el.hasAttribute('data-invoice')) countUp(el);
  };

  /** Muestra de golpe todo lo animable de la sección que contiene `target` (anclas, #hash, atrás). */
  const revealAround = (target: Element | null) => {
    if (!target) return;
    const scope = target.closest('section') ?? target;
    scope.querySelectorAll<HTMLElement>('[data-rv]').forEach((el) => reveal(el, true));
  };

  const hashTarget = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    return id ? document.getElementById(id) : null;
  };

  const init = () => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-rv]'));

    // Lo que ya está en pantalla al cargar (o la sección del #hash) se muestra sin animar.
    revealAround(hashTarget());
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el, true);
    });

    // Recién ahora puede existir un estado oculto: nunca se oculta nada antes de este punto.
    root.classList.add('rv-ready');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement, false);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    );
    items.forEach((el) => {
      if (!el.classList.contains('is-in')) io.observe(el);
    });

    // Enlaces internos y cambios de hash: la sección de destino ya llega visible.
    document.addEventListener(
      'click',
      (event) => {
        const link = (event.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
        if (!link || link.pathname !== location.pathname) return;
        revealAround(document.getElementById(decodeURIComponent(link.hash.slice(1))));
      },
      true,
    );
    window.addEventListener('hashchange', () => revealAround(hashTarget()));
  };

  // Se espera a `load` para que el navegador ya haya restaurado el scroll (botón atrás).
  if (document.readyState === 'complete') requestAnimationFrame(init);
  else window.addEventListener('load', () => requestAnimationFrame(init), { once: true });

  /* ---------- Contador decorativo ----------
     El HTML trae el valor final (.cnt). Mientras corre la animación, el valor real queda
     solo para lectores de pantalla y se muestra una copia aria-hidden que cuenta. */
  function countUp(scope: HTMLElement) {
    scope.querySelectorAll<HTMLElement>('.cnt').forEach((real) => {
      const to = Number(real.dataset.countTo);
      if (!Number.isFinite(to)) return;
      const prefix = real.dataset.countPrefix ?? '';
      const suffix = real.dataset.countSuffix ?? '';
      const copy = document.createElement('span');
      copy.className = 'cnt-anim';
      copy.setAttribute('aria-hidden', 'true');
      copy.textContent = `${prefix}0${suffix}`;
      real.classList.add('cnt-real');
      real.after(copy);

      const rows = Number(scope.style.getPropertyValue('--rows')) || 0;
      const delay = rows * 70 + 200;
      const duration = 900;
      let start = 0;
      const tick = (now: number) => {
        if (!start) start = now;
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        copy.textContent = `${prefix}${Math.round(to * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
        else {
          copy.remove();
          real.classList.remove('cnt-real');
        }
      };
      window.setTimeout(() => requestAnimationFrame(tick), delay);
    });
  }
}
