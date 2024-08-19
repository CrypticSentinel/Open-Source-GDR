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

function mostraInputVariabili() {
    let variabileMagi = document.getElementById("variabile2");
    let variabileRituale = document.getElementById("variabile3");

    let inputMagoAggiuntivo = document.getElementById("input-mago-aggiuntivo");
    let inputLancioRituale = document.getElementById("input-lancio-rituale");

    if (variabileMagi.checked) {
        inputMagoAggiuntivo.style.display = 'block';
    } else {
        document.getElementById("numero-magi-aggiuntivi").value = "1"; // Reimposta il valore a 1
        inputMagoAggiuntivo.style.display = 'none';
    }

    if (variabileRituale.checked) {
        inputLancioRituale.style.display = 'block';
    } else {
        document.getElementById("numero-rituali").value = "1"; // Reimposta il valore a 1
        inputLancioRituale.style.display = 'none';
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
        d6Controls.style.display = "none";
        minusD8.style.display = "none";
        plusD8.style.display = "none";
        inputD8.value = 0;
    }
}

function toggleD10() {
    let d6Controls = document.getElementById("d10-controls");
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
        moltiplicatoreMagiAggiuntivi = (numeroMagiAggiuntivi - 1) * 0;
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

    return {
        moltiplicatoreBersagli,
        moltiplicatoreDiametro,
        moltiplicatoreRound,
        moltiplicatoreMinuti7,
        moltiplicatoreMinuti15,
        moltiplicatoreMagiAggiuntivi,
        moltiplicatoreRituali,
        moltiplicatoreConcentrazione,
    };
}

function calcolaDifficolta() {
    console.log("Funzione calcolaDifficolta avviata");
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
        moltiplicatoreConcentrazione
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

    console.log("Totale calcolato:", totale);

    document.getElementById("difficolta-totale-popup").innerText = totale;
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

    // Verifica se è un dispositivo Windows o non Android
    if (/windows phone/i.test(userAgent) || /windows/i.test(userAgent)) {
        document.getElementById('install-button').style.display = 'none';
    } else {
        document.getElementById('install-button').style.display = 'block';
    }
};


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('Service Worker registered!', reg))
    .catch(err => console.log('Service Worker registration failed: ', err));
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
