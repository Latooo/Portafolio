/**
 * Capas "con vida", estilo LangChain: foco de luz que sigue al cursor, grabado del hero
 * con parallax, credencial colgante con física y tilt/brillo/imán en tarjetas y botones.
 *
 * Todo es decorativo (aria-hidden). Sin JS no existe nada de esto y el contenido se ve
 * completo; con prefers-reduced-motion no se anima nada. Cero librerías (~2.5 KB gzip).
 */
const html = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

const mk = (cls: string, css = '', parent?: Element) => {
  const e = document.createElement('div');
  e.className = cls;
  if (css) e.style.cssText = css;
  e.setAttribute('aria-hidden', 'true');
  parent?.appendChild(e);
  return e;
};

/* ---------- Foco de luz (global) ---------- */
const spot = mk('fx-spot', '', document.body);
$('.feature, .card, .cert, .lc-panel, .edu-doc').forEach((e) => e.classList.add('fx-glow'));

/* ---------- Credencial colgante: péndulo con cuerda y arrastre ---------- */
const lanyard = document.querySelector<HTMLElement>('.lanyard');
if (lanyard && !reduced) {
  const card = lanyard.querySelector<HTMLElement>('.ly-card')!;
  const path = lanyard.querySelector<SVGPathElement>('#ly-path')!;
  lanyard.classList.add('is-live');
  let W = 0, H = 0, L = 0;
  const A = { x: 0, y: -10 };
  const P = { x: 0, y: 0 };
  const V = { x: 0, y: 0 };
  let dragging = false;
  const grab = { x: 0, y: 0 };
  let last = { x: 0, y: 0, t: 0 };
  let running = false;
  let visible = true;

  const measure = () => {
    const b = lanyard.getBoundingClientRect();
    W = b.width;
    H = b.height;
    A.x = W / 2;
    L = Math.max(170, H * 0.46);
  };
  measure();
  // Entra desde arriba con un poco de desvío para que se balancee.
  P.x = A.x + W * 0.35;
  P.y = A.y - 80;

  const render = () => {
    const dx = P.x - A.x, dy = P.y - A.y;
    const dist = Math.hypot(dx, dy) || 1;
    const sag = Math.max(0, L - dist) * 0.7;
    const cx = (A.x + P.x) / 2 + dy * 0.02, cy = (A.y + P.y) / 2 + sag;
    path.setAttribute('d', `M${A.x.toFixed(1)} ${A.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${P.x.toFixed(1)} ${P.y.toFixed(1)}`);
    const ang = (Math.atan2(dx, dy) * 180) / Math.PI;
    const ry = Math.max(-38, Math.min(38, V.x * 2.2));
    const rx = Math.max(-18, Math.min(18, -V.y * 1.2));
    card.style.transform = `translate(${(P.x - card.offsetWidth / 2).toFixed(1)}px, ${P.y.toFixed(1)}px) rotate(${(-ang * 0.9).toFixed(2)}deg) rotateY(${ry.toFixed(1)}deg) rotateX(${rx.toFixed(1)}deg)`;
  };

  const step = () => {
    if (!dragging) {
      V.y += 0.55; // gravedad
      V.x *= 0.985;
      V.y *= 0.985;
      P.x += V.x;
      P.y += V.y;
      // Cuerda: solo tira cuando se estira más que su largo.
      const dx = P.x - A.x, dy = P.y - A.y;
      const dist = Math.hypot(dx, dy);
      if (dist > L) {
        const nx = dx / dist, ny = dy / dist;
        const ex = dist - L;
        P.x -= nx * ex;
        P.y -= ny * ex;
        const vn = V.x * nx + V.y * ny;
        if (vn > 0) {
          V.x -= nx * vn * 1.6;
          V.y -= ny * vn * 1.6;
        }
      }
    }
    render();
  };

  const loop = () => {
    if (!visible || document.hidden) {
      running = false;
      return;
    }
    step();
    const energy = Math.abs(V.x) + Math.abs(V.y);
    const atRest = !dragging && energy < 0.02 && Math.abs(P.x - A.x) < 0.5;
    if (atRest) {
      running = false;
      return;
    }
    requestAnimationFrame(loop);
  };
  const wake = () => {
    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
  };

  card.addEventListener('pointerdown', (e) => {
    dragging = true;
    card.setPointerCapture(e.pointerId);
    const b = lanyard.getBoundingClientRect();
    grab.x = e.clientX - b.left - P.x;
    grab.y = e.clientY - b.top - P.y;
    last = { x: P.x, y: P.y, t: performance.now() };
    lanyard.classList.add('is-drag');
    wake();
  });
  card.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const b = lanyard.getBoundingClientRect();
    const nx = e.clientX - b.left - grab.x, ny = e.clientY - b.top - grab.y;
    const now = performance.now();
    const dt = Math.max(8, now - last.t) / 16.7;
    V.x = (nx - last.x) / dt;
    V.y = (ny - last.y) / dt;
    P.x = nx;
    P.y = ny;
    last = { x: nx, y: ny, t: now };
  });
  const release = () => {
    if (!dragging) return;
    dragging = false;
    V.x = Math.max(-40, Math.min(40, V.x));
    V.y = Math.max(-40, Math.min(40, V.y));
    lanyard.classList.remove('is-drag');
    wake();
  };
  card.addEventListener('pointerup', release);
  card.addEventListener('pointercancel', release);

  // El mouse cerca le da un empujoncito: se siente viva sin arrastrarla.
  if (fine) {
    lanyard.addEventListener('pointermove', (e) => {
      if (dragging) return;
      const b = lanyard.getBoundingClientRect();
      const mx = e.clientX - b.left;
      V.x += (mx < P.x ? 1 : -1) * 0.05;
      wake();
    });
  }

  addEventListener('resize', () => {
    measure();
    wake();
  });
  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (visible) wake();
  }).observe(lanyard);

  render();
  const drop = () => window.setTimeout(wake, 60);
  if (html.classList.contains('first')) {
    const t = window.setTimeout(wake, 2600);
    addEventListener('intro:skip', () => {
      window.clearTimeout(t);
      drop();
    }, { once: true });
  } else drop();
}

