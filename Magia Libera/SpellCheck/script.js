function mostraInputBersagliDiametro() {
    let areaSelect = document.getElementById("area");
    let inputBersagli = document.getElementById("input-bersagli");
    let inputDiametro = document.getElementById("input-diametro");

    if (areaSelect.value === "5" && areaSelect.options[areaSelect.selectedIndex].text.includes("Ogni bersaglio oltre il primo")) {
        inputBersagli.style.display = 'block';
    } else {
        document.getElementById("numero-bersagli").value = "1"; // Reimposta il valore a 1
        inputBersagli.style.display = 'none';
    }

    if (areaSelect.value === "5" && areaSelect.options[areaSelect.selectedIndex].text.includes("Ogni 5 metri di diametro")) {
        inputDiametro.style.display = 'block';
    } else {
        document.getElementById("numero-diametro").value = "1"; // Reimposta il valore a 1
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
        document.getElementById("numero-round").value = "1"; // Reimposta il valore a 1
        inputRound.style.display = 'none';
    }

    if (durataSelect.value === "5" && durataSelect.options[durataSelect.selectedIndex].text.includes("Ogni 7 minuti")) {
        inputMinuti7.style.display = 'block';
    } else {
        document.getElementById("numero-minuti7").value = "1"; // Reimposta il valore a 1
        inputMinuti7.style.display = 'none';
    }

    if (durataSelect.value === "10" && durataSelect.options[durataSelect.selectedIndex].text.includes("Ogni 15 minuti")) {
        inputMinuti15.style.display = 'block';
    } else {
        document.getElementById("numero-minuti15").value = "1"; // Reimposta il valore a 1
        inputMinuti15.style.display = 'none';
    }
}

function incrementaMagiAggiuntivi() {
    const inputElement = document.getElementById("numero-magi-aggiuntivi");
    let numeroMagiAggiuntivi = parseInt(inputElement.value);

    if (numeroMagiAggiuntivi < 4) {
        inputElement.value = numeroMagiAggiuntivi + 1;
        aggiornaPunteggiMagiAggiuntivi();
    }
}

function decrementaMagiAggiuntivi() {
    const inputElement = document.getElementById("numero-magi-aggiuntivi");
    let numeroMagiAggiuntivi = parseInt(inputElement.value);

    if (numeroMagiAggiuntivi > 1) {
        inputElement.value = numeroMagiAggiuntivi - 1;
        aggiornaPunteggiMagiAggiuntivi();
    }
}

function aggiornaPunteggiMagiAggiuntivi() {
    const numeroMagiAggiuntivi = parseInt(document.getElementById("numero-magi-aggiuntivi").value);
    const punteggiContainer = document.getElementById("punteggi-magi-aggiuntivi");

    // Resetta il contenuto del contenitore
    punteggiContainer.innerHTML = "";

    // Crea input per i punteggi dei maghi aggiuntivi
    for (let i = 1; i <= numeroMagiAggiuntivi; i++) {
        // Crea una div per contenere la label, l'input e le icone
        const magoDiv = document.createElement("div");
        magoDiv.className = "mago-input-container";

        // Crea la label sopra l'input
        const label = document.createElement("label");
        label.for = "punteggio-mago-" + i;
        label.textContent = "Mago " + i;
        label.className = "mago-label";
        magoDiv.appendChild(label);

        // Crea un contenitore flessibile per l'input e le icone
        const inputGroup = document.createElement("div");
        inputGroup.className = "input-group";

        // Crea l'icona per decrementare
        const minusIcon = document.createElement("img");
        minusIcon.src = "icons/minus.png";
        minusIcon.alt = "-";
        minusIcon.className = "adjust-icon mx-2";
        minusIcon.style.cursor = "pointer";
        minusIcon.onclick = function() {
            decrementaPunteggioMago(i);
        };
        inputGroup.appendChild(minusIcon);

        // Crea l'input per il punteggio
        const input = document.createElement("input");
        input.type = "number";
        input.id = "punteggio-mago-" + i;
        input.className = "form-control mx-auto";
        input.style.width = "60px";
        input.min = 0;
        input.value = 0;
        input.style.display = "inline-block";
        inputGroup.appendChild(input);

        // Crea l'icona per incrementare
        const plusIcon = document.createElement("img");
        plusIcon.src = "icons/plus.png";
        plusIcon.alt = "+";
        plusIcon.className = "adjust-icon mx-2";
        plusIcon.style.cursor = "pointer";
        plusIcon.onclick = function() {
            incrementaPunteggioMago(i);
        };
        inputGroup.appendChild(plusIcon);

        // Aggiungi il gruppo di input alla div del mago
        magoDiv.appendChild(inputGroup);

        // Aggiungi la div del mago al contenitore principale
        punteggiContainer.appendChild(magoDiv);
    }
}

