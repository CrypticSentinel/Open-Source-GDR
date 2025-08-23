# Gestione dei Danni: Realismo e Narrazione
Questo sistema di gestione dei danni vuole introdurre un approccio più realistico e narrativo, sostituendo i tradizionali Punti Ferita con meccaniche basate su **Danni Localizzati** e **Gravità delle ferite**. Ideale per gruppi che desiderano un'esperienza di combattimento più intensa e coinvolgente, questo sistema consente a ogni colpo di avere conseguenze significative e potenzialmente letali.

## Tiro per Colpire e Localizzazione

1. **Verifica dell’azione:**  
   - Ogni attacco richiede un tiro di dado, con difficoltà base **10**.  
   - Risultato ≥ 10 → azione riuscita (il personaggio colpisce l’area desiderata o esegue l’azione)  
   - Risultato < 10 → azione fallita (il colpo manca, l’abilità non riesce)

2. **Determinazione della parte colpita:**  
   - Se l’attacco ha successo e non è stata dichiarata una parte specifica, si tira 1d100 per determinare quale parte del corpo è stata colpita, usando la tabella [**Locazioni del danno**](https://crypticsentinel.github.io/Open-Source-GDR/Combattimento/02%20-%20Gestione%20dei%20Danni#locazioni-del-danno).  

3. **Calcolo del danno:**  
   Il danno viene calcolato in base all'arma utilizzata e alla forza dell'attacco. Dal danno totale inflitto viene sottratto il punteggio di assorbimento. La differenza rappresenta il danno effettivamente subito.

Danno effettivo = (Danno Arma + Mod. Forza) – (Armatura + Mod. Costituzione)

- Il risultato determina i danni effettivamente subiti dal personaggio.  
- Ogni parte del corpo ha una soglia di resistenza; superarla porta a una **ferita** di differente gravità.

**Soglie di Resistenza:**  
Ogni parte principale del corpo di un personaggio ha una specifica soglia di resistenza, che rappresenta quanto danno quella parte può subire prima di subire effetti gravi.  
- Testa: 3  
- Torso: 5  
- Braccia: 4  
- Gambe: 4  
- Mani: 3  
- Piedi: 3

**Esempio di Applicazione del Danno:**
Un personaggio con un punteggio di assorbimento pari a 4 (dato da +1 di Modificatore di Costituzione e +3 dall'armatura) subisce un colpo al petto che infligge 6 danni. Dopo aver sottratto l'assorbimento, il danno reale subito è 2 (6 danni - 4 assorbimento = 2 danni), portandolo ad una **Ferita Leggera** e conseguente -2 a tutte le azioni. Se, in un turno successivo, il personaggio subisce 8 danni al torso, sottraendo ancora 4 punti di assorbimento, rimangono 4 danni effettivi, portando il totale dei danni al torso a 6. Avendo superato la **Soglia di resistenza** del torso (5), il personaggio subisce una **Ferita Grave**, che il DM determina in base alla natura del danno ricevuto.

Le ferite subite in una specifica locazione possono portare ad una conseguenza associata a quella parte del corpo, a discrezione del DM:
   - **Testa:** Stordimento o perdita di coscienza in caso di colpo condundente, oppure morte immediata in caso di pesanti colpi contundenti o colpi da taglio.
   - **Torso:** Ferite gravi, difficoltà a respirare, emorragie interne.
   - **Braccia:** Incapacità di usare l'arto, caduta dell'arma o amputazione.
   - **Gambe:** Difficoltà a muoversi, caduta, immobilizzazione.

## Ferite
Le ferite sostituiscono i Punti Ferita come indicatore dello stato fisico.

- **Ferita Leggera:** Nel momento in cui si subiscono almeno 2 danni, si ricevono delle penalità temporanee, pari a -2 al movimento o agli attacchi.
- **Ferita Grave:** Nel momento in cui si raggiunge in una locazione un numero di danni pari alla **Soglia di resistenza**, si subisce una penalità di -5 fino alla guarigione, fino a immobilizzazione, perdita di sensi, o emorragie.
- **Ferite Letali:** Se i danni ricevuti in una locazione raggiungono il doppio della soglia di resistenza di una locazione, si può avere come conseguenza la morte, l'amputazione di un arto o una grossa emorraggia.

| Tipo Ferita     | Effetto sui Tiri |
|-----------------|----------------|
| Leggera         | -2 a tutte le azioni (dal round successivo) |
| Grave           | -5 a tutte le azioni (dal round successivo) |
| Letale          | Potenzialmente mortale: morte, amputazione, emorragia grave |

- Le penalità si applicano a partire dal round successivo.  
- La guarigione richiede tempo e cure: magia, abilità curative o riposo.

## Locazioni del Danno
Durante un combattimento, corpo a corpo o a distanza, è possibile ci siano delle necessità di eseguire colpi mirati, in questi casi è possibile utilizzare una tabella delle locazioni

| Zona | Locazione | Dado |
|------|-----------|-----|
| Alta | Testa | 1 - 6 |
| Alta | Collo | 7 - 10 |
| Alta | Spalla SX | 12 - 25 |
| Alta | Spalla DX | 26 - 40 |
| Alta | Braccio SX | 41 - 50 |
| Alta | Braccio DX | 51 - 60 |
| Alta | Mano SX | 61 - 65 |
| Alta | Mano DX | 66 - 70 |
| Alta | Torace | 72 - 100 |
| Bassa | Piede SX | 1 - 6 |
| Bassa | Piede DX | 7 - 10 |
| Bassa | Gamba SX | 12 - 25 |
| Bassa | Gamba DX | 26 - 40 |
| Bassa | Stinco SX | 41 - 50 |
| Bassa | Stinco DX | 51 - 60 |
| Bassa | Ginocchio SX | 61 - 65 |
| Bassa | Ginocchio DX | 66 - 70 |
| Bassa | Addome | 72 - 100 |

## Suggerimenti Narrativi
- Il terreno, la luce e gli oggetti influenzano il combattimento.  
- Le azioni simultanee, i colpi mirati e le reazioni aumentano la tensione narrativa.  
- Il DM decide effetti e conseguenze in base alla situazione e alla logica del mondo di gioco.
- 
## Guarigione
La guarigione dalle ferite richiede tempo e cure appropriate. Alcune condizioni possono essere trattate rapidamente tramite magia o abilità curative, mentre altre potrebbero richiedere riposo prolungato o interventi medici.

## Gestione della Morte
Per riflettere la possibilità che un colpo ben assestato possa essere immediatamente letale, si può introdurre la regola del "Colpo Critico":

- **Colpo Critico:**
Se un attacco critico (un 20 naturale su un d20) colpisce una parte vitale come la testa o il torso, il DM può decidere che l'effetto sia letale immediato. Esempi includono una decapitazione, l'affondamento di un pugnale nel cuore, o un taglio alla gola. Il DM può richiedere un tiro aggiuntivo per confermare l'effetto letale o applicare modificatori basati sulla situazione e la narrazione.

- **Tiro Salvezza contro la Morte:**  
   Una volta ricevuta una **Ferita Letale** in modalità che il DM lo ritenga mortale (es una palla chiodata in testa, trafitto da una lancia, lesione dell'aorta femorale etc), il giocatore dovrà effettuare dei tiri con il d20 svolti in tale maniera:
  - a ogni turno il giocatore dovrà tirare un d20
  - con un risultato da 2 a 10 viene considerato fallimento
  - con un risultato da 11 a 19 è considerato successo.
  - Se il giocatore otterrà 3 successi prima di compiere 3 fallimenti, si stabilizzerà, altrimenti morirà.
  - In caso di 20 o 1 sul dado, quel tiro varrà come doppio successo o doppio fallimento.

Vai alla [**Home**](https://crypticsentinel.github.io/Open-Source-GDR/)  
Vai alle [**Fasi del Combattimento**](https://crypticsentinel.github.io/Open-Source-GDR/Combattimento/01%20-%20Combattimento)
