// Performance-optimized scroll animations
document.addEventListener('DOMContentLoaded', () => {
  // Remove existing animation classes and add data-aos attributes for better control
  const animatedElements = document.querySelectorAll('[class*="animate-"]');
  
  animatedElements.forEach(el => {
    // Get the animation class
    const classes = el.className.split(' ');
    const animateClass = classes.find(cls => cls.startsWith('animate-'));
    
    if (animateClass) {
      // Add data-aos attribute for better control
      el.setAttribute('data-aos', animateClass);
      // Remove the animate class initially
      el.classList.remove(animateClass);
    }
  });

  // Optimized animate on scroll with better performance
  const animateOnScroll = () => {
    // Use a more efficient approach with a single IntersectionObserver
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px' // Trigger slightly before element is in view
    };

    // Create a single observer for all elements
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Check for delay attribute
          const delay = entry.target.getAttribute('data-aos-delay');
          const aosClass = entry.target.getAttribute('data-aos');
          
          if (aosClass) {
            if (delay) {
              // Apply with delay
              setTimeout(() => {
                entry.target.classList.add(aosClass);
              }, delay);
            } else {
              // Apply immediately
              entry.target.classList.add(aosClass);
            }
          }
          // Unobserve to prevent re-triggering
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
      observer.observe(el);
    });
  };

  // Initialize all functions
  animateOnScroll();
});

// Optimized skills animation
document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('#skills');
  if (!skillsSection) return;

  const animateBars = () => {
    document.querySelectorAll('.skill-bar').forEach(bar => {
      const level = bar.getAttribute('data-level') || 0;
      bar.style.width = '0';
      // Force reflow
      void bar.offsetWidth;
      // Animate to target width
      bar.style.transition = 'width 1.5s ease-out';
      bar.style.width = level + '%';
    });
  };

  // Use IntersectionObserver for better performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBars();
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(skillsSection);
});

// Optimize scroll performance
let ticking = false;
const scrollHandler = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Any scroll-related optimizations can go here
      ticking = false;
    });
    ticking = true;
  }
};

// Add scroll event listener with throttling
window.addEventListener('scroll', scrollHandler, { passive: true });

// ─── Active Nav Highlight on Scroll ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  const activateLink = (id) => {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      }
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateLink(entry.target.id);
      }
    });
  }, {
    threshold: 0.3,           // 30% of section must be visible
    rootMargin: '-80px 0px -40% 0px'  // offset for fixed header height
  });

  sections.forEach(section => sectionObserver.observe(section));
});

// ─── Scroll Progress Bar ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
});

// ─── Back to Top Button ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleVisibility();
});

// ─── Typewriter Effect ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Full-stack developer creating digital experiences',
    'Building fast, responsive web apps',
    'React · Node.js · PostgreSQL',
    'Turning ideas into products',
    'Open to freelance & full-time roles',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  const TYPE_SPEED   = 55;   // ms per character while typing
  const DELETE_SPEED = 28;   // ms per character while deleting
  const PAUSE_AFTER  = 1800; // ms pause at end of full phrase
  const PAUSE_BEFORE = 400;  // ms pause before starting to delete

  const tick = () => {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      // Typing forward
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Reached end — pause then start deleting
        isPaused = true;
        setTimeout(() => {
          isPaused    = false;
          isDeleting  = true;
          setTimeout(tick, PAUSE_BEFORE);
        }, PAUSE_AFTER);
        return;
      }
    } else {
      // Deleting backward
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        // Done deleting — move to next phrase
        isDeleting  = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
  };

  // Small initial delay so the hero fade-in runs first
  setTimeout(tick, 600);
});