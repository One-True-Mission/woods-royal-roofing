/* ============================================================
   WOODS ROYAL ROOFING LLC & FENCING - script.js
   Built by OTM Web Design
   ============================================================ */

/* ---------- Active nav state ---------- */
(function () {
  var page = document.body.getAttribute('data-page');
  if (!page) return;
  document.querySelectorAll('[data-nav]').forEach(function (link) {
    if (link.getAttribute('data-nav') === page) link.classList.add('is-active');
  });
})();

/* ---------- Mobile hamburger menu ---------- */
(function () {
  var hamburger = document.querySelector('.hamburger');
  var menu = document.querySelector('.mobile-menu');
  var backdrop = document.querySelector('.nav-backdrop');
  if (!hamburger || !menu || !backdrop) return;

  function open() {
    hamburger.classList.add('is-open');
    menu.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.classList.add('nav-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function close() {
    hamburger.classList.remove('is-open');
    menu.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  function toggle() { if (menu.classList.contains('is-open')) close(); else open(); }

  hamburger.addEventListener('click', toggle);
  backdrop.addEventListener('click', close);
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 900) close(); });
})();

/* ---------- Smooth scroll for in-page anchors ---------- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ---------- Formspree _next rewrite ---------- */
(function () {
  var nextField = document.querySelector('input[name="_next"]');
  if (nextField) {
    nextField.value = new URL('thank-you.html', window.location.href).href;
  }
})();

/* ---------- Gallery carousel (peek / featured pattern) ---------- */
(function () {
  var box = document.querySelector('[data-gallery]');
  if (!box) return;
  var scope = box.closest('.container') || box.parentNode;
  var slides = Array.prototype.slice.call(box.querySelectorAll('.car-slide'));
  var dots = Array.prototype.slice.call(scope.querySelectorAll('.car-dot'));
  var prev = scope.querySelector('[data-car-prev]');
  var next = scope.querySelector('[data-car-next]');
  var total = slides.length;
  if (total < 2) return;
  var current = 0, timer = null;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render() {
    var half = Math.floor(total / 2);
    slides.forEach(function (slide, idx) {
      var rel = (idx - current + total) % total;
      slide.classList.remove('is-far-left', 'is-prev', 'is-active', 'is-next', 'is-far-right');
      if (rel === 0) slide.classList.add('is-active');
      else if (rel === 1) slide.classList.add('is-next');
      else if (rel === total - 1) slide.classList.add('is-prev');
      else if (rel <= half) slide.classList.add('is-far-right');
      else slide.classList.add('is-far-left');
    });
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === current); });
  }
  function go(n) { current = (n + total) % total; render(); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function start() { if (reduce) return; stop(); timer = setInterval(function () { go(current + 1); }, 2000); }

  if (prev) prev.addEventListener('click', function () { go(current - 1); start(); });
  if (next) next.addEventListener('click', function () { go(current + 1); start(); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); start(); }); });
  slides.forEach(function (slide, i) {
    slide.addEventListener('click', function () {
      if (slide.classList.contains('is-prev') || slide.classList.contains('is-next')) { go(i); start(); }
    });
  });
  box.addEventListener('mouseenter', stop);
  box.addEventListener('mouseleave', start);
  box.addEventListener('touchstart', stop, { passive: true });
  box.addEventListener('touchend', start);

  render();
  start();
})();

/* ---------- Light client-side form guard ---------- */
(function () {
  var form = document.querySelector('form[data-form]');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      if (!field.value.trim()) { ok = false; field.style.borderColor = '#c8811a'; }
      else { field.style.borderColor = ''; }
    });
    if (!ok) { e.preventDefault(); }
  });
})();
