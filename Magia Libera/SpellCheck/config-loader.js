
// config-loader.js
// Carica un JSON opzionale (override di window.TABELLE).
// Ordine consigliato in index.html: config-loader.js -> tabelle.js -> script.js

(function () {
  async function loadConfig() {
    const url = 'config/spell-tables.v1.json?v=' + Date.now(); // cache-busting
    try {
      const resp = await fetch(url, { cache: 'no-store' });
      if (!resp.ok) return;
      const cfg = await resp.json();

      // validazione minima
      if (!cfg || !cfg.select || !cfg.dadi || !cfg.faticaEDannoBase) return;

      if (typeof window !== 'undefined') {
        if (window.TABELLE) {
          window.TABELLE = Object.assign({}, window.TABELLE, cfg);
        } else {
          window.TABELLE = cfg;
        }
        console.info('[config-loader] Config JSON applicato', cfg.version || '');
      }
    } catch (e) {
      console.warn('[config-loader] Config JSON non disponibile, uso fallback tabelle.js', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadConfig);
  } else {
    loadConfig();
  }
})();
