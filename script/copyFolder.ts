import fs from "node:fs";
import path from "node:path";
import { __dirname } from "./editEnv.js";
//Utility per copiare le directory
function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? copyDir(srcPath, destPath)
      : fs.copyFileSync(srcPath, destPath);
  }
}

//Copia la cartella del frontend nella directory del backend
export const copyFrontendFolder = () =>
  copyDir(
    path.join(__dirname, "..", "..", "frontend", "dist"),
    path.join(__dirname, "..", "..", "oscServer", "src", "frontend")
  );
