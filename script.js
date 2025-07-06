// ===== FUTURISTIC PORTFOLIO SCRIPT =====

// Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
// Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});



// AI Assistant
const aiToggle = document.getElementById('ai-toggle');
const aiPanel = document.getElementById('ai-panel');
const aiClose = document.getElementById('ai-close');
const aiInput = document.getElementById('ai-input');
const aiSend = document.getElementById('ai-send');
const aiSuggestions = document.querySelectorAll('.ai-suggestion');

let aiActive = false;

aiToggle.addEventListener('click', () => {
  aiActive = !aiActive;
  aiPanel.classList.toggle('active', aiActive);
  
  if (aiActive) {
    aiToggle.querySelector('.ai-status').textContent = 'AI Active';
    aiToggle.style.background = 'var(--gradient-secondary)';
  } else {
    aiToggle.querySelector('.ai-status').textContent = 'AI Ready';
    aiToggle.style.background = 'var(--gradient-primary)';
  }
});

aiClose.addEventListener('click', () => {
  aiActive = false;
  aiPanel.classList.remove('active');
  aiToggle.querySelector('.ai-status').textContent = 'AI Ready';
  aiToggle.style.background = 'var(--gradient-primary)';
});

// AI Suggestions
aiSuggestions.forEach(suggestion => {
  suggestion.addEventListener('click', () => {
    const action = suggestion.dataset.action;
    handleAIAction(action);
  });
});

// AI Input Handler
aiSend.addEventListener('click', handleAIInput);
aiInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleAIInput();
  }
});

function handleAIInput() {
  const input = aiInput.value.trim();
  if (input) {
    processAIQuery(input);
    aiInput.value = '';
  }
}

function handleAIAction(action) {
  switch (action) {
    case 'navigate-projects':
      smoothScrollTo('#projects');
      addAIMessage('Taking you to my future projects! 🚀');
      break;
    case 'navigate-skills':
      smoothScrollTo('#skills');
      addAIMessage('Showing you my cutting-edge skills! ⚡');
      break;
    case 'contact':
      smoothScrollTo('#contact');
      addAIMessage('Let\'s connect and build the future together! 🤝');
      break;
  }
}

function processAIQuery(query) {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
    smoothScrollTo('#projects');
    addAIMessage('I\'ve found some amazing projects to show you! Check out my quantum AI and metaverse work.');
  } else if (lowerQuery.includes('skill') || lowerQuery.includes('technology')) {
    smoothScrollTo('#skills');
    addAIMessage('My expertise spans AI, quantum computing, blockchain, and emerging technologies!');
  } else if (lowerQuery.includes('contact') || lowerQuery.includes('hire') || lowerQuery.includes('work together')) {
    smoothScrollTo('#contact');
    addAIMessage('Great! Let\'s discuss how we can collaborate on future projects.');
  } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
    addAIMessage('Hello! I\'m your AI guide. I can help you navigate this portfolio or answer questions about my work.');
  } else {
    addAIMessage('That\'s an interesting question! I can help you explore my projects, skills, or get in touch. What would you like to know?');
  }
}

function addAIMessage(message) {
  const aiContent = document.querySelector('.ai-content');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'ai-message';
  messageDiv.innerHTML = `
    <i class="fas fa-robot"></i>
    <p>${message}</p>
  `;
  
  // Insert before the suggestions
  const suggestions = aiContent.querySelector('.ai-suggestions');
  aiContent.insertBefore(messageDiv, suggestions);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Voice Navigation
const voiceToggle = document.getElementById('voice-toggle');
const voiceIndicator = document.getElementById('voice-indicator');
let voiceActive = false;
let recognition = null;

// Check if browser supports speech recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  recognition.onstart = () => {
    voiceActive = true;
    voiceIndicator.classList.add('active');
    voiceToggle.querySelector('.voice-status').textContent = 'Listening...';
    voiceToggle.style.background = 'var(--gradient-accent)';
  };
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    processVoiceCommand(transcript);
  };
  
  recognition.onend = () => {
    voiceActive = false;
    voiceIndicator.classList.remove('active');
    voiceToggle.querySelector('.voice-status').textContent = 'Voice';
    voiceToggle.style.background = 'var(--gradient-secondary)';
  };
  
  recognition.onerror = (event) => {
    console.log('Voice recognition error:', event.error);
    voiceActive = false;
    voiceIndicator.classList.remove('active');
    voiceToggle.querySelector('.voice-status').textContent = 'Voice';
    voiceToggle.style.background = 'var(--gradient-secondary)';
  };
}

