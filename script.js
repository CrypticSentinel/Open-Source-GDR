/* ================================================
 *  Magic – Calcolo Difficoltà (Refactor JSON)
 *  - Tabelle esterne (fatica/danno, resistenza)
 *  - Robustezza (guard, NaN, array vuoti)
 *  - Prefetch + await al calcolo
 *  - SW path relativo
 * ================================================ */

/* ------------------------------
 * Config / Namespace
 * ------------------------------ */
const DEBUG = false; // metti true in debug locale

const TABELLE = {
  fatica: null,       // { righe: [ { grado:[min,max], fatica0, intervalli[], dannoBase } ] }
  resistenza: null,   // { range: [ { min, max, resistenza } ] }
  loaded: false
};

/* ------------------------------
 * Utils
 * ------------------------------ */
function clamp(n, min, max) {
  const x = Number(n);
  if (!Number.isFinite(x)) return min;
  return Math.max(min, Math.min(max, x));
}

function safeNum(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function log(...args) { if (DEBUG) console.log('[MagicCalc]', ...args); }

/* ------------------------------
 * Loader Tabelle (JSON)
 * ------------------------------ */
async function caricaTabelle() {
  if (TABELLE.loaded) return;
  const [faticaRes, resistRes] = await Promise.all([
    fetch('data/fatica_danno.json').then(r => {
      if (!r.ok) throw new Error('fatica_danno.json non raggiungibile');
      return r.json();
    }),
    fetch('data/resistenza.json').then(r => {
      if (!r.ok) throw new Error('resistenza.json non raggiungibile');
      return r.json();
    })
  ]);

  // Validazione minima
  if (!faticaRes || !Array.isArray(faticaRes.righe)) {
    throw new Error('Formato fatica_danno.json non valido');
  }
  if (!resistRes || !Array.isArray(resistRes.range)) {
    throw new Error('Formato resistenza.json non valido');
  }

  TABELLE.fatica = faticaRes;
  TABELLE.resistenza = resistRes;
  TABELLE.loaded = true;
  log('Tabelle caricate', { fatica: faticaRes?.version, resistenza: resistRes?.version });
}

/* Prefetch all’avvio (non-blocking) */
caricaTabelle().catch(() => {
  // Non blocca la pagina; al momento del calcolo rifaremo un await
  log('Tabelle non disponibili all’avvio. Verranno ricaricate al calcolo.');
});

/* ------------------------------
 * Funzioni di calcolo (JSON-based)
 * ------------------------------ */

/**
 * Difficoltà per Resistere
 * @param {number} difficoltaLancio
 * @returns {number} difficoltà di resistenza
 */
function calcolaDifficoltaResistenza(difficoltaLancio) {
  const tab = (TABELLE?.resistenza?.range) || [];
  const d = Number(difficoltaLancio);

  if (!tab.length || !Number.isFinite(d)) return 0;

  // sotto il minimo → prima soglia
  if (d < tab[0].min) return tab[0].resistenza;
  // sopra il massimo → ultima soglia
  if (d > tab[tab.length - 1].max) return tab[tab.length - 1].resistenza;

  // ricerca lineare (lista breve)
  for (let i = 0; i < tab.length; i++) {
    const r = tab[i];
    if (d >= r.min && d <= r.max) return r.resistenza;
  }
  return 0;
}

/**
 * Fatica & Danno Base
 * @param {number} gradoMagia
 * @param {number} difficoltaTotale
 * @returns {{ fatica:number, dannoBase:string|number }}
 */
function calcolaFaticaEDannoBase(gradoMagia, difficoltaTotale) {
  const righe = (TABELLE?.fatica?.righe) || [];
  const g = clamp(gradoMagia, 1, 999);
  const d = Number(difficoltaTotale);

  if (!righe.length || !Number.isFinite(d)) {
    // Fallback neutro
    return { fatica: 0, dannoBase: '+0' };
  }

  // trova riga per range di grado
  const riga = righe.find(r =>
    Array.isArray(r.grado) &&
    Number.isFinite(r.grado[0]) &&
    Number.isFinite(r.grado[1]) &&
    g >= r.grado[0] &&
    g <= r.grado[1]
  );

  if (!riga) return { fatica: 0, dannoBase: '+0' };

  let fatica = 0;
  if (d < riga.fatica0) {
    fatica = 0;
  } else {
    // ogni scaglione raggiunto incrementa la fatica (valori negativi)
    // es: <= intervalli[0] → -1; <= intervalli[1] → -2; ... > ultimo → -(len+1)
    let assegnata = false;
    for (let i = 0; i < riga.intervalli.length; i++) {
      if (d <= riga.intervalli[i]) {
        fatica = -(i + 1);
        assegnata = true;
        break;
      }
    }
    if (!assegnata) fatica = -(riga.intervalli.length + 1);
  }

  // Aggiorna eventuale riepilogo dadi (se la funzione esiste nel tuo progetto)
  try {
    if (typeof costruisciRiepilogoDadi === 'function') {
      const riepilogo = costruisciRiepilogoDadi();
      const out = document.getElementById('dadi-danno-riepilogo');
      if (out) out.textContent = riepilogo;
    }
  } catch (e) {
    log('Riepilogo dadi non aggiornato (funzione non presente):', e?.message);
  }

  return { fatica, dannoBase: riga.dannoBase };
}

/* ------------------------------
 * Integrazione con il tuo flusso UI
 * ------------------------------ */

/**
 * 1) Al click su "Conferma" nel popup del grado magia,
 *    ci assicuriamo PRIMA di avere le tabelle caricate.
 *    Usiamo un listener in capturing per eseguirci prima
 *    di eventuali altri handler già presenti.
 */
(function wirePopupConfirmAwait() {
  const BTN_ID = 'submit-grado-magia';
  const btn = document.getElementById(BTN_ID);

  // Se il DOM non è ancora pronto, rilancia dopo load
  if (!btn) {
    window.addEventListener('load', wirePopupConfirmAwait, { once: true });
    return;
  }

  // Listener in "capture" → si esegue prima di altri
  btn.addEventListener('click', async (ev) => {
    try {
      await caricaTabelle();
    } catch (e) {
      console.error('Errore nel caricamento delle tabelle:', e);
      alert('Impossibile caricare le tabelle di difficoltà. Riprova più tardi.');
      // blocco la propagazione per evitare calcoli incoerenti
      ev.stopImmediatePropagation?.();
      ev.preventDefault?.();
    }
    // se ok, NON fermo l’evento: i tuoi handler esistenti continueranno
  }, { capture: true });
})();

/**
 * 2) Service Worker registration (percorso relativo)
 *    Se lo registri altrove, questo blocco è innocuo.
 */
(function swRegister() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
      log('SW registrato');
    } catch (e) {
      log('SW non registrato:', e?.message);
    }
  });
})();

