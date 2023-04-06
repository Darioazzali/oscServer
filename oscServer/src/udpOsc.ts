import osc from "osc";

export const configureOscTransmission = () => {
  const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57122,
    metadata: true,
    remoteAddress: process.env.NODEMAPPER_ADDRESS,
    remotePort: process.env.NODEMAPPER_PORT
  });

  
  udpPort.open();
  //Settando l'handler per messaggi in entrata
  udpPort.on(
    "message",
    function (oscMsg: string, timeTag: string, info: string) {
      console.log("Nuovo Osc Message arrivato", oscMsg);
      console.log("Contenuto del messaggio: ", info);
    }
  );
  return udpPort;
};
