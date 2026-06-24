/* ============================================
   SC SALMON INJECTION - LP JavaScript v3
============================================ */

history.scrollRestoration = 'manual';
window.addEventListener('load', () => {
  const saved = sessionStorage.getItem('scrollY');
  if (saved) window.scrollTo(0, parseInt(saved));
});
window.addEventListener('scroll', () => {
  sessionStorage.setItem('scrollY', window.scrollY);
}, { passive: true });

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll Reveal Animation ---------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0, 10);
        setTimeout(() => el.classList.add('is-visible'), delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Text Reveal: Wrap text into <span> on enter ---------- */
  const textReveals = document.querySelectorAll('.text-reveal');
  textReveals.forEach(el => {
    const text = el.textContent;
    el.innerHTML = `<span>${text}</span>`;
  });
  const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const all = document.querySelectorAll('.text-reveal');
        const idx = Array.from(all).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('is-visible'), idx * 150);
        textRevealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  textReveals.forEach(el => textRevealObserver.observe(el));

  /* ---------- FV: Trigger on load ---------- */
  const fvReveals = document.querySelectorAll('.fv .reveal');
  fvReveals.forEach(el => {
    const delay = parseInt(el.dataset.delay || 0, 10);
    setTimeout(() => el.classList.add('is-visible'), delay + 200);
  });

  /* ---------- FAQ Accordion ---------- */
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq__q');
    if (!q) return;
    q.addEventListener('click', () => item.classList.toggle('is-open'));
  });

  /* ---------- Empathy Accordion ---------- */
  const empathyItems = document.querySelectorAll('.empathy__acc-item');
  empathyItems.forEach(item => {
    const q = item.querySelector('.empathy__acc-q');
    if (!q) return;
    q.addEventListener('click', () => {
      // 他を閉じて、クリックしたものだけトグル（一般的なFAQスタイル）
      const isOpen = item.classList.contains('is-open');
      empathyItems.forEach(other => other.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });

  /* ---------- Scroll handlers throttled with requestAnimationFrame ---------- */
  const header = document.querySelector('.header');
  const auroraEls = document.querySelectorAll('.aurora');
  let scrollTicking = false;
  let lastHeaderState = null;

  function onScroll() {
    const scrollY = window.pageYOffset;

    // Header style toggle (only when state changes)
    const newState = scrollY > 80 ? 'scrolled' : 'top';
    if (newState !== lastHeaderState) {
      if (newState === 'scrolled') {
        header.style.background = 'rgba(255, 249, 248, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(248, 121, 104, 0.08)';
      } else {
        header.style.background = 'rgba(255, 249, 248, 0.7)';
        header.style.boxShadow = 'none';
      }
      lastHeaderState = newState;
    }

    // Aurora parallax (only first 2 viewports to save CPU)
    if (scrollY < window.innerHeight * 2) {
      auroraEls.forEach((el, i) => {
        const speed = 0.05 + (i % 3) * 0.03;
        el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });
    }

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(onScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  /* ---------- Smooth Scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length <= 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* (Aurora parallax merged into onScroll above for perf) */

  /* ---------- Dynamic Particles (reduced for perf) ---------- */
  const fvParticles = document.querySelector('.fv__particles');
  if (fvParticles && window.innerWidth > 768) {
    for (let i = 0; i < 4; i++) {
      const particle = document.createElement('span');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = -Math.random() * 12 + 's';
      particle.style.animationDuration = (10 + Math.random() * 8) + 's';
      const size = 2 + Math.random() * 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      fvParticles.appendChild(particle);
    }
  }

  /* ---------- Sticky CTA Show/Hide ---------- */
  const stickyCTA = document.getElementById('stickyCTA');
  const fv = document.querySelector('.fv');
  const ctaMid = document.querySelector('.cta-mid');
  const ctaFinal = document.querySelector('.cta-final');
  if (stickyCTA && fv) {
    const updateStickyCTA = () => {
      const inFV = fv.getBoundingClientRect().bottom > 0 && fv.getBoundingClientRect().top < window.innerHeight;
      const inCtaMid = ctaMid && ctaMid.getBoundingClientRect().bottom > 0 && ctaMid.getBoundingClientRect().top < window.innerHeight;
      const inCtaFinal = ctaFinal && ctaFinal.getBoundingClientRect().bottom > 0 && ctaFinal.getBoundingClientRect().top < window.innerHeight;
      if (inFV || inCtaMid || inCtaFinal) {
        stickyCTA.classList.remove('is-visible');
      } else if (fv.getBoundingClientRect().bottom <= 0) {
        stickyCTA.classList.add('is-visible');
      }
    };
    window.addEventListener('scroll', updateStickyCTA, { passive: true });
    updateStickyCTA();
  }

  /* ---------- Magnetic Buttons ---------- */
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ---------- Number Count-up ---------- */
  const countEls = document.querySelectorAll('.count-up');
  const countUp = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    const formatter = new Intl.NumberFormat('en-US');
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = formatter.format(current);
      if (progress < 1) requestAnimationFrame(animate);
      else el.textContent = formatter.format(target);
    };
    requestAnimationFrame(animate);
  };
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => countObserver.observe(el));

  /* ---------- Hamburger / Drawer ---------- */
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer__link, .drawer__cta');

  function openDrawer() {
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-active');
    document.body.classList.add('drawer-open');
  }

  function closeDrawer() {
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-active');
    document.body.classList.remove('drawer-open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('is-active') ? closeDrawer() : openDrawer();
    });
  }
  if (overlay) overlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

});
