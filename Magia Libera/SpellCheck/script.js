
/** UI tables externalized – loads UI options + rules from JSON **/

const PATHS = {
  FATICA: 'data/fatica_danno.json',
  RESIST: 'data/resistenza.json',
  UI:     'data/ui_options.json'
};

async function loadConfig() {
  if (window.MAGICCFG.loaded) return;
  const [fatica, resist, ui] = await Promise.all([
    fetch(PATHS.FATICA).then(r => r.json()),
    fetch(PATHS.RESIST).then(r => r.json()),
    fetch(PATHS.UI).then(r => r.json())
  ]);
  window.MAGICCFG.fatica = fatica;
  window.MAGICCFG.resistenza = resist;
  window.MAGICCFG.ui = ui;
  window.MAGICCFG.loaded = true;
}

function populateSelect(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '';
  items.forEach(it => {
    const opt = document.createElement('option');
    opt.value = String(it.value);
    opt.text = it.label;
    if (it.selected) opt.selected = true;
    // attach flag via dataset when present
    if (it.flag) opt.dataset.flag = it.flag;
    el.add(opt);
  });
}

function getSelectedFlag(selectEl) {
  const opt = selectEl.options[selectEl.selectedIndex];
  return opt?.dataset?.flag || null;
}

function bindDynamicInputs() {
  const areaSel = document.getElementById('area');
  const durataSel = document.getElementById('durata');
  const areaParams = document.getElementById('area-params');
  const durataParams = document.getElementById('durata-params');

  const updateAreaUI = () => {
    const flag = getSelectedFlag(areaSel);
    // show if bersagli o diametro
    areaParams.style.display = (flag === 'bersagli' || flag === 'diametro') ? 'grid' : 'none';
  };

  const updateDurataUI = () => {
    const flag = getSelectedFlag(durataSel);
    durataParams.style.display = (flag === 'round' || flag === 'minuti7' || flag === 'minuti15') ? 'grid' : 'none';
  };

  areaSel.addEventListener('change', updateAreaUI);
  durataSel.addEventListener('change', updateDurataUI);
  updateAreaUI();
  updateDurataUI();
}

/** ----------------
 * CALCOLI
 * ---------------*/

function safeNum(v, min = -9999, max = 9999) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(min, Math.min(max, n));
}

function computeLancioBase() {
  const base = safeNum(document.getElementById('difficolta-base').value, 0, 999);
  let sum = base;

  // distanza: semplice valore additivo
  const dist = safeNum(document.getElementById('distanza').value, -50, 200);
  sum += dist;

  // area
  const areaSel = document.getElementById('area');
  const areaVal = safeNum(areaSel.value, -50, 200);
  const areaFlag = getSelectedFlag(areaSel);
  sum += areaVal;

  if (areaFlag === 'bersagli') {
    const extraTargets = safeNum(document.getElementById('numero-bersagli').value, 0, 100);
    sum += extraTargets * 5;
  }
  if (areaFlag === 'diametro') {
    const diamMultipli = safeNum(document.getElementById('diametro').value, 0, 100);
    sum += diamMultipli * 5;
  }

  // durata
  const durataSel = document.getElementById('durata');
  const durataVal = safeNum(durataSel.value, -50, 200);
  const durataFlag = getSelectedFlag(durataSel);
  sum += durataVal;

  if (durataFlag === 'round') {
    const rounds = safeNum(document.getElementById('round').value, 0, 100);
    sum += rounds * 2;
  }
  if (durataFlag === 'minuti7') {
    const b7 = safeNum(document.getElementById('minuti7').value, 0, 100);
    sum += b7 * 5;
  }
  if (durataFlag === 'minuti15') {
    const b15 = safeNum(document.getElementById('minuti15').value, 0, 100);
    sum += b15 * 10;
  }

  return { totale: sum, breakdown: { base, dist, area: areaVal, durata: durataVal, areaFlag, durataFlag } };
}