voiceToggle.addEventListener('click', () => {
  if (recognition) {
    if (voiceActive) {
      recognition.stop();
    } else {
      recognition.start();
    }
  } else {
    addNotification('Voice navigation is not supported in this browser.');
  }
});

function processVoiceCommand(command) {
  if (command.includes('home') || command.includes('start')) {
    smoothScrollTo('#home');
    addNotification('Navigating to home');
  } else if (command.includes('about')) {
    smoothScrollTo('#about');
    addNotification('Navigating to about section');
  } else if (command.includes('project')) {
    smoothScrollTo('#projects');
    addNotification('Navigating to projects');
  } else if (command.includes('skill')) {
    smoothScrollTo('#skills');
    addNotification('Navigating to skills');
  } else if (command.includes('contact')) {
    smoothScrollTo('#contact');
    addNotification('Navigating to contact');
  } else if (command.includes('light') || command.includes('bright')) {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    addNotification('Switched to light theme');
  } else if (command.includes('dark')) {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    addNotification('Switched to dark theme');
  } else {
    addNotification('Voice command not recognized. Try saying "home", "projects", or "contact"');
  }
}

// Smooth Scrolling
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    smoothScrollTo(target);
    
    // Update active state
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Enhanced Navigation Scroll Effects
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  
  // Add scrolled class to navbar
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Active Navigation Highlight
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
});

// Typewriter Effect
  const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
  const texts = typewriterElement.dataset.text.split(',');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => {
      isDeleting = true;
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
  }
  
  typeWriter();
}

// Skill Progress Animation
const skillBars = document.querySelectorAll('.skill-progress');
  const observerOptions = {
  threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };
  
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
      const skillBar = entry.target;
      const level = skillBar.dataset.level;
      skillBar.style.width = `${level}%`;
      skillObserver.unobserve(skillBar);
      }
    });
  }, observerOptions);
  
skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Demo Experience Button
const demoButton = document.getElementById('experience-demo');
if (demoButton) {
  demoButton.addEventListener('click', () => {
    addNotification('🚀 Demo experience launching soon! This will showcase my AI and VR projects.');
    
    // Simulate loading effect
    demoButton.innerHTML = '<span>Loading...</span><i class="fas fa-spinner fa-spin"></i>';
    demoButton.disabled = true;
    
    setTimeout(() => {
      demoButton.innerHTML = '<span>Try Demo</span><i class="fas fa-vr-cardboard"></i>';
      demoButton.disabled = false;
    }, 3000);
  });
}

// Notification System
function addNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-info-circle"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
    z-index: 1003;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 4000);
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    }
  });
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNotification('📧 Message sent! I\'ll get back to you soon.');
    contactForm.reset();
  });
}

// Intersection Observer for Animations
const sectionObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, sectionObserverOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  sectionObserver.observe(section);
});

// Hero Card Flip Animation
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
  heroCard.addEventListener('click', () => {
    // Prevent multiple clicks during animation
    if (heroCard.classList.contains('flipping')) return;
    
    // Add flip animation class
    heroCard.classList.add('flipping');
    
    // Show notification during flip
    setTimeout(() => {
      addNotification('🎯 Interactive Tech Showcase - Each technology represents my expertise areas!');
    }, 400);
    
    // Remove flip class after animation completes
    setTimeout(() => {
      heroCard.classList.remove('flipping');
    }, 800);
  });
}

// Tech Item Interactions
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering hero card flip
    const tech = item.dataset.tech;
    addNotification(`🚀 ${tech} - This is one of my core specialties! Check out my projects to see it in action.`);
    
    // Add click animation
    item.style.transform = 'translateY(-8px) scale(1.1)';
    setTimeout(() => {
      item.style.transform = '';
    }, 200);
  });
  
  // Add mouse enter effect for particles
  item.addEventListener('mouseenter', () => {
    const particles = item.querySelectorAll('.tech-particles span');
    particles.forEach((particle, index) => {
      particle.style.animationDuration = '1s';
      particle.style.animationDelay = `${index * 0.2}s`;
    });
  });
  
  item.addEventListener('mouseleave', () => {
    const particles = item.querySelectorAll('.tech-particles span');
    particles.forEach(particle => {
      particle.style.animationDuration = '3s';
      particle.style.animationDelay = '';
    });
  });
});

// About Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const finalValue = parseInt(target.dataset.target);
      animateCounter(target, 0, finalValue, 2000);
      statsObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current + '+';
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Skills Progress Animation
const skillItems = document.querySelectorAll('.skill-item');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillItem = entry.target;
      const progressBar = skillItem.querySelector('.skill-progress');
      const level = progressBar.dataset.level;
      
      setTimeout(() => {
        progressBar.style.width = level + '%';
      }, 500);
      
      skillsObserver.unobserve(skillItem);
    }
  });
}, { threshold: 0.3 });

