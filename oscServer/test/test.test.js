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
const cron_scheduler_1 = require("../src/cron-scheduler");
const node_cron_1 = __importDefault(require("node-cron"));
const path_1 = __importDefault(require("path"));
const spy = jest.spyOn(node_cron_1.default, "schedule");
describe("Scheduler", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it("Schdula l'ora correttamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const ora = (0, cron_scheduler_1.settaOra)("17", "54", "0");
        expect(spy).toBeCalledWith("0 54 17 * * *", expect.anything());
    }));
    it("Tira fuori un errore se il formato dell'ora non è valido", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(console, "log");
        (0, cron_scheduler_1.settaOra)("a", "54", "0");
        expect(console.log).toHaveBeenLastCalledWith("Errore nello scheduling dell'orario");
    }));
    //Il test dura un minuto e mezzo perchè deve schedulare quindi lo salto per testare tutto
    it.skip("schedula l'orario tra un minuto", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(console, "log");
        const adesso = new Date();
        const minutiAttuali = adesso.getMinutes();
        const traUnMinuto = new Date(new Date().setMinutes(minutiAttuali + 1));
        const [ore, minuti, secondi] = [
            traUnMinuto.getHours(),
            traUnMinuto.getMinutes(),
            traUnMinuto.getSeconds(),
        ].map((val) => val.toString());
        (0, cron_scheduler_1.settaOra)(ore, minuti, secondi);
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("ok");
            }, 1.4 * 60 * 1000);
        });
        expect(console.log).toHaveBeenLastCalledWith(expect.stringMatching(/Operazione effettuata/g));
    }), 1.5 * 60 * 1000);
    it("Legge il file di configurazione correttamente ", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(path_1.default.dirname(__dirname));
        expect(yield (0, cron_scheduler_1.parseHourFromJson)(path_1.default.join(__dirname, "config_ora.json"))).toEqual([
            "16",
            "30",
            "0",
        ]);
    }));
});
