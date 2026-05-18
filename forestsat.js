/* ForestSat — Shared Navigation & Utilities */

// ── NAV SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.fs-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── MOBILE MENU ──
function toggleMobileNav() {
  const menu = document.getElementById('mobileNav');
  if (menu) menu.classList.toggle('open');
}
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileNav');
  const ham = document.querySelector('.nav-hamburger');
  if (menu && menu.classList.contains('open') &&
      !menu.contains(e.target) && ham && !ham.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ── ACTIVE NAV LINK ──
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html') ||
        (path.startsWith('product') && href === 'products.html') ||
        (path.startsWith('client') && href === 'clients.html') ||
        (path.startsWith('resource') && href === 'resources.html') ||
        (path.startsWith('about') && href === 'about.html') ||
        (path.startsWith('contact') && href === 'contact.html')) {
      a.classList.add('active');
    }
  });
})();

// ── ACCORDION ──
document.querySelectorAll('.accordion-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = body && body.classList.contains('open');
    // Close all
    document.querySelectorAll('.accordion-body.open').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.accordion-header.open').forEach(b => b.classList.remove('open'));
    // Open clicked if it was closed
    if (!isOpen && body) {
      body.classList.add('open');
      btn.classList.add('open');
    }
  });
});

// ── BACK TO TOP ──
const bttBtn = document.createElement('button');
bttBtn.id = 'btt';
bttBtn.innerHTML = '↑';
bttBtn.setAttribute('aria-label', 'Back to top');
bttBtn.style.cssText = `
  position:fixed;bottom:32px;right:32px;z-index:900;
  width:44px;height:44px;border-radius:50%;
  background:var(--green);color:white;border:none;cursor:pointer;
  font-size:18px;display:none;align-items:center;justify-content:center;
  box-shadow:0 4px 16px rgba(27,158,90,0.4);transition:all 0.2s;
`;
document.body.appendChild(bttBtn);
bttBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
window.addEventListener('scroll', () => {
  bttBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
});

// ── ANIMATE ON SCROLL ──
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.animate-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    io.observe(el);
  });
}

// ── CONTACT FORM HANDLING ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ Message Sent — We\'ll be in touch shortly';
    btn.style.background = 'var(--teal)';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; contactForm.reset(); }, 4000);
  });
}