function incrementaPunteggioMago(magoIndex) {
    const inputElement = document.getElementById("punteggio-mago-" + magoIndex);
    inputElement.value = parseInt(inputElement.value) + 1;
}

function decrementaPunteggioMago(magoIndex) {
    const inputElement = document.getElementById("punteggio-mago-" + magoIndex);
    if (parseInt(inputElement.value) > 0) {
        inputElement.value = parseInt(inputElement.value) - 1;
    }
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
        document.getElementById("punteggi-magi-aggiuntivi").innerHTML = ""; // Nascondi tutti i campi di punteggio
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
        document.getElementById("numero-rounds").value = "1"; // Reimposta il valore a 1
        inputRounds.style.display = 'none';
    }
}

function toggleMenteDropdown() {
    const menteCheckbox = document.getElementById("mente-checkbox");
    const menteDropdownContainer = document.getElementById("mente-dropdown-container");

    if (menteCheckbox.checked) {
        menteDropdownContainer.style.display = 'block';
    } else {
        menteDropdownContainer.style.display = 'none';
        document.getElementById("modificatori_mente").value = "0"; // Reset della selezione
    }
}

function toggled1() {
    let d1Controls = document.getElementById("d1-controls");
    let minusD1 = document.getElementById("minus-d1");
    let plusD1 = document.getElementById("plus-d1");
    let inputD1 = document.getElementById("danni1");

    if (d1Controls.style.display === "none") {
        // Mostra i controlli e imposta il valore dell'input a 1
        d1Controls.style.display = "inline-block";
        minusD1.style.display = "inline-block";
        plusD1.style.display = "inline-block";
        inputD1.value = 1;
    } else {
        // Nascondi i controlli e reimposta il valore dell'input a 0
        d1Controls.style.display = "none";
        minusD1.style.display = "none";
        plusD1.style.display = "none";
        inputD1.value = 0;
    }
}

function toggleD4() {
    let d4Controls = document.getElementById("d4-controls");
    let minusD4 = document.getElementById("minus-d4");
    let plusD4 = document.getElementById("plus-d4");
    let inputD4 = document.getElementById("danni2");

    if (d4Controls.style.display === "none") {
        // Mostra i controlli e imposta il valore dell'input a 1
        d4Controls.style.display = "inline-block";
        minusD4.style.display = "inline-block";
        plusD4.style.display = "inline-block";
        inputD4.value = 1;
    } else {
        // Nascondi i controlli e reimposta il valore dell'input a 0
        d4Controls.style.display = "none";
        minusD4.style.display = "none";
        plusD4.style.display = "none";
        inputD4.value = 0;
    }
}

function toggleD6() {
    let d6Controls = document.getElementById("d6-controls");
    let minusD6 = document.getElementById("minus-d6");
    let plusD6 = document.getElementById("plus-d6");
    let inputD6 = document.getElementById("danni3");

    if (d6Controls.style.display === "none") {
        // Mostra i controlli e imposta il valore dell'input a 1
        d6Controls.style.display = "inline-block";
        minusD6.style.display = "inline-block";
        plusD6.style.display = "inline-block";
        inputD6.value = 1;
    } else {
        // Nascondi i controlli e reimposta il valore dell'input a 0
        d6Controls.style.display = "none";
        minusD6.style.display = "none";
        plusD6.style.display = "none";
        inputD6.value = 0;
    }
}