skillItems.forEach(item => skillsObserver.observe(item));

// Project Cards Interactions
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const project = card.dataset.project;
    addNotification(`🔮 ${project} - This project showcases cutting-edge technology!`);
  });
  
  // Add hover effects for project particles
  card.addEventListener('mouseenter', () => {
    const particles = card.querySelectorAll('.project-particles span');
    particles.forEach((particle, index) => {
      particle.style.animationDuration = '1.5s';
      particle.style.animationDelay = `${index * 0.3}s`;
    });
  });
  
  card.addEventListener('mouseleave', () => {
    const particles = card.querySelectorAll('.project-particles span');
    particles.forEach(particle => {
      particle.style.animationDuration = '4s';
      particle.style.animationDelay = '';
    });
  });
});

// Blog Cards Interactions
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    addNotification(`📚 ${category} - Check out my latest insights on this topic!`);
  });
  
  // Add hover effects for blog particles
  card.addEventListener('mouseenter', () => {
    const particles = card.querySelectorAll('.blog-particles span');
    particles.forEach((particle, index) => {
      particle.style.animationDuration = '2s';
      particle.style.animationDelay = `${index * 0.4}s`;
    });
  });
  
  card.addEventListener('mouseleave', () => {
    const particles = card.querySelectorAll('.blog-particles span');
    particles.forEach(particle => {
      particle.style.animationDuration = '3s';
      particle.style.animationDelay = '';
    });
  });
});

// Contact Items Interactions
const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
  item.addEventListener('click', () => {
    const contactType = item.dataset.contact;
    addNotification(`📞 ${contactType} - Let's connect and build the future together!`);
  });
  
  // Add hover effects for contact particles
  item.addEventListener('mouseenter', () => {
    const particles = item.querySelectorAll('.contact-particles span');
    particles.forEach((particle, index) => {
      particle.style.animationDuration = '1.5s';
      particle.style.animationDelay = `${index * 0.2}s`;
    });
  });
  
  item.addEventListener('mouseleave', () => {
    const particles = item.querySelectorAll('.contact-particles span');
    particles.forEach(particle => {
      particle.style.animationDuration = '3s';
      particle.style.animationDelay = '';
    });
  });
});

// Social Links Interactions
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const platform = link.dataset.platform;
    addNotification(`🔗 ${platform} - Connect with me on ${platform}!`);
  });
  
  // Add hover effects for social glow
  link.addEventListener('mouseenter', () => {
    const glow = link.querySelector('.social-glow');
    glow.style.opacity = '1';
    glow.style.transform = 'scale(1.2)';
  });
  
  link.addEventListener('mouseleave', () => {
    const glow = link.querySelector('.social-glow');
    glow.style.opacity = '0';
    glow.style.transform = 'scale(1)';
  });
});

// Form Input Enhancements
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    const glow = input.parentElement.querySelector('.input-glow');
    glow.style.opacity = '1';
    glow.style.transform = 'scale(1.05)';
  });
  
  input.addEventListener('blur', () => {
    const glow = input.parentElement.querySelector('.input-glow');
    glow.style.opacity = '0';
    glow.style.transform = 'scale(1)';
  });
});

// Quantum Particles Interaction System
class QuantumParticleSystem {
  constructor() {
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.isMouseMoving = false;
    this.mouseTimeout = null;
    this.init();
  }

