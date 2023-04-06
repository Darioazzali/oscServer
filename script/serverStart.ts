import { readEnvFile } from "./editEnv.js";
import path from "node:path";
import { __dirname } from "./editEnv.js";
import { ConfigVariables } from "./interfaces.js";
import chalk from "chalk";
import { getIpAddresses } from "./ipAdresses.js";
import { execFileSync, spawn } from "node:child_process";

export const verifyAndConfirmConfiguration = async () => {
  const actualConfig = readEnvFiles(); //Legge le env variable settate nel frontend e nel backend
  const verifiedResults = verifyConfigVariables(actualConfig); //Verifica che siano rispettati i parametri
  if (verifiedResults.valid === false) throw new Error(verifiedResults.why);
  printActualConfig(actualConfig);
  return actualConfig;
};

export const installNodePackage = () =>
  execFileSync("npm", ["install"], {
    cwd: "oscServer",
  });

export const runServer = () => {
  const buildServer = spawn("npm", ["run-script", "build"], {
    cwd: "oscServer",
  });
  buildServer.stdout.on("data", (data) => {
    console.log(`${data}`);
  });
  buildServer.stderr.on("data", (data) => {
    console.error(`${chalk.red("Error")}: ${data}`);
  });
  buildServer.on("close", (code) => {
    console.log(`Processo chiuso: codice ${code}`);
  });
};

function readEnvFiles(): ConfigVariables {
  const frontedData = readEnvFile(
    path.join(__dirname, "..", "..", "frontend", ".env")
  );
  const backendData = readEnvFile(
    path.join(__dirname, "..", "..", "oscServer", ".env")
  );
  return {
    frontend: {
      ipAddress: frontedData.VITE_SERVER_ADDRESS,
      port: frontedData.VITE_SERVER_PORT,
    },
    backend: {
      port: backendData.PORT,
    },
    oscTarget: {
      ipAddress: backendData.NODEMAPPER_ADDRESS,
      port: backendData.NODEMAPPER_PORT,
    },
  };
}

//Printa in console l'attuale configurazione
function printActualConfig(envConfig: ConfigVariables) {
  console.log(
    `${chalk.bgGreen("Frontend")}:\n Indirizzo Ip: ${
      envConfig.frontend.ipAddress
    }\n Porta: ${envConfig.frontend.port}`
  );
  console.log(
    `${chalk.bgGreen("Backend")}:\n Indirizzo Ip: ${
      getIpAddresses().ipAddress
    } (Locale)\n Porta: ${envConfig.backend.port}`
  );
  console.log(
    `${chalk.bgGreen("Osc Target")}:\n Indirizzo Ip: ${
      envConfig.oscTarget.ipAddress
    }\n Porta: ${envConfig.oscTarget.port}`
  );
}

//Verifica che i parametri inseriti permettano l'avvio del server
function verifyConfigVariables(envConfig: ConfigVariables) {
  if (envConfig.frontend.ipAddress !== getIpAddresses().ipAddress) {
    return {
      valid: false,
      why: "Il server ed il frontend non hanno lo stesso indirizzo",
    }; // Non far partire il server se il frontend non sta sullo stesso indirizzo del server(locale)
  }
  if (!!!envConfig.backend.port) {
    return {
      valid: false,
      why: "Porta del server non settata",
    };
  }
  if (!!!envConfig.frontend.port || !!!envConfig.frontend.ipAddress) {
    return {
      valid: false,
      why: `Frontend non settato`,
    };
  }
  if (!!!envConfig.oscTarget.ipAddress || !!!envConfig.oscTarget.port) {
    return {
      valid: false,
      why: "Porta o indirizzo Ip del Target Osc non settati",
    };
  }
  return { valid: true };
}
