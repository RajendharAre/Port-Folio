// Document ready function
document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  };

  // Initialize all functions
  animateOnScroll();
});

// Skills animation
document.addEventListener('DOMContentLoaded', () => {
  const animateBars = () => {
    document.querySelectorAll('.skill-bar').forEach(bar => {
      bar.style.width = bar.getAttribute('data-level') + '%';
    });
  };

  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateBars();
    });
  }).observe(document.querySelector('#skills'));
});