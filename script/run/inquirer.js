import inquirer from "inquirer";
import fs from "node:fs";
import path from "node:path";
import { getIpAddresses } from "./ipAdresses.js";
import { generateOscTargets } from "./target.js";
export const initialQuestions = [
    {
        name: "initialChoice",
        type: "list",
        loop: false,
        message: "",
        choices: [
            { name: "Avvia server", value: "start" },
            { name: "Configura il server", value: "serverConfig" },
            { name: "Configura il target Osc", value: "oscConfig" },
            { name: "Esci", value: "exit" },
        ],
    },
];
export const ipServerQuestions = [
    {
        name: "local",
        type: "list",
        message: "Indirizzo Ip del server",
        choices: [
            getIpAddresses(),
            { name: "Inserisci manualmente", value: "manual" },
        ],
    },
    {
        name: "manual",
        type: "input",
        when: function (answers) {
            return answers.local === "manual";
        },
        message: "Indirizzo Ip",
        validate: function (userInput) {
            if (/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/g.test(userInput)) {
                return true;
            }
            throw Error("Indirizzo Ip invalido");
        },
    },
    {
        name: "port",
        type: "input",
        message: "Porta del servizio node",
    },
];
export const questions = [
    {
        name: "generateOrRead",
        type: "ist",
        loop: false,
        message: "",
        choices: [
            { name: "Leggi dalla configurazione", value: "read" },
            { name: "Inserisci i dati del server e del client OSC", value: "insert" },
        ],
    },
];
export const oscTargetQuestion = [
    {
        name: "oscTarget",
        type: "list",
        loop: "false",
        message: "Seleziona tra i target del file",
        choices: () => [...generateOscTargets(), "Inserisci nuovo target"],
    },
];
export const oscTargetIpAndPortQuestion = [
    {
        name: "oscTarget.ipAddress",
        type: "input",
        message: "Indirizzo Ip",
        validate: function (userInput) {
            if (/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/g.test(userInput)) {
                return true;
            }
            throw Error("Indirizzo Ip invalido");
        },
    },
    {
        name: "oscTarget.port",
        type: "input",
        validate: (input) => {
            if (/^\d+$/g.test(input)) {
                return true;
            }
            throw Error("Porta invalida");
        },
        message: "porta",
    },
    {
        name: "oscTarget.name",
        type: "input",
        // when: function (precInput) {
        //   return precInput.oscTarget.port;
        // },
        message: "Nome del target",
    },
];
export const oscPrompt = async () => {
    const prompt = await inquirer.prompt(oscTargetQuestion);
    switch (prompt.oscTarget) {
        case "Inserisci nuovo target": {
            const { ipAddress, port, name } = (await inquirer.prompt(oscTargetIpAndPortQuestion)).oscTarget;
            await addToOscTargetsFile(ipAddress, port, name);
            return await oscPrompt();
            break;
        }
        default:
            const { ipAddress, port, name } = prompt.oscTarget;
            return { ipAddress, port, name };
    }
};
const addToOscTargetsFile = async (ipAddress, port, name) => {
    const prevData = fs.readFileSync(path.join("script", "targets.json"), {
        encoding: "utf-8",
    });
    const json = JSON.parse(prevData);
    json[name] = { ipAddress, port };
    fs.writeFileSync(path.join("script", "targets.json"), JSON.stringify(json));
};
