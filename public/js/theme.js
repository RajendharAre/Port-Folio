// Theme Manager Class
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    if (this.themeToggle) {
      this.init();
    }
  }

  init() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    }

    this.themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}

// Mobile Menu Class
class MobileMenu {
  constructor() {
    this.menuButton = document.getElementById('mobileMenuButton');
    this.menu = document.getElementById('mobileMenu');
    if (this.menuButton && this.menu) {
      this.init();
    }
  }

  init() {
    this.menuButton.addEventListener('click', () => {
      this.menu.classList.toggle('hidden');
    });
  }
}

// Skill Animations
function setupSkillAnimations() {
  const animateSkillBars = () => {
    document.querySelectorAll('.skill-bar').forEach(bar => {
      const level = bar.dataset.level;
      bar.style.transition = 'none';
      bar.style.width = '0';
      void bar.offsetWidth; // Trigger reflow
      bar.style.transition = 'width 1.5s ease-out';
      bar.style.width = `${level}%`;
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const skillsSection = document.querySelector('#skills');
  if (skillsSection) observer.observe(skillsSection);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new MobileMenu();
  setupSkillAnimations();
  
  // Add keyframes dynamically
  if (!document.getElementById('fadeInUp-keyframes')) {
    const style = document.createElement('style');
    style.id = 'fadeInUp-keyframes';
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
});