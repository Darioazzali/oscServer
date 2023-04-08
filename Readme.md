## Readme
### Install

    npm install
    npm run build

Fa il bootstrap del frontend e del backend.
I parametri da settare sono:

 1. L'indirizzo Ip e la porta della macchina sulla quale girerà -> `Configura server`
 2. L'indirizzo Ip e la porta del target (per esempio il Pc sul quale gira nodeMapper) -> `Configura il target Osc`
 
**Avvia il server** compila il frontend e fa partire il server con i parametri impostati.

Per quanto riguarda lo script da eseguire con una certa periodicità ho trovato un pacchetto che funziona con la stessa sintassi di cron.
Nella cartella /oscServer c'è un file di configurazione molto generale in cui ho messo solo l'ora a cui eseguire lo script (non so cosa dovrebbe fare, si può estendere).

Ho fatto qualche test(nella cartella test dell'oscServer) e sembra funzionare!

Troverai anche nella cartella receiverTest un mini-server che simula il ricevitore anche se Nathan mi ha già detto che ne hai uno in Python funzionante.   
Ho messo comunque il readme dentro quello, si sono 2 env var da settare.

Il frontend comunica con il backend le modifiche attraverso Websocket ed il backend manda direttamente al target il messaggio attraverso un socket Udp.    
Nel caso di perdite di connessioni tra backend e frontend, ho messo un timeout di circa 15 secondi (il frontend ci riprova per 5 volte ogni 3 secondi).    
![output](https://user-images.githubusercontent.com/90763809/230477479-3e9e9196-84a2-4ac8-a61c-aa835dc93caf.gif)

Update:   
Aggiunto il file di configurazione Json per poter leggere direttamente da li
