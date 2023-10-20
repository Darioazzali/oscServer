import express from "express";
import { WebSocketServer } from "ws";
import osc from "osc";
import dotenv from 'dotenv';
dotenv.config();
const { SERVER_ADDRESS, OSC_LISTENING_PORT } = process.env;
const app = express();
const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: OSC_LISTENING_PORT,
    metadata: true,
});
udpPort.open();
udpPort.on("message", function (oscMsg, timeTag, info) {
    console.log("Messaggio arrivato!", oscMsg);
    console.log("Payload: ", info);
});
const server = app.listen(SERVER_ADDRESS, () => {
    console.log(`Ricevitore attivo sulla porta ${SERVER_ADDRESS}`);
});
const wss = new WebSocketServer({ server: server });
