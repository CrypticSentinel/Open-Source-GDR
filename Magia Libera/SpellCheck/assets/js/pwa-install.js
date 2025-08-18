(function () {
  const btn = document.getElementById('install-button');
  if (!btn) return;

  let deferredPrompt = null;

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true || // iOS
           document.referrer.startsWith('android-app://');
  }

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

  if (isStandalone()) {
    btn.style.display = 'none';
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btn.style.display = 'inline-block';
  });

  if (!isStandalone() && isIosSafari()) {
    btn.style.display = 'inline-block';
    btn.textContent = 'Aggiungi a Home';
  }

  btn.addEventListener('click', async () => {
    if (isIosSafari() && !deferredPrompt) {
      showIosA2hsHint();
      return;
    }

    if (!deferredPrompt) return;
    try {
      btn.disabled = true;
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
    } catch (_) {
    } finally {
      deferredPrompt = null;
      btn.style.display = 'none';
      btn.disabled = false;
    }
  });

  window.addEventListener('appinstalled', () => {
    btn.style.display = 'none';
  });

  if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!isStandalone() && (deferredPrompt || isIosSafari())) {
        btn.style.display = 'inline-block';
      }
    });
  }
})();