/* ---------- Puntero: foco, malla, tilt, brillo, imán ---------- */
if (fine && !reduced) {
  addEventListener(
    'pointermove',
    (e) => {
      spot.style.setProperty('--mx', e.clientX + 'px');
      spot.style.setProperty('--my', e.clientY + 'px');
      spot.classList.add('on');
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => spot.classList.remove('on'));
  $('.shotwrap, .card.is-live, .cert').forEach((el) => {
    el.classList.add('fx-tilt');
    el.addEventListener('pointermove', (e) => {
      const b = el.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
  $('.fx-glow').forEach((el) =>
    el.addEventListener('pointermove', (e) => {
      const b = el.getBoundingClientRect();
      el.style.setProperty('--cx', e.clientX - b.left + 'px');
      el.style.setProperty('--cy', e.clientY - b.top + 'px');
    }),
  );
  $('.btn, .ctl').forEach((el) => {
    el.classList.add('fx-mag');
    el.addEventListener('pointermove', (e) => {
      const b = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.25}px, ${(e.clientY - b.top - b.height / 2) * 0.35}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
}

/* ---------- Scroll: parallax del grabado y capas con data-depth ---------- */
const par = () => {
  $('[data-depth]').forEach((el) => {
    const sec = (el.closest('section, header') ?? el.parentElement!).getBoundingClientRect();
    if (sec.bottom < -200 || sec.top > innerHeight + 200) return;
    el.style.translate = `0 ${(-sec.top * Number(el.dataset.depth)).toFixed(1)}px`;
  });
};
let tick = false;
if (!reduced) {
  addEventListener(
    'scroll',
    () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        par();
        tick = false;
      });
    },
    { passive: true },
  );
  par();
}

/* ---------- Fondo vivo: luces que se mueven con el scroll y cambian de tono por sección ---------- */
{
  const scene = mk('bg-scene', '', document.body);
  ['bg-glow bg-g1', 'bg-glow bg-g2', 'bg-glow bg-g3', 'bg-grid'].forEach((c) => mk(c, '', scene));
  document.body.prepend(scene);

  if (!reduced) {
    let queued = false;
    const progress = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      html.style.setProperty('--sp', (max > 0 ? Math.min(1, scrollY / max) : 0).toFixed(4));
    };
    addEventListener(
      'scroll',
      () => {
        if (!queued) {
          queued = true;
          requestAnimationFrame(progress);
        }
      },
      { passive: true },
    );
    progress();
  }

  // Tono: la sección que cruza el centro de la pantalla.
  const moods = ['about', 'process', 'projects', 'experience', 'education', 'certs'];
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) html.dataset.mood = (e.target as HTMLElement).id;
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  moods.forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
  const top = document.querySelector('header.hero');
  if (top) new IntersectionObserver((es) => es[0].isIntersecting && delete html.dataset.mood, { rootMargin: '-50% 0px -50% 0px' }).observe(top);
}

/* ---------- Cursor: punto + anillo con inercia. Solo con mouse y sin reduced-motion. ---------- */
if (fine && !reduced) {
  const dot = mk('cur-dot is-hidden', '', document.body);
  const ring = mk('cur-ring is-hidden', '', document.body);
  html.classList.add('has-cursor');
  let x = -100, y = -100, rx = -100, ry = -100, running = false;
  const loop = () => {
    rx += (x - rx) * 0.2;
    ry += (y - ry) * 0.2;
    ring.style.transform = `translate(${rx.toFixed(1)}px, ${ry.toFixed(1)}px)`;
    if (Math.abs(x - rx) + Math.abs(y - ry) > 0.3) requestAnimationFrame(loop);
    else running = false;
  };
  const interactive = 'a, button, [role="button"], label, summary, .ly-card';
  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
      const t = e.target as Element;
      const link = !!t.closest?.(interactive);
      const light = !!t.closest?.('.field--light');
      ring.classList.toggle('is-link', link);
      ring.classList.toggle('is-light', light);
      dot.classList.toggle('is-light', light);
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    },
    { passive: true },
  );
  addEventListener('pointerdown', () => ring.classList.add('is-down'));
  addEventListener('pointerup', () => ring.classList.remove('is-down'));
  document.addEventListener('pointerleave', () => {
    dot.classList.add('is-hidden');
    ring.classList.add('is-hidden');
  });
}