function toggleD8() {
    let d8Controls = document.getElementById("d8-controls");
    let minusD8 = document.getElementById("minus-d8");
    let plusD8 = document.getElementById("plus-d8");
    let inputD8 = document.getElementById("danni4");

    if (d8Controls.style.display === "none") {
        // Mostra i controlli e imposta il valore dell'input a 1
        d8Controls.style.display = "inline-block";
        minusD8.style.display = "inline-block";
        plusD8.style.display = "inline-block";
        inputD8.value = 1;
    } else {
        // Nascondi i controlli e reimposta il valore dell'input a 0
        d8Controls.style.display = "none";
        minusD8.style.display = "none";
        plusD8.style.display = "none";
        inputD8.value = 0;
    }
}

function toggleD10() {
    let d10Controls = document.getElementById("d10-controls");
    let minusD10 = document.getElementById("minus-d10");
    let plusD10 = document.getElementById("plus-d10");
    let inputD10 = document.getElementById("danni5");

    if (d10Controls.style.display === "none") {
        // Mostra i controlli e imposta il valore dell'input a 1
        d10Controls.style.display = "inline-block";
        minusD10.style.display = "inline-block";
        plusD10.style.display = "inline-block";
        inputD10.value = 1;
    } else {
        // Nascondi i controlli e reimposta il valore dell'input a 0
        d10Controls.style.display = "none";
        minusD10.style.display = "none";
        plusD10.style.display = "none";
        inputD10.value = 0;
    }
}

function toggleD12() {
    let d12Controls = document.getElementById("d12-controls");
    let minusD12 = document.getElementById("minus-d12");
    let plusD12 = document.getElementById("plus-d12");
    let inputD12 = document.getElementById("danni6");

    if (d12Controls.style.display === "none") {
        // Mostra i controlli e imposta il valore dell'input a 1
        d12Controls.style.display = "inline-block";
        minusD12.style.display = "inline-block";
        plusD12.style.display = "inline-block";
        inputD12.value = 1;
    } else {
        // Nascondi i controlli e reimposta il valore dell'input a 0
        d12Controls.style.display = "none";
        minusD12.style.display = "none";
        plusD12.style.display = "none";
        inputD12.value = 0;
    }
}

function toggleD20() {
    let d20Controls = document.getElementById("d20-controls");
    let minusD20 = document.getElementById("minus-d20");
    let plusD20 = document.getElementById("plus-d20");
    let inputD20 = document.getElementById("danni7");

    if (d20Controls.style.display === "none") {
        // Mostra i controlli e imposta il valore dell'input a 1
        d20Controls.style.display = "inline-block";
        minusD20.style.display = "inline-block";
        plusD20.style.display = "inline-block";
        inputD20.value = 1;
    } else {
        // Nascondi i controlli e reimposta il valore dell'input a 0
        d20Controls.style.display = "none";
        minusD20.style.display = "none";
        plusD20.style.display = "none";
        inputD20.value = 0;
    }
}

// Funzione per incrementare il valore dell'input associato
function incrementaInput(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.value = parseInt(inputElement.value) + 1;
}

// Funzione per decrementare il valore dell'input associato
function decrementaInput(inputId) {
    const inputElement = document.getElementById(inputId);
    if (parseInt(inputElement.value) > 0) {
        inputElement.value = parseInt(inputElement.value) - 1;
    }
}

function incrementaRoundConcentrazione() {
    const inputElement = document.getElementById('numero-rounds');
    let currentValue = parseInt(inputElement.value);

    if (currentValue < 10) {
        inputElement.value = currentValue + 1;
    }
}

