## Readme
Ricevitore di messaggi *osc.* 
Installare con:
> npm install

Per metterlo in ascolto:
> npm serve

Nel .env file ci sono le configurazioni sulla porta sulla quale riceve i messaggi osc e la porta in cui il server ascolta:

 - `OSC_LISTENING_PORT` è la porta UDP sulla quale riceve i messaggi osc
 - `SERVER_ADDRESS` è l'indirizzo del server in node per l'arrivo dei messaggi
