
// theme-toggle.js — toggle manuale light/dark con persistenza
(function () {
  const STORAGE_KEY = 'spellcheck_theme';
  function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }
  function init() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) applyTheme(saved);
    } catch {}
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
