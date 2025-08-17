// style-toggle.js — Switch Stile Standard/Arcano con persistenza
(function () {
  const STYLE_KEY = 'spellcheck_theme_style'; // 'standard' | 'arcano'

  function apply(style) {
    const root = document.documentElement;
    const isArcano = style === 'arcano';
    root.classList.toggle('theme-arcano', isArcano);
    try { localStorage.setItem(STYLE_KEY, style); } catch {}

    const btn = document.getElementById('style-toggle');
    if (btn) {
      btn.textContent = isArcano ? 'Stile: Arcano' : 'Stile: Standard';
      btn.setAttribute('aria-pressed', isArcano ? 'true' : 'false');
    }
  }

  function current() {
    let style = 'standard';
    try {
      const saved = localStorage.getItem(STYLE_KEY);
      if (saved) style = saved;
    } catch {}
    return style;
  }

  function next(style) {
    return style === 'arcano' ? 'standard' : 'arcano';
  }

  function init() {
    apply(current());
    const btn = document.getElementById('style-toggle');
    if (btn) {
      btn.addEventListener('click', () => apply(next(current())));
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
