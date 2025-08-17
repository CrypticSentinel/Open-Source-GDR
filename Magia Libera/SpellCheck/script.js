/* script.js
 * Aggiunta principale: popolamento dinamico dei SELECT da TABELLE (tabelle.js).
 * Il resto delle funzioni riprende la logica esistente.
 */

/* =======================
   Bootstrap dei SELECT
   ======================= */
function populateSelect(selectId, items) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = ""; // pulizia
  items.forEach(({ text, value, selected }) => {
    const opt = document.createElement("option");
    opt.textContent = text;
    opt.value = String(value);
    if (selected) opt.selected = true;
    sel.appendChild(opt);
  });
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

  // dropdown scuole (restano nascosti fino al check)
  populateSelect("modificatori_corpo", S.modificatori_corpo);
  populateSelect("modificatori_materia", S.modificatori_materia);
  populateSelect("modificatori_mente", S.modificatori_mente);
}

/* =======================
   Funzioni UI esistenti
   ======================= */
function mostraInputBersagliDiametro() {
  let areaSelect = document.getElementById("area");
  let inputBersagli = document.getElementById("input-bersagli");
  let inputDiametro = document.getElementById("input-diametro");

  if (areaSelect.value === "5" && areaSelect.options[areaSelect.selectedIndex].text.includes("Ogni bersaglio oltre il primo")) {
    inputBersagli.style.display = 'block';
  } else {
    document.getElementById("numero-bersagli").value = "1";
    inputBersagli.style.display = 'none';
  }

  if (areaSelect.value === "5" && areaSelect.options[areaSelect.selectedIndex].text.includes("Ogni 5 metri di diametro")) {
    inputDiametro.style.display = 'block';
  } else {
    document.getElementById("numero-diametro").value = "1";
    inputDiametro.style.display = 'none';
  }
}

function mostraInputDurata() {
  let durataSelect = document.getElementById("durata");
  let inputRound = document.getElementById("input-round");
  let inputMinuti7 = document.getElementById("input-minuti7");
  let inputMinuti15 = document.getElementById("input-minuti15");

  if (durataSelect.value === "2" && durataSelect.options[durataSelect.selectedIndex].text.includes("Ogni round oltre il primo")) {
    inputRound.style.display = 'block';
  } else {
    document.getElementById("numero-round").value = "1";
    inputRound.style.display = 'none';
  }

  if (durataSelect.value === "5" && durataSelect.options[durataSelect.selectedIndex].text.includes("Ogni 7 minuti")) {
    inputMinuti7.style.display = 'block';
  } else {
    document.getElementById("numero-minuti7").value = "1";
    inputMinuti7.style.display = 'none';
  }

  if (durataSelect.value === "10" && durataSelect.options[durataSelect.selectedIndex].text.includes("Ogni 15 minuti")) {
    inputMinuti15.style.display = 'block';
  } else {
    document.getElementById("numero-minuti15").value = "1";
    inputMinuti15.style.display = 'none';
  }
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
    label.for = "punteggio-mago-" + i;
    label.textContent = "Mago " + i;
    label.className = "mago-label";
    magoDiv.appendChild(label);

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    const minusIcon = document.createElement("img");
    minusIcon.src = "icons/minus.png";
    minusIcon.alt = "-";
    minusIcon.className = "adjust-icon mx-2";
    minusIcon.style.cursor = "pointer";
    minusIcon.onclick = function () { decrementaPunteggioMago(i); };
    inputGroup.appendChild(minusIcon);

    const input = document.createElement("input");
    input.type = "number";
    input.id = "punteggio-mago-" + i;
    input.className = "form-control mx-auto";
    input.style.width = "60px";
    input.min = 0;
    input.value = 0;
    input.style.display = "inline-block";
    inputGroup.appendChild(input);

    const plusIcon = document.createElement("img");
    plusIcon.src = "icons/plus.png";
    plusIcon.alt = "+";
    plusIcon.className = "adjust-icon mx-2";
    plusIcon.style.cursor = "pointer";
    plusIcon.onclick = function () { incrementaPunteggioMago(i); };
    inputGroup.appendChild(plusIcon);

    magoDiv.appendChild(inputGroup);
    wrap.appendChild(magoDiv);
  }
}
function incrementaPunteggioMago(i) {
  const el = document.getElementById("punteggio-mago-" + i);
  el.value = parseInt(el.value) + 1;
}
function decrementaPunteggioMago(i) {
  const el = document.getElementById("punteggio-mago-" + i);
  if (parseInt(el.value) > 0) el.value = parseInt(el.value) - 1;
}

