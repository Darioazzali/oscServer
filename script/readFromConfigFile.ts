import { ConfigFile } from "./interfaces";
import fs from "node:fs";
import { __dirname } from "./editEnv.js";
import path from "node:path";
import chalk from "chalk";
import { configSchema } from "./schema.js";

export const readConfigurationFromFile = (): ConfigFile => {
  try {
    const readConfigFile = readConfigJson(
      path.join(__dirname, "..", "..", "config.json")
    );
    return configSchema.validateSync(readConfigFile);
  } catch (err) {
    if (err instanceof TypeError)
      throw new Error(chalk.red("Json malformato\n") + err);
    throw err;
  }
};

export const readConfigJson = (path: string) =>
  JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
