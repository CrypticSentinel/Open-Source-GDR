(function () {
  const OPEN_CLASS = 'is-open';
  let lastActive = null;

  /** Apre il modal con ID specificato */
  function showModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    lastActive = document.activeElement;
    el.classList.add(OPEN_CLASS);
    el.style.display = ''; // rimuove 'none' inline; display sarà gestito dal CSS
    // Focus management: prova a focalizzare il primo bottone nel modal
    const focusTarget = el.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusTarget) {
      setTimeout(() => focusTarget.focus(), 0);
    }
  }

  /** Chiude il modal con ID specificato */
  function hideModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove(OPEN_CLASS);
    el.style.display = 'none';
    // Ripristina focus
    if (lastActive && typeof lastActive.focus === 'function') {
      setTimeout(() => lastActive.focus(), 0);
    }
  }

  /** Chiude tutti i modali aperti */
  function hideAllModals() {
    document.querySelectorAll('.modal.' + OPEN_CLASS).forEach(el => {
      el.classList.remove(OPEN_CLASS);
      el.style.display = 'none';
    });
  }

  /** Osserva cambi di 'style.display' sulle modali e sincronizza la classe */
  function setupObserver() {
    const modals = document.querySelectorAll('.modal');
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        if (m.type === 'attributes' && m.attributeName === 'style') {
          const el = m.target;
          const disp = el.style.display || getComputedStyle(el).display;
          if (disp === 'block') {
            el.classList.add(OPEN_CLASS);
          } else if (disp === 'none') {
            el.classList.remove(OPEN_CLASS);
          }
        }
      });
    });
    modals.forEach(el => observer.observe(el, { attributes: true, attributeFilter: ['style'] }));
  }

  /** ESC per chiudere modal aperta */
  function setupEscClose() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideAllModals();
    });
  }

  /** Wire di pulsanti già presenti (best-effort) */
  function wireButtons() {
    const closeBtn = document.getElementById('close-popup');
    if (closeBtn) closeBtn.addEventListener('click', () => hideModal('popup-difficolta'));

    // Se esistono pulsanti per aprire/chiudere i modali, li ricolleghiamo
    const gradoOk = document.getElementById('submit-grado-magia');
    if (gradoOk) gradoOk.addEventListener('click', () => hideModal('popup-grado-magia'));

    // Click su overlay per chiudere (fuori dal contenuto)
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal(modal.id);
      });
    });
  }

  /** Monkey-patch leggero delle funzioni globali, se presenti */
  function patchGlobals() {
    if (typeof window.mostraPopupGradoMagia === 'function') {
      const original = window.mostraPopupGradoMagia;
      window.mostraPopupGradoMagia = function () {
        try { showModal('popup-grado-magia'); }
        catch (_) {}
        return original.apply(this, arguments);
      };
    }
  }

  // Bootstrap
  function init() {
    setupObserver();
    setupEscClose();
    wireButtons();
    patchGlobals();
    // Espone API globali opzionali
    window.showModal = showModal;
    window.hideModal = hideModal;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
