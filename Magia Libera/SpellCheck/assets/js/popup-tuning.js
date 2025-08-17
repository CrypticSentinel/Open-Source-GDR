
// popup-tuning.js — aggiunge la classe 'result-badge' ai valori nei popup
(function () {
  function enhance(container) {
    if (!container) return;
    container.querySelectorAll('.popup-row > :last-child').forEach(el => {
      if (!el.classList.contains('no-badge')) {
        el.classList.add('result-badge');
      }
    });
  }

  function init() {
    const diff = document.getElementById('popup-difficolta');
    const grado = document.getElementById('popup-grado-magia');
    enhance(diff); enhance(grado);

    // Osserva apertura/aggiornamento dei popup
    [diff, grado].forEach(el => {
      if (!el) return;
      const obs = new MutationObserver(() => enhance(el));
      obs.observe(el, { attributes: true, attributeFilter: ['style', 'class'], subtree: true });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
