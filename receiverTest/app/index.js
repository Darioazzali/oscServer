"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const osc_1 = __importDefault(require("osc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { SERVER_ADDRESS, OSC_LISTENING_PORT } = process.env;
const app = (0, express_1.default)();
const udpPort = new osc_1.default.UDPPort({
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
const wss = new ws_1.WebSocketServer({ server: server });
