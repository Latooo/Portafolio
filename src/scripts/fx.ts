/**
 * Capas "con vida": grano, foco del cursor, malla WebGL del hero, capas por sección,
 * tilt/brillo/imán y la credencial colgante del hero.
 *
 * Todo es decorativo (aria-hidden). Sin JS no existe nada de esto y el contenido se ve
 * completo; con prefers-reduced-motion no se anima nada y no se crea el WebGL.
 * Cero librerías: WebGL crudo y física propia (~3 KB gzip).
 */
const html = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection ?? {};
const nav = navigator as Navigator & { deviceMemory?: number };
const weakDevice = (navigator.hardwareConcurrency || 8) <= 4 || (nav.deviceMemory || 8) <= 4 || conn.saveData === true;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const state = { mx: 0.5, my: 0.5, tx: 0.5, ty: 0.5, scroll: 0 };

const mk = (cls: string, css = '', parent?: Element) => {
  const e = document.createElement('div');
  e.className = cls;
  if (css) e.style.cssText = css;
  e.setAttribute('aria-hidden', 'true');
  parent?.appendChild(e);
  return e;
};

/* ---------- Grano y foco (global) ---------- */
mk('fx-grain', '', document.body);
const spot = mk('fx-spot', '', document.body);

/* ---------- Capas por sección ---------- */
const layerFor = (sel: string) => {
  const s = document.querySelector(sel);
  if (!s) return null;
  const l = mk('fx-layer');
  s.prepend(l);
  s.classList.add('fx-sec');
  return l;
};
const beam = (l: Element, x: number, deg: number, rgb: string, op: number, dur = 16) =>
  mk(
    'fx-in fx-beam',
    `left:${x}%;--deg:${deg}deg;--c:rgba(${rgb},${op});animation-duration:${dur}s`,
    l,
  );
const blob = (l: Element, c: string, size: number, x: number, y: number, anim: string, dur: number, op: number) =>
  mk('fx-in fx-blob', `width:${size}vw;height:${size}vw;left:${x}%;top:${y}%;background:${c};opacity:${op};animation:${anim} ${dur}s ease-in-out infinite alternate`, l);
const dots = (l: Element, depth: number, cls = '') => {
  const d = mk(`fx-in fx-dots ${cls}`.trim(), '', l);
  d.dataset.depth = String(depth);
  return d;
};

let l = layerFor('#about');
if (l) {
  beam(l, 72, 180, '70,100,255', 0.45);
  blob(l, '#3d5afe', 34, -8, 55, 'fx-sway-a', 22, 0.22);
  dots(l, 0.08, 'fx-dots--soft');
}
l = layerFor('#projects');
if (l) {
  dots(l, 0.12, 'fx-dots--light');
  beam(l, 20, 185, '160,190,255', 0.32, 18);
  beam(l, 85, 175, '120,220,255', 0.26, 22);
}
l = layerFor('#experience');
if (l) {
  dots(l, 0.1);
  blob(l, '#3d5afe', 40, 62, -18, 'fx-sway-b', 24, 0.14);
}
l = layerFor('#education');
if (l) {
  blob(l, '#3d5afe', 48, -10, -20, 'fx-sway-a', 20, 0.55);
  blob(l, '#0a9cff', 36, 60, 30, 'fx-sway-b', 26, 0.38);
  blob(l, '#7a3cff', 32, 30, 70, 'fx-sway-c', 30, 0.34);
}
l = layerFor('#certs');
if (l) {
  beam(l, 40, 180, '70,100,255', 0.4);
  dots(l, 0.08, 'fx-dots--soft');
}
l = layerFor('#contact');
if (l) {
  dots(l, 0.1, 'fx-dots--light');
  beam(l, 70, 180, '160,190,255', 0.36, 18);
  blob(l, '#0a9cff', 40, 62, 40, 'fx-sway-b', 22, 0.35);
}
$('.feature, .card, .cert').forEach((e) => e.classList.add('fx-glow'));

const secIO = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('fx-seen');
        secIO.unobserve(e.target);
      }
    }),
  { rootMargin: '0px 0px -10% 0px' },
);
$('.fx-sec').forEach((s) => secIO.observe(s));

/* ---------- Escena del hero: terreno de puntos (WebGL crudo) ---------- */
const hero = document.querySelector<HTMLElement>('.hero')!;
const stage = mk('fx-hero');
hero.prepend(stage);
['b1', 'b2', 'b3'].forEach((c) => mk('blob ' + c, '', stage));
let heroVisible = true;
new IntersectionObserver((es) => (heroVisible = es[0].isIntersecting)).observe(hero);

