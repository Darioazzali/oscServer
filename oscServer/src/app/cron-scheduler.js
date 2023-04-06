"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settaOra = exports.parseHourFromJson = exports.configFileWatcher = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configFileWatcher = () => {
    fs_1.default.watchFile(path_1.default.join(__dirname, "..", "config_ora.json"), (curr, prev) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Il file con l'orario è stato aggiornato");
        try {
            const oreMinutiSecondi = yield (0, exports.parseHourFromJson)(path_1.default.join(__dirname, "config_ora.json"));
            if (!oreMinutiSecondi)
                throw new Error("Impossibile settare l'ora");
            (0, exports.settaOra)(...oreMinutiSecondi);
        }
        catch (err) {
            console.log(err);
        }
    }));
};
exports.configFileWatcher = configFileWatcher;
const eseguiScript = () => {
    console.log("esecuzione script");
};
const parseOra = (ora) => {
    try {
        let oreMinutiSecondi = ora.split(".");
        if (oreMinutiSecondi.length === 2)
            oreMinutiSecondi.push("0");
        else if (oreMinutiSecondi.length > 3 || oreMinutiSecondi.length < 1) {
            throw new Error();
        }
        return oreMinutiSecondi;
    }
    catch (err) {
        console.log(`Errore nel formato dell'ora ${ora} non è un ora valida.`);
    }
};
const parseHourFromJson = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const configFile = yield promises_1.default.readFile(filePath, "utf8");
        const ora = JSON.parse(configFile);
        return parseOra(ora.ora);
    }
    catch (err) {
        console.log("Errore nella lettura del file di configurazione", err);
    }
});
exports.parseHourFromJson = parseHourFromJson;
const settaOra = (ora = "0", minuto = "0", secondo = "0") => {
    try {
        console.log(`Script schedulato alle ${ora}:${minuto}:${secondo}`);
        const oraFormatoCron = `${secondo ? secondo : ""} ${minuto} ${ora} * * *`;
        if (!node_cron_1.default.validate(oraFormatoCron))
            throw new Error("Formato dell'ora invalido");
        node_cron_1.default.schedule(oraFormatoCron, eseguiScript);
    }
    catch (err) {
        console.log(`Errore nello scheduling dell'orario`);
    }
};
exports.settaOra = settaOra;
//# sourceMappingURL=cron-scheduler.js.map