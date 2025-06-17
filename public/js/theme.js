// // Theme Management
// class ThemeManager {
//   constructor() {
//     this.themeToggle = document.getElementById('themeToggle');
//     this.init();
//   }

//   init() {
//     // Check for saved preference or use system preference
//     const savedTheme = localStorage.getItem('theme');
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
//       document.documentElement.classList.add('dark');
//     }

//     // Set up event listeners
//     this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
//     // Watch for system changes
//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
//       if (!localStorage.getItem('theme')) {
//         e.matches ? 
//           document.documentElement.classList.add('dark') : 
//           document.documentElement.classList.remove('dark');
//       }
//     });
//   }

//   toggleTheme() {
//     const isDark = document.documentElement.classList.toggle('dark');
//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
//     // Add animation
//     document.documentElement.classList.add('animate-fade-in');
//     setTimeout(() => {
//       document.documentElement.classList.remove('animate-fade-in');
//     }, 500);
//   }
// }

// // Mobile Menu
// class MobileMenu {
//   constructor() {
//     this.menuButton = document.getElementById('mobileMenuButton');
//     this.menu = document.getElementById('mobileMenu');
//     this.init();
//   }

//   init() {
//     this.menuButton.addEventListener('click', () => {
//       this.menu.classList.toggle('hidden');
//     });
//   }
// }

// // Initialize when DOM loads
// document.addEventListener('DOMContentLoaded', () => {
//   new ThemeManager();
//   new MobileMenu();
// });

// Enhanced Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.lightIcon = document.querySelector('.light-icon'); // Add these classes to your icons
    this.darkIcon = document.querySelector('.dark-icon');
    this.init();
  }

  init() {
    // 1. Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 2. Apply initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      this.enableDarkMode();
    } else {
      this.enableLightMode();
    }

    // 3. Set up event listeners
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // 4. Watch for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        e.matches ? this.enableDarkMode() : this.enableLightMode();
      }
    });
  }

  enableDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    this.updateIcons(true);
  }

  enableLightMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    this.updateIcons(false);
  }

  toggleTheme() {
    document.documentElement.classList.contains('dark') 
      ? this.enableLightMode() 
      : this.enableDarkMode();
    
    // Smooth transition effect
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
  }

  updateIcons(isDark) {
    if (this.lightIcon && this.darkIcon) {
      this.lightIcon.classList.toggle('hidden', isDark);
      this.darkIcon.classList.toggle('hidden', !isDark);
    }
  }
}

// Mobile Menu (unchanged)
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