const startScene = () => {
  const cv = document.createElement('canvas');
  const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return;
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
    return s;
  };
  const scale = Math.min(devicePixelRatio || 1, 1.5);
  const small = innerWidth < 720;
  const cols = small ? 90 : 160,
    rows = small ? 60 : 84;
  const data = new Float32Array(cols * rows * 2);
  for (let j = 0, k = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      data[k++] = (i / (cols - 1)) * 2 - 1;
      data[k++] = j / (rows - 1);
    }
  const p = gl.createProgram()!;
  gl.attachShader(
    p,
    sh(
      gl.VERTEX_SHADER,
      `attribute vec2 g; uniform float t,asp,s; uniform vec2 m; varying float v,f;
      float hg(vec2 q){return sin(q.x*3.+t*.55)*.5+sin(q.y*5.-t*.45)*.4+sin((q.x+q.y)*6.+t*.7)*.22;}
      void main(){ float ax=max(asp,1.); float z=2.6+g.y*11.; float X=g.x*8.; float Y=hg(g*vec2(2.,3.))*.5-.2;
        float camY=1.5-s; vec2 sp=vec2(1.6*X/z/ax,1.6*(Y-camY)/z+.32+s*.15);
        vec2 mm=m*2.-1.; float d=distance(sp*vec2(ax,1.),mm*vec2(ax,1.));
        Y+=.7*exp(-d*d*7.)*sin(d*20.-t*3.5); sp=vec2(1.6*X/z/ax,1.6*(Y-camY)/z+.32+s*.15);
        gl_Position=vec4(sp,0.,1.); gl_PointSize=(1.2+5./z)*${scale.toFixed(2)}; v=Y; f=1.-g.y; }`,
    ),
  );
  gl.attachShader(
    p,
    sh(
      gl.FRAGMENT_SHADER,
      `precision mediump float; varying float v,f; void main(){ vec2 c=gl_PointCoord-.5; if(dot(c,c)>.25) discard;
        vec3 col=mix(vec3(.15,.25,1.),vec3(.1,.8,1.),smoothstep(-.2,.8,v)); gl_FragColor=vec4(col*(.35+.9*f),1.);}`,
    ),
  );
  gl.linkProgram(p);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(p, 'g');
  const U = (n: string) => gl.getUniformLocation(p, n);
  const uT = U('t'), uA = U('asp'), uS = U('s'), uM = U('m');
  stage.appendChild(cv);
  let w = 0, h = 0;
  const size = () => {
    const b = stage.getBoundingClientRect();
    w = Math.max(2, Math.round(b.width * scale));
    h = Math.max(2, Math.round(b.height * scale));
    cv.width = w;
    cv.height = h;
    gl.viewport(0, 0, w, h);
  };
  size();
  addEventListener('resize', size);
  const t0 = performance.now();
  let last = 0, first = true;
  const loop = (now: number) => {
    requestAnimationFrame(loop);
    if (!heroVisible || document.hidden || now - last < 33) return; // 30 fps y en pausa fuera de pantalla
    last = now;
    state.mx += (state.tx - state.mx) * 0.08;
    state.my += (state.ty - state.my) * 0.08;
    gl.useProgram(p);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1f(uT, (now - t0) / 1000);
    gl.uniform1f(uA, w / h);
    gl.uniform1f(uS, state.scroll);
    gl.uniform2f(uM, state.mx, 1 - state.my);
    gl.clearColor(0.027, 0.035, 0.08, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, cols * rows);
    if (first) {
      first = false;
      cv.classList.add('live');
    }
  };
  requestAnimationFrame(loop);
};
const canScene = !reduced && !weakDevice;
html.dataset.scene = canScene ? 'webgl' : 'css';
if (canScene) {
  const go = () => {
    try {
      startScene();
    } catch (e) {
      console.warn('WebGL no disponible; queda el degradado CSS', e);
    }
  };
  const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 1500 }) : setTimeout(go, 300));
  if (document.readyState === 'complete') idle();
  else addEventListener('load', idle, { once: true });
}

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
      state.tx = e.clientX / innerWidth;
      state.ty = e.clientY / innerHeight;
      spot.style.setProperty('--mx', e.clientX + 'px');
      spot.style.setProperty('--my', e.clientY + 'px');
      spot.classList.add('on');
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => spot.classList.remove('on'));
  $('.shotwrap, .card, .cert').forEach((el) => {
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

/* ---------- Scroll: progreso de la escena y parallax por capas ---------- */
const par = () => {
  $('[data-depth]').forEach((el) => {
    const sec = el.parentElement!.parentElement!.getBoundingClientRect();
    if (sec.bottom < -200 || sec.top > innerHeight + 200) return;
    const off = sec.top + sec.height / 2 - innerHeight / 2;
    el.style.translate = `0 ${(-off * Number(el.dataset.depth)).toFixed(1)}px`;
  });
};
let tick = false;
addEventListener(
  'scroll',
  () => {
    state.scroll = Math.min(1, scrollY / innerHeight);
    if (!tick && !reduced) {
      tick = true;
      requestAnimationFrame(() => {
        par();
        tick = false;
      });
    }
  },
  { passive: true },
);
if (!reduced) par();
