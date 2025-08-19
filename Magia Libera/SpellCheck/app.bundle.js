/* ==========================================================================
   Project: SpellCheck (PWA) — Application Bundle
   Purpose: UI wiring, theming toggles, modals handling, PWA install flow, and
            domain-specific calculators/tables.
   Conventions:
     - Funzioni pure dove possibile; accesso al DOM in wrapper dedicati.
     - Event listeners registrati su DOMContentLoaded per idempotenza.
     - Nomi costanti in MAIUSCOLO, funzioni in camelCase.
   Authoring: Refactor by ChatGPT — 2025-08-19
   ========================================================================== */

const TABELLE = {
  baseline: {
    difficoltaBase: 20
  },

  select: {
    // Ogni opzione ha: code (chiave logica), text (etichetta utente), value (peso numerico)
    distanza: [
      { code: "DIST_PERSONALE", text: "Personale (-2)", value: -2 },
      { code: "DIST_TOCCO", text: "Tocco (+0)", value: 0, selected: true },
      { code: "DIST_CORTA", text: "Corta (entro 3 m) (+2)", value: 2 },
      { code: "DIST_MEDIA", text: "Media (entro 10 m) (+6)", value: 6 },
      { code: "DIST_LUNGA", text: "Lunga (entro 25 m) (+12)", value: 12 },
      { code: "DIST_LUNGHISSIMA", text: "Lunghissima (entro 1 km) (+24)", value: 24 },
      { code: "DIST_NONVISTA_CONOSCIUTO", text: "Non in vista (Conosciuto) (+36)", value: 36 },
      { code: "DIST_NONVISTA_SCONOSCIUTO", text: "Non in vista (Sconosciuto) (+48)", value: 48 }
    ],
    area: [
      { code: "AREA_CREATURA_INTERA", text: "Creatura – Intera (+0)", value: 0, selected: true },
      { code: "AREA_CREATURA_LOCAZIONE", text: "Creatura – Locazione (+3)", value: 3 },
      { code: "AREA_CREATURA_SUB_EXT", text: "Creatura – Sub locazione (Esterna) (+5)", value: 5 },
      { code: "AREA_CREATURA_SUB_INT", text: "Creatura – Sub locazione (Interna) (+10)", value: 10 },
      { code: "AREA_BERSAGLI_OLTRE", text: "Ogni bersaglio oltre il primo (+5)", value: 5 },
      { code: "AREA_DIAMETRO_5M", text: "Ogni 5 metri di diametro (+5)", value: 5 }
    ],
    durata: [
      { code: "DUR_ISTANTANEO", text: "1 round / Istantaneo (+0)", value: 0, selected: true },
      { code: "DUR_ROUND_OLTRE", text: "Ogni round oltre il primo (+2)", value: 2 },
      { code: "DUR_MIN_10", text: "Ogni 10 minuti (+6)", value: 6 },
      { code: "DUR_CONCENTRAZIONE", text: "Finchè si rimane concentrati (-2)", value: -2 },
      { code: "DUR_CONDIZIONE", text: "Condizione (Finchè, Quando) (+25)", value: 25 },
      { code: "DUR_PERMANENTE", text: "Permanente (+35)", value: 35 }
    ],
    gesti: [
      { code: "GESTI_SENZA", text: "Senza gesti (+5)", value: 5 },
      { code: "GESTI_NASCOSTI", text: "Gesti nascosti (+3)", value: 3 },
      { code: "GESTI_NORMALI", text: "Gesti normali (+0)", value: 0, selected: true },
      { code: "GESTI_AMPI", text: "Gesti ampi (-3)", value: -3 }
    ],
    verbale: [
      { code: "VERBALE_SENZA", text: "Senza voce (+5)", value: 5 },
      { code: "VERBALE_BASSA", text: "Voce bassa (+3)", value: 3 },
      { code: "VERBALE_NORMALE", text: "Voce normale (+0)", value: 0, selected: true },
      { code: "VERBALE_ALTA", text: "Voce alta (-3)", value: -3 }
    ],
    posizione: [
      { code: "POS_NORMALE", text: "Lancio in posizione normale (+0)", value: 0, selected: true },
      { code: "POS_MOVIMENTO", text: "Lancio in movimento (+5)", value: 5 },
      { code: "POS_DISTURBO", text: "Lancio con disturbo (+10)", value: 10 }
    ],
    modificatori_corpo: [
      { code: "CORPO_NONE", text: "Nessun modificatore Corpo (+0)", value: 0, selected: true },
      { code: "CORPO_OGGETTO_FUNZ", text: "Oggetto funzionale (+2)", value: 2 },
      { code: "CORPO_OGGETTO_COMPLESSO", text: "Oggetto complesso (+4)", value: 4 },
      { code: "CORPO_CREATURA_SEMPLICE", text: "Creatura semplice (+3)", value: 3 },
      { code: "CORPO_CREATURA_COMPLESSA", text: "Creatura complessa (+5)", value: 5 }
    ],
    modificatori_materia: [
      { code: "MATERIA_NONE", text: "Nessun modificatore Materia (+0)", value: 0, selected: true },
      { code: "MATERIA_1_10KG", text: "1-10 kg (+1)", value: 1 },
      { code: "MATERIA_10_50KG", text: "10-50 kg (+3)", value: 3 },
      { code: "MATERIA_50_100KG", text: "50-100 kg (+5)", value: 5 },
      { code: "MATERIA_100_500KG", text: "100-500 kg (+7)", value: 7 },
      { code: "MATERIA_500KG_PLUS", text: "Oltre 500 kg (+9)", value: 9 }
    ],
    modificatori_mente: [
      { code: "MENTE_NONE", text: "Nessun modificatore Mente (+0)", value: 0, selected: true },
      { code: "MENTE_LEGGERE", text: "Leggere (+5)", value: 5 },
      { code: "MENTE_MODIFICARE", text: "Modificare (+15)", value: 15 },
      { code: "MENTE_SCRIVERE", text: "Scrivere (+20)", value: 20 },
      { code: "MENTE_RIMUOVERE", text: "Rimuovere (+12)", value: 12 }
    ]
  },

  // Variabili/Effetti (etichette e pesi qui, UI si allinea automaticamente)
  variabili: {
    variabile1: { code: "COMPONENTI_NON_MAGICI", label: "Utilizzo di componenti o strumenti non magici (-5)", value: -5 },
    variabile2: { code: "MAGHI_AGGIUNTIVI", label: "Ogni mago aggiuntivo (max 4) (+Grado Scuola)", value: 0 },
    variabile3: { code: "RITUALE_15MIN", label: "Lancio con rituale (ogni 15 minuti) (-10)", value: -10 },
    rounds:     { code: "CONCENTRAZIONE_PRE", label: "Round di concentrazione prima del lancio (max 10) (-1 per round)", value: -1 }
  },

  effetti: {
    effetto1: { code: "SENZA_EFFETTI_VISIVI", label: "Lancio incantesimo senza effetti visivi (+5)", value: 5 },
    effetto2: { code: "SENZA_EFFETTI_MAGICI", label: "Lancio incantesimo senza effetti magici (+10)", value: 10 },
    effetto3: { code: "MASSIMIZZATO", label: "Lancio Incantesimo massimizzato (+15)", value: 15 }
  },

  // Dadi: label autogenerata in UI, ma qui definita per sicurezza/override
  dadi: [
    { id: "danni1", uiIds: { label: "label-d1" }, tipo: "+1",  costo: 2,  label: "Ogni +1 aggiuntivo (+2)" },
    { id: "danni2", uiIds: { label: "label-d4" }, tipo: "d4",  costo: 5,  label: "Ogni d4 aggiuntivo (+5)" },
    { id: "danni3", uiIds: { label: "label-d6" }, tipo: "d6",  costo: 7,  label: "Ogni d6 aggiuntivo (+7)" },
    { id: "danni4", uiIds: { label: "label-d8" }, tipo: "d8",  costo: 9,  label: "Ogni d8 aggiuntivo (+9)" },
    { id: "danni5", uiIds: { label: "label-d10" }, tipo: "d10", costo: 11, label: "Ogni d10 aggiuntivo (+11)" },
    { id: "danni6", uiIds: { label: "label-d12" }, tipo: "d12", costo: 13, label: "Ogni d12 aggiuntivo (+13)" },
    { id: "danni7", uiIds: { label: "label-d20" }, tipo: "d20", costo: 15, label: "Ogni d20 aggiuntivo (+15)" }
  ],

  // Tabella fatica + danno base per range di Grado
  faticaEDannoBase: [
    { grado: [1, 2],  fatica0: 22, intervalli: [28, 34, 40, 46, 52], dannoBase: "+1" },
    { grado: [3, 4],  fatica0: 26, intervalli: [32, 38, 44, 50, 56], dannoBase: "+2" },
    { grado: [5, 6],  fatica0: 31, intervalli: [37, 43, 49, 55, 61], dannoBase: "+3" },
    { grado: [7, 8],  fatica0: 36, intervalli: [42, 48, 54, 60, 66], dannoBase: "+4" },
    { grado: [9, 10], fatica0: 41, intervalli: [47, 53, 59, 65, 71], dannoBase: "+5" },
    { grado: [11,12], fatica0: 46, intervalli: [52, 58, 64, 70, 76], dannoBase: "+6" },
    { grado: [13,14], fatica0: 51, intervalli: [57, 63, 69, 75, 81], dannoBase: "+7" },
    { grado: [15,16], fatica0: 56, intervalli: [62, 68, 74, 80, 86], dannoBase: "+8" },
    { grado: [17,18], fatica0: 61, intervalli: [67, 73, 79, 85, 91], dannoBase: "+9" },
    { grado: [19,20], fatica0: 66, intervalli: [72, 78, 84, 90, 96], dannoBase: "+10" }
  ],

  // Difficoltà per resistere
  difficoltaResistenza: [
    { min: 1,   max: 34,  resistenza: 20 },
    { min: 35,  max: 44,  resistenza: 25 },
    { min: 45,  max: 54,  resistenza: 30 },
    { min: 55,  max: 64,  resistenza: 35 },
    { min: 65,  max: 74,  resistenza: 40 },
    { min: 75,  max: 84,  resistenza: 45 },
    { min: 85,  max: 94,  resistenza: 50 },
    { min: 95,  max: 104, resistenza: 55 },
    { min: 105, max: 114, resistenza: 60 },
    { min: 115, max: 124, resistenza: 65 }
  ]
};


