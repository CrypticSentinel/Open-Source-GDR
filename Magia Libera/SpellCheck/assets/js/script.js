const ASSETS_BASE = 'assets/';
const ICONS_BASE  = ASSETS_BASE + 'icons/';
const IMG_BASE    = ASSETS_BASE + 'img/';

/* =======================
   Bootstrap dei SELECT
   ======================= */
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

function getSelectedCode(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return null;
  const opt = sel.options[sel.selectedIndex];
  return opt?.dataset?.code || null;
}

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

/* =======================
   Funzioni UI
   ======================= */
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

function mostraInputDurata() {
  const code = getSelectedCode("durata");
  const inputRound   = document.getElementById("input-round");
  const inputMinuti7 = document.getElementById("input-minuti7");
  const inputMinuti15= document.getElementById("input-minuti15");

  inputRound.style.display   = (code === "DUR_ROUND_OLTRE") ? 'block' : 'none';
  inputMinuti7.style.display = (code === "DUR_MIN_7")       ? 'block' : 'none';
  inputMinuti15.style.display= (code === "DUR_MIN_15")      ? 'block' : 'none';

  if (code !== "DUR_ROUND_OLTRE") document.getElementById("numero-round").value = "1";
  if (code !== "DUR_MIN_7")       document.getElementById("numero-minuti7").value = "1";
  if (code !== "DUR_MIN_15")      document.getElementById("numero-minuti15").value = "1";
}

function incrementaMagiAggiuntivi() {
  const inputElement = document.getElementById("numero-magi-aggiuntivi");
  let v = parseInt(inputElement.value);
  if (v < 4) {
    inputElement.value = v + 1;
    aggiornaPunteggiMagiAggiuntivi();
  }
}
function decrementaMagiAggiuntivi() {
  const inputElement = document.getElementById("numero-magi-aggiuntivi");
  let v = parseInt(inputElement.value);
  if (v > 1) {
    inputElement.value = v - 1;
    aggiornaPunteggiMagiAggiuntivi();
  }
}
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
function incrementaPunteggioMago(i) { const el = document.getElementById("punteggio-mago-" + i); el.value = parseInt(el.value) + 1; }
function decrementaPunteggioMago(i) { const el = document.getElementById("punteggio-mago-" + i); if (parseInt(el.value) > 0) el.value = parseInt(el.value) - 1; }

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

function mostraInputRound() {
  const roundsCheckbox = document.getElementById("rounds-checkbox");
  const inputRounds = document.getElementById("input-rounds");
  inputRounds.style.display = roundsCheckbox.checked ? 'block' : 'none';
  if (!roundsCheckbox.checked) document.getElementById("numero-rounds").value = "1";
}

function toggleCorpoDropdown() {
  const corpoCheckbox = document.getElementById("corpo-checkbox");
  const corpoDropdownContainer = document.getElementById("corpo-dropdown-container");
  corpoDropdownContainer.style.display = corpoCheckbox.checked ? 'block' : 'none';
  if (!corpoCheckbox.checked) document.getElementById("modificatori_corpo").value = "0";
}
function toggleMateriaDropdown() {
  const materiaCheckbox = document.getElementById("materia-checkbox");
  const materiaDropdownContainer = document.getElementById("materia-dropdown-container");
  materiaDropdownContainer.style.display = materiaCheckbox.checked ? 'block' : 'none';
  if (!materiaCheckbox.checked) document.getElementById("modificatori_materia").value = "0";
}
function toggleMenteDropdown() {
  const menteCheckbox = document.getElementById("mente-checkbox");
  const menteDropdownContainer = document.getElementById("mente-dropdown-container");
  menteDropdownContainer.style.display = menteCheckbox.checked ? 'block' : 'none';
  if (!menteCheckbox.checked) document.getElementById("modificatori_mente").value = "0";
}

function uncheckOtherCheckboxes(checkedId) {
  ["mente-checkbox", "corpo-checkbox", "materia-checkbox"].forEach(id => {
    if (id !== checkedId) document.getElementById(id).checked = false;
  });
  toggleCorpoDropdown(); toggleMenteDropdown(); toggleMateriaDropdown();
}

