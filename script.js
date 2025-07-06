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

// Active Navigation Highlight
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  
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

// Tech Item Interactions
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach(item => {
  item.addEventListener('click', () => {
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active nav link
  const homeLink = document.querySelector('.nav-link[href="#home"]');
  if (homeLink) homeLink.classList.add('active');
  
  // Add welcome message
  setTimeout(() => {
    addNotification('👋 Welcome to my future-ready portfolio! Try the AI assistant or voice navigation.');
  }, 2000);
}); 