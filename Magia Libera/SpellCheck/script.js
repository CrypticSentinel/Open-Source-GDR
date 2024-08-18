function mostraInputBersagliDiametro() {
    let areaSelect = document.getElementById("area");
    let inputBersagli = document.getElementById("input-bersagli");
    let inputDiametro = document.getElementById("input-diametro");

    if (areaSelect.value === "5" && areaSelect.options[areaSelect.selectedIndex].text.includes("Ogni bersaglio oltre il primo")) {
        inputBersagli.style.display = 'block';
    } else {
        inputBersagli.style.display = 'none';
    }

    if (areaSelect.value === "5" && areaSelect.options[areaSelect.selectedIndex].text.includes("Ogni 5 metri di diametro")) {
        inputDiametro.style.display = 'block';
    } else {
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
        inputRound.style.display = 'none';
    }

    if (durataSelect.value === "5" && durataSelect.options[durataSelect.selectedIndex].text.includes("Ogni 7 minuti")) {
        inputMinuti7.style.display = 'block';
    } else {
        inputMinuti7.style.display = 'none';
    }

    if (durataSelect.value === "10" && durataSelect.options[durataSelect.selectedIndex].text.includes("Ogni 15 minuti")) {
        inputMinuti15.style.display = 'block';
    } else {
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
        inputMagoAggiuntivo.style.display = 'none';
    }

    if (variabileRituale.checked) {
        inputLancioRituale.style.display = 'block';
    } else {
        inputLancioRituale.style.display = 'none';
    }
}

function mostraInputRound() {
    let roundsCheckbox = document.getElementById("rounds-checkbox");
    let inputRounds = document.getElementById("input-rounds");

    if (roundsCheckbox.checked) {
        inputRounds.style.display = 'block';
    } else {
        inputRounds.style.display = 'none';
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
        moltiplicatoreRituali + moltiplicatoreConcentrazione + modificatori_mente + effetti;

    console.log("Totale calcolato:", totale);

    document.getElementById("difficolta-totale-popup").innerText = totale;
    document.getElementById("popup-difficolta").style.display = 'block';
}

// Chiudi il popup quando si clicca sul pulsante "Chiudi"
document.getElementById("close-popup").onclick = function() {
    document.getElementById("popup-difficolta").style.display = 'none';
}

// Installazione App
window.onload = function() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (!/android/i.test(userAgent)) {
        document.getElementById('install-button').style.display = 'none';
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
