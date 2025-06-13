// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    // Check for saved preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    }

    // Set up event listeners
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Watch for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        e.matches ? 
          document.documentElement.classList.add('dark') : 
          document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Add animation
    document.documentElement.classList.add('animate-fade-in');
    setTimeout(() => {
      document.documentElement.classList.remove('animate-fade-in');
    }, 500);
  }
}

// Mobile Menu
class MobileMenu {
  constructor() {
    this.menuButton = document.getElementById('mobileMenuButton');
    this.menu = document.getElementById('mobileMenu');
    this.init();
  }

  init() {
    this.menuButton.addEventListener('click', () => {
      this.menu.classList.toggle('hidden');
    });
  }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new MobileMenu();
});