/* Toggle dadi */
function toggled1() { toggleDieControls("d1"); }
function toggleD4()  { toggleDieControls("d4"); }
function toggleD6()  { toggleDieControls("d6"); }
function toggleD8()  { toggleDieControls("d8"); }
function toggleD10() { toggleDieControls("d10"); }
function toggleD12() { toggleDieControls("d12"); }
function toggleD20() { toggleDieControls("d20"); }

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

function incrementaInput(inputId) { const el = document.getElementById(inputId); el.value = parseInt(el.value) + 1; }
function decrementaInput(inputId) { const el = document.getElementById(inputId); if (parseInt(el.value) > 0) el.value = parseInt(el.value) - 1; }
function incrementaRoundConcentrazione() {
  const el = document.getElementById('numero-rounds'); const v = parseInt(el.value);
  if (v < 10) el.value = v + 1;
}

/* =======================
   Calcoli - funzioni PURE per test
   ======================= */
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

function _difficoltaResistenza(difficoltaLancio, tab = TABELLE.difficoltaResistenza) {
  if (difficoltaLancio < tab[0].min) return tab[0].resistenza;
  if (difficoltaLancio > tab[tab.length - 1].max) return tab[tab.length - 1].resistenza;
  for (let i = 0; i < tab.length; i++) {
    if (difficoltaLancio >= tab[i].min && difficoltaLancio <= tab[i].max) return tab[i].resistenza;
  }
  return 0;
}

/* =======================
   Calcoli - logica UI
   ======================= */
function calcolaMoltiplicatori() {
  let mBersagli = 0, mDiametro = 0, mRound = 0, mMin7 = 0, mMin15 = 0, mMagi = 0, mRituali = 0, mConc = 0;

  if (document.getElementById("input-bersagli").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-bersagli").value) || 0;
    mBersagli = (n - 1) * TABELLE.select.area.find(a => a.code === "AREA_BERSAGLI_OLTRE").value;
  }
  if (document.getElementById("input-diametro").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-diametro").value) || 0;
    mDiametro = (n - 1) * TABELLE.select.area.find(a => a.code === "AREA_DIAMETRO_5M").value;
  }
  if (document.getElementById("input-round").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-round").value) || 0;
    mRound = (n - 1) * TABELLE.select.durata.find(d => d.code === "DUR_ROUND_OLTRE").value;
  }
  if (document.getElementById("input-minuti7").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-minuti7").value) || 0;
    mMin7 = (n - 1) * TABELLE.select.durata.find(d => d.code === "DUR_MIN_7").value;
  }
  if (document.getElementById("input-minuti15").style.display === 'block') {
    const n = parseInt(document.getElementById("numero-minuti15").value) || 0;
    mMin15 = (n - 1) * TABELLE.select.durata.find(d => d.code === "DUR_MIN_15").value;
  }
  if (document.getElementById("input-mago-aggiuntivo").style.display === 'block') {
    // come da specifica: la variabile2 aggiunge maghi (sottrazione dei loro punteggi a valle)
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

  // Punteggi dei maghi aggiuntivi (si sottraggono dopo)
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
    moltiplicatoreMinuti7: mMin7,
    moltiplicatoreMinuti15: mMin15,
    moltiplicatoreMagiAggiuntivi: mMagi,
    moltiplicatoreRituali: mRituali,
    moltiplicatoreConcentrazione: mConc,
    punteggiMagi
  };
}

function mostraPopupGradoMagia() { document.getElementById("popup-grado-magia").style.display = 'block'; }