function calcolaMoltiplicatori() {
    let moltiplicatoreBersagli = 0;
    let moltiplicatoreDiametro = 0;
    let moltiplicatoreRound = 0;
    let moltiplicatoreMinuti7 = 0;
    let moltiplicatoreMinuti15 = 0;
    let moltiplicatoreMagiAggiuntivi = 0;
    let moltiplicatoreRituali = 0;
    let moltiplicatoreConcentrazione = 0;

    if (document.getElementById("input-bersagli").style.display === 'block') {
        let numeroBersagli = parseInt(document.getElementById("numero-bersagli").value) || 0;
        moltiplicatoreBersagli = (numeroBersagli - 1) * 5;
    }

    if (document.getElementById("input-diametro").style.display === 'block') {
        let numeroDiametro = parseInt(document.getElementById("numero-diametro").value) || 0;
        moltiplicatoreDiametro = (numeroDiametro - 1) * 5;
    }

    if (document.getElementById("input-round").style.display === 'block') {
        let numeroRound = parseInt(document.getElementById("numero-round").value) || 0;
        moltiplicatoreRound = (numeroRound - 1) * 2;
    }

    if (document.getElementById("input-minuti7").style.display === 'block') {
        let numeroMinuti7 = parseInt(document.getElementById("numero-minuti7").value) || 0;
        moltiplicatoreMinuti7 = (numeroMinuti7 - 1) * 5;
    }

    if (document.getElementById("input-minuti15").style.display === 'block') {
        let numeroMinuti15 = parseInt(document.getElementById("numero-minuti15").value) || 0;
        moltiplicatoreMinuti15 = (numeroMinuti15 - 1) * 10;
    }

    if (document.getElementById("input-mago-aggiuntivo").style.display === 'block') {
        let numeroMagiAggiuntivi = parseInt(document.getElementById("numero-magi-aggiuntivi").value) || 0;
        moltiplicatoreMagiAggiuntivi = 0; // Il moltiplicatore di maghi aggiuntivi è 0, quindi non influisce
    }

    if (document.getElementById("input-lancio-rituale").style.display === 'block') {
        let numeroRituali = parseInt(document.getElementById("numero-rituali").value) || 0;
        let valoreCheckbox = parseInt(document.getElementById("variabile3").value) || 0;
        moltiplicatoreRituali = numeroRituali * valoreCheckbox;
    }

    if (document.getElementById("input-rounds").style.display === 'block') {
        let numeroRounds = parseInt(document.getElementById("numero-rounds").value) || 0;
        moltiplicatoreConcentrazione = numeroRounds * -1;
    }

    // Sottrai i punteggi dei maghi aggiuntivi
    let punteggiMagi = 0;
    if (document.getElementById("input-mago-aggiuntivo").style.display === 'block') {
        const numeroMagiAggiuntivi = parseInt(document.getElementById("numero-magi-aggiuntivi").value);
        for (let i = 1; i <= numeroMagiAggiuntivi; i++) {
            const punteggioMago = parseInt(document.getElementById("punteggio-mago-" + i).value) || 0;
            punteggiMagi += punteggioMago;
        }
    }

    return {
        moltiplicatoreBersagli,
        moltiplicatoreDiametro,
        moltiplicatoreRound,
        moltiplicatoreMinuti7,
        moltiplicatoreMinuti15,
        moltiplicatoreMagiAggiuntivi,
        moltiplicatoreRituali,
        moltiplicatoreConcentrazione,
        punteggiMagi, // Aggiungi i punteggi dei maghi
    };
}

function mostraPopupGradoMagia() {
    document.getElementById("popup-grado-magia").style.display = 'block';
}

document.getElementById("submit-grado-magia").addEventListener("click", function() {
    const gradoMagia = parseInt(document.getElementById("grado-magia").value);
	
    // Nascondi il popup per l'inserimento del grado di magia
    document.getElementById("popup-grado-magia").style.display = 'none';

    // Ora calcola la difficoltà e mostra il popup relativo
    calcolaDifficoltaConGrado(gradoMagia);
});

function incrementaGradoMagia() {
    const inputElement = document.getElementById("grado-magia");
    inputElement.value = parseInt(inputElement.value) + 1;
}

function decrementaGradoMagia() {
    const inputElement = document.getElementById("grado-magia");
    if (parseInt(inputElement.value) > 0) {
        inputElement.value = parseInt(inputElement.value) - 1;
    }
}

function calcolaDifficolta() {
     // Invece di calcolare subito la difficoltà, mostriamo prima il popup per il grado di magia
    mostraPopupGradoMagia();
}

