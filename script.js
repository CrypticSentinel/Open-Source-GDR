/* ================================================
 *  Magic – Calcolo Difficoltà (Refactor UI+Tabelle)
 *  - Tutte le tabelle fuori da index.html (JSON)
 *  - Robustezza: guard/NaN/array vuoti
 *  - Prefetch all’avvio + await al calcolo
 *  - SW path relativo
 * ================================================ */

const DEBUG = false; // imposta true per debugging locale

/* ------------------------------
 * Namespace Tabelle/UI
 * ------------------------------ */
const TABELLE = {
  fatica: null,       // { righe: [ { grado:[min,max], fatica0, intervalli[], dannoBase } ] }
  resistenza: null,   // { range: [ { min, max, resistenza } ] }
  ui: null,           // { distanza:[...], area:[...], durata:[...], version:"..." }
  loaded: false
};

/* ------------------------------
 * Utils
 * ------------------------------ */
function log(...args) { if (DEBUG) console.log('[MagicCalc]', ...args); }
function clamp(n, min, max) {
  const x = Number(n);
  if (!Number.isFinite(x)) return min;
  return Math.max(min, Math.min(max, x));
}
function safeNum(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/* ------------------------------
 * Loader Tabelle (JSON)
 * ------------------------------ */
async function caricaTabelle() {
  if (TABELLE.loaded) return;

  const [faticaRes, resistRes, uiRes] = await Promise.all([
    fetch('data/fatica_danno.json').then(r => {
      if (!r.ok) throw new Error('fatica_danno.json non raggiungibile');
      return r.json();
    }),
    fetch('data/resistenza.json').then(r => {
      if (!r.ok) throw new Error('resistenza.json non raggiungibile');
      return r.json();
    }),
    fetch('data/ui_options.json').then(r => {
      if (!r.ok) throw new Error('ui_options.json non raggiungibile');
      return r.json();
    })
  ]);

  if (!faticaRes || !Array.isArray(faticaRes.righe)) {
    throw new Error('Formato fatica_danno.json non valido');
  }
  if (!resistRes || !Array.isArray(resistRes.range)) {
    throw new Error('Formato resistenza.json non valido');
  }
  if (!uiRes || !uiRes.distanza || !uiRes.area || !uiRes.durata) {
    throw new Error('Formato ui_options.json non valido');
  }

  TABELLE.fatica = faticaRes;
  TABELLE.resistenza = resistRes;
  TABELLE.ui = uiRes;
  TABELLE.loaded = true;

  log('Tabelle/UI caricate', { fatica: faticaRes?.version, resistenza: resistRes?.version, ui: uiRes?.version });
}

/* Prefetch all’avvio (non blocking) */
caricaTabelle().catch(() => log('Tabelle non disponibili all’avvio (verranno caricate al primo calcolo).'));

/* ------------------------------
 * Popolamento Select da JSON
 * ------------------------------ */
function populateSelect(id, items) {
  const sel = document.getElementById(id);
  if (!sel) return;
  sel.innerHTML = '';
  items.forEach(it => {
    const opt = document.createElement('option');
    opt.value = String(it.value);
    opt.textContent = it.label;
    if (it.selected) opt.selected = true;
    sel.add(opt);
  });
}

/* ------------------------------
 * UI dinamica (campi condizionali)
 * ------------------------------ */
function bindDynamicInputs() {
  const areaSel = document.getElementById('area');
  const durataSel = document.getElementById('durata');
  const areaParams = document.getElementById('area-params');
  const durataParams = document.getElementById('durata-params');

  const updateArea = () => {
    const idx = areaSel.selectedIndex;
    const flag = TABELLE.ui.area[idx]?.flag;
    // Mostra se è una delle voci con parametri aggiuntivi
    areaParams.style.display = (flag === 'bersagli' || flag === 'diametro') ? 'grid' : 'none';
  };

  const updateDurata = () => {
    const idx = durataSel.selectedIndex;
    const flag = TABELLE.ui.durata[idx]?.flag;
    durataParams.style.display = (flag === 'round' || flag === 'minuti7' || flag === 'minuti15') ? 'grid' : 'none';
  };

  areaSel.addEventListener('change', updateArea);
  durataSel.addEventListener('change', updateDurata);
  updateArea();
  updateDurata();
}

/* ------------------------------
 * Calcolo Difficoltà
 * ------------------------------ */
function calcolaDifficoltaResistenza(difficoltaLancio) {
  const tab = (TABELLE?.resistenza?.range) || [];
  const d = Number(difficoltaLancio);

  if (!tab.length || !Number.isFinite(d)) return 0;
  if (d < tab[0].min) return tab[0].resistenza;
  if (d > tab[tab.length - 1].max) return tab[tab.length - 1].resistenza;

  for (let i = 0; i < tab.length; i++) {
    const r = tab[i];
    if (d >= r.min && d <= r.max) return r.resistenza;
  }
  return 0;
}

function calcolaFaticaEDannoBase(gradoMagia, difficoltaTotale) {
  const righe = (TABELLE?.fatica?.righe) || [];
  const g = clamp(gradoMagia, 1, 999);
  const d = Number(difficoltaTotale);

  if (!righe.length || !Number.isFinite(d)) return { fatica: 0, dannoBase: '+0' };

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
    let assegnata = false;
    for (let i = 0; i < riga.intervalli.length; i++) {
      if (d <= riga.intervalli[i]) { fatica = -(i + 1); assegnata = true; break; }
    }
    if (!assegnata) fatica = -(riga.intervalli.length + 1);
  }

  try {
    if (typeof costruisciRiepilogoDadi === 'function') {
      const riepilogo = costruisciRiepilogoDadi();
      const out = document.getElementById('dadi-danno-riepilogo');
      if (out) out.textContent = riepilogo;
    }
  } catch (e) { log('Riepilogo dadi: funzione non presente.'); }

  return { fatica, dannoBase: riga.dannoBase };
}

