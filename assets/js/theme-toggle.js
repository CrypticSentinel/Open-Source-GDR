// theme-toggle.js v3 — Switch singolo Auto/Light/Dark con persistenza
(function () {
  const MODE_KEY = 'spellcheck_theme_mode'; // valori: auto | light | dark

  /** Applica il tema */
  function apply(mode) {
    const root = document.documentElement;
    root.classList.remove('dark'); // reset

    if (mode === 'dark') {
      root.classList.add('dark');
    } else if (mode === 'light') {
      // nulla, resta chiaro
    } else {
      // auto → si affida a prefers-color-scheme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) root.classList.add('dark');
    }

    try { localStorage.setItem(MODE_KEY, mode); } catch {}

    // aggiorna label bottone
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.textContent = `Tema: ${mode[0].toUpperCase() + mode.slice(1)}`;
    }
  }

  /** Calcola prossimo step */
  function nextMode(curr) {
    if (curr === 'auto') return 'light';
    if (curr === 'light') return 'dark';
    return 'auto';
  }

  function current() {
    let mode = 'auto';
    try {
      const saved = localStorage.getItem(MODE_KEY);
      if (saved) mode = saved;
    } catch {}
    return mode;
  }

  function init() {
    let mode = current();
    apply(mode);

    // Riascolta cambi di prefers-color-scheme se siamo in auto
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (current() === 'auto') apply('auto');
    });

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const newMode = nextMode(current());
        apply(newMode);
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