function mostraInputVariabili() {
  let variabileMagi = document.getElementById("variabile2");
  let inputMagoAggiuntivo = document.getElementById("input-mago-aggiuntivo");
  if (variabileMagi.checked) {
    inputMagoAggiuntivo.style.display = 'block';
    aggiornaPunteggiMagiAggiuntivi();
  } else {
    document.getElementById("numero-magi-aggiuntivi").value = "1";
    inputMagoAggiuntivo.style.display = 'none';
    document.getElementById("punteggi-magi-aggiuntivi").innerHTML = "";
  }

  let variabileRituale = document.getElementById("variabile3");
  let inputRituale = document.getElementById("input-lancio-rituale");
  if (variabileRituale.checked) {
    inputRituale.style.display = 'block';
  } else {
    document.getElementById("numero-rituali").value = "1";
    inputRituale.style.display = 'none';
  }
}

function mostraInputRound() {
  let roundsCheckbox = document.getElementById("rounds-checkbox");
  let inputRounds = document.getElementById("input-rounds");
  if (roundsCheckbox.checked) {
    inputRounds.style.display = 'block';
  } else {
    document.getElementById("numero-rounds").value = "1";
    inputRounds.style.display = 'none';
  }
}

function toggleCorpoDropdown() {
  const corpoCheckbox = document.getElementById("corpo-checkbox");
  const corpoDropdownContainer = document.getElementById("corpo-dropdown-container");
  if (corpoCheckbox.checked) {
    corpoDropdownContainer.style.display = 'block';
  } else {
    corpoDropdownContainer.style.display = 'none';
    document.getElementById("modificatori_corpo").value = "0";
  }
}

function toggleMateriaDropdown() {
  const materiaCheckbox = document.getElementById("materia-checkbox");
  const materiaDropdownContainer = document.getElementById("materia-dropdown-container");
  if (materiaCheckbox.checked) {
    materiaDropdownContainer.style.display = 'block';
  } else {
    materiaDropdownContainer.style.display = 'none';
    document.getElementById("modificatori_materia").value = "0";
  }
}

function toggleMenteDropdown() {
  const menteCheckbox = document.getElementById("mente-checkbox");
  const menteDropdownContainer = document.getElementById("mente-dropdown-container");
  if (menteCheckbox.checked) {
    menteDropdownContainer.style.display = 'block';
  } else {
    menteDropdownContainer.style.display = 'none';
    document.getElementById("modificatori_mente").value = "0";
  }
}

function uncheckOtherCheckboxes(checkedId) {
  const checkboxes = ["mente-checkbox", "corpo-checkbox", "materia-checkbox"];
  checkboxes.forEach(id => {
    if (id !== checkedId) {
      document.getElementById(id).checked = false;
    }
  });
  toggleCorpoDropdown();
  toggleMenteDropdown();
  toggleMateriaDropdown();
}

document.addEventListener("DOMContentLoaded", () => {
  // Popola i select da TABELLE
  bootstrapSelects();

  // Wiring esclusività scuole
  document.getElementById("mente-checkbox").addEventListener("change", function () {
    if (this.checked) uncheckOtherCheckboxes("mente-checkbox");
  });
  document.getElementById("corpo-checkbox").addEventListener("change", function () {
    if (this.checked) uncheckOtherCheckboxes("corpo-checkbox");
  });
  document.getElementById("materia-checkbox").addEventListener("change", function () {
    if (this.checked) uncheckOtherCheckboxes("materia-checkbox");
  });

  // Chiudi popup risultati
  const closeBtn = document.getElementById("close-popup");
  if (closeBtn) closeBtn.addEventListener("click", () => {
    document.getElementById("popup-difficolta").style.display = 'none';
  });
});

/* Toggle dadi (+/- mostra/nasconde controlli) */
function toggled1() { toggleDieControls("d1"); }
function toggleD4()  { toggleDieControls("d4"); }
function toggleD6()  { toggleDieControls("d6"); }
function toggleD8()  { toggleDieControls("d8"); }
function toggleD10() { toggleDieControls("d10"); }
function toggleD12() { toggleDieControls("d12"); }
function toggleD20() { toggleDieControls("d20"); }