function calcolaDifficoltaResistenza(difficoltaLancio) {
  const tab = window.MAGICCFG?.resistenza?.range || [];
  if (!tab.length || !Number.isFinite(difficoltaLancio)) return 0;

  if (difficoltaLancio < tab[0].min) return tab[0].resistenza;
  if (difficoltaLancio > tab[tab.length - 1].max) return tab[tab.length - 1].resistenza;

  for (let i = 0; i < tab.length; i++) {
    if (difficoltaLancio >= tab[i].min && difficoltaLancio <= tab[i].max) {
      return tab[i].resistenza;
    }
  }
  return 0;
}

function calcolaFaticaEDannoBase(gradoMagia, difficoltaTotale) {
  const righe = window.MAGICCFG?.fatica?.righe || [];
  const riga = righe.find(r => {
    const g = Array.isArray(r.grado) ? r.grado : [r.gradoMin, r.gradoMax];
    return gradoMagia >= g[0] && gradoMagia <= g[1];
  });
  if (!riga) return { fatica: 0, dannoBase: "+0" };

  let fatica = 0;
  if (difficoltaTotale < riga.fatica0) {
    fatica = 0;
  } else {
    fatica = -1;
    for (let i = 0; i < riga.intervalli.length; i++) {
      if (difficoltaTotale <= riga.intervalli[i]) { fatica = -(i + 1); break; }
      if (i === riga.intervalli.length - 1 && difficoltaTotale > riga.intervalli[i]) fatica = -(i + 2);
    }
  }
  return { fatica, dannoBase: riga.dannoBase };
}

/** ---------
 * UI Logic
 * --------*/
function updateResults() {
  const grado = safeNum(document.getElementById('grado').value, 1, 20);
  const { totale, breakdown } = computeLancioBase();

  const diffRes = calcolaDifficoltaResistenza(totale);
  const faticaDanno = calcolaFaticaEDannoBase(grado, totale);

  document.getElementById('diff-lancio').textContent = String(totale);
  document.getElementById('diff-resistenza').textContent = String(diffRes);
  document.getElementById('fatica').textContent = String(faticaDanno.fatica);
  document.getElementById('danno-base').textContent = String(faticaDanno.dannoBase);

  const b = {
    ...breakdown,
    totale,
    resistenza: diffRes,
    fatica: faticaDanno.fatica,
    dannoBase: faticaDanno.dannoBase
  };
  document.getElementById('breakdown').textContent = JSON.stringify(b, null, 2);
}

function resetAll() {
  document.getElementById('grado').value = 5;
  document.getElementById('difficolta-base').value = 30;
  document.getElementById('numero-bersagli').value = 0;
  document.getElementById('diametro').value = 0;
  document.getElementById('round').value = 0;
  document.getElementById('minuti7').value = 0;
  document.getElementById('minuti15').value = 0;
  updateResults();
}

async function bootstrap() {
  await loadConfig();
  const ui = window.MAGICCFG.ui;
  populateSelect('distanza', ui.distanza);
  populateSelect('area', ui.area);
  populateSelect('durata', ui.durata);

  bindDynamicInputs();

  document.getElementById('calcola').addEventListener('click', updateResults);
  document.getElementById('reset').addEventListener('click', resetAll);

  ['grado','difficolta-base','distanza','area','durata','numero-bersagli','diametro','round','minuti7','minuti15']
    .forEach(id => document.getElementById(id).addEventListener('input', updateResults));

  updateResults();

  // PWA install handler (basic)
  let deferredPrompt = null;
  const installBtn = document.getElementById('install-button');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });

  if ('serviceWorker' in navigator) {
    try { await navigator.serviceWorker.register('service-worker.js'); } catch(e) {}
  }
}

bootstrap().catch(err => {
  console.error('Errore di bootstrap', err);
  alert('Errore nel caricamento delle tabelle. Controlla i file JSON.');
});
