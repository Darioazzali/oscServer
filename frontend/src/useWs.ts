import { useEffect, useRef, useState } from "react";

export const useWs = (setValue: (data: string) => void) => {
  const [isWsConnected, setIsWsConnected] = useState(false);
  const ws = useRef<WebSocket>();
  const timer = useRef<number>();
  const tentativi = useRef<number>(0);

  const removeAllEventListener = () => {
    ws.current?.removeEventListener("message", onMessageArrived);
    ws.current?.removeEventListener("open", onOpenedConnection);
    ws.current?.removeEventListener("close", onClosedConnection);
  };
  const onMessageArrived = (event: MessageEvent<string>) =>
    setValue(JSON.parse(event.data));

  const onOpenedConnection = (event: Event) => {
    console.log("Connesso al WebSocket");
    tentativi.current = 0;
    setIsWsConnected(true);
  };

  const onClosedConnection = (event: Event) => {
    console.log("tentativo nr: ", tentativi.current);

    tentativi.current++;
    console.log("Connessione interrotta");
    if (ws.current?.CONNECTING) return;
    setIsWsConnected(false);

    const tryToReconnect = (e: Event) => {
      if (ws.current?.CONNECTING) return;
      console.log("tenatando riconnessione");
      if (tentativi.current > 5) {
        clearTimeout(timer.current);
        console.log(
          "Timeout di connessione, massimi tentativi raggiunti. Refreshare per riprovare"
        );
        ws.current = undefined;
        return;
      }
      connectToWs();
      if (ws.current?.OPEN) clearTimeout(timer.current);
    };
    timer.current = setInterval(tryToReconnect, 3000);
  };
  const connectToWs = () => {
    ws.current = new WebSocket(
      `ws://${import.meta.env.VITE_SERVER_ADDRESS}:${
        import.meta.env.VITE_SERVER_PORT
      }`
    );
    ws.current?.addEventListener("message", onMessageArrived);
    ws.current?.addEventListener("open", onOpenedConnection);
    ws.current?.addEventListener("close", onClosedConnection);
    return ws.current.readyState;
  };

  useEffect(() => {
    connectToWs();
    return () => {
      removeAllEventListener();
      ws.current?.close();
      ws.current = undefined;
      console.log("Disconesso");
    };
  }, []);

  return { ws, isWsConnected };
};
