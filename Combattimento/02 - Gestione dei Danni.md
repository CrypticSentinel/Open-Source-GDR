# Gestione dei Danni: Realismo e Narrazione
Questo sistema di gestione dei danni vuole introdurre un approccio più realistico e narrativo, sostituendo i tradizionali Punti Ferita con meccaniche basate su Danni Localizzati e Condizioni. Ideale per gruppi che desiderano un'esperienza di combattimento più intensa e coinvolgente, questo sistema consente a ogni colpo di avere conseguenze significative e potenzialmente letali.

## Struttura dei Danni
Il sistema si fonda su una combinazione di "Condizioni" e "Danni Localizzati". Ogni personaggio possiede soglie di resistenza determinate dalla propria Costituzione e dalle protezioni indossate, con ferite gestite in base alla gravità e alla localizzazione del colpo.

## Parti del Corpo e Soglie di Danno
Ogni parte principale del corpo di un personaggio ha una specifica soglia di resistenza, che rappresenta quanto danno quella parte può subire prima di subire effetti gravi.

**Esempio di Soglie di Resistenza:**
- **Testa:** 3
- **Torso:** 5
- **Braccia:** 4
- **Gambe:** 4
- **Mani:** 3
- **Piedi:** 3

## Calcolo dei Danni
Quando un personaggio subisce un attacco, il danno viene determinato attraverso le seguenti fasi:

1. **Tiro per Colpire e Localizzazione del Colpo:**  
   Una volta determinato il successo dell'attacco, in assenza di dichiarazioni, si tira un dado per determinare la parte colpita usando la tabella [**Locazioni del danno**](https://crypticsentinel.github.io/Open-Source-GDR/Combattimento/02%20-%20Gestione%20dei%20Danni#locazioni-del-danno)

2. **Determinazione del Danno:**  
   Il danno viene calcolato in base all'arma utilizzata e alla forza dell'attacco. Dal danno totale inflitto vengono sottratti la soglia di resistenza e il punteggio di assorbimento (dato dal Modificatore di Costituzione più l'armatura). La differenza rappresenta il danno effettivamente subito.

3. **Effetti del Danno:**  
   Se il danno in una specifica locazione supera la soglia di resistenza, il personaggio subisce una "Condizione" associata a quella parte del corpo:
   - **Testa:** Stordimento, perdita di coscienza, o morte immediata se il danno è particolarmente elevato.
   - **Torso:** Ferite gravi, difficoltà a respirare, emorragie interne.
   - **Braccia:** Incapacità di usare l'arto, caduta dell'arma.
   - **Gambe:** Difficoltà a muoversi, caduta, immobilizzazione.

**Esempio di Applicazione del Danno:**
Un personaggio con un punteggio di assorbimento pari a 4 (dato da +1 di Modificatore di Costituzione e +3 dall'armatura) subisce un colpo al petto che infligge 6 danni. Dopo aver sottratto l'assorbimento, il danno reale subito è 2 (6 danni - 4 assorbimento = 2 danni). Se, in un turno successivo, il personaggio subisce 8 danni al torso, sottraendo ancora 4 punti di assorbimento, rimangono 4 danni effettivi, portando il totale dei danni al torso a 6. Avendo superato la soglia di resistenza del torso (5), il personaggio subisce una Condizione, che il DM determina in base alla natura del danno ricevuto.

## Condizioni e Guarigione
Le "Condizioni" sostituiscono i Punti Ferita come indicatore dello stato fisico di un personaggio. Ogni condizione ha effetti immediati sul personaggio e può variare in gravità:

- **Condizioni Leggere:** Penalità temporanee, come -2 al movimento o agli attacchi con un arto ferito.
- **Condizioni Gravi:** Penalità permanenti o quasi permanenti fino alla guarigione, come immobilizzazione, perdita di sensi, o emorragie.
- **Condizioni Letali:** Un colpo che supera di molto la soglia della testa può causare una morte istantanea, come nel caso di un taglio alla gola ben eseguito.

La guarigione delle condizioni richiede tempo e cure appropriate. Alcune condizioni possono essere trattate rapidamente tramite magia o abilità curative, mentre altre potrebbero richiedere riposo prolungato o interventi medici.

### Gestione del Combattimento Fatale
Per riflettere la possibilità che un colpo ben assestato possa essere immediatamente letale, si può introdurre la regola del "Colpo Critico":

- **Colpo Critico:**  
   Se un attacco critico (un 20 naturale su un d20) colpisce una parte vitale come la testa o il torso, il DM può decidere che l'effetto sia letale immediato. Esempi includono una decapitazione, l'affondamento di un pugnale nel cuore, o un taglio alla gola. Il DM può richiedere un tiro aggiuntivo per confermare l'effetto letale o applicare modificatori basati sulla situazione e la narrazione.

## Locazioni del danno
Durante un combattimento, corpo a corpo o a distanza, è possibile ci siano delle necessità di eseguire colpi mirati, in questi casi è possibile utilizzare una tabella delle locazioni

| Zona | Locazione     | Dado     |
| :--- | :------------ | :------: |
| Alta | Testa         | 1 - 6    |
| Alta | Collo         | 7 - 10   |
| Alta | Spalla SX     | 12 - 25  |
| Alta | Spalla DX     | 26 - 40  |
| Alta | Braccio SX    | 41 - 50  |
| Alta | Braccio DX    | 51 - 60  |
| Alta | Mano SX       | 61 - 65  |
| Alta | Mano DX       | 66 - 70  |
| Alta | Torace        | 72 - 100 |
| Bassa | Piede SX     | 1 - 6    |
| Bassa | Piede DX     | 7 - 10   |
| Bassa | Gamba SX     | 12 - 25  |
| Bassa | Gamba DX     | 26 - 40  |
| Bassa | Stinco SX    | 41 - 50  |
| Bassa | Stinco DX    | 51 - 60  |
| Bassa | Ginocchio SX | 61 - 65  |
| Bassa | Ginocchio DX | 66 - 70  |
| Bassa | Addome       | 72 - 100 |
