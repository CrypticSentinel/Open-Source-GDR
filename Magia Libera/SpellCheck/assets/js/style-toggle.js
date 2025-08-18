(function () {
  const STYLE_KEY = 'spellcheck_theme_style'; // 'standard' | 'arcano' | 'rosso'

  function apply(style) {
    const root = document.documentElement;
    root.classList.toggle('theme-arcano', style === 'arcano');
    root.classList.toggle('theme-rosso',  style === 'rosso');
    try { localStorage.setItem(STYLE_KEY, style); } catch {}

    const btn = document.getElementById('style-toggle');
    if (btn) {
      let label = 'Stile: Standard';
      if (style === 'arcano') label = 'Stile: Arcano';
      if (style === 'rosso')  label = 'Stile: Rosso';
      btn.textContent = label;
      btn.setAttribute('aria-pressed', style !== 'standard' ? 'true' : 'false');
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
    if (style === 'standard') return 'arcano';
    if (style === 'arcano')   return 'rosso';
    return 'standard'; // rosso -> standard
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