function calcolaFaticaEDannoBase(gradoMagia, difficoltaTotale) {
    const tabellaFatica = [
        { grado: [1, 3], fatica0: 19, intervalli: [24, 29, 34, 39, 44], dannoBase: '+1' },
        { grado: [4, 6], fatica0: 24, intervalli: [29, 34, 39, 44, 49], dannoBase: '+2' },
        { grado: [7, 9], fatica0: 29, intervalli: [34, 39, 44, 49, 54], dannoBase: '+3' },
        { grado: [10, 12], fatica0: 34, intervalli: [39, 44, 49, 54, 59], dannoBase: '+4' },
        { grado: [13, 15], fatica0: 39, intervalli: [44, 49, 54, 59, 64], dannoBase: '+5' },
        { grado: [16, 18], fatica0: 44, intervalli: [49, 54, 59, 64, 69], dannoBase: '+6' },
        { grado: [19, 21], fatica0: 49, intervalli: [54, 59, 64, 69, 74], dannoBase: '+7' },
        { grado: [22, 24], fatica0: 54, intervalli: [59, 64, 69, 74, 79], dannoBase: '+8' },
        { grado: [25, 27], fatica0: 59, intervalli: [64, 69, 74, 79, 84], dannoBase: '+9' },
        { grado: [28, 30], fatica0: 64, intervalli: [69, 74, 79, 84, 89], dannoBase: '+10' },
        { grado: [31, 33], fatica0: 69, intervalli: [74, 79, 84, 89, 94], dannoBase: '+11' },
    ];

    // Trova la riga della tabella corrispondente al grado di magia
    let riga = tabellaFatica.find(r => gradoMagia >= r.grado[0] && gradoMagia <= r.grado[1]);

	// Se non trova una corrispondenza, ritorna 0 per fatica e danno base
    if (!riga) return { fatica: 0, dannoBase: 0 };

	// Determina il valore di fatica in base alla difficoltà totale
    let fatica = 0;

    if (difficoltaTotale < riga.fatica0) {
        fatica = 0;
    } else {
        for (let i = 0; i < riga.intervalli.length; i++) {
            if (difficoltaTotale <= riga.intervalli[i]) {
                fatica = -(i + 1);
                break;
            }
        }
        if (difficoltaTotale > riga.intervalli[riga.intervalli.length - 1]) {
            fatica = -5;
        }
    }

	let riepilogoDadi = costruisciRiepilogoDadi();

    document.getElementById('dadi-danno-riepilogo').textContent = riepilogoDadi;
	
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

    dadi.forEach(dado => {
        const quantità = parseInt(document.getElementById(dado.id).value) || 0;
        if (quantità > 0) {
            if (riepilogo !== '') {
                riepilogo += ' + ';
            }
            riepilogo += `${quantità} ${dado.tipo}`;
        }
    });

    if (riepilogo === '') {
        riepilogo = 'Nessun dado';
    }

    return riepilogo;
}

function calcolaDifficoltaResistenza(difficoltaLancio) {
    const tabellaDifficolta = [
        { min: 1, max: 34, resistenza: 20 },
        { min: 35, max: 44, resistenza: 25 },
        { min: 45, max: 54, resistenza: 30 },
        { min: 55, max: 64, resistenza: 35 },
        { min: 65, max: 74, resistenza: 40 },
        { min: 75, max: 84, resistenza: 45 },
        { min: 85, max: 94, resistenza: 50 },
        { min: 95, max: 104, resistenza: 55 },
        { min: 105, max: 114, resistenza: 60 },
        { min: 115, max: 124, resistenza: 65 }
    ];

    if (difficoltaLancio < tabellaDifficolta[0].min) {
        return tabellaDifficolta[0].resistenza; // Restituisce il minimo se difficoltà è inferiore al minimo
    }

    if (difficoltaLancio > tabellaDifficolta[tabellaDifficolta.length - 1].max) {
        return tabellaDifficolta[tabellaDifficolta.length - 1].resistenza; // Restituisce il massimo se difficoltà è superiore al massimo
    }

    for (let i = 0; i < tabellaDifficolta.length; i++) {
        if (difficoltaLancio >= tabellaDifficolta[i].min && difficoltaLancio <= tabellaDifficolta[i].max) {
            return tabellaDifficolta[i].resistenza;
        }
    }
    
    return 0; // Questa linea non dovrebbe mai essere raggiunta
}