(function () {
/**
 * initConfig() — vedi implementazione per dettagli.
 * @returns {void}
 */
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

(function () {
  const OPEN_CLASS = 'is-open';
  let lastActive = null;

  /** Apre il modal con ID specificato */
/**
 * showModal() — vedi implementazione per dettagli.
 * @param {any} id
 * @returns {void}
 */
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
/**
 * hideModal() — vedi implementazione per dettagli.
 * @param {any} id
 * @returns {void}
 */
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
/**
 * hideAllModals() — vedi implementazione per dettagli.
 * @returns {void}
 */
  function hideAllModals() {
    document.querySelectorAll('.modal.' + OPEN_CLASS).forEach(el => {
      el.classList.remove(OPEN_CLASS);
      el.style.display = 'none';
    });
  }

  /** Osserva cambi di 'style.display' sulle modali e sincronizza la classe */
/**
 * setupObserver() — vedi implementazione per dettagli.
 * @returns {void}
 */
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
/**
 * setupEscClose() — vedi implementazione per dettagli.
 * @returns {void}
 */
  function setupEscClose() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideAllModals();
    });
  }

  /** Wire di pulsanti già presenti (best-effort) */
/**
 * wireButtons() — vedi implementazione per dettagli.
 * @returns {void}
 */
  function wireButtons() {
    const closeBtn = document.getElementById('close-popup');
    if (closeBtn) closeBtn.addEventListener('click', () => hideModal('popup-difficolta'));

    // Se esistono pulsanti per aprire/chiudere i modali, li ricolleghiamo
    const gradoOk = document.getElementById('submit-grado-magia');
	// Evita doppio binding se wireButtons() venisse richiamata più volte
	if (gradoOk && !gradoOk.dataset.bound) {
		gradoOk.dataset.bound = '1';
		gradoOk.addEventListener('click', () => {
    const grado = Number.parseInt(document.getElementById('grado-magia').value, 10) || 0;
    const vol   = Number.parseInt(document.getElementById('punteggio-volonta').value, 10) || 0;

    // Chiudi la modale e lancia il calcolo una sola volta
    hideModal('popup-grado-magia');
    calcolaDifficoltaConGrado(grado, vol);
  });
}


    // Click su overlay per chiudere (fuori dal contenuto)
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal(modal.id);
      });
    });
  }

  /** Monkey-patch leggero delle funzioni globali, se presenti */
