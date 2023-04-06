import cron from "node-cron";
import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
interface ConfigFile {
  ora: string;
}

export const configFileWatcher = () => {
  fs.watchFile(
    path.join(__dirname, "..", "config_ora.json"),
    async (curr, prev) => {
      console.log("Il file con l'orario è stato aggiornato");
      try {
        const oreMinutiSecondi = await parseHourFromJson(
          path.join(__dirname, "config_ora.json")
        );
        if (!oreMinutiSecondi) throw new Error("Impossibile settare l'ora");
        settaOra(...oreMinutiSecondi);
      } catch (err) {
        console.log(err);
      }
    }
  );
};

const eseguiScript = () => {
  console.log("esecuzione script");
};

const parseOra = (ora: string): string[] | undefined => {
  try {
    let oreMinutiSecondi = ora.split(".");
    if (oreMinutiSecondi.length === 2) oreMinutiSecondi.push("0");
    else if (oreMinutiSecondi.length > 3 || oreMinutiSecondi.length < 1) {
      throw new Error();
    }

    return oreMinutiSecondi;
  } catch (err) {
    console.log(`Errore nel formato dell'ora ${ora} non è un ora valida.`);
  }
};

export const parseHourFromJson = async (filePath: string) => {
  try {
    const configFile = await fsPromises.readFile(filePath, "utf8");
    const ora: ConfigFile = JSON.parse(configFile);
    return parseOra(ora.ora);
  } catch (err) {
    console.log("Errore nella lettura del file di configurazione", err);
  }
};
export const settaOra = (ora = "0", minuto = "0", secondo = "0") => {
  try {
    console.log(`Script schedulato alle ${ora}:${minuto}:${secondo}`);
    const oraFormatoCron = `${secondo ? secondo : ""} ${minuto} ${ora} * * *`;
    if (!cron.validate(oraFormatoCron))
      throw new Error("Formato dell'ora invalido");
    cron.schedule(oraFormatoCron, eseguiScript);
  } catch (err) {
    console.log(`Errore nello scheduling dell'orario`);
  }
};
