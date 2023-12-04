## Readme
### Install

    npm install
    npm run build

Deply the front end and the backend.
Require this settings parameter:

 1. The address and the port of the server -> `Configura server`
 2. The ip address and the port of the NodeMapper server (per esempio il Pc sul quale gira nodeMapper) -> `Configura il target Osc`
 
**Avvia il server** compile the front-end and starts the server with the setted parameter.

Actually there is a package that uses the same syntax as UNIX cron for update the parameter periodically.

There is also a receiver for testing in `receiverTest`folder, a mini-server that simulates the receiver.   
In the readme folder there are two env var to set,
The frontend maintains a websocket connection with the server that filter the message and send Udp packet to the target.
[output](https://user-images.githubusercontent.com/90763809/230477479-3e9e9196-84a2-4ac8-a61c-aa835dc93caf.gif)
