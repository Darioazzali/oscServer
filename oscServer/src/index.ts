import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import path from "path";
import { configureOscTransmission } from "./udpOsc";
import { configFileWatcher } from "./cron-scheduler";
import { configWsServer } from "./websocket";

const app = express();

export const udpPort = configureOscTransmission();

configFileWatcher();

app.use(express.static(path.join(__dirname, "..", "frontend")));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

configWsServer(server);

