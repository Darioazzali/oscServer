import chalk from "chalk";
import { clear } from "console";
import figlet from "figlet";
import inquirer from "inquirer";
import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import {
  confirmBootstrapQuestions,
  initialQuestions,
  ipServerQuestions,
} from "./inquirerQuestions.js";
import { compileFrontend } from "./frontend.js";
import {
  editBackendVariables,
  editFrontendVariables,
  editOscTargetVariables,
} from "./editEnv.js";
import {
  installNodePackage as installServerNodePackage,
  runServer,
  verifyAndConfirmConfiguration,
} from "./serverStart.js";
import { oscPrompt } from "./oscTargetsConfig.js";
import { copyFrontendFolder } from "./copyFolder.js";
import { returnIpAddressAndPortFromPrompt } from "./ipAdresses.js";

const promptInitialQuestions = async (): Promise<any> => {
  clear();
  console.log(
    chalk.yellow(figlet.textSync("OSC", { horizontalLayout: "fitted" }))
  );
  let initialPrompt = await inquirer.prompt(initialQuestions);

  switch (initialPrompt.initialChoice) {
    case "exit":
      return process.exit();
    case "serverConfig":
      const serverConfigPromt = await inquirer.prompt(ipServerQuestions);
      const server = returnIpAddressAndPortFromPrompt(serverConfigPromt);
      editFrontendVariables(server);
      editBackendVariables(server.port);
      return await promptInitialQuestions();
    case "oscConfig":
      const oscPromtResult = await oscPrompt();
      editOscTargetVariables(oscPromtResult);
      return await promptInitialQuestions();
    default:
      try {
        await verifyAndConfirmConfiguration();
        const confirmPrompt = await inquirer.prompt(confirmBootstrapQuestions);
        if (!!!confirmPrompt.confirmConfig)
          return await promptInitialQuestions();
        compileFrontend();
        console.log("Frontend Compilato");
        copyFrontendFolder();
        installServerNodePackage()
        runServer();
      } catch (err: unknown) {
        await printErrorAndWait;
        return await promptInitialQuestions();
      }
  }
};
await promptInitialQuestions();

async function printErrorAndWait(err: unknown) {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  await rl.question(`${chalk.red("Errore: ")} ${(err as Error).message}`);
  rl.close();
}
