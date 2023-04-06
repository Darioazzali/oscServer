import { parseHourFromJson, settaOra } from "../src/cron-scheduler";
import cron from "node-cron";
import path from "path";

const spy = jest.spyOn(cron, "schedule");

describe("Scheduler", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Schdula l'ora correttamente", async () => {
    const ora = settaOra("17", "54", "0");
    expect(spy).toBeCalledWith("0 54 17 * * *", expect.anything());
  });

  it("Tira fuori un errore se il formato dell'ora non è valido", async () => {
    jest.spyOn(console, "log");
    settaOra("a", "54", "0");
    expect(console.log).toHaveBeenLastCalledWith(
      "Errore nello scheduling dell'orario"
    );
  });
  //Il test dura un minuto e mezzo perchè deve schedulare quindi lo salto per testare tutto
  it.skip(
    "schedula l'orario tra un minuto",
    async () => {
      jest.spyOn(console, "log");
      const adesso = new Date();
      const minutiAttuali = adesso.getMinutes();
      const traUnMinuto = new Date(new Date().setMinutes(minutiAttuali + 1));
      const [ore, minuti, secondi] = [
        traUnMinuto.getHours(),
        traUnMinuto.getMinutes(),
        traUnMinuto.getSeconds(),
      ].map((val) => val.toString());
      settaOra(ore, minuti, secondi);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("ok");
        }, 1.4 * 60 * 1000);
      });
      expect(console.log).toHaveBeenLastCalledWith(
        expect.stringMatching(/Operazione effettuata/g)
      );
    },
    1.5 * 60 * 1000
  );
  it("Legge il file di configurazione correttamente ", async () => {
    console.log(path.dirname(__dirname))
    expect(await parseHourFromJson(path.join(__dirname,"config_ora.json"))).toEqual([
      "16",
      "30",
      "0",
    ]);
  });
});