/* ------------------------------
 * Facoltativo: API di utilità per il resto del codice
 * ------------------------------ */

/**
 * Calcola e aggiorna in pagina gli output, se i campi/ID esistono.
 * Puoi continuare a usare le tue funzioni, questo è un helper.
 */
async function aggiornaCalcoliSelezioniCorrenti() {
  // Assicura tabelle disponibili
  try { await caricaTabelle(); } catch (e) { alert('Tabelle non disponibili'); return; }

  // Esempio di lettura di campi (adatta ai tuoi ID se diversi)
  const grado = safeNum(document.getElementById('grado-magia')?.value, 1);
  const diffTotale = safeNum(document.getElementById('difficolta-totale')?.textContent ||
                             document.getElementById('difficolta-totale')?.value, 0);

  const res = calcolaDifficoltaResistenza(diffTotale);
  const fd = calcolaFaticaEDannoBase(grado, diffTotale);

  const outRes = document.getElementById('difficolta-resistere');
  const outFat = document.getElementById('fatica-caster');
  const outDan = document.getElementById('danno-base');

  if (outRes) outRes.textContent = String(res);
  if (outFat) outFat.textContent = String(fd.fatica);
  if (outDan) outDan.textContent = String(fd.dannoBase);

  log('Calcoli aggiornati', { grado, diffTotale, resistenza: res, fatica: fd.fatica, dannoBase: fd.dannoBase });
}

/* Esportiamo in window per uso da altre parti del tuo script/HTML */
window.caricaTabelle = caricaTabelle;
window.calcolaDifficoltaResistenza = calcolaDifficoltaResistenza;
window.calcolaFaticaEDannoBase = calcolaFaticaEDannoBase;
window.aggiornaCalcoliSelezioniCorrenti = aggiornaCalcoliSelezioniCorrenti;

/* ------------------------------
 * NOTE DI INTEGRAZIONE
 * ------------------------------
 * - Mantieni le tue funzioni/UI: questo file forza SOLO l’uso delle versioni
 *   corrette delle funzioni di calcolo e si assicura che le tabelle siano caricate.
 * - Se avevi versioni legacy delle stesse funzioni:
 *     • Rimuovile dal tuo file precedente oppure
 *     • Lasciale ma *dopo* questo file NON devono ridefinire i nomi (qui assegniamo in window).
 * - Se vuoi eliminare la dipendenza dai testi delle option (es. "Ogni 7 minuti"),
 *   passa a value/flag semantici (es. value="min7") e gestiscili con logica basata su value.
 */
