import path from "path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "node:path";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
interface ipAndPort {
  ipAddress: string;
  port: number;
}
interface OscTarget {
  [targetName: string]: ipAndPort;
}

export const readFromConfigFile = (): OscTarget => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "targets.json"), {
      encoding: "utf-8",
    })
  );
};

export const generateOscTargets = () => ({
  targetsName: Object.keys(readFromConfigFile()),
  targetsAddresses: Object.values(readFromConfigFile()),
  *[Symbol.iterator]() {
    let iterationCount: number;
    for (
      iterationCount = 0;
      iterationCount < this.targetsAddresses.length;
      iterationCount++
    ) {
      yield {
        name: `${this.targetsName[iterationCount]} - ${this.targetsAddresses[iterationCount].ipAddress}:${this.targetsAddresses[iterationCount].port}`,
        value: {
          name: `${this.targetsName[iterationCount]}`,
          ipAddress: this.targetsAddresses[iterationCount].ipAddress,
          port: this.targetsAddresses[iterationCount].port,
        },
      };
    }
  },
});
