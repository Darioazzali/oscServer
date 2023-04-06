import { useState } from "react";
import "./App.css";
import ConnectionStatus from "./ConnectionStatus/ConnectionStatus";
import { useWs } from "./useWs";
const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
function App() {
  const [rangeValue, setRangeValue] = useState<string>("0");
  const setValue = (value: string) => setRangeValue(value);
  const { ws, isWsConnected } = useWs(setValue);
  const sendOscCommand = (number: string) => {
    if (ws.current) ws.current.send(number);
  };

  return (
    <div className="App">
      <h1> Testing OSC</h1>
      <input
        type="range"
        value={rangeValue}
        onChange={(e) => sendOscCommand(e.target.value)}
      />
      <ConnectionStatus
        isWsConnected={isWsConnected}
        ipAddress={`${SERVER_ADDRESS}:${SERVER_PORT}`}
      />
    </div>
  );
}

export default App;
