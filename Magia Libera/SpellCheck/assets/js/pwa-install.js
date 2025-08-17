// pwa-install.js — Gestione robusta tasto "Installa App" (A2HS) per PWA
// Requisiti: bottone con id="install-button" presente nel DOM.
(function () {
  const btn = document.getElementById('install-button');
  if (!btn) return; // se non esiste il bottone, usciamo

  let deferredPrompt = null;

  // L'app è già in modalità standalone?
  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true || // iOS
           document.referrer.startsWith('android-app://');
  }

  // iOS Safari non supporta beforeinstallprompt
  function isIosSafari() {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    return isIOS && isSafari;
  }

  function showIosA2hsHint() {
    const msg = [
      'Per installare questa app:',
      '1) Tocca il pulsante Condividi (icona con freccia in alto).',
      '2) Seleziona "Aggiungi a Home".',
      '3) Conferma e premi "Aggiungi".'
    ].join('\n');
    alert(msg);
  }

  // Se già installata, nascondi il bottone
  if (isStandalone()) {
    btn.style.display = 'none';
  }

  // Chrome/Edge/Android: intercetta il prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btn.style.display = 'inline-block';
  });

  // iOS Safari: mostra un bottone che apre la guida
  if (!isStandalone() && isIosSafari()) {
    btn.style.display = 'inline-block';
    btn.textContent = 'Aggiungi a Home';
  }

  btn.addEventListener('click', async () => {
    // iOS: mostra guida
    if (isIosSafari() && !deferredPrompt) {
      showIosA2hsHint();
      return;
    }

    // Altri browser: mostra prompt se disponibile
    if (!deferredPrompt) return;
    try {
      btn.disabled = true;
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice; // { outcome: 'accepted' | 'dismissed', platform: ... }
      // opzionale: log/analytics su choice.outcome
    } catch (_) {
      // no-op
    } finally {
      deferredPrompt = null;
      btn.style.display = 'none';
      btn.disabled = false;
    }
  });

  // Evento installazione completata
  window.addEventListener('appinstalled', () => {
    btn.style.display = 'none';
  });

  // Alcuni browser espongono il prompt solo dopo che il SW è controller
  if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!isStandalone() && (deferredPrompt || isIosSafari())) {
        btn.style.display = 'inline-block';
      }
    });
  }
})();