function toggleDieControls(suffix) {
  let controls = document.getElementById(`${suffix}-controls`);
  let minusEl = document.getElementById(`minus-${suffix}`);
  let plusEl  = document.getElementById(`plus-${suffix}`);
  let inputId = {
    d1: "danni1", d4: "danni2", d6: "danni3",
    d8: "danni4", d10: "danni5", d12: "danni6", d20: "danni7"
  }[suffix];

  let inputEl = document.getElementById(inputId);
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

function incrementaInput(inputId) {
  const el = document.getElementById(inputId);
  el.value = parseInt(el.value) + 1;
}
function decrementaInput(inputId) {
  const el = document.getElementById(inputId);
  if (parseInt(el.value) > 0) el.value = parseInt(el.value) - 1;
}
function incrementaRoundConcentrazione() {
  const el = document.getElementById('numero-rounds');
  let v = parseInt(el.value);
  if (v < 10) el.value = v + 1;
}

/* =======================
   Calcoli
   ======================= */
function calcolaMoltiplicatori() {
  let mBersagli = 0, mDiametro = 0, mRound = 0, mMin7 = 0, mMin15 = 0, mMagi = 0, mRituali = 0, mConc = 0;

  if (document.getElementById("input-bersagli").style.display === 'block') {
    let n = parseInt(document.getElementById("numero-bersagli").value) || 0;
    mBersagli = (n - 1) * 5;
  }
  if (document.getElementById("input-diametro").style.display === 'block') {
    let n = parseInt(document.getElementById("numero-diametro").value) || 0;
    mDiametro = (n - 1) * 5;
  }
  if (document.getElementById("input-round").style.display === 'block') {
    let n = parseInt(document.getElementById("numero-round").value) || 0;
    mRound = (n - 1) * 2;
  }
  if (document.getElementById("input-minuti7").style.display === 'block') {
    let n = parseInt(document.getElementById("numero-minuti7").value) || 0;
    mMin7 = (n - 1) * 5;
  }
  if (document.getElementById("input-minuti15").style.display === 'block') {
    let n = parseInt(document.getElementById("numero-minuti15").value) || 0;
    mMin15 = (n - 1) * 10;
  }
  if (document.getElementById("input-mago-aggiuntivo").style.display === 'block') {
    let _n = parseInt(document.getElementById("numero-magi-aggiuntivi").value) || 0;
    mMagi = 0; // come da specifica: zero
  }
  if (document.getElementById("input-lancio-rituale").style.display === 'block') {
    let n = parseInt(document.getElementById("numero-rituali").value) || 0;
    let v = parseInt(document.getElementById("variabile3").value) || 0;
    mRituali = n * v;
  }
  if (document.getElementById("input-rounds").style.display === 'block') {
    let n = parseInt(document.getElementById("numero-rounds").value) || 0;
    mConc = n * -1;
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

function mostraPopupGradoMagia() {
  document.getElementById("popup-grado-magia").style.display = 'block';
}

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
  const tab = TABELLE.faticaEDannoBase;
  const riga = tab.find(r => gradoMagia >= r.grado[0] && gradoMagia <= r.grado[1]);
  if (!riga) return { fatica: 0, dannoBase: 0 };

  let fatica = 0;
  if (difficoltaTotale < riga.fatica0) {
    fatica = 0;
  } else {
    for (let i = 0; i < riga.intervalli.length; i++) {
      if (difficoltaTotale <= riga.intervalli[i]) { fatica = -(i + 1); break; }
    }
    if (difficoltaTotale > riga.intervalli[riga.intervalli.length - 1]) fatica = -5;
  }

  document.getElementById('dadi-danno-riepilogo').textContent = costruisciRiepilogoDadi();
  return { fatica, dannoBase: riga.dannoBase };
}

function costruisciRiepilogoDadi() {
  let riepilogo = '';
  const dadi = [
    { id: 'danni1', tipo: '+1' },
    { id: 'danni2', tipo: 'd4' },
    { id: 'danni3', tipo: 'd6' },
    { id: 'danni4', tipo: 'd8' },
    { id: 'danni5', tipo: 'd10' },
    { id: 'danni6', tipo: 'd12' },
    { id: 'danni7', tipo: 'd20' }
  ];
  dadi.forEach(d => {
    const q = parseInt(document.getElementById(d.id).value) || 0;
    if (q > 0) {
      if (riepilogo !== '') riepilogo += ' + ';
      riepilogo += `${q} ${d.tipo}`;
    }
  });
  return riepilogo || 'Nessun dado';
}

function calcolaDifficoltaResistenza(difficoltaLancio) {
  const t = TABELLE.difficoltaResistenza;
  if (difficoltaLancio < t[0].min) return t[0].resistenza;
  if (difficoltaLancio > t[t.length - 1].max) return t[t.length - 1].resistenza;
  for (let i = 0; i < t.length; i++) {
    if (difficoltaLancio >= t[i].min && difficoltaLancio <= t[i].max) return t[i].resistenza;
  }
  return 0;
}

function calcolaDifficoltaConGrado(gradoMagia, punteggioVolonta) {
  let base = 20;

  let distanza = parseInt(document.getElementById("distanza").value) || 0;
  let area = parseInt(document.getElementById("area").value) || 0;
  let durata = parseInt(document.getElementById("durata").value) || 0;
  let gesti = parseInt(document.getElementById("gesti").value) || 0;
  let verbale = parseInt(document.getElementById("verbale").value) || 0;
  let posizione = parseInt(document.getElementById("posizione").value) || 0;
  let modificatori_corpo = parseInt(document.getElementById("modificatori_corpo").value) || 0;
  let modificatori_materia = parseInt(document.getElementById("modificatori_materia").value) || 0;
  let modificatori_mente = parseInt(document.getElementById("modificatori_mente").value) || 0;

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
  if (document.getElementById("variabile1").checked) effetti += parseInt(document.getElementById("variabile1").value) || 0;
  if (document.getElementById("effetto1").checked) effetti += parseInt(document.getElementById("effetto1").value) || 0;
  if (document.getElementById("effetto2").checked) effetti += parseInt(document.getElementById("effetto2").value) || 0;
  if (document.getElementById("effetto3").checked) effetti += parseInt(document.getElementById("effetto3").value) || 0;

  // Dadi aggiuntivi (costi da TABELLE)
  let danni_totali = 0;
  TABELLE.dadiCosto.forEach(({ id, costo }) => {
    danni_totali += (parseInt(document.getElementById(id).value) || 0) * costo;
  });

  let totale = base + distanza + area + durata + gesti + verbale + posizione
    + moltiplicatoreBersagli + moltiplicatoreDiametro + moltiplicatoreRound
    + moltiplicatoreMinuti7 + moltiplicatoreMinuti15 + moltiplicatoreMagiAggiuntivi
    + moltiplicatoreRituali + moltiplicatoreConcentrazione
    + modificatori_corpo + modificatori_materia + modificatori_mente
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
  document.getElementById("distanza").value = "0";
  document.getElementById("area").value = "0";
  document.getElementById("durata").value = "0";
  document.getElementById("gesti").value = "0";
  document.getElementById("verbale").value = "0";
  document.getElementById("posizione").value = "0";
  document.getElementById("modificatori_corpo").value = "0";
  document.getElementById("modificatori_materia").value = "0";
  document.getElementById("modificatori_mente").value = "0";

  ["danni1","danni2","danni3","danni4","danni5","danni6","danni7"].forEach(id => {
    document.getElementById(id).value = "0";
  });

  document.getElementById("numero-bersagli").value = "1";
  document.getElementById("numero-diametro").value = "1";
  document.getElementById("numero-round").value = "1";
  document.getElementById("numero-minuti7").value = "1";
  document.getElementById("numero-minuti15").value = "1";
  document.getElementById("numero-magi-aggiuntivi").value = "1";
  document.getElementById("numero-rituali").value = "1";
  document.getElementById("numero-rounds").value = "1";

  document.getElementById("input-bersagli").style.display = 'none';
  document.getElementById("input-diametro").style.display = 'none';
  document.getElementById("input-round").style.display = 'none';
  document.getElementById("input-minuti7").style.display = 'none';
  document.getElementById("input-minuti15").style.display = 'none';
  document.getElementById("input-mago-aggiuntivo").style.display = 'none';
  document.getElementById("input-lancio-rituale").style.display = 'none';
  document.getElementById("input-rounds").style.display = 'none';

  document.getElementById("variabile1").checked = false;
  document.getElementById("variabile2").checked = false;
  document.getElementById("variabile3").checked = false;
  document.getElementById("rounds-checkbox").checked = false;

  document.getElementById("effetto1").checked = false;
  document.getElementById("effetto2").checked = false;
  document.getElementById("effetto3").checked = false;

  document.getElementById("corpo-checkbox").checked = false;
  document.getElementById("materia-checkbox").checked = false;
  document.getElementById("mente-checkbox").checked = false;

  document.getElementById("difficolta-totale-popup").innerText = "20";

  // Nascondi controlli dadi e reset valori
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
