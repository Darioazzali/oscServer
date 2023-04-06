import { execFileSync } from "child_process";
import ora from "ora";
export const frontendPath = ["frontend"];
export const vitePath = ["frontend", "node_modules", "vite", "bin", "vite.js"];

export const compileFrontend = () => {
  const spinner = ora({ text: "Compilando il frontend", spinner: "point" });
  spinner.start();
  try {
    const installDep = execFileSync("npm", ["install"], { cwd: "frontend" });
    const buildFrontend = execFileSync("npm", ["run-script", "build"], {
      cwd: "frontend",
    });
    console.log(buildFrontend.toString("utf-8"));
    spinner.succeed("Compilati i node modules");
  } catch (err) {
    console.log((err as Buffer).toString("utf-8"));
    spinner.fail("Errore");
  }
};
