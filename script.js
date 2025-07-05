// Theme toggling
const themeBtn = document.querySelector('.toggle-theme');
themeBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  // Update icon
  const icon = themeBtn.querySelector('i');
  icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// Nav active link highlight
const navLinks = document.querySelectorAll('.nav-link');
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

// Animated text on load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.animated-text').forEach(el => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    }, 400);
  });
});

// Load projects and filtering
let allProjects = [];
fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    allProjects = data.projects.map(p => {
      // Add a 'type' property for filtering demo
      if (p.title.toLowerCase().includes('ai')) p.type = 'ai';
      else if (p.title.toLowerCase().includes('app')) p.type = 'mobile';
      else p.type = 'web';
      return p;
    });
    renderProjects('all');
  })
  .catch(error => {
    console.error('Error loading projects:', error);
  });
function renderProjects(filter) {
  const list = document.getElementById('projects-list');
  list.innerHTML = '';
  allProjects.filter(p => filter === 'all' || p.type === filter).forEach(p => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="project-links">
        <a href="${p.live}" target="_blank" class="btn primary">Live Demo</a>
        <a href="${p.github}" target="_blank" class="btn secondary">
          <i class="fab fa-github"></i> View Code
        </a>
      </div>
    `;
    list.appendChild(projectCard);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderProjects(this.dataset.filter);
    });
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animated skill bars
function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const level = bar.getAttribute('data-level');
    if (!bar.querySelector('.skill-bar-fill')) {
      const fill = document.createElement('div');
      fill.className = 'skill-bar-fill';
      fill.style.width = '0%';
      bar.appendChild(fill);
      const label = document.createElement('div');
      label.className = 'skill-bar-label';
      label.textContent = level + '%';
      bar.appendChild(label);
      setTimeout(() => {
        fill.style.width = level + '%';
      }, 400);
    }
  });
}
document.addEventListener('DOMContentLoaded', animateSkillBars);

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

// Testimonials carousel
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentTestimonial = 0;
function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}
if (prevBtn && nextBtn && testimonials.length) {
  prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
  });
  nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  });
  showTestimonial(currentTestimonial);
}

// Contact form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const msg = document.getElementById('form-message');
    if (!name || !email || !message) {
      msg.textContent = 'Please fill in all fields.';
      msg.style.color = '#e74c3c';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = '#e74c3c';
      return;
    }
    msg.textContent = 'Thank you! Your message has been sent.';
    msg.style.color = '#27ae60';
    this.reset();
  });
}

// Scroll to top button
const scrollBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Animation Libraries Integration ---
// 1. Animate On Scroll (AOS)
document.addEventListener('DOMContentLoaded', function() {
  if (window.AOS) AOS.init({ once: true, duration: 800, offset: 80 });
});
// Refresh AOS after filtering projects
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(() => { if (window.AOS) AOS.refresh(); }, 100);
  });
});

// 2. Swiper for Testimonials
if (window.Swiper) {
  new Swiper('.testimonials-carousel', {
    loop: true,
    navigation: {
      nextEl: '.carousel-next',
      prevEl: '.carousel-prev',
    },
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 600,
    autoHeight: true,
    grabCursor: true,
    keyboard: { enabled: true },
  });
}

// 3. GSAP Hero Animation
if (window.gsap) {
  window.addEventListener('DOMContentLoaded', () => {
    gsap.from('#hero-title', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('#hero-sub', { y: 40, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
    gsap.from('#hero-desc', { y: 40, opacity: 0, duration: 1, delay: 0.4, ease: 'power3.out' });
    gsap.from('.hero-svg-anim', { scale: 0.8, opacity: 0, duration: 1.2, delay: 0.6, ease: 'power3.out' });
  });
}
