import fs, { write } from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Host } from "./interfaces.js";
export const __dirname = dirname(fileURLToPath(import.meta.url));
interface EnvObject {
  [envVar: string]: string;
}
export const readEnvFile = (filePath: string): EnvObject => {
  const file = fs.readFileSync(filePath, { encoding: "utf-8" }).trim();
  return file.split("\n").reduce(
    (accumulator, line) => ({
      ...accumulator,
      [line.split("=")[0]]: line.split("=")[1],
    }),
    {}
  );
};

const setEnvVariables = (
  envObject: EnvObject,
  variable: string,
  newValue: string
): EnvObject => ({ ...envObject, [variable]: newValue });

const writeEnvFile = (filePath: string, envObject: EnvObject) => {
  const trasformato = Object.entries(envObject)
    .map((line) => line.join("="))
    .join("\n")
    .concat("\n");
  fs.writeFileSync(filePath, trasformato);
};

export const editEnvVariables = (file: string) => (variables: EnvObject) => {
  let envVariables = readEnvFile(file);
  for (let variable in variables) {
    envVariables = setEnvVariables(envVariables, variable, variables[variable]);
  }
  writeEnvFile(file, envVariables);
};

export const editFrontendVariables = ({ ipAddress, port }: Host) =>
  editEnvVariables(path.join(__dirname, "..", "..", "frontend", ".env"))({
    VITE_SERVER_ADDRESS: ipAddress,
    VITE_SERVER_PORT: port,
  });

export const editBackendVariables = (port: string) =>
  editEnvVariables(path.join(__dirname, "..", "..", "oscServer", ".env"))({
    PORT: port,
  });

export const editOscTargetVariables = ({
  port,
  ipAddress,
}: {
  port: string;
  ipAddress: string;
}) =>
  editEnvVariables(path.join(__dirname, "..", "..", "oscServer", ".env"))({
    NODEMAPPER_ADDRESS: ipAddress,
    NODEMAPPER_PORT: port,
  });
