(function () {
  function initConfig() {
    if (typeof window !== 'undefined' && window.TABELLE) {
      console.info('[config-loader] Tabelle caricate da tabelle.js');
    } else {
      console.error('[config-loader] Tabelle non trovate: assicurati che tabelle.js sia incluso in index.html');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfig);
  } else {
    initConfig();
  }
})();
