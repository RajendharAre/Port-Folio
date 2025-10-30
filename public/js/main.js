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