/* ------------------------------
 * Composizione Difficoltà di Lancio (UI esistente)
 * Nota: questa funzione è un esempio base.
 * Se hai già la tua compute, mantienila e
 * limita l’uso di queste util per coerenza.
 * ------------------------------ */
function computeLancioBaseFromUI() {
  const base = safeNum(document.getElementById('difficolta-base')?.value, 0);
  let sum = base;

  const dist = safeNum(document.getElementById('distanza')?.value, 0);
  sum += dist;

  // AREA
  const areaSel = document.getElementById('area');
  const areaVal = safeNum(areaSel?.value, 0);
  const areaIdx = areaSel?.selectedIndex ?? -1;
  const areaFlag = areaIdx >= 0 ? TABELLE.ui.area[areaIdx]?.flag : null;
  sum += areaVal;
  if (areaFlag === 'bersagli') {
    const extraTargets = clamp(document.getElementById('numero-bersagli')?.value, 0, 100);
    sum += extraTargets * 5;
  }
  if (areaFlag === 'diametro') {
    const diamMultipli = clamp(document.getElementById('diametro')?.value, 0, 100);
    sum += diamMultipli * 5;
  }

  // DURATA
  const durataSel = document.getElementById('durata');
  const durataVal = safeNum(durataSel?.value, 0);
  const durataIdx = durataSel?.selectedIndex ?? -1;
  const durataFlag = durataIdx >= 0 ? TABELLE.ui.durata[durataIdx]?.flag : null;
  sum += durataVal;
  if (durataFlag === 'round') {
    const rounds = clamp(document.getElementById('round')?.value, 0, 100);
    sum += rounds * 2;
  }
  if (durataFlag === 'minuti7') {
    const b7 = clamp(document.getElementById('minuti7')?.value, 0, 100);
    sum += b7 * 5;
  }
  if (durataFlag === 'minuti15') {
    const b15 = clamp(document.getElementById('minuti15')?.value, 0, 100);
    sum += b15 * 10;
  }

  return sum;
}

/* ------------------------------
 * Flow: integrazione col popup
 * ------------------------------ */
(function wirePopupConfirmAwait() {
  const BTN_ID = 'submit-grado-magia';
  const btn = document.getElementById(BTN_ID);

  if (!btn) {
    window.addEventListener('load', wirePopupConfirmAwait, { once: true });
    return;
  }

  btn.addEventListener('click', async (ev) => {
    try {
      await caricaTabelle();
      // Popola le select la prima volta
      if (TABELLE.ui && !wirePopupConfirmAwait._uiPopulated) {
        populateSelect('distanza', TABELLE.ui.distanza);
        populateSelect('area', TABELLE.ui.area);
        populateSelect('durata', TABELLE.ui.durata);
        bindDynamicInputs();
        wirePopupConfirmAwait._uiPopulated = true;
      }
    } catch (e) {
      console.error('Errore nel caricamento delle tabelle:', e);
      alert('Impossibile caricare le tabelle di difficoltà. Verifica i file in /data.');
      ev.stopImmediatePropagation?.();
      ev.preventDefault?.();
    }
  }, { capture: true });
})();

/* ------------------------------
 * Helper di calcolo “end-to-end”
 * (se vuoi usarlo direttamente)
 * ------------------------------ */
async function aggiornaCalcoliSelezioniCorrenti() {
  try { await caricaTabelle(); } catch (e) { alert('Tabelle non disponibili'); return; }

  const grado = safeNum(document.getElementById('grado-magia')?.value, 1);
  const diffTotale = computeLancioBaseFromUI();

  const diffRes = calcolaDifficoltaResistenza(diffTotale);
  const fd = calcolaFaticaEDannoBase(grado, diffTotale);

  const outLancio = document.getElementById('difficolta-totale');
  const outRes = document.getElementById('difficolta-resistere');
  const outFat = document.getElementById('fatica-caster');
  const outDan = document.getElementById('danno-base');

  if (outLancio) outLancio.textContent = String(diffTotale);
  if (outRes) outRes.textContent = String(diffRes);
  if (outFat) outFat.textContent = String(fd.fatica);
  if (outDan) outDan.textContent = String(fd.dannoBase);

  log('Aggiornamento calcoli', { grado, diffTotale, diffRes, fatica: fd.fatica, dannoBase: fd.dannoBase });
}

/* ------------------------------
 * Service Worker (relativo)
 * ------------------------------ */
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

/* Esporta funzioni utili in window per compatibilità */
window.caricaTabelle = caricaTabelle;
window.populateSelect = populateSelect;
window.bindDynamicInputs = bindDynamicInputs;
window.computeLancioBaseFromUI = computeLancioBaseFromUI;
window.calcolaDifficoltaResistenza = calcolaDifficoltaResistenza;
window.calcolaFaticaEDannoBase = calcolaFaticaEDannoBase;
window.aggiornaCalcoliSelezioniCorrenti = aggiornaCalcoliSelezioniCorrenti;
