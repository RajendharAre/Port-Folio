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
      const isHidden = this.menu.classList.toggle('hidden');
      this.menuButton.setAttribute('aria-expanded', String(!isHidden));
    });
  }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new MobileMenu();
});