/**
 * patchGlobals() — vedi implementazione per dettagli.
 * @returns {void}
 */
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
/**
 * init() — vedi implementazione per dettagli.
 * @returns {void}
 */
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

(function () {
  const btn = document.getElementById('install-button');
  if (!btn) return;

  let deferredPrompt = null;
/**
 * isStandalone() — vedi implementazione per dettagli.
 * @returns {void}
 */

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true || // iOS
           document.referrer.startsWith('android-app://');
  }
/**
 * isIosSafari() — vedi implementazione per dettagli.
 * @returns {void}
 */

  function isIosSafari() {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    return isIOS && isSafari;
  }
/**
 * showIosA2hsHint() — vedi implementazione per dettagli.
 * @returns {void}
 */

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

(function () {
  const STYLE_KEY = 'spellcheck_theme_style'; // 'standard' | 'arcano' | 'rosso'
/**
 * apply() — vedi implementazione per dettagli.
 * @param {any} style
 * @returns {void}
 */

  function apply(style) {
    const root = document.documentElement;
    root.classList.remove('theme-blu', 'theme-viola', 'theme-rosso', 'theme-verde');
		if (style === 'blu')   root.classList.add('theme-blu');
		if (style === 'viola') root.classList.add('theme-viola');
		if (style === 'rosso') root.classList.add('theme-rosso');
		if (style === 'verde') root.classList.add('theme-verde');
		
    try { localStorage.setItem(STYLE_KEY, style); } catch {}

	const btn = document.getElementById('style-toggle');
		if (btn) {
			let label = 'Stile: Blu';
				if (style === 'viola') label = 'Stile: Viola';
				if (style === 'rosso') label = 'Stile: Rosso';
				if (style === 'verde') label = 'Stile: Verde';
    btn.textContent = label;
    btn.setAttribute('aria-pressed', style !== 'blu' ? 'true' : 'false');
  }
}
/**
 * current() — vedi implementazione per dettagli.
 * @returns {void}
 */

function current() {
  let style = 'blu'; // default
  try {
    const saved = localStorage.getItem(STYLE_KEY);
    if (saved) style = saved;
  } catch {}
  return style;
}
/**
 * next() — vedi implementazione per dettagli.
 * @param {any} style
 * @returns {void}
 */

function next(style) {
  if (style === 'blu')   return 'viola';
  if (style === 'viola') return 'rosso';
  if (style === 'rosso') return 'verde';
  return 'blu'; // verde -> blu
}
/**
 * init() — vedi implementazione per dettagli.
 * @returns {void}
 */

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

(function () {
  const MODE_KEY = 'spellcheck_theme_mode'; // valori: auto | light | dark

  /** Applica il tema */
/**
 * apply() — vedi implementazione per dettagli.
 * @param {any} mode
 * @returns {void}
 */
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
/**
 * nextMode() — vedi implementazione per dettagli.
 * @param {any} curr
 * @returns {void}
 */
  function nextMode(curr) {
    if (curr === 'auto') return 'light';
    if (curr === 'light') return 'dark';
    return 'auto';
  }
/**
 * current() — vedi implementazione per dettagli.
 * @returns {void}
 */

  function current() {
    let mode = 'auto';
    try {
      const saved = localStorage.getItem(MODE_KEY);
      if (saved) mode = saved;
    } catch {}
    return mode;
  }
/**
 * init() — vedi implementazione per dettagli.
 * @returns {void}
 */

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

const ASSETS_BASE = 'assets/';
const ICONS_BASE  = ASSETS_BASE + 'icons/';
const IMG_BASE    = ASSETS_BASE + 'img/';
/**
 * populateSelect() — vedi implementazione per dettagli.
 * @param {any} selectId
 * @param {any} items
 * @returns {void}
 */

function populateSelect(selectId, items) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = ""; // reset
  items.forEach(({ text, value, selected, code }) => {
    const opt = document.createElement("option");
    opt.textContent = text;
    opt.value = String(value);
    opt.dataset.code = code;
    if (selected) opt.selected = true;
    sel.appendChild(opt);
  });
}
/**
 * getSelectedCode() — vedi implementazione per dettagli.
 * @param {any} selectId
 * @returns {void}
 */

function getSelectedCode(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return null;
  const opt = sel.options[sel.selectedIndex];
  return opt?.dataset?.code || null;
}
/**
 * bootstrapSelects() — vedi implementazione per dettagli.
 * @returns {void}
 */

function bootstrapSelects() {
  if (typeof TABELLE === "undefined") {
    console.error("TABELLE non disponibile. Verificare il caricamento di tabelle.js");
    return;
  }
  const S = TABELLE.select;
  populateSelect("distanza", S.distanza);
  populateSelect("area", S.area);
  populateSelect("durata", S.durata);
  populateSelect("gesti", S.gesti);
  populateSelect("verbale", S.verbale);
  populateSelect("posizione", S.posizione);
  populateSelect("modificatori_corpo", S.modificatori_corpo);
  populateSelect("modificatori_materia", S.modificatori_materia);
  populateSelect("modificatori_mente", S.modificatori_mente);

  // Allineamento etichette Variabili/Effetti/rounds
  document.getElementById("label-variabile1").innerText = TABELLE.variabili.variabile1.label;
  document.getElementById("label-variabile2").innerText = TABELLE.variabili.variabile2.label;
  document.getElementById("label-variabile3").innerText = TABELLE.variabili.variabile3.label;
  document.getElementById("label-rounds").innerText     = TABELLE.variabili.rounds.label;

  document.getElementById("label-effetto1").innerText = TABELLE.effetti.effetto1.label;
  document.getElementById("label-effetto2").innerText = TABELLE.effetti.effetto2.label;
  document.getElementById("label-effetto3").innerText = TABELLE.effetti.effetto3.label;

  // Etichette dadi
  TABELLE.dadi.forEach(d => {
    const lbl = document.getElementById(d.uiIds.label);
    if (lbl) lbl.innerText = d.label || `Ogni ${d.tipo} (+${d.costo})`;
  });
}
/**
 * mostraInputBersagliDiametro() — vedi implementazione per dettagli.
 * @returns {void}
 */

function mostraInputBersagliDiametro() {
  const code = getSelectedCode("area");
  const inputBersagli = document.getElementById("input-bersagli");
  const inputDiametro  = document.getElementById("input-diametro");

  // bersagli oltre il primo
  if (code === "AREA_BERSAGLI_OLTRE") {
    inputBersagli.style.display = 'block';
  } else {
    document.getElementById("numero-bersagli").value = "1";
    inputBersagli.style.display = 'none';
  }
  // diametro a step di 5m
  if (code === "AREA_DIAMETRO_5M") {
    inputDiametro.style.display = 'block';
  } else {
    document.getElementById("numero-diametro").value = "1";
    inputDiametro.style.display = 'none';
  }
}
/**
 * mostraInputDurata() — vedi implementazione per dettagli.
 * @returns {void}
 */

function mostraInputDurata() {
  const code = getSelectedCode("durata");
  const inputRound   = document.getElementById("input-round");
  const inputMinuti10 = document.getElementById("input-minuti10");
  
  inputRound.style.display   = (code === "DUR_ROUND_OLTRE") ? 'block' : 'none';
  inputMinuti10.style.display = (code === "DUR_MIN_10")       ? 'block' : 'none';
  
  if (code !== "DUR_ROUND_OLTRE") document.getElementById("numero-round").value = "1";
  if (code !== "DUR_MIN_10")       document.getElementById("numero-minuti10").value = "1";
  }
/**
 * incrementaMagiAggiuntivi() — vedi implementazione per dettagli.
 * @returns {void}
 */

function incrementaMagiAggiuntivi() {
  const inputElement = document.getElementById("numero-magi-aggiuntivi");
  let v = parseInt(inputElement.value);
  if (v < 4) {
    inputElement.value = v + 1;
    aggiornaPunteggiMagiAggiuntivi();
  }
}
/**
 * decrementaMagiAggiuntivi() — vedi implementazione per dettagli.
 * @returns {void}
 */
function decrementaMagiAggiuntivi() {
  const inputElement = document.getElementById("numero-magi-aggiuntivi");
  let v = parseInt(inputElement.value);
  if (v > 1) {
    inputElement.value = v - 1;
    aggiornaPunteggiMagiAggiuntivi();
  }
}
/**
 * aggiornaPunteggiMagiAggiuntivi() — vedi implementazione per dettagli.
 * @returns {void}
 */
function aggiornaPunteggiMagiAggiuntivi() {
  const numero = parseInt(document.getElementById("numero-magi-aggiuntivi").value);
  const wrap = document.getElementById("punteggi-magi-aggiuntivi");
  wrap.innerHTML = "";
  for (let i = 1; i <= numero; i++) {
    const magoDiv = document.createElement("div");
    magoDiv.className = "mago-input-container";

    const label = document.createElement("label");
    label.htmlFor = "punteggio-mago-" + i;
    label.textContent = "Mago " + i;
    label.className = "mago-label";
    magoDiv.appendChild(label);

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    const minusIcon = document.createElement("img");
    minusIcon.src = ICONS_BASE + 'minus.png'; minusIcon.alt = "-";
    minusIcon.className = "adjust-icon mx-2";
    minusIcon.style.cursor = "pointer";
    minusIcon.onclick = function () { decrementaPunteggioMago(i); };
    inputGroup.appendChild(minusIcon);

    const input = document.createElement("input");
    input.type = "number"; input.id = "punteggio-mago-" + i;
    input.className = "form-control mx-auto"; input.style.width = "60px";
    input.min = 0; input.value = 0; input.style.display = "inline-block";
    inputGroup.appendChild(input);

    const plusIcon = document.createElement("img");
    plusIcon.src = ICONS_BASE + 'plus.png'; plusIcon.alt = "+";
    plusIcon.className = "adjust-icon mx-2";
    plusIcon.style.cursor = "pointer";
    plusIcon.onclick = function () { incrementaPunteggioMago(i); };
    inputGroup.appendChild(plusIcon);

    magoDiv.appendChild(inputGroup);
    wrap.appendChild(magoDiv);
  }
}
/**
 * incrementaPunteggioMago() — vedi implementazione per dettagli.
 * @param {any} i
 * @returns {void}
 */
function incrementaPunteggioMago(i) { const el = document.getElementById("punteggio-mago-" + i); el.value = parseInt(el.value) + 1; }
/**
 * decrementaPunteggioMago() — vedi implementazione per dettagli.
 * @param {any} i
 * @returns {void}
 */
function decrementaPunteggioMago(i) { const el = document.getElementById("punteggio-mago-" + i); if (parseInt(el.value) > 0) el.value = parseInt(el.value) - 1; }
/**
 * mostraInputVariabili() — vedi implementazione per dettagli.
 * @returns {void}
 */

function mostraInputVariabili() {
  const v2 = document.getElementById("variabile2");
  const inputMagoAggiuntivo = document.getElementById("input-mago-aggiuntivo");
  if (v2.checked) { inputMagoAggiuntivo.style.display = 'block'; aggiornaPunteggiMagiAggiuntivi(); }
  else { document.getElementById("numero-magi-aggiuntivi").value = "1"; inputMagoAggiuntivo.style.display = 'none'; document.getElementById("punteggi-magi-aggiuntivi").innerHTML = ""; }

  const v3 = document.getElementById("variabile3");
  const inputRituale = document.getElementById("input-lancio-rituale");
  if (v3.checked) inputRituale.style.display = 'block';
  else { document.getElementById("numero-rituali").value = "1"; inputRituale.style.display = 'none'; }
}
/**
 * mostraInputRound() — vedi implementazione per dettagli.
 * @returns {void}
 */

function mostraInputRound() {
  const roundsCheckbox = document.getElementById("rounds-checkbox");
  const inputRounds = document.getElementById("input-rounds");
  inputRounds.style.display = roundsCheckbox.checked ? 'block' : 'none';
  if (!roundsCheckbox.checked) document.getElementById("numero-rounds").value = "1";
}
/**
 * toggleCorpoDropdown() — vedi implementazione per dettagli.
 * @returns {void}
 */

function toggleCorpoDropdown() {
  const corpoCheckbox = document.getElementById("corpo-checkbox");
  const corpoDropdownContainer = document.getElementById("corpo-dropdown-container");
  corpoDropdownContainer.style.display = corpoCheckbox.checked ? 'block' : 'none';
  if (!corpoCheckbox.checked) document.getElementById("modificatori_corpo").value = "0";
}
/**
 * toggleMateriaDropdown() — vedi implementazione per dettagli.
 * @returns {void}
 */
function toggleMateriaDropdown() {
  const materiaCheckbox = document.getElementById("materia-checkbox");
  const materiaDropdownContainer = document.getElementById("materia-dropdown-container");
  materiaDropdownContainer.style.display = materiaCheckbox.checked ? 'block' : 'none';
  if (!materiaCheckbox.checked) document.getElementById("modificatori_materia").value = "0";
}
/**
 * toggleMenteDropdown() — vedi implementazione per dettagli.
 * @returns {void}
 */
function toggleMenteDropdown() {
  const menteCheckbox = document.getElementById("mente-checkbox");
  const menteDropdownContainer = document.getElementById("mente-dropdown-container");
  menteDropdownContainer.style.display = menteCheckbox.checked ? 'block' : 'none';
  if (!menteCheckbox.checked) document.getElementById("modificatori_mente").value = "0";
}
/**
 * uncheckOtherCheckboxes() — vedi implementazione per dettagli.
 * @param {any} checkedId
 * @returns {void}
 */

function uncheckOtherCheckboxes(checkedId) {
  ["mente-checkbox", "corpo-checkbox", "materia-checkbox"].forEach(id => {
    if (id !== checkedId) document.getElementById(id).checked = false;
  });
  toggleCorpoDropdown(); toggleMenteDropdown(); toggleMateriaDropdown();
}
/**
 * toggled1() — vedi implementazione per dettagli.
 * @returns {void}
 */

function toggled1() { toggleDieControls("d1"); }
/**
 * toggleD4() — vedi implementazione per dettagli.
 * @returns {void}
 */
function toggleD4()  { toggleDieControls("d4"); }
/**
 * toggleD6() — vedi implementazione per dettagli.
 * @returns {void}
 */
function toggleD6()  { toggleDieControls("d6"); }
/**
 * toggleD8() — vedi implementazione per dettagli.
 * @returns {void}
 */
function toggleD8()  { toggleDieControls("d8"); }
/**
 * toggleD10() — vedi implementazione per dettagli.
 * @returns {void}
 */
function toggleD10() { toggleDieControls("d10"); }
/**
 * toggleD12() — vedi implementazione per dettagli.
 * @returns {void}
 */
function toggleD12() { toggleDieControls("d12"); }
/**
 * toggleD20() — vedi implementazione per dettagli.
 * @returns {void}
 */
function toggleD20() { toggleDieControls("d20"); }
/**
 * toggleDieControls() — vedi implementazione per dettagli.
 * @param {any} suffix
 * @returns {void}
 */

function toggleDieControls(suffix) {
  const controls = document.getElementById(`${suffix}-controls`);
  const minusEl = document.getElementById(`minus-${suffix}`);
  const plusEl  = document.getElementById(`plus-${suffix}`);
  const map = { d1:"danni1", d4:"danni2", d6:"danni3", d8:"danni4", d10:"danni5", d12:"danni6", d20:"danni7" };
  const inputEl = document.getElementById(map[suffix]);
  if (controls.style.display === "none") {
    controls.style.display = "inline-block";
    minusEl.style.display = "inline-block";
    plusEl.style.display = "inline-block";
    inputEl.value = 1;
  } else {
    controls.style.display = "none";
    minusEl.style.display = "none";
    plusEl.style.display = "none";
    inputEl.value = 0;
  }
}
/**
 * incrementaInput() — vedi implementazione per dettagli.
 * @param {any} inputId
 * @returns {void}
 */

function incrementaInput(inputId) { const el = document.getElementById(inputId); el.value = parseInt(el.value) + 1; }
/**
 * decrementaInput() — vedi implementazione per dettagli.
 * @param {any} inputId
 * @returns {void}
 */
function decrementaInput(inputId) { const el = document.getElementById(inputId); if (parseInt(el.value) > 0) el.value = parseInt(el.value) - 1; }
/**
 * incrementaRoundConcentrazione() — vedi implementazione per dettagli.
 * @returns {void}
 */
function incrementaRoundConcentrazione() {
  const el = document.getElementById('numero-rounds'); const v = parseInt(el.value);
  if (v < 10) el.value = v + 1;
}
/**
 * _faticaEDannoBase() — vedi implementazione per dettagli.
 * @param {any} gradoMagia
 * @param {any} difficoltaTotale
 * @param {any} tab
 * @returns {void}
 */

function _faticaEDannoBase(gradoMagia, difficoltaTotale, tab = TABELLE.faticaEDannoBase) {
  const riga = tab.find(r => gradoMagia >= r.grado[0] && gradoMagia <= r.grado[1]);
  if (!riga) return { fatica: 0, dannoBase: 0 };
  let fatica = 0;
  if (difficoltaTotale < riga.fatica0) fatica = 0;
  else {
    fatica = -5;
    for (let i = 0; i < riga.intervalli.length; i++) {
      if (difficoltaTotale <= riga.intervalli[i]) { fatica = -(i + 1); break; }
    }
  }
  return { fatica, dannoBase: riga.dannoBase };
}
/**
 * _difficoltaResistenza() — vedi implementazione per dettagli.
 * @param {any} difficoltaLancio
 * @param {any} tab
 * @returns {void}
 */

function _difficoltaResistenza(difficoltaLancio, tab = TABELLE.difficoltaResistenza) {
  if (difficoltaLancio < tab[0].min) return tab[0].resistenza;
  if (difficoltaLancio > tab[tab.length - 1].max) return tab[tab.length - 1].resistenza;
  for (let i = 0; i < tab.length; i++) {
    if (difficoltaLancio >= tab[i].min && difficoltaLancio <= tab[i].max) return tab[i].resistenza;
  }
  return 0;
}
/**
 * calcolaMoltiplicatori() — vedi implementazione per dettagli.
 * @returns {void}
 */

function calcolaMoltiplicatori() {
  let mBersagli = 0, mDiametro = 0, mRound = 0, mMin10 = 0, mMagi = 0, mRituali = 0, mConc = 0;

  if (document.getElementById("input-bersagli").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-bersagli").value) || 0;
    mBersagli = (n - 1) * (TABELLE.select.area.find(a => a.code === "AREA_BERSAGLI_OLTRE")?.value ?? 0);
  }
  if (document.getElementById("input-diametro").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-diametro").value) || 0;
    mDiametro = (n - 1) * (TABELLE.select.area.find(a => a.code === "AREA_DIAMETRO_5M")?.value ?? 0);
  }
  if (document.getElementById("input-round").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-round").value) || 0;
    mRound = (n - 1) * (TABELLE.select.durata.find(d => d.code === "DUR_ROUND_OLTRE")?.value ?? 0);
  }
  if (document.getElementById("input-minuti10").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-minuti10").value) || 0;
    mMin10 = (n - 1) * (TABELLE.select.durata.find(d => d.code === "DUR_MIN_10")?.value ?? 0);
  }
  if (document.getElementById("input-mago-aggiuntivo").style.display === 'block') {
    mMagi = 0;
  }
  if (document.getElementById("input-lancio-rituale").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-rituali").value) || 0;
    mRituali = n * TABELLE.variabili.variabile3.value; // tipicamente -10 per step
  }
  if (document.getElementById("input-rounds").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-rounds").value) || 0;
    mConc = n * TABELLE.variabili.rounds.value; // tipicamente -1 per round
  }

  let punteggiMagi = 0;
  if (document.getElementById("input-mago-aggiuntivo").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-magi-aggiuntivi").value);
    for (let i = 1; i <= n; i++) {
      const p = parseInt(document.getElementById("punteggio-mago-" + i).value) || 0;
      punteggiMagi += p;
    }
  }

  return {
    moltiplicatoreBersagli: mBersagli,
    moltiplicatoreDiametro: mDiametro,
    moltiplicatoreRound: mRound,
    moltiplicatoreMinuti10: mMin10,
    moltiplicatoreMagiAggiuntivi: mMagi,
    moltiplicatoreRituali: mRituali,
    moltiplicatoreConcentrazione: mConc,
    punteggiMagi
  };
}
/**
 * mostraPopupGradoMagia() — vedi implementazione per dettagli.
 * @returns {void}
 */

function mostraPopupGradoMagia() { window.showModal ? window.showModal("popup-grado-magia") : (document.getElementById("popup-grado-magia").style.display = "block"); }

document.addEventListener("DOMContentLoaded", () => {
  bootstrapSelects();

  document.getElementById("mente-checkbox").addEventListener("change", function () { if (this.checked) uncheckOtherCheckboxes("mente-checkbox"); });
  document.getElementById("corpo-checkbox").addEventListener("change", function () { if (this.checked) uncheckOtherCheckboxes("corpo-checkbox"); });
  document.getElementById("materia-checkbox").addEventListener("change", function () { if (this.checked) uncheckOtherCheckboxes("materia-checkbox"); });

  const closeBtn = document.getElementById("close-popup");
  if (closeBtn) closeBtn.addEventListener("click", () => { window.hideModal ? window.hideModal("popup-difficolta") : (document.getElementById("popup-difficolta").style.display = "none"); });
});

// document.addEventListener("DOMContentLoaded", () => {
//  const submit = document.getElementById("submit-grado-magia");
//  if (submit) {
//    submit.addEventListener("click", function () {
//      const gradoMagia = parseInt(document.getElementById("grado-magia").value);
//      const punteggioVolonta = parseInt(document.getElementById("punteggio-volonta").value);
//      window.hideModal ? window.hideModal("popup-grado-magia") : (document.getElementById("popup-grado-magia").style.display = "none");
//      calcolaDifficoltaConGrado(gradoMagia, punteggioVolonta);
//    });
//  }
//});
/**
 * incrementaGradoMagia() — vedi implementazione per dettagli.
 * @returns {void}
 */

function incrementaGradoMagia() { const el = document.getElementById("grado-magia"); el.value = parseInt(el.value) + 1; }
/**
 * decrementaGradoMagia() — vedi implementazione per dettagli.
 * @returns {void}
 */
function decrementaGradoMagia() { const el = document.getElementById("grado-magia"); if (parseInt(el.value) > 0) el.value = parseInt(el.value) - 1; }
/**
 * incrementaVolonta() — vedi implementazione per dettagli.
 * @returns {void}
 */
function incrementaVolonta()    { const el = document.getElementById("punteggio-volonta"); el.value = parseInt(el.value) + 1; }
/**
 * decrementaVolonta() — vedi implementazione per dettagli.
 * @returns {void}
 */
function decrementaVolonta()    { const el = document.getElementById("punteggio-volonta"); if (parseInt(el.value) > 0) el.value = parseInt(el.value) - 1; }
/**
 * calcolaDifficolta() — vedi implementazione per dettagli.
 * @returns {void}
 */

function calcolaDifficolta() { mostraPopupGradoMagia(); }
/**
 * calcolaFaticaEDannoBase() — vedi implementazione per dettagli.
 * @param {any} gradoMagia
 * @param {any} difficoltaTotale
 * @returns {void}
 */

function calcolaFaticaEDannoBase(gradoMagia, difficoltaTotale) {
  const { fatica, dannoBase } = _faticaEDannoBase(gradoMagia, difficoltaTotale);
  document.getElementById('dadi-danno-riepilogo').textContent = costruisciRiepilogoDadi();
  return { fatica, dannoBase };
}
/**
 * costruisciRiepilogoDadi() — vedi implementazione per dettagli.
 * @returns {void}
 */

function costruisciRiepilogoDadi() {
  let out = '';
  TABELLE.dadi.forEach(d => {
    const q = parseInt(document.getElementById(d.id).value) || 0;
    if (q > 0) {
      if (out) out += ' + ';
      out += `${q} ${d.tipo}`;
    }
  });
  return out || 'Nessun dado';
}
/**
 * calcolaDifficoltaResistenza() — vedi implementazione per dettagli.
 * @param {any} difficoltaLancio
 * @returns {void}
 */

function calcolaDifficoltaResistenza(difficoltaLancio) {
  return _difficoltaResistenza(difficoltaLancio);
}
/**
 * calcolaDifficoltaConGrado() — vedi implementazione per dettagli.
 * @param {any} gradoMagia
 * @param {any} punteggioVolonta
 * @returns {void}
 */

function calcolaDifficoltaConGrado(gradoMagia, punteggioVolonta) {
  const base = TABELLE.baseline.difficoltaBase;

  const selVal = id => parseInt(document.getElementById(id).value) || 0;

  const distanza  = selVal("distanza");
  const area      = selVal("area");
  const durata    = selVal("durata");
  const gesti     = selVal("gesti");
  const verbale   = selVal("verbale");
  const posizione = selVal("posizione");
  const mod_corpo   = selVal("modificatori_corpo");
  const mod_materia = selVal("modificatori_materia");
  const mod_mente   = selVal("modificatori_mente");

  const {
    moltiplicatoreBersagli,
    moltiplicatoreDiametro,
    moltiplicatoreRound,
    moltiplicatoreMinuti10,
    moltiplicatoreMagiAggiuntivi,
    moltiplicatoreRituali,
    moltiplicatoreConcentrazione,
    punteggiMagi
  } = calcolaMoltiplicatori();

  let effetti = 0;
  if (document.getElementById("variabile1").checked) effetti += TABELLE.variabili.variabile1.value;
  if (document.getElementById("effetto1").checked)   effetti += TABELLE.effetti.effetto1.value;
  if (document.getElementById("effetto2").checked)   effetti += TABELLE.effetti.effetto2.value;
  if (document.getElementById("effetto3").checked)   effetti += TABELLE.effetti.effetto3.value;

  // Dadi aggiuntivi
  let danni_totali = 0;
  TABELLE.dadi.forEach(d => {
    danni_totali += (parseInt(document.getElementById(d.id).value) || 0) * d.costo;
  });

  let totale = base + distanza + area + durata + gesti + verbale + posizione
    + moltiplicatoreBersagli + moltiplicatoreDiametro + moltiplicatoreRound
    + moltiplicatoreMinuti10 + moltiplicatoreMagiAggiuntivi
    + moltiplicatoreRituali + moltiplicatoreConcentrazione
    + mod_corpo + mod_materia + mod_mente
    + effetti + danni_totali;

  totale -= punteggiMagi;

  const { fatica, dannoBase } = calcolaFaticaEDannoBase(gradoMagia, totale);
  const difficoltaRes = calcolaDifficoltaResistenza(totale);
  const lancioDadoNecessario = totale - gradoMagia - punteggioVolonta;

  document.getElementById("difficolta-totale-popup").innerText = totale;
  document.getElementById("lancio-dado-necessario").innerText = lancioDadoNecessario;
  document.getElementById("fatica-accumulata").innerText = fatica;
  document.getElementById("danno-base").innerText = dannoBase;
  document.getElementById("difficolta-resistenza").innerText = difficoltaRes;

  window.showModal ? window.showModal("popup-difficolta") : (document.getElementById("popup-difficolta").style.display = "block");
}
/**
 * ripristinaValori() — vedi implementazione per dettagli.
 * @returns {void}
 */

function ripristinaValori() {
  const setVal = (id,v)=>{document.getElementById(id).value = String(v);};

  setVal("distanza","0"); setVal("area","0"); setVal("durata","0");
  setVal("gesti","0"); setVal("verbale","0"); setVal("posizione","0");
  setVal("modificatori_corpo","0"); setVal("modificatori_materia","0"); setVal("modificatori_mente","0");

  TABELLE.dadi.forEach(d => setVal(d.id, "0"));

  setVal("numero-bersagli","1"); setVal("numero-diametro","1"); setVal("numero-round","1");
  setVal("numero-minuti10","1");
  setVal("numero-magi-aggiuntivi","1"); setVal("numero-rituali","1"); setVal("numero-rounds","1");

  ["input-bersagli","input-diametro","input-round","input-minuti10","input-mago-aggiuntivo","input-lancio-rituale","input-rounds"]
    .forEach(id => document.getElementById(id).style.display = 'none');

  ["variabile1","variabile2","variabile3","rounds-checkbox","effetto1","effetto2","effetto3","corpo-checkbox","materia-checkbox","mente-checkbox"]
    .forEach(id => document.getElementById(id).checked = false);

  document.getElementById("difficolta-totale-popup").innerText = String(TABELLE.baseline.difficoltaBase);

  const pairs = [
    ["minus-d1","plus-d1","d1-controls","danni1"],
    ["minus-d4","plus-d4","d4-controls","danni2"],
    ["minus-d6","plus-d6","d6-controls","danni3"],
    ["minus-d8","plus-d8","d8-controls","danni4"],
    ["minus-d10","plus-d10","d10-controls","danni5"],
    ["minus-d12","plus-d12","d12-controls","danni6"],
    ["minus-d20","plus-d20","d20-controls","danni7"]
  ];
  pairs.forEach(([minusId, plusId, controlsId, inputId]) => {
    document.getElementById(minusId).style.display = "none";
    document.getElementById(plusId).style.display = "none";
    document.getElementById(controlsId).style.display = "none";
    document.getElementById(inputId).value = "0";
  });
}
