import { WebSocketServer } from "ws";
import { udpPort } from ".";
import * as http from "http";

export const configWsServer = (server: http.Server) => {
  const wss = new WebSocketServer({ server });
  wss.on("error", (error) => console.log(error));
wss.on("close", ()=>console.log("closed connection"))
  wss.on("connection", function connection(ws) {
    console.log("Nuovo utente conneesso");
    ws.on("error", console.error);
    ws.on("message", function message(data) {
      //In questo esempio ho solo implementato un tipo di messaggio che potrebbe
      //rappresentare per esempio il cambio di volume con un input di tipo range
      const received = Number.parseInt(data.toString()) / 100;
      udpPort.send(
        {
          address: "/2/push2/",
          args: [
            {
              type: "f",
              value: received,
            },
          ],
        },
        process.env.REMOTE_ADDRESS,
        process.env.REMOTE_PORT
      );
      wss.clients.forEach((c) => c.send(received * 100)); //Manda a tutti i client connessi
    });
  });
};
