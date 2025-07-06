// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// ===== MAIN INITIALIZATION =====
function initializeApp() {
  initializeTheme();
  initializeTypewriter();
  initializeSmoothScrolling();
  initializeSkillAnimations();
  initializeMobileMenu();
  initializeScrollAnimations();
  initializeContactForm();
  initializeParticles();
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add transition effect
    html.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      html.style.transition = '';
    }, 300);
  });
}

// ===== TYPEWRITER EFFECT =====
function initializeTypewriter() {
  const typewriterElement = document.querySelector('.typewriter');
  if (!typewriterElement) return;
  
  const texts = typewriterElement.getAttribute('data-text').split(',');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeWriter, typingSpeed);
  }
  
  typeWriter();
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update active nav link
        updateActiveNavLink(targetId);
      }
    });
  });
}

// ===== ACTIVE NAVIGATION =====
function updateActiveNavLink(activeId) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === activeId) {
      link.classList.add('active');
    }
  });
}

// ===== SKILL ANIMATIONS =====
function initializeSkillAnimations() {
  const skillProgressBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const level = progressBar.getAttribute('data-level');
        progressBar.style.setProperty('--progress-width', `${level}%`);
        progressBar.style.width = `${level}%`;
        observer.unobserve(progressBar);
      }
    });
  }, { threshold: 0.5 });
  
  skillProgressBars.forEach(bar => {
    observer.observe(bar);
  });
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!mobileToggle || !navMenu) return;
  
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
      if (mobileToggle.classList.contains('active')) {
        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
        if (index === 1) span.style.opacity = '0';
        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        span.style.transform = '';
        span.style.opacity = '';
      }
    });
  });
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe sections for animation
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Observe project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    observer.observe(card);
  });
  
  // Observe blog cards
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    observer.observe(card);
  });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1rem 1.5rem;
    box-shadow: var(--shadow-lg);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 400px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// ===== PARTICLE BACKGROUND =====
function initializeParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;
  
  // Create floating particles
  for (let i = 0; i < 20; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'floating-particle';
  
  const size = Math.random() * 4 + 2;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;
  
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: var(--primary-color);
    border-radius: 50%;
    opacity: 0.3;
    left: ${x}%;
    top: ${y}%;
    animation: float-particle ${duration}s ease-in-out infinite;
    animation-delay: ${delay}s;
  `;
  
  container.appendChild(particle);
}

// Add floating particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float-particle {
    0%, 100% {
      transform: translateY(0px) translateX(0px);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-20px) translateX(10px);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-10px) translateX(-10px);
      opacity: 0.4;
    }
    75% {
      transform: translateY(-30px) translateX(5px);
      opacity: 0.7;
    }
  }
  
  .section.animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .project-card.animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .blog-card.animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .nav-menu.active {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-overlay);
    backdrop-filter: blur(20px);
    border-top: 1px solid var(--border-color);
    flex-direction: column;
    padding: 1rem;
  }
  
  .nav-menu.active ul {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu.active .nav-link {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .nav-menu.active .nav-link:last-child {
    border-bottom: none;
  }
`;
document.head.appendChild(style);

// ===== SCROLL-BASED NAVIGATION HIGHLIGHTING =====
function initializeScrollHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Initialize scroll highlighting
initializeScrollHighlighting();

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
  // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===== UTILITY FUNCTIONS =====
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function getRandomColor() {
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeApp,
    initializeTheme,
    initializeTypewriter,
    initializeSmoothScrolling,
    initializeSkillAnimations,
    initializeMobileMenu,
    initializeScrollAnimations,
    initializeContactForm,
    showNotification
  };
} 