"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOscTransmission = void 0;
const osc_1 = __importDefault(require("osc"));
const configureOscTransmission = () => {
    const udpPort = new osc_1.default.UDPPort({
        localAddress: "0.0.0.0",
        localPort: 57122,
        metadata: true,
        remoteAddress: process.env.NODEMAPPER_ADDRESS,
        remotePort: process.env.NODEMAPPER_PORT
    });
    udpPort.open();
    //Settando l'handler per messaggi in entrata
    udpPort.on("message", function (oscMsg, timeTag, info) {
        console.log("Nuovo Osc Message arrivato", oscMsg);
        console.log("Contenuto del messaggio: ", info);
    });
    return udpPort;
};
exports.configureOscTransmission = configureOscTransmission;
//# sourceMappingURL=udpOsc.js.map