function calcolaDifficoltaConGrado(gradoMagia) {
    console.log("Funzione calcolaDifficoltaConGrado avviata");
    let base = 20;

    let distanza = parseInt(document.getElementById("distanza").value) || 0;
    let area = parseInt(document.getElementById("area").value) || 0;
    let durata = parseInt(document.getElementById("durata").value) || 0;
    let gesti = parseInt(document.getElementById("gesti").value) || 0;
    let verbale = parseInt(document.getElementById("verbale").value) || 0;
    let posizione = parseInt(document.getElementById("posizione").value) || 0;
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
        punteggiMagi // Ottieni i punteggi dei maghi
    } = calcolaMoltiplicatori();

    let effetti = 0;

    if (document.getElementById("variabile1").checked) {
        effetti += parseInt(document.getElementById("variabile1").value) || 0;
        console.log("Effetto componenti magici calcolato:", effetti);
    }

    if (document.getElementById("effetto1").checked) effetti += parseInt(document.getElementById("effetto1").value) || 0;
    if (document.getElementById("effetto2").checked) effetti += parseInt(document.getElementById("effetto2").value) || 0;
    if (document.getElementById("effetto3").checked) effetti += parseInt(document.getElementById("effetto3").value) || 0;

    // Dadi aggiuntivi
    let danni_totali = 0;
    danni_totali += (parseInt(document.getElementById("danni1").value) || 0) * 2;
    danni_totali += (parseInt(document.getElementById("danni2").value) || 0) * 5;
    danni_totali += (parseInt(document.getElementById("danni3").value) || 0) * 7;
    danni_totali += (parseInt(document.getElementById("danni4").value) || 0) * 9;
    danni_totali += (parseInt(document.getElementById("danni5").value) || 0) * 11;
    danni_totali += (parseInt(document.getElementById("danni6").value) || 0) * 13;
    danni_totali += (parseInt(document.getElementById("danni7").value) || 0) * 15;

    let totale = base + distanza + area + durata + gesti + verbale + posizione +
        moltiplicatoreBersagli + moltiplicatoreDiametro + moltiplicatoreRound +
        moltiplicatoreMinuti7 + moltiplicatoreMinuti15 + moltiplicatoreMagiAggiuntivi +
        moltiplicatoreRituali + moltiplicatoreConcentrazione + modificatori_mente + effetti + danni_totali;
	
    // Sottrai i punteggi dei maghi aggiuntivi
    totale -= punteggiMagi;

    console.log("Totale calcolato:", totale);
	
	// Calcola la fatica accumulata e il danno base usando la nuova funzione
    const { fatica, dannoBase } = calcolaFaticaEDannoBase(gradoMagia, totale);
	
	// Calcola la difficoltà per resistere basata sulla difficoltà totale calcolata
    const difficoltaResistenza = calcolaDifficoltaResistenza(totale);
	
	// Calcola il lancio del dado necessario
    const lancioDadoNecessario = totale - gradoMagia;

    document.getElementById("difficolta-totale-popup").innerText = totale;
	document.getElementById("lancio-dado-necessario").innerText = lancioDadoNecessario;
	document.getElementById("fatica-accumulata").innerText = fatica;
	document.getElementById("danno-base").innerText = dannoBase;
	document.getElementById("difficolta-resistenza").innerText = difficoltaResistenza;
    document.getElementById("popup-difficolta").style.display = 'block';
}

