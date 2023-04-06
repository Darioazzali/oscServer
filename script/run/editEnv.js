import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
export const __dirname = dirname(fileURLToPath(import.meta.url));
export const readEnvFile = (filePath) => {
    const file = fs.readFileSync(filePath, { encoding: "utf-8" }).trim();
    return file.split("\n").reduce((accumulator, line) => (Object.assign(Object.assign({}, accumulator), { [line.split("=")[0]]: line.split("=")[1] })), {});
};
const setEnvVariables = (envObject, variable, newValue) => (Object.assign(Object.assign({}, envObject), { [variable]: newValue }));
const writeEnvFile = (filePath, envObject) => {
    const trasformato = Object.entries(envObject)
        .map((line) => line.join("="))
        .join("\n")
        .concat("\n");
    fs.writeFileSync(filePath, trasformato);
};
export const editEnvVariables = (file) => (variables) => {
    let envVariables = readEnvFile(file);
    for (let variable in variables) {
        envVariables = setEnvVariables(envVariables, variable, variables[variable]);
    }
    writeEnvFile(file, envVariables);
};
export const editFrontendVariables = ({ ipAddress, port }) => editEnvVariables(path.join(__dirname, "..", "..", "frontend", ".env"))({
    VITE_SERVER_ADDRESS: ipAddress,
    VITE_SERVER_PORT: port,
});
export const editBackendVariables = (port) => editEnvVariables(path.join(__dirname, "..", "..", "oscServer", ".env"))({
    PORT: port,
});
export const editOscTargetVariables = ({ port, ipAddress, }) => editEnvVariables(path.join(__dirname, "..", "..", "oscServer", ".env"))({
    NODEMAPPER_ADDRESS: ipAddress,
    NODEMAPPER_PORT: port,
});
