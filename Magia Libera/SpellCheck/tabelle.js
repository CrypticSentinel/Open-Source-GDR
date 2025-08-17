/* tabelle.js
 * Contiene TUTTI i valori/tabellari dell'app, esternalizzati dall'HTML.
 * Modificare qui per cambiare testi e punteggi.
 */

const TABELLE = {
  select: {
    distanza: [
      { text: "Personale (-2)", value: -2 },
      { text: "Tocco (+0)", value: 0, selected: true },
      { text: "Corta (entro 3 m) (+3)", value: 3 },
      { text: "Media (entro 10 m) (+10)", value: 10 },
      { text: "Lunga (entro 25 m) (+25)", value: 25 },
      { text: "Lunghissima (entro 1 km) (+50)", value: 50 },
      { text: "Non in vista (Conosciuto) (+60)", value: 60 },
      { text: "Non in vista (Sconosciuto) (+75)", value: 75 }
    ],
    area: [
      { text: "Creatura – Intera (+0)", value: 0 },
      { text: "Creatura – Locazione (+3)", value: 3 },
      { text: "Creatura – Sub locazione (Esterna) (+5)", value: 5 },
      { text: "Creatura – Sub locazione (Interna) (+10)", value: 10 },
      { text: "Ogni bersaglio oltre il primo (+5)", value: 5 },
      { text: "Ogni 5 metri di diametro (+5)", value: 5 }
    ],
    durata: [
      { text: "1 round / Istantaneo (+0)", value: 0 },
      { text: "Ogni round oltre il primo (+2)", value: 2 },
      { text: "Ogni 7 minuti (+5)", value: 5 },
      { text: "Ogni 15 minuti (+10)", value: 10 },
      { text: "Finchè si rimane concentrati (-5)", value: -5 },
      { text: "Condizione (Finchè, Quando) (+30)", value: 30 },
      { text: "Permanente (+20)", value: 20 }
    ],
    gesti: [
      { text: "Senza gesti (+5)", value: 5 },
      { text: "Gesti nascosti (+3)", value: 3 },
      { text: "Gesti normali (+0)", value: 0, selected: true },
      { text: "Gesti ampi (-3)", value: -3 }
    ],
    verbale: [
      { text: "Senza voce (+5)", value: 5 },
      { text: "Voce bassa (+3)", value: 3 },
      { text: "Voce normale (+0)", value: 0, selected: true },
      { text: "Voce alta (-3)", value: -3 }
    ],
    posizione: [
      { text: "Lancio in posizione normale (+0)", value: 0 },
      { text: "Lancio in movimento (+5)", value: 5 },
      { text: "Lancio con disturbo (+10)", value: 10 }
      // { text: "Lancio in combattimento (+15)", value: 15 }
    ],
    modificatori_corpo: [
      { text: "Nessun modificatore Corpo (+0)", value: 0 },
      { text: "Oggetto funzionale (+2)", value: 2 },
      { text: "Oggetto complesso (+4)", value: 4 },
      { text: "Creatura semplice (+3)", value: 3 },
      { text: "Creatura complessa (+5)", value: 5 }
    ],
    modificatori_materia: [
      { text: "Nessun modificatore Materia (+0)", value: 0 },
      { text: "1-10 kg (+1)", value: 1 },
      { text: "10-50 kg (+3)", value: 3 },
      { text: "50-100 kg (+5)", value: 5 },
      { text: "100-500 kg (+7)", value: 7 },
      { text: "Oltre 500 kg (+9)", value: 9 }
    ],
    modificatori_mente: [
      { text: "Nessun modificatore Mente (+0)", value: 0 },
      { text: "Leggere (+5)", value: 5 },
      { text: "Modificare (+15)", value: 15 },
      { text: "Scrivere (+20)", value: 20 },
      { text: "Rimuovere (+10)", value: 10 }
    ]
  },

  // Tabella fatica + danno base per grado (range 1-20)
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

  // Tabella difficoltà per resistere
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
  ],

  // Mappatura dadi aggiuntivi -> costo
  dadiCosto: [
    { id: "danni1", label: "Ogni +1 aggiuntivo (+2)", costo: 2, tipo: "+1" },
    { id: "danni2", label: "Ogni d4 aggiuntivo (+5)",  costo: 5, tipo: "d4" },
    { id: "danni3", label: "Ogni d6 aggiuntivo (+7)",  costo: 7, tipo: "d6" },
    { id: "danni4", label: "Ogni d8 aggiuntivo (+9)",  costo: 9, tipo: "d8" },
    { id: "danni5", label: "Ogni d10 aggiuntivo (+11)", costo: 11, tipo: "d10" },
    { id: "danni6", label: "Ogni d12 aggiuntivo (+13)", costo: 13, tipo: "d12" },
    { id: "danni7", label: "Ogni d20 aggiuntivo (+15)", costo: 15, tipo: "d20" }
  ]
};