function ripristinaValori() {
    // Ripristina i selettori con i valori di default
    document.getElementById("distanza").value = "0"; // Tocco (+0)
    document.getElementById("area").value = "0"; // Creatura - Intera (+0)
    document.getElementById("durata").value = "0"; // 1 round / Istantaneo (+0)
    document.getElementById("gesti").value = "0"; // Gesti normali (+0)
    document.getElementById("verbale").value = "0"; // Voce normale (+0)
    document.getElementById("posizione").value = "0"; // Lancio in posizione normale (+0)
    document.getElementById("modificatori_mente").value = "0"; // Leggere (+0)

    // Ripristina i valori degli input dei dadi aggiuntivi a 0
    document.getElementById("danni1").value = "0";
    document.getElementById("danni2").value = "0";
    document.getElementById("danni3").value = "0";
    document.getElementById("danni4").value = "0";
    document.getElementById("danni5").value = "0";
    document.getElementById("danni6").value = "0";
    document.getElementById("danni7").value = "0";

    // Ripristina i valori degli input nascosti a 1 solo se devono essere visibili
    document.getElementById("numero-bersagli").value = "1";
    document.getElementById("numero-diametro").value = "1";
    document.getElementById("numero-round").value = "1";
    document.getElementById("numero-minuti7").value = "1";
    document.getElementById("numero-minuti15").value = "1";
    document.getElementById("numero-magi-aggiuntivi").value = "1";
    document.getElementById("numero-rituali").value = "1";
    document.getElementById("numero-rounds").value = "1";

    // Nascondi eventuali input condizionali
    document.getElementById("input-bersagli").style.display = 'none';
    document.getElementById("input-diametro").style.display = 'none';
    document.getElementById("input-round").style.display = 'none';
    document.getElementById("input-minuti7").style.display = 'none';
    document.getElementById("input-minuti15").style.display = 'none';
    document.getElementById("input-mago-aggiuntivo").style.display = 'none';
    document.getElementById("input-lancio-rituale").style.display = 'none';
    document.getElementById("input-rounds").style.display = 'none';

    // Deseleziona le checkbox e nascondi i loro input condizionali
    document.getElementById("variabile1").checked = false;
    document.getElementById("variabile2").checked = false;
    document.getElementById("variabile3").checked = false;
    document.getElementById("rounds-checkbox").checked = false;
    
    // Deseleziona tutte le opzioni effetti di lancio
    document.getElementById("effetto1").checked = false;
    document.getElementById("effetto2").checked = false;
    document.getElementById("effetto3").checked = false;

    // Ripristina il popup di difficoltà
    document.getElementById("difficolta-totale-popup").innerText = "20";
    
    // Nascondi le icone + e - e reimposta l'input danni1 a 0
    document.getElementById("minus-d1").style.display = "none";
    document.getElementById("plus-d1").style.display = "none";
    document.getElementById("d1-controls").style.display = "none";
    document.getElementById("danni1").value = "0";
    
    // Nascondi le icone + e - e reimposta l'input danni2 a 0
    document.getElementById("minus-d4").style.display = "none";
    document.getElementById("plus-d4").style.display = "none";
    document.getElementById("d4-controls").style.display = "none";
    document.getElementById("danni2").value = "0";
	
	// Nascondi le icone + e - e reimposta l'input danni3 a 0
    document.getElementById("minus-d6").style.display = "none";
    document.getElementById("plus-d6").style.display = "none";
    document.getElementById("d6-controls").style.display = "none";
    document.getElementById("danni3").value = "0";
	
	// Nascondi le icone + e - e reimposta l'input danni4 a 0
    document.getElementById("minus-d8").style.display = "none";
    document.getElementById("plus-d8").style.display = "none";
    document.getElementById("d8-controls").style.display = "none";
    document.getElementById("danni4").value = "0";
	
    // Nascondi le icone + e - e reimposta l'input danni5 a 0
    document.getElementById("minus-d10").style.display = "none";
    document.getElementById("plus-d10").style.display = "none";
    document.getElementById("d10-controls").style.display = "none";
    document.getElementById("danni5").value = "0";

    // Nascondi le icone + e - e reimposta l'input danni6 a 0
    document.getElementById("minus-d12").style.display = "none";
    document.getElementById("plus-d12").style.display = "none";
    document.getElementById("d12-controls").style.display = "none";
    document.getElementById("danni6").value = "0";
	
    // Nascondi le icone + e - e reimposta l'input danni7 a 0
    document.getElementById("minus-d20").style.display = "none";
    document.getElementById("plus-d20").style.display = "none";
    document.getElementById("d20-controls").style.display = "none";
    document.getElementById("danni7").value = "0";
    
    // Richiama le funzioni per aggiornare la visualizzazione e reimpostare i valori
    mostraInputBersagliDiametro();
    mostraInputDurata();
    mostraInputVariabili();
    mostraInputRound();
}

// Chiudi il popup quando si clicca sul pulsante "Chiudi"
document.getElementById("close-popup").onclick = function() {
    document.getElementById("popup-difficolta").style.display = 'none';
}

// Installazione App
window.onload = function() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Verifica se è un dispositivo Android
    if (/android/i.test(userAgent)) {
        document.getElementById('install-button').style.display = 'block';
    } else {
        document.getElementById('install-button').style.display = 'none';
    }
};

/* if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('Service Worker registered!', reg))
    .catch(err => console.log('Service Worker registration failed: ', err));
} */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }, error => {
        console.error('Service Worker registration failed:', error);
      });
    });
  }
  
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        installButton.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});