document.addEventListener("DOMContentLoaded", () => {
  bootstrapSelects();

  // wiring esclusività scuole
  document.getElementById("mente-checkbox").addEventListener("change", function () { if (this.checked) uncheckOtherCheckboxes("mente-checkbox"); });
  document.getElementById("corpo-checkbox").addEventListener("change", function () { if (this.checked) uncheckOtherCheckboxes("corpo-checkbox"); });
  document.getElementById("materia-checkbox").addEventListener("change", function () { if (this.checked) uncheckOtherCheckboxes("materia-checkbox"); });

  const closeBtn = document.getElementById("close-popup");
  if (closeBtn) closeBtn.addEventListener("click", () => { document.getElementById("popup-difficolta").style.display = 'none'; });
});

document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit-grado-magia");
  if (submit) {
    submit.addEventListener("click", function () {
      const gradoMagia = parseInt(document.getElementById("grado-magia").value);
      const punteggioVolonta = parseInt(document.getElementById("punteggio-volonta").value);
      document.getElementById("popup-grado-magia").style.display = 'none';
      calcolaDifficoltaConGrado(gradoMagia, punteggioVolonta);
    });
  }
});

function incrementaGradoMagia() { const el = document.getElementById("grado-magia"); el.value = parseInt(el.value) + 1; }
function decrementaGradoMagia() { const el = document.getElementById("grado-magia"); if (parseInt(el.value) > 0) el.value = parseInt(el.value) - 1; }
function incrementaVolonta()    { const el = document.getElementById("punteggio-volonta"); el.value = parseInt(el.value) + 1; }
function decrementaVolonta()    { const el = document.getElementById("punteggio-volonta"); if (parseInt(el.value) > 0) el.value = parseInt(el.value) - 1; }

function calcolaDifficolta() { mostraPopupGradoMagia(); }

function calcolaFaticaEDannoBase(gradoMagia, difficoltaTotale) {
  const { fatica, dannoBase } = _faticaEDannoBase(gradoMagia, difficoltaTotale);
  document.getElementById('dadi-danno-riepilogo').textContent = costruisciRiepilogoDadi();
  return { fatica, dannoBase };
}

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

function calcolaDifficoltaResistenza(difficoltaLancio) {
  return _difficoltaResistenza(difficoltaLancio);
}

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
    moltiplicatoreMinuti7,
    moltiplicatoreMinuti15,
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
    + moltiplicatoreMinuti7 + moltiplicatoreMinuti15 + moltiplicatoreMagiAggiuntivi
    + moltiplicatoreRituali + moltiplicatoreConcentrazione
    + mod_corpo + mod_materia + mod_mente
    + effetti + danni_totali;

  // sottrai punteggi dei maghi aggiuntivi
  totale -= punteggiMagi;

  const { fatica, dannoBase } = calcolaFaticaEDannoBase(gradoMagia, totale);
  const difficoltaRes = calcolaDifficoltaResistenza(totale);
  const lancioDadoNecessario = totale - gradoMagia - punteggioVolonta;

  document.getElementById("difficolta-totale-popup").innerText = totale;
  document.getElementById("lancio-dado-necessario").innerText = lancioDadoNecessario;
  document.getElementById("fatica-accumulata").innerText = fatica;
  document.getElementById("danno-base").innerText = dannoBase;
  document.getElementById("difficolta-resistenza").innerText = difficoltaRes;

  document.getElementById("popup-difficolta").style.display = 'block';
}

function ripristinaValori() {
  const setVal = (id,v)=>{document.getElementById(id).value = String(v);};

  setVal("distanza","0"); setVal("area","0"); setVal("durata","0");
  setVal("gesti","0"); setVal("verbale","0"); setVal("posizione","0");
  setVal("modificatori_corpo","0"); setVal("modificatori_materia","0"); setVal("modificatori_mente","0");

  TABELLE.dadi.forEach(d => setVal(d.id, "0"));

  setVal("numero-bersagli","1"); setVal("numero-diametro","1"); setVal("numero-round","1");
  setVal("numero-minuti7","1"); setVal("numero-minuti15","1");
  setVal("numero-magi-aggiuntivi","1"); setVal("numero-rituali","1"); setVal("numero-rounds","1");

  ["input-bersagli","input-diametro","input-round","input-minuti7","input-minuti15","input-mago-aggiuntivo","input-lancio-rituale","input-rounds"]
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
