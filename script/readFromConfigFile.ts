import {
  ConfigFile,
  PossiBleEmpyConfigFile,
  PossibleNumericPort,
} from "./interfaces";
import fs  from "node:fs";
import { ipV4Regex } from "./ipAdresses.js";
import { __dirname } from "./editEnv.js";
import path from "node:path";
import chalk from "chalk";

export const readFromConfigFile = (): ConfigFile => {
  try {
    const readConfigFile = readConfig(
      path.join(__dirname,  "..","..", "config.json")
    ); //Leggi il config file
    checkNonEmpty(readConfigFile);
    if (!validateConfigFile(readConfigFile))
      throw new Error("Una delle propriertà non è settata correttamente"); //Controlla che ci siano tutte le info necessarie
    if (!bothIpAddressesAreCorrect(readConfigFile))
      throw new Error("Qualcuno degli ip non è correttamente definito");
    return convertPortToString(readConfigFile); //Converte le porte in stringhe
    // editFrontendVariables({ ...correctConfigFile.server });
    // editBackendVariables(correctConfigFile.server.port);
    // editOscTargetVariables(correctConfigFile.oscTarget);
  } catch (err) {
    // if(typeof err === instanceof Error={})
    if (err instanceof TypeError)
      throw new Error(chalk.red("Json malformato\n") + err);

    throw err;
  }
};

export const readConfig = (path: string): PossiBleEmpyConfigFile =>
  JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));

export const checkNonEmpty = (
  configFile: PossiBleEmpyConfigFile
): Error | boolean => {
  if (!checkPropertiesExists(configFile, "server", "oscTarget"))
    throw new Error("Server o Target non definiti");
  for (const ipOrPort in configFile) {
    if (
      !checkPropertiesExists(
        configFile[ipOrPort as keyof ConfigFile],
        "ipAddress",
        "port"
      )
    )
      throw new Error(`${ipOrPort} non settato nei target`);
  }
  return true;
};

const checkPropertiesExists = (object: any, ...properties: string[]) =>
  properties.every((el, index) => Object.hasOwn(object, el) && !!object[el]);

const validateConfigFile = (
  configFile: ConfigFile | PossiBleEmpyConfigFile
): configFile is ConfigFile =>
  checkPropertiesExists(configFile) &&
  isPortCorrect(configFile.oscTarget!.port, configFile.server!.port);

export const bothIpAddressesAreCorrect = (
  configFile: PossibleNumericPort
): boolean =>
  [configFile.server.ipAddress, configFile.oscTarget.ipAddress].every((ipAdd) =>
    ipV4Regex.test(ipAdd)
  );

export const convertPortToString = (
  configFile: PossibleNumericPort
): ConfigFile => ({
  server: { ...configFile.server, port: configFile.server.port.toString() },
  oscTarget: {
    ...configFile.oscTarget,
    port: configFile.oscTarget.port.toString(),
  },
});

const isPortCorrect = (
  serverPort: string | number,
  targetPort: string | number
): boolean =>
  [serverPort, targetPort].every((port) => /^\d+$/.test(port.toString()));

// class Validator {
//   toValidate: any;
//   properties: string[];
//   constructor(toValidate: any, properties: string[]) {
//     this.toValidate = toValidate;
//     this.properties = properties;
//   }
// }