  init() {
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  createParticles() {
    // Create interactive particle elements
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'quantum-particle';
      particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: ${this.getRandomParticleColor()};
        border-radius: 50%;
        pointer-events: none;
        z-index: -2;
        opacity: ${Math.random() * 0.6 + 0.2};
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        transition: all 0.3s ease;
        box-shadow: 0 0 10px currentColor;
      `;
      
      this.particles.push({
        element: particle,
        x: parseFloat(particle.style.left),
        y: parseFloat(particle.style.top),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: parseFloat(particle.style.width),
        originalSize: parseFloat(particle.style.width),
        color: particle.style.background,
        attraction: Math.random() * 0.3 + 0.1
      });
      
      document.body.appendChild(particle);
    }
  }

  getRandomParticleColor() {
    const colors = [
      `rgba(var(--primary-color-rgb), ${Math.random() * 0.8 + 0.2})`,
      `rgba(var(--secondary-color-rgb), ${Math.random() * 0.8 + 0.2})`,
      `rgba(var(--accent-color-rgb), ${Math.random() * 0.8 + 0.2})`
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  bindEvents() {
    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.isMouseMoving = true;
      
      // Update CSS custom properties for cursor effect
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
      document.body.classList.add('mouse-moving');
      
      // Clear previous timeout
      if (this.mouseTimeout) {
        clearTimeout(this.mouseTimeout);
      }
      
      // Set timeout to stop mouse tracking after 2 seconds of no movement
      this.mouseTimeout = setTimeout(() => {
        this.isMouseMoving = false;
        document.body.classList.remove('mouse-moving');
      }, 2000);
    });

    // Touch events for mobile
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      this.mouse.x = touch.clientX;
      this.mouse.y = touch.clientY;
      this.isMouseMoving = true;
      
      // Update CSS custom properties for cursor effect
      document.documentElement.style.setProperty('--mouse-x', touch.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', touch.clientY + 'px');
      document.body.classList.add('mouse-moving');
      
      if (this.mouseTimeout) {
        clearTimeout(this.mouseTimeout);
      }
      
      this.mouseTimeout = setTimeout(() => {
        this.isMouseMoving = false;
        document.body.classList.remove('mouse-moving');
      }, 2000);
    });

    // Click effect - create particle burst
    document.addEventListener('click', (e) => {
      this.createParticleBurst(e.clientX, e.clientY);
    });

    // Touch click effect
    document.addEventListener('touchend', (e) => {
      const touch = e.changedTouches[0];
      this.createParticleBurst(touch.clientX, touch.clientY);
    });

    // Window resize handling
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  handleResize() {
    this.particles.forEach(particle => {
      if (particle.x > window.innerWidth) {
        particle.x = window.innerWidth - 10;
      }
      if (particle.y > window.innerHeight) {
        particle.y = window.innerHeight - 10;
      }
    });
  }

  createParticleBurst(x, y) {
    // Create temporary burst particles
    for (let i = 0; i < 8; i++) {
      const burstParticle = document.createElement('div');
      const angle = (i / 8) * Math.PI * 2;
      const velocity = 3 + Math.random() * 2;
      
      burstParticle.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        background: ${this.getRandomParticleColor()};
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${x}px;
        top: ${y}px;
        opacity: 1;
        box-shadow: 0 0 10px currentColor;
        transition: all 0.5s ease;
      `;
      
      document.body.appendChild(burstParticle);
      
      // Animate burst
      setTimeout(() => {
        const finalX = x + Math.cos(angle) * velocity * 50;
        const finalY = y + Math.sin(angle) * velocity * 50;
        
        burstParticle.style.left = finalX + 'px';
        burstParticle.style.top = finalY + 'px';
        burstParticle.style.opacity = '0';
        burstParticle.style.transform = 'scale(0)';
      }, 10);
      
      // Remove burst particle after animation
      setTimeout(() => {
        if (burstParticle.parentNode) {
          burstParticle.remove();
        }
      }, 500);
    }
  }

  animate() {
    this.particles.forEach(particle => {
      // Calculate distance from mouse
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Mouse attraction effect
      if (this.isMouseMoving && distance < 150) {
        const force = (150 - distance) / 150 * particle.attraction;
        particle.vx += (dx / distance) * force * 0.1;
        particle.vy += (dy / distance) * force * 0.1;
        
        // Scale up particles near mouse
        const scale = 1 + (150 - distance) / 150 * 2;
        particle.size = particle.originalSize * scale;
        particle.element.style.transform = `scale(${scale})`;
        particle.element.style.opacity = Math.min(1, 0.6 + (150 - distance) / 150 * 0.4);
      } else {
        // Return to normal size
        particle.size = particle.originalSize;
        particle.element.style.transform = 'scale(1)';
        particle.element.style.opacity = 0.6;
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Add some randomness
      particle.vx += (Math.random() - 0.5) * 0.02;
      particle.vy += (Math.random() - 0.5) * 0.02;
      
      // Dampen velocity
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Boundary checking
      if (particle.x < 0 || particle.x > window.innerWidth) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
      }
      if (particle.y < 0 || particle.y > window.innerHeight) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
      }
      
      // Update element position
      particle.element.style.left = particle.x + 'px';
      particle.element.style.top = particle.y + 'px';
      particle.element.style.width = particle.size + 'px';
      particle.element.style.height = particle.size + 'px';
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active nav link
  const homeLink = document.querySelector('.nav-link[href="#home"]');
  if (homeLink) homeLink.classList.add('active');
  
  // Initialize quantum particle system
  new QuantumParticleSystem();
  
  // Add welcome message
  setTimeout(() => {
    addNotification('👋 Welcome to my future-ready portfolio! Try the AI assistant or voice navigation.');
  }, 2000);
}); 