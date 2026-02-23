// ── Theme ──────────────────────────────────────────────────────────────────
const lightBtn = document.getElementById('theme-toggle-light');
const darkBtn  = document.getElementById('theme-toggle-dark');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  lightBtn && lightBtn.classList.toggle('active', theme === 'light');
  darkBtn  && darkBtn.classList.toggle('active',  theme === 'dark');
}

lightBtn && lightBtn.addEventListener('click', () => setTheme('light'));
darkBtn  && darkBtn.addEventListener('click',  () => setTheme('dark'));
setTheme(localStorage.getItem('theme') || 'dark');

// ── Reading progress bar ───────────────────────────────────────────────────
const progressBar = document.getElementById('reading-progress');
window.addEventListener('scroll', () => {
  const scrollTop    = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.width = `${(scrollTop / scrollHeight) * 100}%`;
}, { passive: true });

// ── Back to top ────────────────────────────────────────────────────────────
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backBtn && backBtn.classList.toggle('visible', window.pageYOffset > 300);
}, { passive: true });
backBtn && backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Auto-hide navbar on scroll down, show on scroll up ────────────────────
let lastScrollY = window.scrollY;
let ticking     = false;
const siteNav   = document.getElementById('site-nav');

siteNav && siteNav.addEventListener('animationend', () => {
  siteNav.style.animation = 'none';
}, { once: true });

function updateNav() {
  const curr = window.scrollY;
  if (curr > 80) {
    if (curr - lastScrollY > 5)      siteNav && siteNav.classList.add('nav-hidden');
    else if (lastScrollY - curr > 5) siteNav && siteNav.classList.remove('nav-hidden');
  } else {
    siteNav && siteNav.classList.remove('nav-hidden');
  }
  lastScrollY = curr;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
}, { passive: true });

// ── Active nav link highlighting on scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#site-nav .nav-link[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(
        `#site-nav .nav-link[href="#${entry.target.id}"]`
      );
      active && active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Smooth scroll for nav links ────────────────────────────────────────────
document.querySelectorAll('#site-nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target && target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Scroll-reveal (fade-in / slide-up) ────────────────────────────────────
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in, .slide-up').forEach(el => revealObserver.observe(el));
}

// ── Name character stagger animation ──────────────────────────────────────
document.querySelectorAll('.name-char').forEach((ch, i) => {
  ch.style.animationDelay = `${i * 0.06}s`;
});

// ── Contact form (demo — swap body for a real API call) ───────────────────
const form         = document.getElementById('contactForm');
const notification = document.getElementById('notification');

form && form.addEventListener('submit', e => {
  e.preventDefault();
  notification.textContent = "✓ Message sent! I'll get back to you soon.";
  notification.className   = 'success';
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
    form.reset();
  }, 4000);
});

// ── Console easter egg ─────────────────────────────────────────────────────
console.log(
  '%c> xyz.init()',
  'color:#fff;font-family:monospace;font-size:14px;font-weight:bold;'
);
console.log(
  '%cComputer Engineering Student. Building AI systems, GUI apps, and more.',
  'color:#888;font-family:monospace;font-size:11px;'
);