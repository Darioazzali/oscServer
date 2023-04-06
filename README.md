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
Ho messo anche dentro un ricevitore che simula il server anche se Nathan mi ha già detto che ne hai uno in Python.
