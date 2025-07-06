// Theme toggling
const themeBtn = document.querySelector('.nav__theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    // Update icon
    const icon = themeBtn.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  });
}

// Hamburger menu for mobile nav
const hamburger = document.querySelector('.nav__hamburger');
const mobileNav = document.querySelector('.nav__mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.getAttribute('aria-hidden') === 'false';
    mobileNav.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    hamburger.classList.toggle('open', !isOpen);
  });
  document.querySelectorAll('.nav__mobile .nav__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.setAttribute('aria-hidden', 'true');
      hamburger.classList.remove('open');
    });
  });
}

// Nav active link highlight
const navLinks = document.querySelectorAll('.nav__link');
function setActiveNav() {
  let fromTop = window.scrollY + 80;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveNav);
document.addEventListener('DOMContentLoaded', setActiveNav);

// Smooth scroll for navigation links
navLinks.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Scroll progress bar
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min(100, (scrollTop / docHeight) * 100);
  if (scrollProgress) scrollProgress.style.width = progress + '%';
});

// Section fade-in on scroll
function revealSections() {
  document.querySelectorAll('.fade-section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSections);
document.addEventListener('DOMContentLoaded', revealSections);

// Scroll to top button
const scrollBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Contact form validation
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const msg = document.getElementById('form-message');
    if (!name || !email || !message) {
      msg.textContent = 'Please fill in all fields.';
      msg.style.color = '#ff4ecd';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = '#ff4ecd';
      return;
    }
    msg.textContent = 'Thank you! Your message has been sent.';
    msg.style.color = '#00f2fe';
    this.reset();
  });
}

// Placeholder for parallax and animated skills/tags (to be implemented)
