/* tabelle.js
 * Sorgente dati centralizzato: opzioni, pesi, etichette e costanti di calcolo.
 */

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
    { grado: [1, 2],  fatica0: 19, intervalli: [24, 29, 34, 39, 44], dannoBase: "+1" },
    { grado: [3, 4],  fatica0: 24, intervalli: [29, 34, 39, 44, 49], dannoBase: "+2" },
    { grado: [5, 6],  fatica0: 29, intervalli: [34, 39, 44, 49, 54], dannoBase: "+3" },
    { grado: [7, 8],  fatica0: 34, intervalli: [39, 44, 49, 54, 59], dannoBase: "+4" },
    { grado: [9, 10], fatica0: 39, intervalli: [44, 49, 54, 59, 64], dannoBase: "+5" },
    { grado: [11,12], fatica0: 44, intervalli: [49, 54, 59, 64, 69], dannoBase: "+6" },
    { grado: [13,14], fatica0: 49, intervalli: [54, 59, 64, 69, 74], dannoBase: "+7" },
    { grado: [15,16], fatica0: 54, intervalli: [59, 64, 69, 74, 79], dannoBase: "+8" },
    { grado: [17,18], fatica0: 59, intervalli: [64, 69, 74, 79, 84], dannoBase: "+9" },
    { grado: [19,20], fatica0: 64, intervalli: [69, 74, 79, 84, 89], dannoBase: "+10" }
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
