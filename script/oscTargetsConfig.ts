import inquirer from "inquirer";
import fs from "node:fs";
import path from "node:path";
import {
  oscTargetIpAndPortQuestion,
  oscTargetQuestion,
} from "./inquirerQuestions.js";

export const oscPrompt = async (): Promise<any> => {
  const prompt = await inquirer.prompt(oscTargetQuestion);
  switch (prompt.oscTarget) {
    case "Inserisci nuovo target": {
      const { ipAddress, port, name } = (
        await inquirer.prompt(oscTargetIpAndPortQuestion)
      ).oscTarget;
      await addToOscTargetsFile(ipAddress, port, name);
      return await oscPrompt();
      break;
    }
    default:
      const { ipAddress, port, name } = prompt.oscTarget;
      return { ipAddress, port, name };
  }
};

const addToOscTargetsFile = async (
  ipAddress: string,
  port: string,
  name: string
) => {
  const prevData = fs.readFileSync(path.join("script", "targets.json"), {
    encoding: "utf-8",
  });
  const json = JSON.parse(prevData);
  json[name] = { ipAddress, port };
  fs.writeFileSync(path.join("script", "targets.json"), JSON.stringify(json));
};
